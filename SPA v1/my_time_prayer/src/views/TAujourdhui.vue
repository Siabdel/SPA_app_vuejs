<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="!aff_head" class="jumbotron">
      <h3 class="display-4"> Heures de prières de la ville de {{ settings.city }} </h3>
      <h3> pour le mois {{ settings.month }} </h3>
      <h3 v-if="today.date.gregorian" class="nice"> Gregory Date le : {{ today.date.gregorian.date }} </h3> 
      <h3 class="nice"> HIJRI Date le : {{ today.date.hijri.date }} </h3> 
      <h3 class="nice"> HIJRI Date le : 
        {{ today.date.hijri.weekday.ar }} 
        {{ today.date.hijri.day }}  
        {{ today.date.hijri.month.ar }} 
        {{ today.date.hijri.year }} </h3> 
    </div>

    <div class="row">
      <h2> <a @click.prevent="aff_today=!aff_today" href=""> Aujourd'hui </a></h2>
      <ul v-show="aff_today" v-if="today.timings" class="list-group">
        <li class="list-group-item"> <strong class="mb3"> Date le :</strong>  {{ today.date.readable }} </li> 
        <li class="list-group-item"> <strong>Fajr : </strong> {{ today.timings.Fajr }} </li> 
        <li class="list-group-item"> <strong> Levée :</strong> {{ today.timings.Sunrise }} </li> 
        <li class="list-group-item"> <strong>Duhr :</strong>  {{ today.timings.Dhuhr }} </li> 
        <li class="list-group-item"> <strong>Asr :</strong> {{ today.timings.Asr }} </li> 
        <li class="list-group-item"> <strong>Sunset :</strong> {{ today.timings.Sunset }} </li> 
        <li class="list-group-item"> <strong>Maghrib :</strong>  {{ today.timings.Maghrib }} </li> 
        <li class="list-group-item"> <strong> Isha  :</strong> {{ today.timings.Isha }} </li> 
        <li class="list-group-item"> <strong> Imsak :</strong> {{ today.timings.Imsak }} </li> 
        <li class="list-group-item"> <strong> Midnight : </strong> {{ today.timings.Midnight }} </li> 
      </ul>
    </div> 
  
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import {  mapActions, mapState, mapGetters } from "vuex"

export default {
  name : "TimeToday",
  components: {
  },
  data(){
    return {
      ville : "",
      aff_head : false,
      aff_today : false,
    }
  },

  methods: {
    // map users
    ...mapActions(["fetch_geocod",]),
    ...mapGetters(["getSettings", "getToday"]),
    // get api geocode 
  },
  //computed 
  computed:{
    ...mapState(["tprayers", "settings", "message", "today", "geocods"]) 
  },
  //mounted 
  mounted(){
    console.log("fetchPrayerTime : today =" + this.today )
    //console.log("fetchPrayerTime : settings = " + this.settings )
    //console.log("fetchPrayerTime : ... !!" + this.tprayers )
  },
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
};

.jumbotron {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: .3rem;
}
</style>
