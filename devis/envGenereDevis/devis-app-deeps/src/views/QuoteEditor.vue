<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <!-- En-tête -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Nouveau devis</h2>
      <div class="flex space-x-3">
        <button @click="saveQuote" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          Enregistrer
        </button>
        <button @click="exportToPDF" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark">
          Exporter PDF
        </button>
      </div>
    </div>

    <!-- Grille principale -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Informations client -->
      <div class="lg:col-span-1">
        <div class="bg-white shadow rounded-lg p-6" v-if="showClientForm">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Informations client</h3>
          <ClientForm v-model="quote.client" />
        </div>
      </div>

      <!-- Paramètres du devis -->
      <div class="lg:col-span-1">
        <div class="bg-white shadow rounded-lg p-6 mt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Paramètres du devis</h3>
          <div class="space-y-4">
            <div>
              <label for="quote-number" class="block text-sm font-medium text-gray-700">Numéro de devis</label>
              <input type="text" id="quote-number" v-model="quote.number"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label for="quote-date" class="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" id="quote-date" v-model="quote.date"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label for="quote-validity" class="block text-sm font-medium text-gray-700">Validité (jours)</label>
              <input type="number" id="quote-validity" v-model="quote.validityDays"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label for="quote-notes" class="block text-sm font-medium text-gray-700">Notes</label>
              <textarea id="quote-notes" v-model="quote.notes" rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Articles du devis -->
      <div class="lg:col-span-2">
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Articles</h3>
            <div class="flex space-x-2">
              <button @click="addProductItem" class="px-3 py-1 border border-gray-300 rounded-md text-sm flex items-center">
                🔍 Produit
              </button>
              <button @click="addCustomItem" class="px-3 py-1 border border-gray-300 rounded-md text-sm flex items-center">
                ➕ Ligne libre
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th>Description</th>
                  <th>Quantité</th>
                  <th>Prix unitaire</th>
                  <th>TVA</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <transition-group name="slide-fade">
                  <QuoteItem
                    v-for="(item, index) in quote.items"
                    :key="item.id"
                    :item="item"
                    :index="index"
                    @update-item="updateItem"
                    @remove-item="removeItem"
                  />
                </transition-group>
              </tbody>
            </table>
          </div>

          <!-- Résumé des totaux -->
          <div class="mt-8 border-t pt-6">
            <div class="flex justify-end">
              <div class="w-64 space-y-2">
                <div class="flex justify-between">
                  <span>Total HT</span>
                  <span>{{ formatCurrency(totals.totalHT) }}</span>
                </div>
                <div v-for="tax in totals.taxes" :key="tax.rate" class="flex justify-between">
                  <span>TVA {{ tax.rate }}%</span>
                  <span>{{ formatCurrency(tax.amount) }}</span>
                </div>
                <div class="flex justify-between border-t pt-2 mt-2 font-bold">
                  <span>Total TTC</span>
                  <span>{{ formatCurrency(totals.totalTTC) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuoteStore } from '@/store/quoteStore'
import ClientForm from '@/components/ClientForm.vue'
import QuoteItem from '@/components/QuoteItem.vue'

const quoteStore = useQuoteStore()
const showClientForm = ref(false); // Par défaut, caché

// Données du devis
const quote = ref({
  id: null,
  number: `DEV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
  date: new Date().toISOString().split('T')[0],
  validityDays: 30,
  notes: '',
  client: {
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  },
  items: []
})

// Calcul des totaux
const totals = computed(() => {
  const taxesMap = {}
  let totalHT = 0

  quote.value.items.forEach(item => {
    const itemHT = item.quantity * item.unitPrice
    totalHT += itemHT
    const taxAmount = itemHT * (item.taxRate / 100)
    if (!taxesMap[item.taxRate]) taxesMap[item.taxRate] = 0
    taxesMap[item.taxRate] += taxAmount
  })

  const taxes = Object.keys(taxesMap).map(rate => ({ rate: parseFloat(rate), amount: taxesMap[rate] }))
  const totalTTC = totalHT + taxes.reduce((sum, tax) => sum + tax.amount, 0)

  return { totalHT, taxes, totalTTC }
})

function addProductItem() {
  quote.value.items.push({
    id: Date.now() + Math.random().toString(36).substr(2, 9),
    type: 'product',
    productId: null,
    description: '',
    quantity: 1,
    unitPrice: 0,
    taxRate: 20
  })
}

function addCustomItem() {
  quote.value.items.push({
    id: Date.now() + Math.random().toString(36).substr(2, 9),
    type: 'custom',
    description: '',
    quantity: 1,
    unitPrice: 0,
    taxRate: 20
  })
}

function updateItem(updatedItem) {
  const index = quote.value.items.findIndex(i => i.id === updatedItem.id)
  if (index >= 0) quote.value.items[index] = updatedItem
}

function removeItem(index) {
  quote.value.items.splice(index, 1)
}

function saveQuote() {
  quoteStore.saveQuote(quote.value)
  alert('Devis sauvegardé !')
}

function exportToPDF() {
  alert('Export PDF simulé.')
}

function formatCurrency(value) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)
}
</script>
