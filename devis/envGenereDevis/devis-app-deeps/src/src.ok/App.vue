<template>
  <div :class="themeClasses">
    <QuoteEditor />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useQuoteStore } from './store/quoteStore'
import QuoteEditor from './views/QuoteEditor.vue'

const quoteStore = useQuoteStore()

const themeClasses = computed(() => {
  return {
    'theme-red': quoteStore.currentTheme === 'red',
    'theme-blue': quoteStore.currentTheme === 'blue',
    'theme-white': quoteStore.currentTheme === 'white',
  }
})

onMounted(() => {
  quoteStore.fetchProducts()
  quoteStore.fetchClients()
})
</script>