import Vue from "vue"
import Router from "vue-router"
import Login from "./views/Login.vue";
import ContacteList from "./views/ContacteList.vue";
import ContacteDetails from "./views/ContacteDetails.vue";
import Home from "./views/Home.vue";
import authAPI from "./auth.js";


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
        name : "login",
        path: "/login",
        component : Login,
    },

    {
        name : "user_list", 
        path : "/users/list",
        component : ContacteList,

    },

    {
        name : "user",
        path : "/user/:userId",
        component : ContacteDetails,
        beforeEnter : (to, from, next) => {
            if( authAPI.isAuthentificated === false){
                next('/login')
            }else{
                next()
            }
        } 
    },
]
});