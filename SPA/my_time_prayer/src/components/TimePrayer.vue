<template>                                                                                                                              
    <div class="container-fluid"> 
            <h3> {{ message }} </h3>
            <table class="table table-striped table-bordered">
                <thead class="bg-secondary">
                    <th > Jour </th>
                    <th > <a @click="sortBy='prenom'">Fajr</a> </th>
                    <th  @click="sortBy='nom'">Sunrise</th>
                    <th  @click="sortBy='email'"> Dhur</th>
                    <th  @click="sortBy='telephone'">Asr</th>
                    <th  @click="sortBy='ville'">Sunset</th>
                    <th  @click="sortBy='pays'">Maghrib</th>
                    <th  @click="sortBy='pays'">Isha</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr v-for="(tmprayer, index) in timeprs "  v-bind:key="index" >
                        <td> {{ index + 1}} </td>
                        <td>{{tmprayer.timings.Fajr}}</td>
                        <td>{{tmprayer.timings.Sunrise}}</td>
                        <td>{{tmprayer.timings.Dhuhr}}</td>
                        <td>{{ tmprayer.timings.Asr}}</td>
                        <td>{{ tmprayer.timings.Sunset}}</td>
                        <td>{{ tmprayer.timings.Maghrib}}</td>
                        <td>{{ tmprayer.timings.Isha}}</td>
                        <td>
                         <span class="btn btn-warning">
                            <!-- <router-link :to="'/home/' + tmprayer.id"> Show</router-link> -->
                            <router-link 
                                :to="{
                                    name : 'home' , 
                                    params: {userId:tmprayer} 
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
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';

export default({
    name : "TimePrayer",
    props : {
       timeprs : {
           type : Array,
       },
       afficher : {
           default:false,
           type: Boolean,
       }
    },
    data(){
        return {
            message : "Bienvenue a mon Time Prayer Calendar!! ",
        }
    },

    filters: {
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      },
      arrondi(value, number) {
        return parseFloat(value.toFixed(number))
      },
      formatDate(value) {
        if (value) {
          return moment(String(value)).format('DD/MM/YYYY HH:mm')
        }
      },
      reverse(value) {
        return value.split('').reverse().join('')
      },
    },

})
</script>

<style>

.table th {
   text-align: center; 
   background-color :bisque;
   font-size: 18px;
};

.jumbotron {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: .3rem;
}

</style>