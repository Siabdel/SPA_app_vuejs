
<template>
    <div class="container-fluid"  
        style="background-image:url('../images/green-background_006.jpg') ;">
        <br><br>
        <form  @submit.prevent="rechercher" class="form-inline">
            <div class="row col-12">
                <div class="form-group-lg col-lg-3">
                    {{ errors }}
                    <select v-model="specialite" class="form-control form-control-lg" >
                        <option class="text-bold" v-for="(option, ind) in options_service" 
                            :value="option.value" :key=ind> 
                                {{ option.text }} 
                        </option>
                    </select>
                </div>
                <div class="form-group-lg col-lg-3 input-group text-large">
                    {{ errors }}
                    <input v-model="ville" class="form-control-lg" placeholder="Oû">
                </div>

                <div class="form-group col-lg-3">
                    <input type="submit"  value='Rechercher' class="btn btn-warning btn-lg btn-block text-large" />
                </div>
            </div>
        </form>
        <br><br> <hr>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import "bootstrap"
    require("@/assets/green-background_007.jpg")
    export default({
        name :'CSearch',
        data(){
            return{
                msg:" Component CSearch",
                specialite : "",
                ville : "",
                options_soins: [
                    { text :"Nom, Specialté, Etablissement", value:""}, 
                    { text : "Merci de selectionner votre type soins", value:'A'},
                    { text: "Soins courants : injections, pansements" , value:'B'},
                    { text : "spécifiques : utilisation de cathéters pour les prélèvements et les injections", value:'C'},
                    { text : "Soins infirmiers à domicile : suivi, mise en place d’un soutien et soins personnalisés", value:'D'},

                ],
                options_service :[
                    { text :"Nom, Services             ..", value:""}, 
                    { text :"Services de coiffure", value:"A"}, 
                    { text :"Services de ménage a domicile", value:"B"}, 
                    { text :"Services de repas a domicile", value:"C"}, 

                ],
            }
        },
        methods: {
            rechercher(){
                console.log(" rechercher ...")
                window.location.href = '/listpro'
            }
        },

    })
</script>