<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="aff_head" class="jumbotron">
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

    <div v-show="aff_today" v-if="today.timings" class="row">
      <hr>
      <h2> <a @click.prevent="aff_today=!aff_today" href=""> Aujourd'hui </a></h2>
      <h3> Date le :  {{ today.date.readable }}  </h3> 
      <hr/>
      <div class="col"> 
          <h3> Imsak :
            <span class="badge bg-secondary">  {{ today.timings.Imsak }}  </span></h3> 
          <h3>Fajr : 
            <span class="badge bg-secondary"> {{ today.timings.Fajr }} </span> </h3> 
          <h3> Levée : 
            <span class="badge bg-secondary"> {{ today.timings.Sunrise }} </span></h3>
      </div>
      <div class="col"> 
          <h3>Duhr :
           <span class="badge bg-secondary"> {{ today.timings.Dhuhr }} </span> </h3> 
          <h3>Asr :
             <span class="badge bg-secondary"> {{ today.timings.Asr }} </span> </h3>

          <h3>Sunset : 
            <span class="badge bg-secondary"> {{ today.timings.Sunset }} </span> </h3>

          <h3>Maghrib :  
             <span class="badge bg-secondary"> {{ today.timings.Maghrib }} </span> </h3>
             
          <h3> Isha  : 
            <span class="badge bg-secondary"> {{ today.timings.Isha }} </span> </h3>

          <h3> Midnight : 
             <span class="badge bg-secondary"> {{ today.timings.Midnight }} </span> </h3> 
      </div>
    </div> 
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import {  mapActions, mapState, mapGetters } from "vuex"

export default {
  name : "HomePage",
  components: {
  },
  data(){
    return {
      ville : "",
      aff_head : false,
      aff_mois : false,
      aff_param : false,
      aff_today : true,
      searchBy : "",
      sortBy : "nom",
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
