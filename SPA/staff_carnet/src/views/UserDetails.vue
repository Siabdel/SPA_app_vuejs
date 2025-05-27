<template>
    <div class="container">
        <div class="card" style="width: 25rem;">
            <div class="card-header">
                <img class="card-img-top" :src="selectedUser.picture.large">
            </div>
            <div class="card-body">
                <h2 class="card-title"> {{ fullname }} </h2>
                <p class="card-text">
                    Adresse :
                        {{ selectedUser.location.street.name }},
                </p> 
                <p class="card-text">
                    ville :
                        {{ selectedUser.location.city }},
                        {{ selectedUser.location.state }},
                        {{ selectedUser.location.postcode }}
                </p>
                <p class="card-text">
                    Email : {{ selectedUser.email }}
                </p>
            </div>
            <div class="card-footer">
                <p> Action </p>
                    
                <ul class="list-group list-group-horizontal-lg">
                    <li class="list-group-item"><a href="#"><span class="icon-wrench"></span> Modify</a></li>
                    <li class="list-group-item"><a href="#"><span class="icon-trash"></span> Delete</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import { mapGetters, mapMutations } from 'vuex';


export default{
    name : 'UserDetails',
    data(){
        return {
            message : "on est au details !!"
        }
    },
    computed:{
        ...mapGetters(["selectedUser"]),

        fullname(){
            return `${this.selectedUser.name.first} ${this.selectedUser.name.last}`  
        } 
    },
    methods:{
        ...mapMutations(["setSelectedUser"])
    },

    created(){
        const userId = this.$route.params.id
        this.setSelectedUser(userId)

        //console.log(" set selectedUser = " + userId)
    }


}

</script>