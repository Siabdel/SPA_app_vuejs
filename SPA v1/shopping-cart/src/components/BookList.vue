<template>
    <div>
        <h3> Books Liste</h3>
        <div  v-if="isLoading" class="spinner">
            <img src="" alt="">
            <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>

        <div v-else> 
            <table class="table table-striped table-bordered">
                <thead>
                    <th>Index</th><th>Titre</th> <th>Auteur</th> <th>Editeur</th>  <th>Date Edition</th><th>Action</th>
                </thead>
                <tbody>
                    <tr v-for="(book, index) in books" :key="index"> 
                        <td> {{ index }} </td> 
                        <td> {{ book.volumeInfo.title }}</td> 
                        <td> <span 
                            v-for="createur, index in book.volumeInfo.authors" :key="index">
                            {{createur}} , 
                            </span> </td> 
                        <td> {{ book.volumeInfo.publisher}}</td> 
                        <td> {{ book.volumeInfo.publishedDate}}</td> 
                        <td>  <router-link 
                                :to="{'name': 'Book', 'params': {'id' : book }}"> 
                                Show Details </router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { mapState} from "vuex" 

    export default {
        name : "BooksList",
        props : {
                msg : String 
                },
                
        created(){
            console.log("Mon Contacte ici")
        },
        computed:{
            ...mapState([ 'isLoading', 'books'])
        },

    }

</script>
