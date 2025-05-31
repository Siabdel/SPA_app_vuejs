
<template>
  <div class="container py-4">
    <!-- Notifications -->
    <Notification
      :message="notification?.message"
      :type="notification?.type || 'primary'"
      :visible="!!notification"
      @hide="$store.commit('HIDE_NOTIFICATION')"
    />

    <!-- Formulaire client -->
    <ClientForm :client="client" @update:client="val => $store.commit('SET_CLIENT', val)" />

    <!-- Tableau des lignes -->
    <table class="table table-bordered mt-4">
      <thead class="table-light">
        <tr>
          <th>Produit</th>
          <th>Description</th>
          <th>Quantité</th>
          <th>Prix unitaire</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <QuoteLine
          v-for="(line, index) in lines"
          :key="index"
          :line="line"
          :products="products"
          :index="index"
          @update:line="payload => $store.commit('UPDATE_LINE', payload)"
          @remove="() => $store.commit('REMOVE_LINE', index)"
        />
      </tbody>
    </table>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <button @click="$store.dispatch('addLine')" class="btn btn-primary">Ajouter une ligne</button>
      <div>
        <strong>Sous-total :</strong> {{ subtotal.toFixed(2) }} €<br />
        <strong>TVA (20%) :</strong> {{ tax.toFixed(2) }} €<br />
        <strong>Total :</strong> {{ total.toFixed(2) }} €
      </div>
    </div>

    <div class="mt-3">
      <button @click="$store.dispatch('saveQuote')" class="btn btn-success me-2">Enregistrer le devis</button>
      <button @click="$store.dispatch('exportPDF')" class="btn btn-secondary">Exporter en PDF</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  created() {
    this.$store.dispatch('loadProducts');
  },
  //-----------
  //-----------
  computed: {
    ...mapState(['lines', 'client', 'products', 'notification']),
    ...mapGetters(['subtotal', 'tax', 'total'])
  },
  //-----------
  //-----------
  methods: {
    addLine() {
      this.$store.commit('ADD_LINE', { product: '', description: '', quantity: 1, price: 0 })
    }
  }
}
</script>