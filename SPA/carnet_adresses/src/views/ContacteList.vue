
<template>
  <div id="container">

    <h3> Liste des contactes ** </h3>

    <hr/>

    <img alt="Vue logo" src="../assets/logo.png">
    <SearchBox @searchKey="include_contactes" />

    <CarnetAdresse :contactes="reload_contactes" :afficher="true" />
  </div>
</template>

<script>
import CarnetAdresse from "../components/CarnetAdresse.vue";
import SearchBox  from "../components/SearchBox.vue";
import { mapGetters } from "vuex";
export default {
  name: 'App',
  components: {
    CarnetAdresse,
    SearchBox,
  },
  data(){
    return {
      adresses : [],
      searchBy : "",
      sortBy : "nom",
    }
  },
  created(){
    this.adresses = this.getUsers()
  } 
  ,
  methods: {
    //map 
    ...mapGetters(['getUsers', ]),
    include_contactes(search){
      // expression reguliere dans vuejs
      const url = 'https://google.com/foo/bar';
      const regex = /^(https.+)\/.*$/ig;
      const matches = regex.exec(url);
      console.log( "matches = " + matches[1]) ;/* 1 = group index */
      //console.log("terms search !!! = " + search)
      this.searchBy = search.toLowerCase()
      //return this.adresses.filter(contacte => contacte.nom.includes(search))
      return this.adresses
    },
    compare(a, b) {
      if (a.nom < b.nom)
        return -1;
      if (a.nom > b.nom)
        return 1;
      return 0;
    }
  },
  computed : 
  {
    reload_contactes(){
      if(this.searchBy){
        return this.adresses.filter(contacte => contacte.nom.toLowerCase().includes(this.searchBy)).sort(this.compare)
      }else {
        return this.adresses
        .filter( a => a.nom.includes("a"))
        .sort( (a,b) => a[this.sortBy].localeCompare(b[this.sortBy]));
      }
    }
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
}
</style>
