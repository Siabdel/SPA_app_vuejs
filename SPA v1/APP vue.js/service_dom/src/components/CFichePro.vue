<template>
   <!--Main layout-->
  <div class="container-fluid"
        style="background-image:url(../images/coiffeur-tools-background.jpg) ;">
      <!--Grid row-->
      <div class="row wow">
        <!--Grid column-->
        <div class="col-lg-5 offset-1 mb-4">
          <!--Content-->
          <h1 class="p-2 bg-warning text-white"> Jenny et Paola Salon</h1>
          <img class="rounded float-left p-4" 
            :src="`${publicPath}images/salon_coiffure_003.jpeg`" />

            <div class="mb-3">
              <a href="">
                <span class="badge purple mr-1">Category Coiffeur</span>
              </a>
              <a href="">
                <span class="badge blue mr-1">New</span>
              </a>
              <a href="">
                <span class="badge red mr-1">Bestseller</span>
              </a>
            </div>

            <p class="lead font-weight-bold">Description</p>
            <p class="lead">
              <span class="mr-1"> Prix
                <del>  10 € </del>
              </span>
              <span>{{ prix }} €</span>
            </p>


            <p class="text-justify ml-4 p-1"> 
                Jenny Et Paola
                775 m de Paris
                4 rue Poissy 75005 Paris .
                <br> <br>
                Envie d'une parenthèse beauté à l'écoute de vos cheveux ? 
                N'hésitez pas à faire appel à notre salon de coiffure mixte. 
                <br><br>
                Nous proposons la pose de vernis permanent, les brushings, 
                ainsi que les soins capillaires. Le salon vous propose des shampoings.

                coiffure à domicile coiffeur homme SALON Y coloration 
                lissage mèches balayage coiffeur femme
                 
            </p>
            <div v-show="false"> 
              <form class="d-flex justify-content-left">
                <!-- Default input -->
                <input type="number" value="1" aria-label="Search" class="form-control" style="width: 100px">
                <button class="btn btn-primary btn-md my-0 p" @click.prevent="windows.location='/services'">Ajouter
                  <i class="fas fa-shopping-cart ml-1"></i>
                </button>
              </form>
            </div>
          <!--Content-->

        </div>
        <!--Grid column-->
        <div class="col-lg-6 mb-4">
          <h1 class="p-2 bg-primary text-white">Prendre un rendez-vous</h1>
          <div class="row">
            <CMeetingSelect> </CMeetingSelect>
          </div>
        </div>
        <!--Grid column-->

      </div>
      <!--Grid row-->

      <hr>

      <!--Grid row-->
      <div class="row">

        <!--Grid column-->
        <div class="col-md-6 text-left">
          <h4 class="my-4 h4">Additional information</h4>
			<p>Soyez les bienvenus chez Paola Shop. Votre coiffeur 
                vous propose des coupes tendances et stylées. 
                Prenez rendez-vous ou Rendez-nous visite.  </p>
        </div>
        <!--Grid column-->

      </div>
      <!--Grid row-->

      <!--Grid row-->
      <div class="row wow fadeIn">

        <!--Grid column-->
        <div class="col-lg-4 col-md-12 mb-4">
          <img :src="`${publicPath}images/anonymous_medecin003.jpg`" width="250" />
        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-lg-4 col-md-6 mb-4">
          <img :src="`${publicPath}images/menage.jpeg`" width="250" />
        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-lg-4 col-md-6 mb-4">
              <img :src="`${publicPath}images/service-coiffure.jpg`" width="250" />
        </div>
        <!--Grid column-->

      </div>
      <!--Grid row-->

  </div>
</template>

<script>
    
    import 'bootstrap/dist/css/bootstrap.min.css';
    import CMeetingSelect from "../components/CMeetingSelect.vue"
	
    export default {
        name : "ProductDetails",
        components : { CMeetingSelect },
		data(){
			return {
				msg : "Produit " ,
        prix : 44, 
				photo : "images/photo.png",
        publicPath : process.env.BASE_URL ,
        fiches :[
                    { name : "", description : "", },
                    { name : "", description : "", },
                ]
			}
		},
      // add book to base

		created(){
			console.log("Fiche creer")
		}

    }
</script>