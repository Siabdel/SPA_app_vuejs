<template>
  <div class="container">
      <ul class="list-group list-group-horizontal list-inline text-bold">
        <li class="list-group_item">
          <router-link to="/"> Accueil</router-link>
        </li>
        <li class="list-group_item">
          <router-link to="/login">Login</router-link>
        </li>
        <li>
          <router-link to="/users/list">Liste des contactes</router-link>
        </li>
        <li class="list-group_item">
          <router-link to="http://51.178.136.190:93/apipro/directories/home/">API</router-link>
        </li>
      </ul>

      <router-view> </router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'App',

  // methods 
  methods :{
    ...mapActions(["fetchUsers", "test_action"])
  },
  // created
  created(){
    this.fetchUsers();
    console.log("fetchUsers = ... !!" )
  },
};
</script>