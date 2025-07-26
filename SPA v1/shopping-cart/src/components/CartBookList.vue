<template>
    <div>
        <h3> Books Liste</h3>
        <div>
            <button @click.prevent="import_data"> Importer les books </button>
        </div>
        <div  v-if="isLoading" class="spinner">
            <img src="" alt="">
            <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <ul>
            <li v-for="(book, index) in books" :key="index" class="list-unstyled"> 
            <div class="row">
                <div class="col-md-3">
                    <div class="card card-body">
                    <img :src="(book.volumeInfo.imageLinks.thumbnail)?book.volumeInfo.imageLinks.thumbnail:'#'"  />
                    </div>
                        
                </div>
                <div class="col-md-7">
                    <div class="card">
                        <div class="card-header">
                            <router-link 
                                :to="{'name': 'book-details', 'params': {'id' : book.id }}"> 
                                {{ book.volumeInfo.publisher}} </router-link>
                        </div>
                        <div class="card-body">
                            <router-link 
                                :to="{'name': 'book-details', 'params': {'id' : book.id }}"> 
                                <h4 class="card-title">{{ book.volumeInfo.title }}</h4>
                            </router-link>
                            <p> {{ book.volumeInfo.publishedDate}}</p> 
                            <p> {{ (book.volumeInfo.description)?book.volumeInfo.description.slice(1, 300):''}} </p>
                        </div>
                        <div class="card-footer">
                            <p> <span 
                                v-for="createur, index in book.volumeInfo.authors" :key="index">
                                {{createur}} , 
                                </span> </p> 
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-warning btn-large">Ajouter au panier</button>
                </div>
            </div> 
            <hr/>
            </li>
        </ul>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { mapState, mapActions} from "vuex" 

    export default {
        name : "CartBookList",
        props : {
                msg : String 
                },
                
        created(){
            console.log("Mon Contacte ici")
        },
        computed:{
            ...mapState([ 'isLoading', 'books']),
        },
        methods: {
            ...mapActions([ 'addBooks', ]),
            import_data(){
                this.addBooks(this.books)
            }
        }

    }

</script>
