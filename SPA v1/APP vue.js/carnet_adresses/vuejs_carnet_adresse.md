



![flux](images/logo.png)

# <center> Vuejs : Carnet addresse</center>
####  

---

![projet](images/vuejs.png)

## 1. Commencer



> Creation application carnet addresse 
>
>  

####  Installation NodeJS and NPM
> installer les outils de development  native NodeJS modules :



```sh
$ sudo apt-get install build-essential nodejs
#
# puis install curl
$ sudo apt-get update
$ sudo apt-get install curl
```



####  Installation Vue-cli version 3



installation de la version 3 du client vuejs 



```sh
$  sudo npm install -g @vue/cli
```



#### configuration un nouveau projects

* creation du projet

```sh
$ vue create carnet-addresse
```
* compilation du projet


```sh
$ npm run build
```

* lancer application

```sh
$ npm run lint
$ cd  carnet-adresse
$ npm run serve

```
> genere un package.json

  - **Babel** : outils qui setup votre project  ES2015+ " Javascrit "
  - **TypeScript** language avec compilateur pour produire du js
  - **Progressive Web App*  : plugin PWA
  - **Router** Router library
  - **Vues**
    -


> CLI peret de creer le squelette de l'application

![squelette](images/structure_squelette_project.png)



## 2. les outils vuejs



#### 	Why Use Build Tooling?

> include vuejs a partir de CDN est une bonne option quand vous êtes débutant .
> nous allons intrduire quelques notions pour contruire des application modernes et professionnel .
> des outils qui facilite le deployement automatiques des sources et une modularité grace au composants.
> moderne synthaxe au developpement respectant la nouvelle norme ** ES2015**



Utiliser la methode  **Single file Components**  SFC :

#### SFC Single file Component

```html

<template>
  <div class="exemple"> {{ msg }} </div>
</template>

<script>

export default {
   data(){
     return {
       msg : "Hello word"
     }
   }
}
</script>

<style>
  .exemple{
    color : 'blue'
  }
</style>
```

> cette methode permet d'avoir tout le composant en un seule fichier extension : .vue
> l'avantage est d'avoir la **logique** et **UI** du composant ensemble ce qui simplifie la maintenance et comme ça pas de confusion avec le systeme de fichier , le composant est independant pour fonctionner







#### Ajout du package : installer jquery & bootstrap



```sh
$ npm install bootstrap3
$ npm install jquery popper.js
```

* ou style  emantic-ui-css

```sh
npm install semantic-ui-css
```


> ensuite dans main.sj ou APP.vue
> faire un import


import 'bootstrap3/dist/css/bootstrap.min.css';



## 3. Les components :



#### 	3.1 SearchBox :	

   ```vue
   <template lang="">
       <div>
           <form action="form-inline">
               <input @keyup.prevent="$emit('searchKey', terms)" type="text"  v-model="terms">
               <Button  @click.prevent="$emit('searchKey', terms)"> Chercher </Button>
   
           </form>
       </div>
   </template>
   
   <script>
   import 'bootstrap3/dist/css/bootstrap.min.css';
   export default {
       name : "SearchBox",
       data(){
           return {
               terms : "",
           }
       }, 
   }
   </script>
   ```



#### 3.2 CarnetAdresse :

 

```vue
<template> 
    <div>
        <h3> {{ message }} {{ contactes.length }}</h3>
        <hr>
        <div class="container nice">
        <table class="table table-striped table-bordered">
            <thead class="bg-secondary">
                <th> Titre</th>
                <th > <a @click="sortBy='prenom'"> prénom </a> </th>
                <th  @click="sortBy='nom'">nom</th>
                <th  @click="sortBy='email'">email</th>
                <th  @click="sortBy='telephone'">telephone</th>
                <th  @click="sortBy='ville'">Ville</th>
            </thead>
            <tbody>
                <tr v-for="(contacte, index) in contactes "  v-bind:key="index" >
                    <td v-if="contacte.title==='male'"> Mr</td>
                    <td v-else-if="contacte.title==='female'"> Mme</td>
                    <td v-else> __ </td>
                    <td>{{contacte.prenom}}</td>
                    <td>{{contacte.nom}}</td>
                    <td>{{ contacte.email}}</td>
                    <td>{{ contacte.telephone}}</td>
                    <td>{{ contacte.ville}}</td>
                </tr>
            </tbody>

            <tfoot>
            <tr>
                <span>
                <button class='btn-warning btn-sm' >Précedent</button>
                <button class='btn-warning btn-sm' >Suivant</button>
                </span>
            </tr>

            </tfoot>
        </table>
        </div>

    </div>    
</template>

<script>
import 'bootstrap3/dist/css/bootstrap.min.css';
export default({
    name : "CarnetAdresse",
    props : {
       contactes : {
           type : Array,
       }
    },
    data(){
        return {
            message : "Bienvenue a mon Canet adresse  !! ",
            adresses : [],
        }
    }

})
</script>
```



#### 	3.3 App.vue :



```vue
<template>
  <div id="app">
    <h3> Application </h3>
    <img alt="Vue logo" src="./assets/logo.png">
    <SearchBox @searchKey="include_contactes" />

    <CarnetAdresse :contactes="reload_contactes" />
  </div>
</template>

<script>
import CarnetAdresse from "./components/CarnetAdresse.vue";
import SearchBox  from "./components/SearchBox.vue";

export default {
  name: 'App',
  components: {
    CarnetAdresse,
    SearchBox,
  },
  data(){
    return {
      adresses : [],
      searchBy : "",
      sortBy : "nom",
    }
  },
  created() {
      let url = `http://51.178.136.190:93/apipro/directories/`

      // ajax load
      fetch(url)
      .then(response => response.json())
      .then(json => {
        this.adresses = json;
        //console.log(" data = " + this.adresses[0].nom )
        })  
      .catch(err =>err.msg)
  },

  methods: {
    include_contactes(search){
      // expression reguliere dans vuejs
      const url = 'https://google.com/foo/bar';
      const regex = /^(https.+)\/.*$/ig;
      const matches = regex.exec(url);
      console.log( "matches = " + matches[1]) ;/* 1 = group index */

      //console.log("terms search !!! = " + search)
      this.searchBy = search.toLowerCase()
      //return this.adresses.filter(contacte => contacte.nom.includes(search))
      return this.adresses
    },

    compare(a, b) {
      if (a.nom < b.nom)
        return -1;
      if (a.nom > b.nom)
        return 1;
      return 0;
    }
  },

  computed : 
  {
    reload_contactes(){
      if(this.searchBy){
        return this.adresses.filter(contacte => contacte.nom.toLowerCase().includes(this.searchBy)).sort(this.compare)
      }else {
        return this.adresses
        .filter( a => a.nom.includes("a"))
        .sort( (a,b) => a[this.sortBy].localeCompare(b[this.sortBy]));
      }
    }
  },
}
</script>

```

### 4. Installation vue-router :

installation c'est facile, on le retrouve après dans le réperoire "src/routes.js"

```shell
npm install vue-router 
```



appel du router dans "App.vue"

