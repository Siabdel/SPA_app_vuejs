
// src/store/index.js
// src/store/index.js
import { createStore } from 'vuex'
import productService from '../services/productService'

export default createStore({
  state: {
    products: [],
    lines: [],
    client: {
      name: '',
      email: '',
      company: ''
    },
    notification: null,
    loading: false
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_LINE(state, line) {
      state.lines.push(line)
    },
    REMOVE_LINE(state, index) {
      state.lines.splice(index, 1)
    },
    UPDATE_LINE(state, { index, line }) {
      state.lines[index] = line
    },
    SET_CLIENT(state, client) {
      state.client = client
    },
    SHOW_NOTIFICATION(state, payload) {
      state.notification = payload
    },
    HIDE_NOTIFICATION(state) {
      state.notification = null
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading
    }
  },
  //----------------------------
  //------Actions---------------
  //----------------------------
  actions: {
    //----------------------------
    async loadProducts({ commit }) {
      commit('SET_LOADING', true)
      try {
        const products = await productService.getProducts()
        console.log("loadProducts !!!! ....", products)
        commit('SET_PRODUCTS', products)
      } catch (error) {
        commit('SHOW_NOTIFICATION', { message: 'Erreur lors du chargement des produits.', type: 'danger' })
      } finally {
        commit('SET_LOADING', false)
      }
    },
    //----------------
    //----------------
    //----------------
    saveQuote({ commit }) {
      commit('SHOW_NOTIFICATION', { message: 'Devis sauvegardé avec succès.', type: 'success' })
      setTimeout(() => commit('HIDE_NOTIFICATION'), 3000)
    },
    //----------------
    //----------------
    //----------------
    exportPDF({ commit }) {
      commit('SHOW_NOTIFICATION', { message: 'Génération du PDF...', type: 'info' })
      setTimeout(() => {
        commit('SHOW_NOTIFICATION', { message: 'PDF généré avec succès !', type: 'success' })
        setTimeout(() => commit('HIDE_NOTIFICATION'), 3000)
      }, 2000)
    },
    // ✅ Ajout de l'action manquante ici :
    addLine({ commit }, line) {
      commit('ADD_LINE', line)
    }
  },
  //-------------------------
  //-------------------------
  //-------------------------
  getters: {
    subtotal: state => {
      return state.lines.reduce((sum, line) => {
        // Vérifier que price et quantity sont définis et valides
        console.log("getters == line #### ", line)
        const price = isNaN(parseFloat(line.price)) ? 0 : parseFloat(line.price);
        const quantity = isNaN(parseInt(line.quantity)) ? 0 : parseInt(line.quantity);
        return sum + (price * quantity);
      }, 0);
    },
    tax: (_, getters) => {
      return getters.subtotal * 0.2;
    },
    total: (_, getters) => {
      return getters.subtotal + getters.tax;
    }
  }
})