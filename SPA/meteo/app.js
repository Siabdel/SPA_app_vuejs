// Définition d'un nouveau composant appelé `button-counter`
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">Vous m\'avez cliqué {{ count }} fois.</button>'
})

//------------------------------
//    APi Méteo           -----
//------------------------------

Vue.component('meteo', {
  template : "#id_template",

  conditions : {},
  operations : "toto ....",
  props : {
      ville : Object,
      index : Number,
  },


  data: function(){
    return {
      valide : false,
      meteo_data : {},
      conditions : {},
      lat : this.ville.latitude
    }
  },


  created() {
    console.log("created  !!" + this.ville.latitude )
    //fetch("https://api.myjson.com/bins/74l63").then(response => response.json())
    var url = "https://www.prevision-meteo.ch/services/json/lat=xxxlng=yyy".replace('xxx',this.ville.latitude )
    fetch(url.replace('yyy',this.ville.longitude )).then(
      function (response) {
            console.log("api data  !!" + response )
            return  response.json()

          }
    ).then( json => {
      this.meteo_data = json.city_info
      this.conditions = json.current_condition
      console.log("api conditions  !!" + this.meteo_data.sunrise)

    },
        console.log("api retour  !!" + this.operations )
    )
    .catch((err)=>console.error(err))

  },


})


//------------------------------
//    APi Méteo           -----
//------------------------------


 var App = new Vue({
  el : "#app",
  component : ["meteo", 'button-counter'],

  data : {
    titre : "Meteo Vénissieux",
    ville : "Vénissieux",
    list_villes  : [{ "nom" : "Vénissieux", "latitude": 45.69, "longitude" : 4.877049},
     {"nom" : "Saint-Etienne", "latitude": 45.439695, "longitude" : 4.3871779},
     {"nom" : "Marrakech", "latitude": 31.562808, "longitude" : -7.959286},
      ]

    },


  crossOrigin : true,

  watch : {
    new_ville : function(newValue){
        this.ville = newValue
        this.latitude = this.list_villes[0].latitude
        this.longitude = this.list_villes[0].longitude
        console.log("computed ville  !!" + this.ville )

      },

   },

})
