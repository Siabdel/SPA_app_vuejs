<template>
    <div class="container-fluid id=v-search">
        <div class="col-12">
            <div class="jumbotron__">
                <h2 class="dislay-4 text-white">Nos Services à domicile</h2>
                <CSearch />
            </div>
            <br><br>
        </div>
        <div class="col-12">
            <CService v-for="(article, index) in services" :key="index" :service="article"></CService>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import CService from "../components/CService.vue";
import CSearch from "../components/CSearch.vue"

export default({
  name: "VService",
  components : {CService, CSearch},
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
                }
        }
})

</script>