<template>
    <div class="container-fluid">
        <h3>Saisir vos coordonnées</h3>
        <form @submit.prevent="form_validate" role="form">
            <span class="text-bold text-warning"> <h2> {{ error_msg }} </h2></span>
            <div class="form-check form-inline">
                <label class="form-check-label col-1" for="flexRadioChecked"> Femme </label>
                <input class="form-check-input p-3" type="radio" name="flexRadio" id="flexRadio" >
                <input class="form-check-input" type="radio" name="flexRadio" id="flexRadioChecked" checked >
                <label class="form-check-label col-1" for="flexRadio"> Homme </label>
            </div>
            
            <div class="form-group form-inline">
                {{ errors }}
                <label for="nom-prenom" class="col-1"> <i class="fa fa-user"></i></label>
                <span>
                    <input v-model="contacte.prenom" class="form-control-lg" placeholder="Prenom" >
                    <input v-model="contacte.nom" class="form-control-lg" placeholder="nom" >
                </span>
            </div>
            <div class="form-group form-inline">
                {{ errors }}
                <label for="email" class="col-1"> <i class="fa fa-envelope"></i> </label>
                <span>
                    <input type="email" v-model="contacte.email" class="form-control-lg" placeholder="votre email" >
                    <input type="phone" v-model="contacte.phone" class="form-control-lg" placeholder="votre téléphone" >
                </span>
            </div>
            
            <div class="form-group form-inline">
                {{ errors }}
                <label for="address" class="col-1"> <i class="fa fa-address-card"></i></label>
                <span>
                    <input v-model="contacte.adresse" class="form-control-lg" placeholder="votre adresse" >
                </span>
            </div>
            
            <div class="form-group form-inline">
                {{ errors }}
                <label for="address" class="col-1"> <i class="fa fa-address-card"></i></label>
                <span>
                    <input v-model="contacte.ville" class="form-control-lg" placeholder="La ville" >
                    <input v-model="contacte.cp" class="form-control-lg" placeholder="votre code postal" >
                </span>
            </div>

            <div class="form-group form-inline">
                {{ errors }}
                <label for="type-soins" class="col-1"> <i class="fa fa-shopping-cart"></i></label>
                <select v-model="contacte.selected" class="form-control-lg col-8">
                    <option  value=null>Merci de selectionner votre type soins</option>
                    <option default>Soins courants : injections, pansements,</option>
                    <option>Soins spécifiques : utilisation de cathéters pour les prélèvements et les injections,</option>
                    <option>Soins infirmiers à domicile : suivi, mise en place d’un soutien et soins personnalisés</option>
                </select>
                <span v-if="selected">Selected: {{ selected }}</span>
            </div>
            <div class="form-group col-6">
                <button type="submit"  class="btn btn-warning btn-block btn-lg mb-3">Envoyé votre demande</button>
            </div>

        </form>
    </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.min.css';
export default({
    name : "FormulaireSoin",
    data(){
        return{
            msg:null,
            selected : null,
            errors : "..",
            error_msg : null,
            contacte :{
                nom : "",
                email : "",
                phone : "",
                cp : "",
                adresse : "",
                ville : "",
                type_soins : "",
            },
        }
    },
    methods: {
        form_validate(){
            
            this.error_msg = ""
            console.log("validation form ...")

            if(this.contacte.nom == ""){
                this.error_msg = "Veuillez saisir votre nom !" 
                window.location.href = '#top'
                return false
            }
            else if(this.contacte.prenom == ""){
                this.error_msg = "Veuillez saisir votre prenom !"
                return false
            }
            else if(this.contacte.email == ""){
                this.error_msg = "Veuillez saisir votre email !"
                return false
            }
            else if(this.contacte.phone == ""){
                this.error_msg = "Veuillez saisir votre téléphone !"
                return false
            }
            else if(this.contacte.adresse == ""){
                this.error_msg = "Veuillez saisir votre adresse !"
                return false
            }
            else if(this.contacte.ville == ""){
                this.error_msg = "Veuillez saisir votre ville !"
                return false
            }
            else if(this.contacte.cp == ""){
                this.error_msg = "Veuillez saisir votre code postal !"
                return false 
                
            }
            window.location.href = '/confirmation'

        }
    },
})

</script>