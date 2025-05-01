
<template>
  <div class="calendar-wrapper">
    <!-- Header de sélection -->
    <div class="calendar-header mb-4">
      <div class="row g-3">
        <!-- Type de prestation -->
        <div class="col-md-4">
          <label class="form-label">Type de prestation</label>
          <select 
            v-model="selectedService"
            class="form-select"
            @change="handleServiceChange"
          >
            <option v-for="service in services" :value="service.id" :key="service.id">
              {{ service.label }}
            </option>
          </select>
        </div>

        <!-- Détails véhicule -->
        <div class="col-md-4">
          <div class="row g-2">
            <div class="col-12">
              <label class="form-label">Immatriculation</label>
              <input 
                v-model="vehiclePlate"
                type="text"
                class="form-control"
                placeholder="AA-123-BB"
                @input="validatePlate"
              >
            </div>
            <div class="col-12">
              <label class="form-label">Carburant</label>
              <select v-model="vehicleFuel" class="form-select">
                <option value="essence">Essence</option>
                <option value="diesel">Diesel</option>
                <option value="hybride">Hybride</option>
                <option value="electrique">Électrique</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Filtres calendrier -->
        <div class="col-md-4">
          <label class="form-label">Centre de contrôle</label>
          <select v-model="selectedCenter" class="form-select" @change="fetchSlots">
            <option v-for="center in centers" :value="center.id" :key="center.id">
              {{ center.name }} ({{ center.distance }} km)
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Calendrier principal -->
    <div class="calendar-container">
      <FullCalendar
        ref="calendarRef"
        :options="calendarOptions"
      />
    </div>

    <!-- Détails de sélection -->
    <div v-if="selectedSlot" class="selected-slot bg-light p-3 mt-3 rounded">
      <h5>Récapitulatif</h5>
      <div class="row">
        <div class="col-md-6">
          <p><strong>Date :</strong> {{ formattedDate }}</p>
          <p><strong>Horaire :</strong> {{ selectedSlot.time }}</p>
          <p><strong>Prestation :</strong> {{ selectedServiceLabel }}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Véhicule :</strong> {{ vehiclePlate || 'Non renseigné' }}</p>
          <p><strong>Carburant :</strong> {{ vehicleFuelLabel }}</p>
          <p><strong>Centre :</strong> {{ selectedCenterName }}</p>
        </div>
      </div>
      <button 
        @click="confirmSelection"
        class="btn btn-primary mt-2"
        :disabled="!isSelectionValid"
      >
        Confirmer la sélection
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import frLocale from '@fullcalendar/core/locales/fr'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useBookingStore } from '@/stores/booking'

export default {
  components: { FullCalendar },
  emits: ['selection-complete'],
  setup(props, { emit }) {
    const bookingStore = useBookingStore()
    const calendarRef = ref(null)

    // Données sélectionnables
    const services = ref([
      { id: 'ct', label: 'Contrôle technique', duration: 30 },
      { id: 'vidange', label: 'Vidange', duration: 45 },
      { id: 'diagnostic', label: 'Diagnostic', duration: 60 }
    ])

    const centers = ref([
      { id: 1, name: 'Paris Centre', distance: 2.5, slots: [] },
      { id: 2, name: 'Lyon Part-Dieu', distance: 1.2, slots: [] },
      { id: 3, name: 'Marseille Vieux-Port', distance: 3.7, slots: [] }
    ])

    // États réactifs
    const selectedService = ref('ct')
    const vehiclePlate = ref('')
    const vehicleFuel = ref('essence')
    const selectedCenter = ref(1)
    const selectedSlot = ref(null)
    const availableSlots = ref([])
    const isLoading = ref(false)

    // Calculs dérivés
    const selectedServiceLabel = computed(() => {
      return services.value.find(s => s.id === selectedService.value)?.label || ''
    })

    const vehicleFuelLabel = computed(() => {
      const fuels = {
        essence: 'Essence',
        diesel: 'Diesel',
        hybride: 'Hybride',
        electrique: 'Électrique'
      }
      return fuels[vehicleFuel.value] || ''
    })

    const selectedCenterName = computed(() => {
      return centers.value.find(c => c.id === selectedCenter.value)?.name || ''
    })

    const formattedDate = computed(() => {
      if (!selectedSlot.value) return ''
      const options = { weekday: 'long', day: 'numeric', month: 'long' }
      return new Date(selectedSlot.value.start).toLocaleDateString('fr-FR', options)
    })

    const isSelectionValid = computed(() => {
      return selectedSlot.value && 
             vehiclePlate.value && 
             vehiclePlateValid.value
    })

    const vehiclePlateValid = computed(() => {
      const regex = /^[A-Z]{2}[- ]?[0-9]{3}[- ]?[A-Z]{2}$/i
      return regex.test(vehiclePlate.value)
    })

    // Configuration FullCalendar
    const calendarOptions = ref({
      plugins: [interactionPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      locale: frLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      slotMinTime: '08:00:00',
      slotMaxTime: '18:00:00',
      slotDuration: '00:30:00',
      allDaySlot: false,
      weekends: false,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayHeaderFormat: { weekday: 'short', day: 'numeric' },
      height: 'auto',
      select: handleSlotSelect,
      eventClick: handleEventClick,
      events: availableSlots.value
    })

    // Méthodes
    async function fetchSlots() {
      isLoading.value = true
      
      // Simulation appel API
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const center = centers.value.find(c => c.id === selectedCenter.value)
      const service = services.value.find(s => s.id === selectedService.value)
      
      // Génération de créneaux fictifs
      availableSlots.value = generateSlots(center, service)
      
      if (calendarRef.value) {
        calendarRef.value.getApi().refetchEvents()
      }
      
      isLoading.value = false
    }

    function generateSlots(center, service) {
      // Logique de génération des créneaux disponibles
      const slots = []
      const daysToShow = 14
      const startHour = 8
      const endHour = 18
      
      for (let day = 0; day < daysToShow; day++) {
        const date = new Date()
        date.setDate(date.getDate() + day)
        
        // Ne pas inclure les weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue
        
        for (let hour = startHour; hour < endHour; hour++) {
          // Créneaux toutes les 30 minutes
          for (let minute = 0; minute < 60; minute += 30) {
            // 70% de chance d'avoir un créneau disponible
            if (Math.random() > 0.3) {
              const start = new Date(date)
              start.setHours(hour, minute, 0)
              
              const end = new Date(start)
              end.setMinutes(end.getMinutes() + service.duration)
              
              slots.push({
                id: `slot-${day}-${hour}-${minute}`,
                title: 'Disponible',
                start: start.toISOString(),
                end: end.toISOString(),
                backgroundColor: '#28a745',
                borderColor: '#218838',
                extendedProps: {
                  centerId: center.id,
                  serviceId: service.id
                }
              })
            }
          }
        }
      }
      
      return slots
    }

    function handleSlotSelect(selectInfo) {
      // Vérifie que le créneau est disponible
      const event = calendarRef.value.getApi().getEventById(selectInfo.startStr)
      
      if (event) {
        selectedSlot.value = {
          id: event.id,
          start: selectInfo.start,
          end: selectInfo.end,
          time: `${selectInfo.start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - ${selectInfo.end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
        }
      } else {
        selectedSlot.value = null
      }
      
      calendarRef.value.getApi().unselect()
    }

    function handleEventClick(clickInfo) {
      selectedSlot.value = {
        id: clickInfo.event.id,
        start: clickInfo.event.start,
        end: clickInfo.event.end,
        time: `${clickInfo.event.start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - ${clickInfo.event.end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
      }
    }

    function confirmSelection() {
      if (!isSelectionValid.value) return
      
      bookingStore.setBookingDetails({
        service: selectedService.value,
        serviceLabel: selectedServiceLabel.value,
        vehiclePlate: vehiclePlate.value,
        vehicleFuel: vehicleFuel.value,
        centerId: selectedCenter.value,
        centerName: selectedCenterName.value,
        slot: selectedSlot.value
      })
      
      emit('selection-complete')
    }

    function handleServiceChange() {
      selectedSlot.value = null
      fetchSlots()
    }

    function validatePlate() {
      // Logique supplémentaire de validation si nécessaire
    }

    // Cycle de vie
    onMounted(() => {
      fetchSlots()
    })

    return {
      // Refs
      calendarRef,
      services,
      centers,
      selectedService,
      vehiclePlate,
      vehicleFuel,
      selectedCenter,
      selectedSlot,
      isLoading,
      calendarOptions,
      // Computed
      selectedServiceLabel,
      vehicleFuelLabel,
      selectedCenterName,
      formattedDate,
      isSelectionValid,
      vehiclePlateValid,
      // Methods
      confirmSelection,
      handleServiceChange,
      validatePlate
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  :deep(.fc) {
    .fc-toolbar-title {
      font-size: 1.25rem;
      color: var(--bs-primary);
    }

    .fc-col-header-cell {
      background-color: var(--bs-primary);
      color: white;
      padding: 8px 0;
    }

    .fc-timegrid-slot {
      height: 40px;
    }

    .fc-event {
      cursor: pointer;
      transition: transform 0.2s;
      border-radius: 4px;
      font-size: 0.85rem;

      &:hover {
        transform: scale(1.02);
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      }
    }

    .fc-day-disabled {
      background-color: #f8f9fa;
    }
  }
}

.selected-slot {
  border-left: 4px solid var(--bs-primary);
  transition: all 0.3s ease;

  p {
    margin-bottom: 0.5rem;
  }
}

// Animation de chargement
@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.loading-slot {
  animation: pulse 1.5s infinite;
  background-color: #f8f9fa !important;
  border: none !important;
}
</style>