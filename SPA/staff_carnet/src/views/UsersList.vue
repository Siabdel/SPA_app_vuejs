<template>
    <div>
        <h3> Users Liste</h3>
        <div  v-if="isLoading" class="spinner">
            <img src="" alt="">
            <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>

        <div v-else> 
            <table class="table table-striped table-bordered">
                <thead>
                    <th>Index</th><th>Nom</th> <th>Prenom</th> <th>Email</th>
                    <th>Phone</th> <th>age</th><th>Ville</th> <th>Action</th>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="index"> 
                        <td> {{ index }} </td> 
                        <td> {{ user.name.first }}</td> 
                        <td> {{ user.name.last}}</td> 
                        <td> {{ user.email }}</td> 
                        <td> {{ user.phone }}</td> 
                        <td> {{ user.dob.age}}</td>
                        <td> {{ user.location.city }}</td> 
                        <td>  <router-link 
                                :to="{'name': 'user', 'params': {'id' : user.login.uuid }}"> 
                                Show Contact</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { mapState} from "vuex" 

    export default {
        name : "UsersList",
        created(){
            console.log("Mon Contacte ici")
        },
        computed:{
            ...mapState([ 'isLoading', 'users'])
        },

    }



</script>