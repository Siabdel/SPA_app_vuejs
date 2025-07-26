const { createApp } = Vue;

createApp({
    data() {
        return {
            navItems: [
                { id: 1, text: 'Accueil', link: '#', active: true },
                { id: 2, text: 'Compétitions', link: '#', active: false },
                { id: 3, text: 'Classements', link: '#', active: false },
                { id: 4, text: 'Développement', link: '#', active: false },
                { id: 5, text: 'Médias', link: '#', active: false }
            ],
            articles: [],
            matches: [],
            loading: true
        }
    },
    methods: {
        hoverNavItem(id) {
            this.navItems.forEach(item => {
                item.active = item.id === id;
            });
        },
        fetchArticles() {
            // Simulation d'une API avec des données statiques
            // En production, vous utiliseriez une vraie API
            setTimeout(() => {
                this.articles = [
                    {
                        id: 1,
                        title: 'La Coupe du Monde 2026 prend forme',
                        summary: 'Les préparatifs pour la Coupe du Monde 2026, qui se déroulera en Amérique du Nord, avancent à grands pas.',
                        image: 'https://www.fifa.com/image/upload/t_l2/fwc-2026.jpg',
                        link: '#'
                    },
                    {
                        id: 2,
                        title: 'Nouveau format pour les compétitions de clubs',
                        summary: 'La FIFA a annoncé un nouveau format pour les compétitions de clubs qui débutera en 2025.',
                        image: 'https://www.fifa.com/image/upload/t_l2/club-competitions.jpg',
                        link: '#'
                    },
                    {
                        id: 3,
                        title: 'Le football féminin continue de croître',
                        summary: 'Le dernier rapport de la FIFA montre une croissance record du football féminin à travers le monde.',
                        image: 'https://www.fifa.com/image/upload/t_l2/womens-football.jpg',
                        link: '#'
                    }
                ];
                this.loading = false;
            }, 1000);
        },
        fetchMatches() {
            // Simulation de données pour les matches
            this.matches = [
                { id: 1, homeTeam: 'France', awayTeam: 'Allemagne', date: '15/10/2023 - 20:45' },
                { id: 2, homeTeam: 'Brésil', awayTeam: 'Argentine', date: '17/10/2023 - 21:00' },
                { id: 3, homeTeam: 'Espagne', awayTeam: 'Italie', date: '18/10/2023 - 20:45' },
                { id: 4, homeTeam: 'Angleterre', awayTeam: 'Portugal', date: '20/10/2023 - 19:00' }
            ];
        }
    },
    mounted() {
        this.fetchArticles();
        this.fetchMatches();
        
        // Animation au défilement avec jQuery
        $(window).scroll(function() {
            $('.news-card, .match-item').each(function() {
                const position = $(this).offset().top;
                const scroll = $(window).scrollTop();
                const windowHeight = $(window).height();
                
                if (scroll + windowHeight > position + 100) {
                    $(this).addClass('animate__animated animate__fadeInUp');
                }
            });
        });
    }
}).mount('#app');