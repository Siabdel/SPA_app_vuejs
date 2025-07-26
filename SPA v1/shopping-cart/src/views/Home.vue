<template>
  <div class="jumbotron">
    <img alt="Vue logo" src="../assets/logo.png">
    <hr>
    <CartBookList msg="Welcome to Your Vue.js Book Store"/>
  </div>
</template>


<script>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import CartBookList from '../components/CartBookList.vue'

    import { mapActions } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {
        name: "HomePage",
        props : {
            msg:String,
        },
        components : {CartBookList, },
        data: () => ({
            contactes : [],
            searchBy : true,
        }),
        methods:{
        
         ...mapActions(['loadBooks']), 
         ...mapMutations(['setTermToSearch']), 
         // chercher une cle
         
    
        },
    
    }
</script>