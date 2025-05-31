
<template>
  <tr>
    <td>
      <select v-model="line.product" class="form-select">
        <option value="">Sélectionner</option>
        <option v-for="product in products" :key="product.id" :value="product.id">
          {{ product.name }}
        </option>
      </select>
    </td>
    <td><input v-model="line.description" class="form-control" /></td>
    <td><input v-model.number="line.quantity" type="number" min="1" class="form-control text-end" /></td>
    <td><input v-model.number="line.price" type="number" step="0.01" class="form-control text-end" /></td>
    <td class="text-end">{{ line.price * line.quantity }} €</td>
    <td>
      <button @click="$emit('remove')" class="btn btn-sm btn-outline-danger">×</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['line', 'products', 'index'],
  emits: ['remove'],
  watch: {
    line: {
      deep: true,
      handler(newVal) {
        this.$emit('update:line', { index: this.index, line: newVal })
      }
    }
  }
}
</script>