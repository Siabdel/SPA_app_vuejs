<template>  
  <div class="container-fluid">
    <div class="row">
        <div v-show="show_left_menu" class="col-lg-1">
          <h2 class="text-bold"> Services a domicile de proximite </h2>
          <ul class="list-group list-group">
          <li class="list-group-item">
            <router-link :to="{name:'home'}"    class="list-group-item active">Accueil</router-link>
          </li> 
          <li class="list-group-item">
            <router-link :to="{name:'home'}"    class="list-group-item">Home</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="{name:'service'}" class="list-group-item">Services à domicile</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="{name:'search'}"  class="list-group-item">Trouver votre service</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="{name:'formulaire'}"  class="list-group-item">Formulaire</router-link>
          </li>
          </ul>
        </div>
        <div class="col-lg-11"> 
          <!-- routeur -->
          <router-view></router-view>
        </div>
    </div>
  </div>
  
</template>

<script>

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
export default( {
  name: 'App',
  data(){
    return{ 
      msg : "Ici APP",
      show_left_menu : false,
      image: './assets/images/green-background_007.jpg',
      setIsLoading:false,
    }
  },
  methods: {
    loadData(){
      let d_start = "20221125"
      let url = `http://localhost:8000/api/v1/dispos/` + d_start
      //let url = 'http://atlass.fr:93/apipro/directories/'

      this.setIsLoading=true
      // fetch 
      let  headers = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, ",
          //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
          "Access-Control-Allow-Credentials" : "true",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      }
      console.log(headers)
      //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      return axios 
        .get(url)
        .then(res => {
              this.dispos = res.data
            console.log("  data loaded ..." + res.length)
        })
        .catch(error => {
            console.log("Erreur loading data from " + error)
                this.setIsLoading=false
            }
        )
        },       
    },
  // load data
  created(){
    this.loadData()
  }
})
</script>

<style scope>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
