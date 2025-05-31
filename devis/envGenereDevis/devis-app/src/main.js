// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // ✅ Ce fichier vient d'être créé
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')