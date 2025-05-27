<template>
  <div class="row" id="pwd-container">
    <div class="col-md-4"></div>
    
    <div class="col-md-4">
      <section class="login-form">
        <div v-if="errors.length" class="breadcrumb bg-white">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="(error, index) in errors"  :key=index class="text-warning"> {{ error }} !!</li>
          </ul>
        </div>
        <form method="post" action="#" role="login" >
          <img src="http://i.imgur.com/RcmcLv4.png" class="img-responsive" alt="" />

          <input type="email" v-model="email" placeholder="Email" 
            required class="form-control input-lg"   />
          
          <input type="password" v-model="password" class="form-control input-lg"  
            placeholder="Password" required="" />
          
          
          <div class="pwstrength_viewport_progress"></div>
          
          
          <button type="submit" @click.prevent="onLogin"  name="go" 
          class="btn btn-lg btn-primary btn-block">Se conneter</button>
          <div>
            <a href="#">Create account</a> or <a href="#">reset password</a>
          </div>
          
          
        </form>
        
        <div class="form-links">
          <a href="#">www.website.com</a>
        </div>
      </section>  
      </div>
      
      <div class="col-md-4"></div>
      

  </div> </template>
<script>
import authAPI from  "../auth";
// Regular expression from W3C HTML5.2 input specification:
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export default ({
    name : "Login",
    data : () => ({
        message : "",
        email : null,
        password: null,
        errors : [], 
        showForm : true,
        isSaved : false,
        loggedIn : false,
    }),
    methods :{
        
        onLogin(){
          if(this.isEmail(this.email) && this.isPassword(this.password) ){
            this.apiLogin()
          }else{
            console.log("votre email  n'est pas valide !!!")
          }
        },

        apiLogin(){
            //validate saisie email, passwd 
            authAPI.login(this.email, this.password)
            .then( () =>  {
                this.$router.push("/")
                console.log("Connected !!" + this.email + " et " + this.password)
                this.errors = []
            })
            .catch( () => {
                this.errors = []
                console.log("Api Erreur de connexion !!" + this.email + this.password)
                this.errors.push("Il y a une erreur dans votre adresse email ou le mot de passe")
            });
        },

        // check for valid email adress
        isEmail(value) {
          if (emailRegExp.test(value)){
            return true
          }else {
                this.errors.push("Vote email n'est pas valide ")
          }
        },

        isPassword(passwd){
          if(!this.password || this.password.length < 5){
            this.errors.push("password non valide nbre car < 5 !!") 
            console.log("password non valide nbre car < 5 !!" + passwd)
            return false
          }else {
            return true
          }
        },
        // watching nested property
        validate_email(event) {
          console.log("computed validate email" + event.value )
          return this.isEmail("email", event.value) 
        },

       
      },
      
    
})
</script>