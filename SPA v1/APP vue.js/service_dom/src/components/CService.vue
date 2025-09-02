<template>
    <div class="col-3">
        <div class="card" v-if="service">
            <div class="card-head" >
                <h3 class="badge badge-primary display-3 text-uppercase font-weight-bold"> {{ service.name }} </h3> 
            </div>
            <div class="card-body">
                <p class='jumbotron text-lg-right' :style=service.style> {{ service.name }}</p>
            </div>
            <div class="card-footer">
                <p>
                    <a @click.prevent="liste_pro" class="btn btn-warning"> Chercher</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

export default({
    name: 'CService',
    props :{
        service : {},
    },
    data(){
        return {
            msg :'',
        }
    },
    methods:{
        list_pro(){
            console.log("liste pro ..." )
            window.location.href = '/listpro'
        }
    },

})
</script>
