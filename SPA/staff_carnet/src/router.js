import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home'
import Login from './views/Login'
import UsersList from './views/UsersList'
import UserDetails from './views/UserDetails'
import VueMeetingSelector from './views/VueMeetingSelector2'

Vue.use(Router);

const router =  new Router({
    mode : 'history',
    routes : [
        {   'path': '/', 
            'name' : 'Home',
            'component'  : Home,
        },
        {   'path': '/login', 
            'name' : 'Login',
            'component'  : Login,
        },
        {   'path': '/users', 
            'name' : 'Users',
            'component'  : UsersList,
        },
        {   
            'name' : 'user',
            'path': "/user/:id", 
            'component'  : UserDetails,
        },
        {   
            'name' : 'Calendar',
            'path': "/calendar", 
            'component'  : VueMeetingSelector,
        },

    ]
});

export default router;