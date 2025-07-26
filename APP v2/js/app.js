const { createApp } = Vue;

createApp({
    data() {
        return {
            dishes: [
                { id: 1, name: 'Couscous Royal', desc: 'Semoule fine, légumes, merguez, poulet, agneau.', price: 18, img: 'images/couscous.jpg' },
                { id: 2, name: 'Pastilla au Poulet', desc: 'Feuilles de brick, amandes, cannelle, sucre glace.', price: 14, img: 'images/pastilla.jpg' },
                { id: 3, name: 'Tajine d’Agneau & Pruneaux', desc: 'Agneau fondant, pruneaux, amandes, miel.', price: 16, img: 'images/tajine.jpg' },
                { id: 4, name: 'Briouats au Fromage', desc: 'Triangles croustillants, fromage, menthe.', price: 8, img: 'images/briouats.jpg' },
            ],
            cart: [],
            booking: { name: '', email: '', date: '', time: '', people: 2 }
        };
    },
    computed: {
        cartCount() {
            return this.cart.reduce((sum, item) => sum + item.qty, 0);
        },
        total() {
            return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        }
    },
    methods: {
        addToCart(dish) {
            const found = this.cart.find(i => i.id === dish.id);
            if (found) found.qty++;
            else this.cart.push({ ...dish, qty: 1 });
        },
        removeFromCart(item) {
            const idx = this.cart.findIndex(i => i.id === item.id);
            if (idx > -1) {
                this.cart[idx].qty--;
                if (this.cart[idx].qty === 0) this.cart.splice(idx, 1);
            }
        },
        checkout() {
            if (this.cart.length === 0) return;
            // Simulation Stripe Checkout (utilisez votre clé réelle)
            fetch('/create-checkout-session', { method: 'POST', body: JSON.stringify({ items: this.cart }) })
                .then(res => res.json())
                .then(session => stripe.redirectToCheckout({ sessionId: session.id }))
                .catch(err => alert('Paiement simulé ! Total : ' + this.total.toFixed(2) + ' €'));
        },
        bookTable() {
            alert(`Table réservée pour ${this.booking.people} personnes le ${this.booking.date} à ${this.booking.time}.`);
            this.booking = { name: '', email: '', date: '', time: '', people: 2 };
        }
    }
}).mount('#app');