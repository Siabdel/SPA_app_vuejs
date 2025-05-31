<!-- src/components/QuoteItem.vue -->
 <template>
  <tr>
    <!-- Sélection produit ou description libre -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div v-if="type === 'product'">
        <select v-model="selectedProductId" @change="updateProduct"
                class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
          <option value="">Sélectionner un produit</option>
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.name }}
          </option>
        </select>
        <p v-if="description" class="text-xs text-gray-500 mt-1">{{ description }}</p>
      </div>
      <div v-else>
        <input type="text" v-model="description" placeholder="Description"
               class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
      </div>
    </td>

    <!-- Quantité -->
    <td class="px-6 py-4 whitespace-nowrap">
      <input type="number" v-model.number="quantity"
             min="1"
             class="block w-20 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
    </td>

    <!-- Prix unitaire -->
    <td class="px-6 py-4 whitespace-nowrap">
      <input type="number" v-model.number="unitPrice"
             min="0" step="0.01"
             class="block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
    </td>

    <!-- TVA -->
    <td class="px-6 py-4 whitespace-nowrap">
      <select v-model.number="taxRate"
              class="block w-20 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
        <option value="0">0%</option>
        <option value="5.5">5.5%</option>
        <option value="10">10%</option>
        <option value="20">20%</option>
      </select>
    </td>

    <!-- Total -->
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
      {{ formatCurrency(quantity * unitPrice) }}
    </td>

    <!-- Supprimer -->
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button @click="$emit('remove-item', index)"
              class="text-red-600 hover:text-red-900">
        ❌
      </button>
    </td>
  </tr>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useQuoteStore } from '@/store/quoteStore'

// Props
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

// Événements
const emit = defineEmits(['update-item', 'remove-item'])

// Store
const quoteStore = useQuoteStore()
const products = computed(() => quoteStore.products)

// Valeurs locales calculées
const selectedProductId = computed({
  get: () => props.item.productId || '',
  set: (value) => updateLocalValue('productId', value)
})

const description = computed({
  get: () => props.item.description,
  set: (value) => updateLocalValue('description', value)
})

const quantity = computed({
  get: () => props.item.quantity,
  set: (value) => updateLocalValue('quantity', value)
})

const unitPrice = computed({
  get: () => props.item.unitPrice,
  set: (value) => updateLocalValue('unitPrice', value)
})

const taxRate = computed({
  get: () => props.item.taxRate,
  set: (value) => updateLocalValue('taxRate', value)
})

// Fonction pour mettre à jour localement sans muter la prop
function updateLocalValue(field, value) {
  const updatedItem = {
    ...props.item,
    [field]: value
  }
  emit('update-item', updatedItem)
}

// Mise à jour lors d’un changement de produit
function updateProduct() {
  if (!selectedProductId.value) return

  const product = products.value.find(p => p.id === selectedProductId.value)
  if (product) {
    updateLocalValue('productId', product.id)
    updateLocalValue('description', product.description || product.name)
    updateLocalValue('unitPrice', product.price)
    updateLocalValue('taxRate', product.taxRate)
  }
}

// Format monétaire
function formatCurrency(value) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)
}
</script>