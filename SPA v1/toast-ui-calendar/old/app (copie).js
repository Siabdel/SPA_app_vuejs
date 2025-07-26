// Définition d'un nouveau composant appelé `button-counter`
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">Vous m\'avez cliqué {{ count }} fois.</button>'
})

Vue.component('meteo', {
  props : {
    ville : {
      name : "",
      longitude : 0,
      latitude : 0,

    }
  },

  template : ` <div> 
    <legend> Meteo {{ new_ville }} <img v-bind:src="conditions.icon_big" />  </legend>
    <h5> {{ meteo.country }} </h5>
    <h5> latitude : {{ meteo.latitude }}  longitude : {{ meteo.longitude }} </h5>
    <h5> levée de soleil : {{ meteo.sunrise }} </h5>
    <h5> couché du soleil : {{ meteo.sunset }} </h5>
  </div>  `,

  data: function(){
    return 
  }
})


var App = new Vue({
 el : "#app",
 //component : [meteo],

 data : {
   titre : "Panie",
   operations : [],
   total : 0,
   success : true,


 },
 crossOrigin : true,
 created() {
   //Voici la description de l'API d'extraction de la documentation MDN
   //L'API Fetch fournit une interface JavaScript permettant d'accéder à des parties du pipeline HTTP, telles que les demandes et les réponses,
   // et de les manipuler. Il fournit également une méthode fetch () globale qui fournit un moyen simple et logique d'extraire des ressources
   // de manière asynchrone sur le réseau.
   //fetch("https://api.myjson.com/bins/74l63").then(response => response.json())
   fetch("http://127.0.0.1:8000/bank/api/").then(
     function (response) {
           return  response.json()
           console.log("api data  !!" + data )
         }
   ) .then( json => { this.operations = json.operations},
       console.log("api retour  !!" + this.operations )
   )
   .catch((err)=>console.error(err))

 },
 methods : {

   calculer_euro : function(event){
     //console.log("calculer total !!")
     let sum = 0
     this.operations.forEach( value => {
         sum += value.montant;
         console.log("calculer total euro !!" + event)
     });
     this.total = sum
     return sum
   }
 },

 computed: {

   total3 : function(event){
                 sum = this.operations.reduce((acc, cur) => acc + cur.montant, 0);
                 this.total = sum
                 return sum
               },


  },

})

//------------------


 var App = new Vue({
  el : "#app_c",
  data : {
    titre : "Operations transaction Bancaire",
    operations : [],
    total : 0

  },
  crossOrigin : true,
  created() {
    //Voici la description de l'API d'extraction de la documentation MDN
    //L'API Fetch fournit une interface JavaScript permettant d'accéder à des parties du pipeline HTTP, telles que les demandes et les réponses,
    // et de les manipuler. Il fournit également une méthode fetch () globale qui fournit un moyen simple et logique d'extraire des ressources
    // de manière asynchrone sur le réseau.
    //fetch("https://api.myjson.com/bins/74l63").then(response => response.json())
    fetch("http://127.0.0.1:8000/bank/api_categorie/").then(
      function (response) {
            return  response.json()
            console.log("api data  !!" + data )
          }
    ) .then( json => { this.operations = json.lignes},
        console.log("api retour  !!" + this.operations )
    )
    .catch((err)=>console.error(err))

  },

  methods : {
    calculer_euro : function(event){
      //console.log("calculer total !!")
      let sum = 0
      this.operations.forEach( value => {
          sum += value.montant;
          console.log("calculer total euro !!" + event)
      });
      this.total = sum
      return sum
    }
  },

  computed: {

    total3 : function(event){
                  sum = this.operations.reduce((acc, cur) => acc + cur.montant, 0);
                  this.total = sum
                  return sum
                },


   },

})
//------------------------------
//    APi Méteo           -----
//------------------------------

 Vue.component("meteo", {
    props : {
          ville : {
            name : "", 
            latitude : 0,
            longitude: 0,
            requierd : true
      }
    },

    tempplate :  
      ` <div> 
          <div class="col-md-12">
          <fieldset>
          <legend> Meteo {{ new_ville }} <img v-bind:src="conditions.icon_big" />  </legend>
          <h5> {{ meteo.country }} </h5>
          <h5> latitude : {{ meteo.latitude }}  longitude : {{ meteo.longitude }} </h5>
          <h5> levée de soleil : {{ meteo.sunrise }} </h5>
          <h5> couché du soleil : {{ meteo.sunset }} </h5>

      </div> `
    ,

    data(){
      return False
    }


 })

 var App = new Vue({
  el : "#app_m",
  data : {
    titre : "Meteo Vénissieux",
    meteo: {},
    conditions : {},
    ville : "Vénissieux",
    new_ville : "",
    latitude : 45.69, 
    longitude : 4.877,

    list_villes  : [{ "nom" : "Vénissieux", "latitude": 45.69, "longitude" : 4.877049},
     {"nom" : "Saint-Etienne", "latitude": "", "longitude" : ""}, 
     {"nom" : "Marrakech", "latitude": "", "longitude" : ""}, 
     {"nom" : "Casablanca","latitude": "", "longitude" : ""},
     {"nom" : "Tanger", "latitude": "", "longitude" : ""}, 
     {"nom" : "Amizmiz","latitude": "", "longitude" : ""}, 
     {"nom" : "Taza", "latitude": "", "longitude" : ""},
     {"nom" : "Tahla", "latitude": "", "longitude" : ""}
      ]

    },

  
  crossOrigin : true,
  created() {
    //fetch("https://api.myjson.com/bins/74l63").then(response => response.json())
    fetch("https://www.prevision-meteo.ch/services/json/lat=45.69lng=4.877049").then(
      function (response) {
            console.log("api data  !!" + response )
            return  response.json()

          }
    ) .then( json => { 
      this.meteo = json.city_info,
      this.conditions = json.current_condition

    },
        console.log("api retour  !!" + this.operations )
    )
    .catch((err)=>console.error(err))

  },


  watch : {
    new_ville : function(newValue){
        this.ville = newValue  
        this.latitude = this.list_villes[0].latitude
        this.longitude = this.list_villes[0].longitude
        console.log("computed ville  !!" + this.ville )

      },

   },

})

 