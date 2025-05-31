
import { createRouter, createWebHistory } from 'vue-router'
import QuoteEditor from '../views/QuoteEditor.vue'

const routes = [
  {
    path: '/',
    name: 'QuoteEditor',
    component: QuoteEditor
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router