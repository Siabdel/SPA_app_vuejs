
<template>
  <div class="multi-step-form">
    <!-- Conteneur des étapes avec transitions -->
    <div class="form-container">
      <transition :name="transitionEffect" mode="out-in">
        <!-- Étape 1 : Sélection du rendez-vous -->
        <div v-if="currentStep === 1" key="step1" class="step-wrapper">
          <CalendarWrapper 
            @selection-complete="goToNextStep"
            class="step-content"
          />
        </div>

        <!-- Étape 2 : Coordonnées -->
        <div v-else-if="currentStep === 2" key="step2" class="step-wrapper">
          <Step2Form
            ref="step2Form"
            @validated="handleStep2Validation"
            @go-back="goToPrevStep"
            class="step-content"
          />
        </div>

        <!-- Étape 3 : Paiement -->
        <div v-else-if="currentStep === 3" key="step3" class="step-wrapper">
          <PaymentGateway
            :booking-data="formData"
            @payment-success="handlePaymentSuccess"
            @payment-error="handlePaymentError"
            @go-back="goToPrevStep"
            class="step-content"
          />
        </div>

        <!-- Étape 4 : Confirmation -->
        <div v-else-if="currentStep === 4" key="step4" class="step-wrapper">
          <ConfirmationStep
            :booking-data="formData"
            class="step-content"
          />
        </div>
      </transition>
    </div>

    <!-- Overlay de chargement -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <p class="mt-2">{{ loadingMessage }}</p>
    </div>

    <!-- Modal d'erreur -->
    <ErrorModal
      v-if="showError"
      :message="errorMessage"
      @close="showError = false"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/booking'
import CalendarWrapper from '@/components/BookingProcess/CalendarWrapper.vue'
import Step2Form from '@/components/BookingProcess/FormSteps/Step2.vue'
import PaymentGateway from '@/components/BookingProcess/PaymentGateway.vue'
import ConfirmationStep from '@/components/BookingProcess/FormSteps/Step4.vue'
import ErrorModal from '@/components/UI/ErrorModal.vue'

export default {
  components: {
    CalendarWrapper,
    Step2Form,
    PaymentGateway,
    ConfirmationStep,
    ErrorModal
  },
  setup() {
    const router = useRouter()
    const bookingStore = useBookingStore()
    const step2Form = ref(null)

    // États réactifs
    const currentStep = ref(1)
    const transitionEffect = ref('slide-next')
    const isLoading = ref(false)
    const loadingMessage = ref('Validation en cours...')
    const showError = ref(false)
    const errorMessage = ref('')

    // Données du formulaire
    const formData = ref({
      step1: null, // Données calendrier
      step2: null, // Coordonnées
      step3: null // Paiement
    })

    // Initialisation avec les données du store
    onMounted(() => {
      if (bookingStore.bookingDetails) {
        formData.value.step1 = bookingStore.bookingDetails
      }
    })

    // Navigation entre les étapes
    const goToNextStep = async (stepData) => {
      transitionEffect.value = 'slide-next'
      
      // Sauvegarde les données de l'étape
      if (stepData) {
        formData.value[`step${currentStep.value}`] = stepData
      }

      // Validation spécifique à l'étape 2
      if (currentStep.value === 2) {
        isLoading.value = true
        loadingMessage.value = 'Validation des informations...'
        
        try {
          const isValid = await step2Form.value.validateForm()
          if (!isValid) return
        } finally {
          isLoading.value = false
        }
      }

      if (currentStep.value < 4) {
        currentStep.value++
        updateRoute()
      }
    }

    const goToPrevStep = () => {
      transitionEffect.value = 'slide-prev'
      if (currentStep.value > 1) {
        currentStep.value--
        updateRoute()
      }
    }

    const updateRoute = () => {
      router.push(`/booking/step${currentStep.value}`)
    }

    // Gestion spécifique des étapes
    const handleStep2Validation = (data) => {
      formData.value.step2 = data
      bookingStore.setCustomerDetails(data)
      goToNextStep()
    }

    const handlePaymentSuccess = (paymentResult) => {
      formData.value.step3 = paymentResult
      bookingStore.setPaymentDetails(paymentResult)
      sendConfirmationEmail()
      goToNextStep()
    }

    const handlePaymentError = (error) => {
      errorMessage.value = error.message || 'Erreur lors du paiement'
      showError.value = true
    }

    // Envoi de confirmation (simulé)
    const sendConfirmationEmail = () => {
      isLoading.value = true
      loadingMessage.value = 'Envoi de la confirmation...'
      
      // Simulation d'envoi
      setTimeout(() => {
        isLoading.value = false
      }, 1500)
    }

    return {
      // Refs
      currentStep,
      transitionEffect,
      formData,
      isLoading,
      loadingMessage,
      showError,
      errorMessage,
      step2Form,
      // Methods
      goToNextStep,
      goToPrevStep,
      handleStep2Validation,
      handlePaymentSuccess,
      handlePaymentError
    }
  }
}
</script>

<style lang="scss" scoped>
.multi-step-form {
  position: relative;
  min-height: 60vh;
}

.form-container {
  position: relative;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.step-wrapper {
  position: relative;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-radius: 8px;
}

/* Transitions */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-next-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

/* Responsive */
@media (max-width: 768px) {
  .form-container {
    padding: 10px;
  }
}
</style>