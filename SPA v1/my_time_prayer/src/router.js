import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue";
import Settings from "./components/Settings.vue";
import TPMonth from "./views/TPMonth.vue";
import TAujourdhui from "./views/TAujourdhui.vue";


Vue.use(Router)

export default new Router({
    mode : "history",
    routes : [
        {
            name : "home", 
            path: "/",
            component : Home,
        },
        {
            name : "settings", 
            path: "/param",
            component : Settings,
        },
        {
            name : "tptoday", 
            path: "/today",
            component : TAujourdhui,
        },
        {
            name : "tpmonth", 
            path: "/tpmonth",
            component : TPMonth,
        },
        
    ]   

});