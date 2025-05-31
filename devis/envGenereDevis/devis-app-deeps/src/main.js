// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'

// ✅ Importation de Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css'
// ✅ Importation de Bootstrap JS (optionnel)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')