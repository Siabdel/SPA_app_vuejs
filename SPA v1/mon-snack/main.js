Vue.component("fiche-produit", {
    template: "#product_details",
    props : ['article', 'art_style'],
    methods:{
        passer_commande(produit){
            this.$emit("ev_commande_passee", produit.name)
        }
    }
});

var app = new Vue({
    el : "#app",
    //components : ['fiche-produit'],
    data(){
        return {
            msg: "Mac Snack",
            user : "Abdelaziz",
            photostyle:"background-image:url(); background-size: 200px 150px;",

            products : [
                    {"name": "Assiette Kebab", "photo":"assiette-kebab-1.png",
                        "style":"background-image:url('images/assiette-kebab-1.png'); background-size: 200px 150px;",
                    }, 
                    {"name":"Frittes", "photo":"Frite.jpg",
                        "style":"background-image:url('images/Frites.jpg'); background-size: 200px 150px;",
                    
                    }, 
                    {"name":"Hamburger", "photo":"halburger.jpeg",
                        "style":"background-image:url('images/halburger.jpeg'); background-size: 200px 150px;",
                    },
                    {"name":"Cheezburger", "photo":"snack_001.jpg", 
                        "style":"background-image:url('images/snack_001.jpg'); background-size: 200px 150px;",
                    }, 
                    {"name":"Tacos", "photo":"tacos.jpg",
                        "style":"background-image:url('images/tacos.jpg'); background-size: 200px 150px;",
                    },
                    {"name":"Boissons", "photo":"Coca_canette.png",
                        "style":"background-image:url('images/Coca_canette.png'); background-size: 200px 150px;",
                    }, 
                    {"name":"Chichcababe", "photo":"chiche_kababe.jpg",
                        "style":"background-image:url('images/chiche_kababe.jpg'); background-size: 200px 150px;",
                    }],

            commandes :[],
        }
    },
    methods :{
        commander(produit){
            console.log("commander ca marche ..." + produit)
            this.commandes.push(produit)
        }

    }

})