<template>
  <div  class="container">
    <ul class="list-group list-group-horizontal list-inline text-bold"> 
         <li class="list-group-item"> <router-link to='/login'> Connexion </router-link></li>
         <li class="list-group-item"> <router-link to='/'> Home </router-link> </li>
         <li class="list-group-item"> <router-link to='/users'> Contactes </router-link> </li>
         <li class="list-group-item"> <router-link to='/calendar'> Calendar Meeting Selector</router-link> </li>
    </ul>

    <router-view> </router-view>

    <img alt="Vue logo" src="./assets/logo.png">
  </div>
</template>

<script>


import 'bootstrap/dist/css/bootstrap.min.css';
import { mapActions } from "vuex";

export default {
  name: 'App',
  methods : {
    ...mapActions(['loadUsers'])
  },
  
  created(){
    console.log("create APP.vue ...")
    this.loadUsers()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
