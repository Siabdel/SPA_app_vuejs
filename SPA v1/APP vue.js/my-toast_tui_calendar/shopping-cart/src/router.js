import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home'
import BookList from './components/BookList'
import CartBookList from './components/CartBookList'
import CartDetails from './components/ProductDetails'

Vue.use(Router);

const router =  new Router({
    mode : 'history',
    routes : [
        {   'path': '/', 
            'name' : 'Home',
            'component'  : Home,
        },
        {   'path': '/books', 
            'name' : 'books',
            'component'  : BookList,
        },
        {   'path': '/books-card', 
            'name' : 'books-card',
            'component'  : CartBookList,
        },
        {   'path': '/book-details/:id', 
            'name' : 'book-details',
            'component'  : CartDetails,
        },

    ]
});

export default router;