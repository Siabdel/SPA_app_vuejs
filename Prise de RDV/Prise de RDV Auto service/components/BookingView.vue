
<template>
  <div class="booking-view" :class="{ 'dark-mode': isDarkMode }">
    <!-- Header avec progression visuelle -->
    <header class="booking-header sticky-top bg-white shadow-sm">
      <div class="container py-3">
        <div class="progress-steps">
          <div v-for="(step, index) in steps" 
               :key="index"
               :class="{ 'active': currentStep >= index + 1, 'completed': currentStep > index + 1 }"
               @click="navigateToStep(index + 1)">
            <span class="step-number">{{ index + 1 }}</span>
            <span class="step-label d-none d-md-inline">{{ step.label }}</span>
            <span class="step-divider" v-if="index < steps.length - 1"></span>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenu principal avec transitions fluides -->
    <main class="booking-main">
      <div class="container py-5">
        <transition :name="transitionDirection" mode="out-in">
          <router-view 
            @next-step="handleNextStep"
            @prev-step="handlePrevStep"
            @complete-booking="handleBookingComplete"
          />
        </transition>
      </div>
    </main>

    <!-- Footer contextuel -->
    <footer class="booking-footer bg-light py-3">
      <div class="container d-flex justify-content-between align-items-center">
        <button 
          v-if="currentStep > 1"
          @click="handlePrevStep"
          class="btn btn-outline-primary"
          aria-label="Retour à l'étape précédente">
          <i class="bi bi-chevron-left"></i> Précédent
        </button>
        <div v-else></div> <!-- Garde l'espace -->

        <div class="text-center">
          <DarkModeToggle v-model="isDarkMode" />
          <small class="d-block text-muted mt-1">Réservation sécurisée</small>
        </div>

        <div v-if="currentStep < 4" class="text-end">
          <button 
            @click="handleNextStep"
            :disabled="!canProceed"
            class="btn btn-danger"
            :class="{ 'loading': isLoading }">
            Suivant <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/booking'
import DarkModeToggle from '@/components/UI/DarkModeToggle.vue'

export default {
  components: { DarkModeToggle },
  setup() {
    const router = useRouter()
    const bookingStore = useBookingStore()

    // États réactifs
    const currentStep = ref(1)
    const transitionDirection = ref('slide-next')
    const isDarkMode = ref(false)
    const isLoading = ref(false)

    // Configuration des étapes
    const steps = [
      { label: 'Sélection du rendez-vous', route: '/booking/step1' },
      { label: 'Coordonnées', route: '/booking/step2' },
      { label: 'Paiement', route: '/booking/step3' },
      { label: 'Confirmation', route: '/booking/step4' }
    ]

    // Vérifie si on peut passer à l'étape suivante
    const canProceed = computed(() => {
      switch(currentStep.value) {
        case 1: return bookingStore.isStep1Valid
        case 2: return bookingStore.isStep2Valid
        case 3: return bookingStore.isStep3Valid
        default: return true
      }
    })

    // Gestion du dark mode selon les préférences système
    watchEffect(() => {
      if (typeof window !== 'undefined') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        isDarkMode.value = prefersDark
      }
    })

    // Navigation entre les étapes
    const navigateToStep = (stepNumber) => {
      if (stepNumber < currentStep.value && !isLoading.value) {
        transitionDirection.value = 'slide-prev'
        currentStep.value = stepNumber
        router.push(steps[stepNumber - 1].route)
      }
    }

    const handleNextStep = async () => {
      if (!canProceed.value || isLoading.value) return
      
      isLoading.value = true
      transitionDirection.value = 'slide-next'
      
      // Simule un chargement pour les micro-interactions
      await new Promise(resolve => setTimeout(resolve, 300))
      
      if (currentStep.value < steps.length) {
        currentStep.value++
        router.push(steps[currentStep.value - 1].route)
      }
      
      isLoading.value = false
    }

    const handlePrevStep = () => {
      if (currentStep.value > 1) {
        transitionDirection.value = 'slide-prev'
        currentStep.value--
        router.push(steps[currentStep.value - 1].route)
      }
    }

    const handleBookingComplete = () => {
      currentStep.value = 4
      router.push('/booking/step4')
    }

    return {
      currentStep,
      steps,
      transitionDirection,
      isDarkMode,
      isLoading,
      canProceed,
      navigateToStep,
      handleNextStep,
      handlePrevStep,
      handleBookingComplete
    }
  }
}
</script>

<style lang="scss" scoped>
.booking-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;

  &.dark-mode {
    background-color: var(--bs-dark);
    color: var(--bs-light);
  }
}

.booking-main {
  flex: 1;
  padding-bottom: 80px; // Pour le footer
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  > div {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
  }

  .step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--bs-secondary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    transition: all 0.3s ease;
  }

  .active .step-number {
    background: var(--bs-primary);
    transform: scale(1.1);
  }

  .completed .step-number {
    background: var(--bs-success);
  }

  .step-divider {
    flex: 1;
    height: 2px;
    background: var(--bs-gray-300);
    margin: 0 10px;
  }
}

// Transitions entre les étapes
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.4s ease;
}

.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

// Bouton loading state
.btn.loading {
  position: relative;
  color: transparent;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid white;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>