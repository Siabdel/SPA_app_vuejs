<template>
  <div class="container">
    <header class="bg-dark py-5" 
        style="background-image:url('../images/green-background_007.jpg') ;">
      <div class="container px-5">
          <div class="row gx-5 align-items-center justify-content-center">
              <div class="col-lg-8 col-xl-7 col-xxl-6">
                  <div class="my-5 text-center text-xl-start">
                      <h1 class="display-4 fw-bolder text-white mb-2"> WeDom </h1>
                      <h1 class="display-5 fw-bolder text-white mb-2"> Service de proximité à Domicile </h1>
                      <p class="lead fw-normal text-white text-bold mb-4">
                              Trouvez rapidement un spécialiste près de chez vous et prenez rendez-vous gratuitement en ligne en quelques clics.
                      </p>
                      <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                          <a class="btn btn-primary btn-lg px-4 me-sm-3" href="/services">Allon y</a>
                          <a class="btn btn-outline-light btn-lg px-4" href="#app">Savoir plus su nos services</a>
                      </div>
                  </div>
              </div>
              <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                <img class="rounded" :src="`${publicPath}images/anonymous_medecin003.jpg`" width="250" />
              </div>
          </div>
      </div>
    </header>
  <hr>
  </div>
</template>

<script>

require("@/assets/green-background_007.jpg")
export default({
    name: "VHome",
    data(){
        return{
            msg : "Welcome to my Home",
            publicPath : process.env.BASE_URL,
            image_style: "../images/greeen-backgoound_007",
        }
    }
})

</script>