
<template>
  <div class="row g-3">
    <h5>Informations Client</h5>
    <div class="col-md-4">
      <label class="form-label">Nom</label>
      <input v-model="client.name" type="text" class="form-control" />
    </div>
    <div class="col-md-4">
      <label class="form-label">Email</label>
      <input v-model="client.email" type="email" class="form-control" />
    </div>
    <div class="col-md-4">
      <label class="form-label">Entreprise</label>
      <input v-model="client.company" type="text" class="form-control" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['client'],
  watch: {
    client: {
      deep: true,
      handler(newVal) {
        this.$emit('update:client', newVal)
      }
    }
  }
}
</script>