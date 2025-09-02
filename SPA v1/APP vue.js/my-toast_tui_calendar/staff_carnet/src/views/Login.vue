<template>
    
    <div class="container">
        <div class="row">
            <div class="col-md-4">

                <form action="#" class="form" @submit.prevent="onsubmit">
                    <div class="group-form">
                        <input class="form-control input-md" type="text" v-model="email" placeholder="adresse email" />
                    </div>
                    <div class="form-group">
                        <input class="form-control input-md" type="password" v-model="password" placeholder="mot de passe"/>
                    </div>
                    <div>
                        <button class="btn btn-success btn-lg btn-block">Login</button>
                    </div>
                </form>
            </div>
            <p> <router-link to='/'> Retour </router-link> </p>
        </div>
    </div>

</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
export default {
    name:'LoginPage',
    data : ()=>({
        email:null,
        password:null,
        error:false,
    }),

    methods :{
        onsubmit(){
            this.error = "";
        }
    },

}
</script>