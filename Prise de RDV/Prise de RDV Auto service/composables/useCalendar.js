
import { useCalendar } from '@/composables/useCalendar'

export default {
  setup() {
    const {
      calendarOptions,
      loading,
      selectedDate,
      confirmSelection,
      hasSelection
    } = useCalendar()

    return {
      calendarOptions,
      loading,
      selectedDate,
      confirmSelection,
      hasSelection
    }
  }
}