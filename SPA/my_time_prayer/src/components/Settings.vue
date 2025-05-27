<template>
  <div class="container">
    <div v-show="aff_param" class="row">
      <div class="col">
        <h2> <a @click.prevent="aff_param=!aff_param" href=""> Settings </a></h2>
        <button class="btn btn-secondary" @click.prevent="aff_update=true; aff_param=false"> Modifier </button>
        <ul class="list-group">
          <li class="list-group-item"> Ville : {{ settings.city }} </li> 
          <li class="list-group-item"> Pays : {{ settings.country }} </li> 
          <li class="list-group-item"> Latitude : {{ settings.latitude }} </li> 
          <li class="list-group-item"> Longitude : {{ settings.longitude }} </li> 
          <li class="list-group-item"> Methode : {{ settings.method }} </li> 
          <li class="list-group-item"> Mois : {{ settings.month }} </li> 
          <li class="list-group-item"> Annee : {{ settings.year }} </li> 
        </ul>
      </div> 
      <div class="col">
        <h3>Liste des favories</h3>
        <ul class="display-6">
          <li v-for="(elem, index) in mes_favories.favories" :key="index"> 
            <a href=""> {{ elem.param.ville }} </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-show="aff_update" class="row">
      <div class="card col-6"> 
        <div class="mb5">
          <form action="" @submit.prevent="get_geocod">
            <label for="ville" class="form-label"> Ville </label>
            <input class="form-control" v-model="ville" type="text" required>
            <label for="methodes" class="form-label">Methodes de calcul</label>
            
            <div class="card-footer">
              <input class="btn btn-warning btn-lg" type="submit" value="Cherchez">
            </div>
          </form> 
        </div> 
      </div>
      <div class="col card" v-if="geocods.codes">
        <div class="row">
          <h3> Info Geocode de la ville </h3> 
          <ul class="list-group" >
            <li class="list-group-item" v-for="(item, ind) in geocods.codes" :key="ind">
              <ul>
                <li class="list-group-item"> ville : {{ item.name }} </li> 
                <li class="list-group-item"> pays : {{ item.country }} </li> 
                <li class="list-group-item"> population : {{ item.population }} </li> 
                <li class="list-group-item"> longitude : {{ item.longitude }} </li> 
                <li class="list-group-item"> latitude : {{ item.latitude }} </li> 
              </ul>
            </li>
          </ul>
        </div>
        <div> 
          <h3>Methodes de calcul : </h3>  {{ method_selected }}
          <form action="" class="form-inline mb3" @submit.prevent="save_param">
            <select v-model="method_selected" class="form-select" >
              <option selected disabled > Choisir Metode de calcul</option> 
              <option class="mb3" 
                v-for="(methode, index) in methodes" 
                :key="index" 
                :value="methode" >{{ methode }}
              </option>
            </select>
            <div class="card-footer">
              <input type="submit" class="btn btn-warning btn-lg" value="Sauvegardez" />
            </div>
          </form>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import {  mapActions, mapState, mapGetters } from "vuex"

const methodes_calcul = {
        0 : "Shia Ithna-Ansari",
        1 : "University of Islamic Sciences, Karachi",
        2 : "Islamic Society of North America",
        3 : "Muslim World League",
        4 : "Umm Al-Qura University, Makkah",
        5 : "Egyptian General Authority of Survey:",
        12 : "Union Organization islamic de France",
        15 : "Moonsighting Committee Worldwide (also requires shafaq paramteer)",
        99 : "Custom. See https://aladhan.com/calculation-methods"
      }

export default {
  name: 'settings_prayer',
  data(){
    return {
      ville : "",
      method_selected: "",
      methodes : methodes_calcul,
      aff_param : true,
      aff_update : false,
      saved: false,
    }
  },
  methods :{
    ...mapActions(["fetch_geocod", "fetch_favories", "axios_save"]),
    ...mapGetters(['get_favories', ]),
    // get api geocode 
    get_geocod(){
      this.fetch_geocod(this.ville)
      console.log("json geocod =" + this.geocods)
    },
    save_param(event){
      //let form = JSON.stringify(event.target)
      console.log("event.target = " + event.target)
      let data = {
                  'method_selected': this.method_selected,
                  'geocods' : this.geocods.codes[0]
                }
      //let form = JSON.stringify(data)
      //init screen
      this.init_aff()
      return this.axios_save(data)
    },
    // init aff
    init_aff(){
      this.aff_param = true
      this.aff_update = false
    }
  },
  //computed 
  computed:{
    ...mapState(["tprayers", "settings", "message", "today", "geocods"]),
    // mes favories
    mes_favories(){
      return this.get_favories()

    }
  },
  // mounted
  mounted(){ 
    this.init_aff()
    this.fetch_favories()
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
