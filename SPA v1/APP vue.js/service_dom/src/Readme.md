# Service a Domicile maquette 

> vue.js 3 demo
>
> Auteur abdelaziz Sadquaoui
>
> date 31 oct 2022





### Installation 



```shell
$ npm install vue@3.2.13
$ vue create service_dom
$ cd service_dom

```

###### installation packages router

```shell
$ npm install vue-router@next --save
$ npm install bootstrap@4.7 --save

```



### main.js 



```javascript
import { createApp } from 'vue'
import App from './App.vue'
//import router from  './router'
import CSearch from "./components/Search.vue";
import CService from "./components/Services.vue";
import C_Home from "./components/Home.vue";

//Vue.config.productionTip = false

const router = [
    {
        name : "home", 
        path: "/home",
       component : C_Home,
    },
    {
        name : "service",
        path: "/service",
        component : CService,
    },
    {
        name : "search", 
        path : "/search",
        component : CSearch
    },
]

// Create and mount the root instance.
//Avant version Vue.js 2
//const app = new Vue({ router, render : h => h(App) })
//app.mount('#app')
//en version vue.js 3
const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router).mount('#app');
```



### App.vue 



```vue
<template>  
  <div>
    <ul class="list-group list-group-horizontal">
      <router-link to="/"  class="list-group-item active">Accueil</router-link>
      <router-link to="/home"  class="list-group-item">Home</router-link>
      <router-link to="/service"  class="list-group-item">Services à domicile</router-link>
      <!-- routeur -->
      <router-view></router-view>
    </ul>
  </div>
</template>

<script>

export default( {
  name: 'App',
  components: { },
  data(){
    return{ 
    msg : "Ici APP",
    services : 
    [
      {"name": "Service Coiffure à domicile", "photo":"service-coiffure.png",
          "style":"background-image:url('../assets/service-coiffure.jpg'); text-white; background-size: 200px 250px;",
      }, 
      {"name":"Service Infirmier a domicile", "photo":"service-infirmiers_004.jpg",
          "style":"background-image:url('images/service-infirmiers_004.jpg'); text-white; background-size: 200px 250px;",
      }, 
     ...], }
},
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```



### view Home.vue



```vue
<template>
 	<div>
    </div>
</template>

<script>
export default({
  name: "C_Home",
  component : [],
  msg : "Welcome to my Home"
})
</script>
```



### Components:

##### Component Search

```vue
<template>
    <div id="s_search" class="container-fluid   w-100 p-3"  
        style="background-image:url(images/background/green-background_006.jpg) ;">
        <form action="" method="post" name="sentSearch" id="contactForm" class="form-inline">
	 <div class="row">
       <div class="form-group">
          <div class='row'>
           <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
             <div class="input-group input-group-lg text-large">
                                                {{ errors }}
              <span class="input-group-addon"> <i class="fa fa-user"></i></span>
                             <input v-model="specialite" class="form-control-lg" 
                                                placeholder="Nom, Specialté, Etablissement" >
               </div>
               </div>
                            
  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
  <div class="input-group input-group-lg text-large ">
                                                {{ errors }}
                                                <span class="input-group-addon"> <i class="fa fa-user fa-fw"></i> </span>
                                            <input v-model="ville" class="form-control" placeholder="Oû">
                                        </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                                        <div class="input-group input-group-lg">			
                                                <span class="input-group-addon"> <i class="fa fa-search fa-fw"></i> </span>
                                                <input type="submit" value='Rechercher' class="btn btn-primary btn-md btn-block text-large" />
                                        </div>
                            </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default({
        name :'CSearch',
        data(){
            return{
                msg:"",
            }
        }
    })
</script>
```



##### Component Services

```vue
<template>
    <div class="card">
        <div class="card-head" >
            <h3 class="badge badge-primary display-3 text-uppercase font-weight-bold"> {{ service.name }} </h3> 
        </div>
        <div class="card-body">
            <p class='jumbotron text-lg-right' :style=service.style> {{ service.name }}</p>
        </div>
        <div class="card-footer">
            <p>
                <a href="./search.html" class="btn btn-warning"> Chercher</a>
            </p>
        </div>
    </div>
</template>

<script>
export default({
    name: 'CService',
    props :{
        service : Object,
    },
    data(){
        return {
            msg :'',
        }
    }
})
</script>
```



### Views:

##### VService views

```vue
<template>
 <div>
  <CService v-for="(article, index) in services"  :key="index" :service="article"> 	      	</CService>
  </div>
</template>

<script>
import CService from "./components/Services.vue";
export default({
  name: "C_Home",
  component : [CService,],
  msg : "Welcome to my Home",
  services : [
      {"name": "Service Coiffure à domicile", "photo":"service-coiffure.png",
          "style":"background-image:url('../assets/service-coiffure.jpg'); text-white; background-size: 200px 250px;",
      }, 
      {"name":"Service Infirmier a domicile", "photo":"service-infirmiers_004.jpg",
          "style":"background-image:url('images/service-infirmiers_004.jpg'); text-white; background-size: 200px 250px;",
      }, 
     ...
      ],
})
</script>
```

#####  