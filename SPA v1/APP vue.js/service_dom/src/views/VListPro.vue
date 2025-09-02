<template>
    <div class="container-fluid">
        <div class="col-12">
            <div class="jumbotron">
                <h2>Services à domicile</h2>
                <CSearch />
            </div>
            <br><br>
        </div>
        <div class="card card-top">
            <ul class="list-group">
                <li v-for="(partenaire, index) in partenaires" :key=index class="list-group-item"> 
                    <a href="#" class="list-group-item">
                    <!-- image 
                    <span class="col-2">
                        <img class="rounded-circle rounded-3 my-5" 
                        src="../assets/menage-logo-001.jpeg" height="150"  >
                    </span>
                     fin iamage -->
                    <span class="col-2">
                        <h4 id="list-group-item-heading" class="list-group-item-heading"> {{ partenaire }}  </h4>
                        <p class="list-group-item-text">I don't think we're alike at all, Mr. White. You're not a cautious man at all. Your partner was late. And he was high.</p>
                    </span>
                    <span>
                        <a href="/fichepro" class="btn btn-warning"> Voir la fiche </a>
                    </span>
                    </a>

                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import CSearch from "../components/CSearch.vue"

export default({
  name: "VService",
  components : {CSearch},
  data(){
    return {
            msg : "Welcome to my Home",
            services : [
                {"name": "Service Coiffure à domicile", "photo":"service-coiffure.jpg",
                    "style":"background-image:url('../images/service-coiffure.jpg'); text-white; background-size: 200px 250px;",
                }, 
                {"name":"Service Infirmier a domicile", "photo":"service-infirmiers_004.jpg",
                    "style":"background-image:url('images/service-infirmiers_004.jpg'); text-white; background-size: 200px 250px;",
                }, 
                {"name":"Service Menage à domicile", "photo":"images/service-menage_004.jpg",
                    "style":"background-image:url('images/service-menage_004.jpg'); background-size: 200px 250px;",
                },
                {"name":"Service Repassage à domicile", "photo":"service-repassage_002.jpeg", 
                                    "style":"background-image:url('images/service-repassage_002.jpeg'); background-size: 200px 250px;",
                }, 
                {"name":"Service Repas à domicile", "photo":"service-repas-domicile_002.jpg",
                    "style":"background-image:url('images/service-repas-domicile_002.jpg'); background-size: 200px 250px;",
                },
                {"name":"Accompagner en voiture pour les sorties", "photo":"vehicule_taxi.jpeg",
                    "style":"background-image:url('images/vehicule_taxi.jpeg'); background-size: 200px 250px;",
                }, 
                ],
            partenaires : [
                "EK expert 4,0 (122) · Salon de coiffure 144 av des freres lumiere · 04 78 73 22 12",
                "LOFT 347 Coiffure Lyon7 Adresse : 26 Quai Claude Bernard, 69007 Lyon Ouvert ⋅ Ferme à 20:00 ",
                "EK expert 4,0 (122) · Salon de coiffure 144 av des freres lumiere · 04 78 73 22 12",
                "EK expert 4,0 (122) · Salon de coiffure 144 av des freres lumiere · 04 78 73 22 12",
                "EK expert 4,0 (122) · Salon de coiffure 144 av des freres lumiere · 04 78 73 22 12",
                "EK expert 4,0 (122) · Salon de coiffure 144 av des freres lumiere · 04 78 73 22 12",
                "EK expert 4,0 (122) · Salon de coiffure 144 av des freres lumiere · 04 78 73 22 12",
             ] }
        }
})

</script>