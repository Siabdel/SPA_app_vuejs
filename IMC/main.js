var app = new Vue({
    el: '#app',
    data: {
        description: "A pair of warm,fuzzy socks",
        image: "./assets/vmSocks-green-onWhite.jpg",
        link: "https://www.google.com",
        poids : 0,
        details: [
            '80% cottun',
            '20% polyester',
            'Gender-neutral'
        ],
        variants: [
            {
                variantId: 2234,
                variantColor: "btn-success d-lg-block",
                variantImage: './assets/vmSocks-green-onWhite.jpg'
            },
            {
                variantId: 2235,
                variantColor: "btn-info d-lg-block",
                variantImage: './assets/vmSocks-blue-onWhite.jpg'
            }
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        delToCart() {
            
            this.cart = this.cart > 0 ?  this.cart - 1 : 0
        },
        updateProduct(img) {
            this.image = img
        }
    }
});