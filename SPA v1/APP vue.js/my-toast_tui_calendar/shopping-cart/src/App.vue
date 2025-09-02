<template>
   <!-- Navigation-->
  <div class="container">
    <div class="row">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container px-5">
          <a class="navbar-brand" href="index.html">Shopping Cart vue.js 2022</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                  <li class="nav-item"><router-link class="nav-link" to="/books-card"> Mes books  </router-link> </li>
                  <li class="nav-item"><router-link class="nav-link" to="/books"> Liste des livres  </router-link> </li>
                  <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
                  <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" id="navbarDropdownBlog" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Blog</a>
                      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                          <li><a class="dropdown-item" href="blog-home.html">Blog Home</a></li>
                          <li><a class="dropdown-item" href="blog-post.html">Blog Post</a></li>
                      </ul>
                  </li>
                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" id="navbarDropdownPortfolio" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Portfolio</a>
                      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                          <li><a class="dropdown-item" href="portfolio-overview.html">Portfolio Overview</a></li>
                          <li><a class="dropdown-item" href="portfolio-item.html">Portfolio Item</a></li>
                      </ul>
                  </li>
              </ul>
          </div>
      </div>
      </nav>
    </div>

    <div class="jumbotron">
      <h1 class="display-4"> {{ msg }} </h1>
    </div>
    <hr> 
    <br> <br>
    <div class="row">
      <SearchBox  @searchKey="searchBook"  />
    </div>
    <br> <br>
  
   
  
    <router-view> </router-view>
  </div>

</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import SearchBox from './components/SearchBox.vue'

export default {
  name: 'App',
  components : {SearchBox},
  data(){
    return {
      msg : "Shopping Cart"
    }
  },

  methods :{
    ...mapActions(['loadBooks']), 
    ...mapMutations(['setTermToSearch']), 
    // chercher une cle
    searchBook(terms){
      console.log("la cle a chercher ==> " + terms)
      this.setTermToSearch(terms)
      // refaire la recherche des livres
      this.loadBooks(terms);
    },
    
  },
  created(){
    this.loadBooks();
  }
}
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
