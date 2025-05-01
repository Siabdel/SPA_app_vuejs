
import { ref, computed } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { useApi } from './useApi'

export function usePayment() {
  const bookingStore = useBookingStore()
  const { post } = useApi()

  // États du paiement
  const paymentMethods = ref([
    {
      id: 'card',
      name: 'Carte bancaire',
      icon: 'credit-card',
      description: 'Paiement sécurisé par carte',
      fees: 0
    },
    {
      id: 'installment',
      name: 'Paiement en 2x',
      icon: 'calendar',
      description: '2 mensualités sans frais',
      fees: 0
    },
    {
      id: 'onsite',
      name: 'Sur place',
      icon: 'shop',
      description: 'Paiement au centre',
      fees: 0
    }
  ])

  const selectedMethod = ref(paymentMethods.value[0])
  const paymentStatus = ref('idle') // 'idle' | 'processing' | 'success' | 'error'
  const paymentError = ref(null)
  const clientSecret = ref(null)

  // Calculs dérivés
  const amount = computed(() => {
    return bookingStore.bookingDetails?.price || 0
  })

  const formattedAmount = computed(() => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount.value)
  })

  const installmentAmount = computed(() => {
    return formattedAmount.value / 2
  })

  // Méthodes de paiement
  const initializePayment = async () => {
    try {
      paymentStatus.value = 'processing'
      const response = await post('/payment/intent', {
        amount: amount.value * 100, // Conversion en cents
        currency: 'eur',
        payment_method: selectedMethod.value.id
      })
      
      clientSecret.value = response.client_secret
      return response
    } catch (error) {
      paymentError.value = error
      paymentStatus.value = 'error'
      throw error
    }
  }

  const processCardPayment = async (paymentData) => {
    try {
      paymentStatus.value = 'processing'
      
      const response = await post('/payment/confirm', {
        payment_method_id: paymentData.id,
        client_secret: clientSecret.value,
        booking_id: bookingStore.bookingId,
        save_card: paymentData.saveCard
      })
      
      paymentStatus.value = 'success'
      return response
    } catch (error) {
      paymentError.value = error
      paymentStatus.value = 'error'
      throw error
    }
  }

  const processInstallmentPayment = async () => {
    try {
      paymentStatus.value = 'processing'
      
      const response = await post('/payment/installment', {
        amount: amount.value * 100,
        booking_id: bookingStore.bookingId,
        installments: 2
      })
      
      paymentStatus.value = 'success'
      return response
    } catch (error) {
      paymentError.value = error
      paymentStatus.value = 'error'
      throw error
    }
  }

  const processOnsitePayment = async () => {
    try {
      paymentStatus.value = 'processing'
      
      // Simulation de délai pour le paiement sur place
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const response = {
        status: 'requires_capture',
        onsite_code: `ONSITE-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
      }
      
      paymentStatus.value = 'success'
      return response
    } catch (error) {
      paymentError.value = error
      paymentStatus.value = 'error'
      throw error
    }
  }

  const resetPayment = () => {
    paymentStatus.value = 'idle'
    paymentError.value = null
    clientSecret.value = null
  }

  return {
    // États
    paymentMethods,
    selectedMethod,
    paymentStatus,
    paymentError,
    // Computed
    amount,
    formattedAmount,
    installmentAmount,
    // Méthodes
    initializePayment,
    processCardPayment,
    processInstallmentPayment,
    processOnsitePayment,
    resetPayment
  }
}