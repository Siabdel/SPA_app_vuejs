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

    <div class="row">
      <h2> <a @click.prevent="aff_mois=!aff_mois" href=""> heure de prières du mois </a></h2>
      <div v-show="aff_mois"> 
        <TimePrayer :timeprs="tprayers" :afficher="(searchBy)?true:false"/>
      </div>
    </div>
    
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import TimePrayer from "../components/TimePrayer.vue";
import { mapState, mapGetters } from "vuex"

export default {
  name : "TimePrayerMonth",
  components: {
    TimePrayer,
    
  },
  data(){
    return {
      ville : "",
      aff_head : false,
      aff_mois : true,
      aff_param : false,
      aff_today : false,
      searchBy : "",
      sortBy : "nom",
    }
  },

  methods: {
    // map users
    ...mapGetters(["getSettings", "getToday"]),
    // get api geocode 
  },
  //computed 
  computed:{
    ...mapState(["tprayers", "settings", "message", "today", "geocods"]) 
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
