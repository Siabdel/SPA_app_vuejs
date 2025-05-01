
<template>
  <div class="payment-gateway">
    <!-- En-tête -->
    <div class="payment-header mb-4">
      <h3 class="mb-3">Paiement sécurisé</h3>
      <div class="secure-badge">
        <i class="bi bi-shield-lock"></i>
        <span>Transactions 100% sécurisées</span>
      </div>
    </div>

    <!-- Options de paiement -->
    <div class="payment-options mb-5">
      <div 
        v-for="option in paymentOptions"
        :key="option.id"
        class="payment-option"
        :class="{ 'active': selectedOption === option.id }"
        @click="selectPaymentOption(option)"
      >
        <div class="option-icon">
          <i :class="option.icon"></i>
        </div>
        <div class="option-label">
          {{ option.label }}
          <small v-if="option.description" class="text-muted d-block">{{ option.description }}</small>
        </div>
      </div>
    </div>

    <!-- Formulaire de carte bancaire -->
    <div v-if="selectedOption === 'card'" class="card-form">
      <div class="card-wrapper mb-4">
        <div class="credit-card" :class="cardType">
          <div class="card-front">
            <div class="card-logo">
              <span v-if="cardType">{{ cardBrands[cardType].icon }}</span>
            </div>
            <div class="card-number">
              {{ formattedCardNumber || '•••• •••• •••• ••••' }}
            </div>
            <div class="card-details">
              <div class="card-name">
                {{ cardDetails.name || 'NOM PRENOM' }}
              </div>
              <div class="card-expiry">
                {{ formattedExpiry || 'MM/AA' }}
              </div>
            </div>
          </div>
          <div class="card-back">
            <div class="card-cvv">
              {{ cardDetails.cvv ? '•••' : '•••' }}
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="processCardPayment">
        <div class="mb-3">
          <label class="form-label">Numéro de carte</label>
          <input
            v-model="cardDetails.number"
            type="text"
            class="form-control"
            placeholder="1234 5678 9012 3456"
            @input="detectCardType"
            @focus="showCardFront"
          >
        </div>

        <div class="mb-3">
          <label class="form-label">Titulaire de la carte</label>
          <input
            v-model="cardDetails.name"
            type="text"
            class="form-control"
            placeholder="Nom comme sur la carte"
            @focus="showCardFront"
          >
        </div>

        <div class="row g-2">
          <div class="col-md-6">
            <label class="form-label">Date d'expiration</label>
            <input
              v-model="cardDetails.expiry"
              type="text"
              class="form-control"
              placeholder="MM/AA"
              @input="formatExpiry"
              @focus="showCardFront"
            >
          </div>
          <div class="col-md-6">
            <label class="form-label">Code de sécurité</label>
            <div class="input-group">
              <input
                v-model="cardDetails.cvv"
                type="text"
                class="form-control"
                placeholder="•••"
                maxlength="4"
                @focus="showCardBack"
              >
              <span class="input-group-text">
                <i class="bi bi-question-circle" v-tooltip="'3 chiffres au dos de votre carte'"></i>
              </span>
            </div>
          </div>
        </div>

        <div class="d-grid mt-4">
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="!isCardFormValid || isProcessing"
          >
            <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
            Payer {{ formattedAmount }}
          </button>
        </div>
      </form>
    </div>

    <!-- Paiement différé -->
    <div v-else-if="selectedOption === 'installment'" class="installment-option">
      <div class="alert alert-info">
        <i class="bi bi-info-circle me-2"></i>
        Paiement en 2 fois sans frais disponible pour les cartes bancaires françaises
      </div>

      <div class="payment-plan">
        <div class="plan-item">
          <div class="plan-date">Aujourd'hui</div>
          <div class="plan-amount">{{ firstInstallment }}</div>
        </div>
        <div class="plan-item">
          <div class="plan-date">Dans 30 jours</div>
          <div class="plan-amount">{{ secondInstallment }}</div>
        </div>
      </div>

      <button 
        class="btn btn-primary w-100 mt-3"
        @click="processInstallmentPayment"
        :disabled="isProcessing"
      >
        <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
        Confirmer le paiement en 2 fois
      </button>
    </div>

    <!-- Paiement sur place -->
    <div v-else-if="selectedOption === 'onsite'" class="onsite-option">
      <div class="alert alert-warning">
        <i class="bi bi-exclamation-triangle me-2"></i>
        Vous réglerez directement au centre lors de votre rendez-vous
      </div>

      <div class="d-grid">
        <button 
          class="btn btn-outline-primary"
          @click="confirmOnsitePayment"
        >
          Confirmer la réservation
        </button>
      </div>
    </div>

    <!-- Sécurité -->
    <div class="security-footer mt-5">
      <div class="d-flex flex-wrap justify-content-center gap-4">
        <img src="@/assets/images/pci-dss.png" alt="PCI DSS Certified" height="40">
        <img src="@/assets/images/3d-secure.png" alt="3D Secure" height="40">
        <img src="@/assets/images/encryption.png" alt="256-bit Encryption" height="40">
      </div>
    </div>

    <!-- Modal de confirmation 3D Secure -->
    <div v-if="show3dSecureModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Vérification 3D Secure</h5>
        </div>
        <div class="modal-body">
          <div class="text-center mb-4">
            <i class="bi bi-shield-lock fs-1 text-primary"></i>
            <p>Vous allez être redirigé vers votre banque pour authentifier le paiement</p>
          </div>
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Chargement...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useBookingStore } from '@/stores/booking'

export default {
  props: {
    bookingData: {
      type: Object,
      required: true
    }
  },
  emits: ['payment-success', 'payment-error', 'go-back'],
  setup(props, { emit }) {
    const bookingStore = useBookingStore()

    // Options de paiement
    const paymentOptions = ref([
      {
        id: 'card',
        label: 'Carte bancaire',
        description: 'Visa, Mastercard, CB',
        icon: 'bi bi-credit-card'
      },
      {
        id: 'installment',
        label: 'Paiement en 2 fois',
        description: 'Sans frais',
        icon: 'bi bi-calendar2-week'
      },
      {
        id: 'onsite',
        label: 'Paiement sur place',
        description: 'Lors du rendez-vous',
        icon: 'bi bi-shop'
      }
    ])

    // États réactifs
    const selectedOption = ref('card')
    const isProcessing = ref(false)
    const show3dSecureModal = ref(false)
    const cardFlipState = ref('front')

    // Détails de la carte
    const cardDetails = ref({
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    })

    const cardBrands = {
      visa: { icon: 'bi bi-cc-visa', pattern: /^4/ },
      mastercard: { icon: 'bi bi-cc-mastercard', pattern: /^5[1-5]/ },
      amex: { icon: 'bi bi-cc-amex', pattern: /^3[47]/ },
      discover: { icon: 'bi bi-credit-card', pattern: /^6(?:011|5)/ },
      diners: { icon: 'bi bi-credit-card', pattern: /^3(?:0[0-5]|[68])/ },
      jcb: { icon: 'bi bi-credit-card', pattern: /^(?:2131|1800|35\d{3})/ },
      unionpay: { icon: 'bi bi-credit-card', pattern: /^(62|88)/ },
      maestro: { icon: 'bi bi-credit-card', pattern: /^(5018|5020|5038|6304|6759|676[1-3])/ },
      unknown: { icon: 'bi bi-credit-card', pattern: /.*/ }
    }

    const cardType = ref('')

    // Calculs dérivés
    const totalAmount = computed(() => {
      return props.bookingData?.step1?.slot?.servicePrice || 49.90
    })

    const formattedAmount = computed(() => {
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalAmount.value)
    })

    const firstInstallment = computed(() => {
      const amount = totalAmount.value / 2
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
    })

    const secondInstallment = computed(() => {
      const amount = totalAmount.value / 2
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
    })

    const formattedCardNumber = computed(() => {
      const num = cardDetails.value.number.replace(/\s/g, '')
      if (num.length === 0) return ''
      
      return num.match(/.{1,4}/g)?.join(' ') || ''
    })

    const formattedExpiry = computed(() => {
      const exp = cardDetails.value.expiry.replace(/\D/g, '')
      if (exp.length >= 2) {
        return `${exp.slice(0, 2)}/${exp.slice(2, 4)}`
      }
      return exp
    })

    const isCardFormValid = computed(() => {
      return (
        cardDetails.value.number.replace(/\s/g, '').length >= 16 &&
        cardDetails.value.name.trim().length >= 3 &&
        cardDetails.value.expiry.replace(/\D/g, '').length === 4 &&
        cardDetails.value.cvv.length >= 3
      )
    })

    // Méthodes
    const selectPaymentOption = (option) => {
      selectedOption.value = option.id
    }

    const detectCardType = () => {
      const num = cardDetails.value.number.replace(/\s/g, '')
      for (const [type, data] of Object.entries(cardBrands)) {
        if (data.pattern.test(num)) {
          cardType.value = type
          return
        }
      }
      cardType.value = 'unknown'
    }

    const formatExpiry = () => {
      let exp = cardDetails.value.expiry.replace(/\D/g, '')
      if (exp.length > 2) {
        exp = `${exp.slice(0, 2)}/${exp.slice(2, 4)}`
      }
      cardDetails.value.expiry = exp
    }

    const showCardFront = () => {
      cardFlipState.value = 'front'
    }

    const showCardBack = () => {
      cardFlipState.value = 'back'
    }

    const processCardPayment = async () => {
      if (!isCardFormValid.value) return
      
      isProcessing.value = true
      
      try {
        // Simulation de vérification 3D Secure
        show3dSecureModal.value = true
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Simuler un succès de paiement dans 80% des cas
        const isSuccess = Math.random() > 0.2
        
        if (isSuccess) {
          emit('payment-success', {
            method: 'card',
            amount: totalAmount.value,
            transactionId: `tx_${Math.random().toString(36).substr(2, 10)}`,
            cardLast4: cardDetails.value.number.slice(-4)
          })
        } else {
          throw new Error('Paiement refusé par la banque')
        }
      } catch (error) {
        emit('payment-error', error)
      } finally {
        isProcessing.value = false
        show3dSecureModal.value = false
      }
    }

    const processInstallmentPayment = async () => {
      isProcessing.value = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        emit('payment-success', {
          method: 'installment',
          amount: totalAmount.value,
          transactionId: `inst_${Math.random().toString(36).substr(2, 8)}`,
          installments: [
            { date: new Date(), amount: totalAmount.value / 2 },
            { date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), amount: totalAmount.value / 2 }
          ]
        })
      } catch (error) {
        emit('payment-error', error)
      } finally {
        isProcessing.value = false
      }
    }

    const confirmOnsitePayment = () => {
      emit('payment-success', {
        method: 'onsite',
        amount: totalAmount.value,
        transactionId: null
      })
    }

    // Initialisation
    onMounted(() => {
      // Pré-sélectionner le mode de paiement le plus utilisé
      selectedOption.value = 'card'
    })

    return {
      // Options
      paymentOptions,
      selectedOption,
      selectPaymentOption,
      // Carte bancaire
      cardDetails,
      cardType,
      cardBrands,
      formattedCardNumber,
      formattedExpiry,
      isCardFormValid,
      detectCardType,
      formatExpiry,
      processCardPayment,
      // Paiement différé
      firstInstallment,
      secondInstallment,
      processInstallmentPayment,
      // Paiement sur place
      confirmOnsitePayment,
      // UI
      totalAmount,
      formattedAmount,
      isProcessing,
      show3dSecureModal,
      cardFlipState,
      showCardFront,
      showCardBack
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-gateway {
  max-width: 600px;
  margin: 0 auto;
}

.payment-header {
  text-align: center;
  .secure-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: #f8f9fa;
    border-radius: 20px;
    color: var(--bs-success);
    font-size: 0.9rem;
  }
}

.payment-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  .payment-option {
    padding: 15px;
    border: 1px solid var(--bs-border-color);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    &:hover {
      border-color: var(--bs-primary);
    }
    &.active {
      border-color: var(--bs-primary);
      background-color: rgba(var(--bs-primary-rgb), 0.05);
      .option-icon {
        color: var(--bs-primary);
      }
    }
    .option-icon {
      font-size: 2rem;
      margin-bottom: 8px;
      color: var(--bs-secondary);
    }
    .option-label {
      font-weight: 500;
    }
  }
}

.credit-card {
  position: relative;
  height: 200px;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  margin: 0 auto;
  max-width: 320px;
  
  &.flipped {
    transform: rotateY(180deg);
  }

  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #434343, #2c2c2c);
    color: white;
  }

  .card-front {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .card-logo {
      text-align: right;
      font-size: 2rem;
    }
    .card-number {
      font-family: 'Courier New', monospace;
      font-size: 1.2rem;
      letter-spacing: 2px;
      text-align: center;
      margin: 20px 0;
    }
    .card-details {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      .card-name {
        text-transform: uppercase;
      }
    }
  }

  .card-back {
    transform: rotateY(180deg);
    background: linear-gradient(135deg, #2c2c2c, #434343);
    .card-cvv {
      position: absolute;
      top: 50%;
      right: 30px;
      background: white;
      color: black;
      padding: 5px 10px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }
  }

  // Styles spécifiques par type de carte
  &.visa .card-front { background: linear-gradient(135deg, #1a4f8b, #4b6cb7); }
  &.mastercard .card-front { background: linear-gradient(135deg, #eb6b23, #cf2e48); }
  &.amex .card-front { background: linear-gradient(135deg, #0077b5, #00a0dc); }
}

.payment-plan {
  border: 1px solid var(--bs-border-color);
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
  .plan-item {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid var(--bs-border-color);
    &:last-child {
      border-bottom: none;
    }
    .plan-amount {
      font-weight: bold;
    }
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  .modal-content {
    background: white;
    border-radius: 8px;
    padding: 20px;
    width: 90%;
    max-width: 400px;
    .modal-header {
      border-bottom: 1px solid var(--bs-border-color);
      padding-bottom: 10px;
      margin-bottom: 15px;
    }
  }
}

.security-footer {
  border-top: 1px solid var(--bs-border-color);
  padding-top: 20px;
}

// Responsive
@media (max-width: 576px) {
  .payment-options {
    grid-template-columns: 1fr;
  }
  
  .credit-card {
    height: 180px;
    max-width: 280px;
  }
}
</style>