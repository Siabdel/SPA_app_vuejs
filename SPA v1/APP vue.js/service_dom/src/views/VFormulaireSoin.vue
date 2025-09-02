    <template>
        <div class="container-fluid"
              style="background-image:url('../images/green-background_007.jpg_') ;">
          <div class="col-12">
            <br><br>
            <h2 class="display-2"> Service proximité à domicile </h2>
            <h1 class="display-5 fw-bolder text-blue mb-2"> 
              Trouvez rapidement un spéciliste près de chez vous et prenez rendez-vous gratuitement en ligne en quelques clics.
            </h1>
            <p class="lead fw-normal text-blue text-bold mb-2">
              Laissez-nous vos coordonnées et nous vous rappellerons dans les 2 heures ouvrables.
            </p>
          </div>
          <hr>

          <div class="col-12">
            <div class="jumbotron">
                <CFormulaire msg="Container" > </CFormulaire>
            </div>
          </div>

          <div class="footer">..</div>

        </div>
      </template>
      <!-- Importer le composant -->
      
      <script>
      
      import 'bootstrap/dist/css/bootstrap.min.css';
      import CFormulaire from "../components/CFormulaire.vue";
      
      export default({
        name: "VSearch",
        components : {CFormulaire, },
        msg : "Welcome to my Earch",
        data(){
          return {
             publicPath: process.env.BASE_URL,
          }
        }
      })
      
      </script>