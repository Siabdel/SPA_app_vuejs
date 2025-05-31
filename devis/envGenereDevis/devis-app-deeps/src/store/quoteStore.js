import { defineStore } from 'pinia'

export const useQuoteStore = defineStore('quote', {
  state: () => ({
    quotes: [],
    products: [],
    clients: [],
    currentTheme: localStorage.getItem('quoteTheme') || 'blue',
  }),
  //---------
  //---------
  //---------
  actions: {
    async fetchProducts() {
      await new Promise(resolve => setTimeout(resolve, 500))
      this.products = [
        { id: 1, name: 'Site web vitrine', price: 1200, taxRate: 20 },
        { id: 2, name: 'Site e-commerce', price: 3500, taxRate: 20 },
        { id: 3, name: 'Maintenance mensuelle', price: 300, taxRate: 20 },
        { id: 4, name: 'Formation CMS', price: 500, taxRate: 10 },
        { id: 5, name: 'Hébergement annuel', price: 250, taxRate: 20 },
      ]
    },
  //---------
  //---------
  //---------
    async fetchClients() {
      await new Promise(resolve => setTimeout(resolve, 500))
      this.clients = [
        { id: 1, name: 'Client A', email: 'client.a@example.com' },
        { id: 2, name: 'Client B', email: 'client.b@example.com' },
        { id: 3, name: 'Client C', email: 'client.c@example.com' },
      ]
    },
  //---------
  //---------
  //---------
    saveQuote(quote) {
      if (!quote.id) quote.id = Date.now()
      const index = this.quotes.findIndex(q => q.id === quote.id)
      if (index >= 0) this.quotes[index] = quote
      else this.quotes.push(quote)
      return quote
    },
  //---------
  //---------
  //---------
    setTheme(theme) {
      this.currentTheme = theme
      localStorage.setItem('quoteTheme', theme)
    }
  }
})