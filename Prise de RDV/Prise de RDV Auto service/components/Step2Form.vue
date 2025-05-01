
<template>
  <div class="step2-form">
    <h3 class="mb-4">Vos coordonnées</h3>
    
    <form @submit.prevent="submitForm">
      <!-- Civilité -->
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label">Civilité*</label>
        <div class="col-sm-9">
          <select v-model="form.civility" class="form-select" required>
            <option value="mr">Monsieur</option>
            <option value="mme">Madame</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      <!-- Nom/Prénom -->
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label">Nom complet*</label>
        <div class="col-sm-9">
          <input 
            v-model="form.fullName"
            type="text"
            class="form-control"
            required
            placeholder="Nom Prénom"
          >
        </div>
      </div>

      <!-- Adresse -->
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label">Adresse*</label>
        <div class="col-sm-9">
          <input 
            v-model="form.address"
            type="text"
            class="form-control"
            required
            placeholder="N° et rue"
          >
          <div class="row mt-2 g-2">
            <div class="col-md-4">
              <input 
                v-model="form.zipCode"
                type="text"
                class="form-control"
                required
                placeholder="Code postal"
              >
            </div>
            <div class="col-md-8">
              <input 
                v-model="form.city"
                type="text"
                class="form-control"
                required
                placeholder="Ville"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label">Email*</label>
        <div class="col-sm-9">
          <input 
            v-model="form.email"
            type="email"
            class="form-control"
            required
            placeholder="email@exemple.com"
          >
        </div>
      </div>

      <div class="row mb-4">
        <label class="col-sm-3 col-form-label">Téléphone*</label>
        <div class="col-sm-9">
          <input 
            v-model="form.phone"
            type="tel"
            class="form-control"
            required
            placeholder="06 12 34 56 78"
          >
        </div>
      </div>

      <!-- Checkboxes -->
      <div class="mb-3 form-check">
        <input 
          v-model="form.acceptCgu"
          type="checkbox"
          class="form-check-input"
          id="cguCheck"
          required
        >
        <label class="form-check-label" for="cguCheck">
          J'accepte les <a href="#">conditions générales d'utilisation</a>*
        </label>
      </div>

      <div class="mb-4 form-check">
        <input 
          v-model="form.acceptMarketing"
          type="checkbox"
          class="form-check-input"
          id="marketingCheck"
        >
        <label class="form-check-label" for="marketingCheck">
          J'accepte de recevoir des offres promotionnelles
        </label>
      </div>

      <!-- Navigation -->
      <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-outline-secondary" @click="$emit('go-back')">
          Retour
        </button>
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm"></span>
          Continuer vers le paiement
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, numeric } from '@vuelidate/validators'

export default {
  emits: ['validated', 'go-back'],
  setup(props, { emit }) {
    const form = ref({
      civility: 'mr',
      fullName: '',
      address: '',
      zipCode: '',
      city: '',
      email: '',
      phone: '',
      acceptCgu: false,
      acceptMarketing: false
    })

    const isSubmitting = ref(false)

    const rules = {
      civility: { required },
      fullName: { required },
      address: { required },
      zipCode: { required, numeric },
      city: { required },
      email: { required, email },
      phone: { required, numeric },
      acceptCgu: { required }
    }

    const v$ = useVuelidate(rules, form)

    const validateForm = async () => {
      const isValid = await v$.value.$validate()
      if (!isValid) {
        return false
      }
      return true
    }

    const submitForm = async () => {
      isSubmitting.value = true
      
      try {
        const isValid = await validateForm()
        if (isValid) {
          emit('validated', form.value)
        }
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      form,
      v$,
      isSubmitting,
      validateForm,
      submitForm
    }
  }
}
</script>

<style scoped>
.step2-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-check-label a {
  text-decoration: underline;
}

/* Animation du bouton */
.spinner-border {
  margin-right: 8px;
}
</style>