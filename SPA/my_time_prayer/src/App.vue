<template>
  <div class="container">
    <div class="row">
      <ul class="list-group list-group-horizontal" role="tablist">
        <li class="list-group-item">
          <router-link to="/"> Accueil</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/param">Settings</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/today">Aujourdhui</router-link>
        </li>
         <li class="list-group-item">
          <router-link to="/tpmonth">TP Monsuel</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="http://localhost:8000/api/v1/prayer_time/" >Prayer API</router-link>
        </li>
      </ul>
    </div>
      <div class="row">
        <router-view> </router-view> 
      </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import { mapActions, } from "vuex";

export default {
  name: 'App',

  // methods 
  methods :{
    ...mapActions(["fetchPrayerTime", ])
  },
  created(){
    this.fetchPrayerTime()
  }
};
</script>