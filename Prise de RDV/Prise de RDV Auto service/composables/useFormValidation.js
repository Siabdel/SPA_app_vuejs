
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, numeric, minLength, maxLength, helpers } from '@vuelidate/validators'

export function useFormValidation() {
  // Modèle de données du formulaire
  const formData = ref({
    civility: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      zipCode: '',
      city: ''
    },
    acceptTerms: false,
    marketingConsent: false
  })

  // Règles de validation
  const rules = computed(() => ({
    civility: { required },
    firstName: { 
      required,
      minLength: minLength(2),
      maxLength: maxLength(50)
    },
    lastName: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(50)
    },
    email: {
      required,
      email,
      async isUnique(value) {
        if (value === '') return true
        // Simulation de vérification d'unicité
        await new Promise(resolve => setTimeout(resolve, 500))
        return Math.random() > 0.5
      }
    },
    phone: {
      required,
      numeric,
      minLength: minLength(10),
      maxLength: maxLength(10),
      frenchPhone: helpers.withMessage(
        'Numéro français valide requis',
        value => /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(value)
      )
    },
    address: {
      street: { required },
      zipCode: {
        required,
        numeric,
        validZip: helpers.withMessage(
          'Code postal français valide',
          value => /^\d{5}$/.test(value)
      },
      city: { required }
    },
    acceptTerms: {
      required: helpers.withMessage(
        'Vous devez accepter les CGU',
        value => value === true
      )
    }
  }))

  const v$ = useVuelidate(rules, formData)

  // États de validation
  const serverErrors = ref({})
  const isSubmitting = ref(false)

  // Méthodes de validation
  const validateField = async (field) => {
    await v$.value[field].$validate()
  }

  const validateForm = async () => {
    const isValid = await v$.value.$validate()
    return isValid
  }

  const resetValidation = () => {
    v$.value.$reset()
    serverErrors.value = {}
  }

  // Soumission avec gestion des erreurs serveur
  const submitForm = async (submitFn) => {
    isSubmitting.value = true
    serverErrors.value = {}
    
    try {
      const isValid = await validateForm()
      if (!isValid) return false
      
      await submitFn(formData.value)
      return true
    } catch (error) {
      if (error.response?.data?.errors) {
        serverErrors.value = error.response.data.errors
      } else {
        serverErrors.value = { general: error.message }
      }
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    formData,
    v$,
    serverErrors,
    isSubmitting,
    validateField,
    validateForm,
    resetValidation,
    submitForm
  }
}