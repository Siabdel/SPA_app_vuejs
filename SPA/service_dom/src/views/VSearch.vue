<template>
  <div class="container" 
        style="background-image:url('../images/green-background_007.jpg') ;">
    <br><br>
     <h2 class="display-2"> Service à domicile </h2>
     <hr>
    <div class="jumbotron">
        <CSearch msg="Container" > </CSearch>
        <CService > </CService>
    </div>
    <br><br>
    <h2> ... </h2>
  </div>
</template>
<!-- Importer le composant -->

<script>

import 'bootstrap/dist/css/bootstrap.min.css';
import CSearch from "../components/CSearch.vue";
import CService from "../components/CService.vue"

export default({
  name: "VSearch",
  components : {CSearch, CService },
  msg : "Welcome to my Earch",
})

</script>