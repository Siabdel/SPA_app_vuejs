import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import VSearch from "./views/VSearch.vue";
import VHome from "./views/VHome.vue";
import VService from "./views/VService.vue";
import VFormulaireSoin from "./views/VFormulaireSoin.vue";
import VConfirmation from "./views/VConfirmation.vue"
import VListPro from "./views/VListPro.vue"
import CFichePro from './components/CFichePro.vue';
import CMeetingSelect from './components/CMeetingSelect.vue';


//Vue.config.productionTip = false
const routerHistory = createWebHistory()


const routes = [
    {
        name : "home", 
        path: "/home",
       component : VHome,
    },
    {
        name : "service",
        path: "/services",
        component : VService,
    },

    {
        name : "search", 
        path : "/search",
        component : VSearch

    },
    {
        name : "formulaire", 
        path : "/formulaire",
        component : VFormulaireSoin,

    },
    {
        name : "accueil", 
        path : "/",
        component : VFormulaireSoin,

    },
    {
        name : "confirmation", 
        path : "/confirmation",
        component : VConfirmation,

    },
    {
        name : "listpro", 
        path : "/listpro",
        component : VListPro,

    },
    {
        name : "fichepro", 
        path : "/fichepro",
        component : CFichePro,

    },
    {
        name : "meeting", 
        path : "/meeting",
        component : CMeetingSelect,

    },
]

// create routes
const router = createRouter({
  history: routerHistory,
  routes
}) 

// Create and mount the root instance.
//Avant version Vue.js 2
//const app = new Vue({ router, render : h => h(App) })
//app.mount('#app')
//en version vue.js 3
const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router).mount('#app');
// components 

app.component('CSearch  ', {
  // ... options ...
  
})


