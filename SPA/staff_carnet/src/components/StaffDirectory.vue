<template>
    <div class="container"> <h1> {{ message }}</h1> 
        <div v-show="afficher" class="row">
            <div class="col-md">
                <h3> Filters</h3>
                <ul class="list-group"  >
                    <li class="list-group-items"> <a href="#" > Contacle Lyonnais </a>
                    </li>
                </ul>
            </div>
            <div class="col-md">
                <h3> {{ message }} {{ contactes }} contactes</h3>
                <hr>
                <div class="container nice">
                    <table class="table table-striped table-bordered">
                        <thead class="bg-secondary">
                            <th> Titre</th>
                            <th > <a @click="sortBy='prenom'"> prénom </a> </th>
                            <th  @click="sortBy='nom'">nom</th>
                            <th  @click="sortBy='email'">email</th>
                            <th  @click="sortBy='telephone'">telephone</th>
                            <th  @click="sortBy='ville'">Ville</th>
                            <th  @click="sortBy='pays'">Pays</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            <tr v-for="(contacte, index) in contactes "  v-bind:key="index" >
                                <td v-if="contacte.title==='male'"> Mr</td>
                                <td v-else-if="contacte.title==='female'"> Mme</td>
                                <td v-else> __ </td>
                                <td>{{contacte.prenom}}</td>
                                <td>{{contacte.nom}}</td>
                                <td>{{ contacte.email}}</td>
                                <td>{{ contacte.telephone}}</td>
                                <td>{{ contacte.ville}}</td>
                                <td>{{ contacte.pays}}</td>
                                <td>
                                    <span class="btn btn-warning">
                                        <!-- <router-link :to="'/user/' + contacte.id"> Show</router-link> -->
                                        <router-link 
                                            :to="{
                                                name : 'user' , 
                                                params: {userId:contacte} 
                                                }"> 
                                            Show</router-link>
                                    </span>
                                </td>
                            </tr>
                        </tbody>

                        <tfoot>
                        <tr>
                            <span>
                            <button class='btn-warning btn-sm' >Précedent</button>
                            <button class='btn-warning btn-sm' >Suivant</button>
                            </span>
                        </tr>

                        </tfoot>
                    </table>
                </div>
            </div>
        </div>  
    </div>  
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
//import moment from 'moment';
export default({
    name : "StaffDirectory",
    props : {
       contactes : {
           type : Array,
       },
       afficher : {
           default:false,
           type: Boolean,
       }
    },
    data(){
        return {
            message : "Bienvenue a mon Canet adresse  !! ",
        }
    }
})

</script>