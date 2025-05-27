<template>
  <div class="container-fluid">
    <header class="bg-dark py-5" 
        style="background-image:url(../images/green-background_007.jpg) ;">
      <div class="container px-5">
          <div class="row gx-5 align-items-center justify-content-center">
              <div class="col-lg-8 col-xl-7 col-xxl-6">
                  <div class="my-5 text-center text-xl-start">
                      <h1 class="display-4 fw-bolder text-white mb-2"> Wedom</h1>
                      <h1 class="display-5 fw-bolder text-white mb-2"> {{ message1 }}</h1>
                      <h1 class="display-5 fw-bolder text-white mb-2"> {{ message2 }}</h1>
                      <p class="display-4 text-white text-bold mb-4">
                             
                      </p>
                      <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                          <a class="btn btn-outline-light btn-lg px-4" href="/services">Savoir plus su nos services</a>
                          <a class="btn btn-primary btn-lg px-4 me-sm-3" href="/services">Allon y</a>
                      </div>
                  </div>
              </div>
              <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                <img :src="`${publicPath}images/anonymous_medecin003.jpg`" width="250" />
              </div>
          </div>
      </div>
      <hr>
      <section>
        <VService > </VService>
      </section>
    </header>
  </div>
</template>

<script>

import VService from "../views/VService.vue"
require("@/assets/green-background_007.jpg")
export default({
    name: "VConfirmation",
    components : {VService},
    data(){
        return {
            msg: "Welcome to my Home",
            message1 : "Merci pour votre demande. nous allons traiter cette demande dans les meilleurs délais.",
            message2 : "Vous allez reçevoir un email de confirmation ",
            publicPath: process.env.BASE_URL,
            image_style: "../images/greeen-backgoound_007",
        }
    }
})

</script>