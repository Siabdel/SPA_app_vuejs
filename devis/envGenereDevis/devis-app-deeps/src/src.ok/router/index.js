import { createRouter, createWebHistory } from 'vue-router'
import QuoteEditor from '../views/QuoteEditor.vue'

const routes = [
  { path: '/', component: QuoteEditor }
]

export default createRouter({
  history: createWebHistory(),
  routes
})