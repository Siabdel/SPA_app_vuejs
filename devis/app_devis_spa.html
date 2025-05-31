
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuoteMaster - Création de devis</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/pinia@2.0.33/dist/pinia.iife.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <style>
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 0.3s ease;
        }
        .fade-enter-from,
        .fade-leave-to {
            opacity: 0;
        }
        .slide-fade-enter-active {
            transition: all 0.3s ease-out;
        }
        .slide-fade-leave-active {
            transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
        }
        .slide-fade-enter-from,
        .slide-fade-leave-to {
            transform: translateX(20px);
            opacity: 0;
        }
        .theme-red {
            --color-primary: #ef4444;
            --color-primary-light: #fecaca;
            --color-primary-dark: #dc2626;
        }
        .theme-blue {
            --color-primary: #3b82f6;
            --color-primary-light: #bfdbfe;
            --color-primary-dark: #2563eb;
        }
        .theme-white {
            --color-primary: #4b5563;
            --color-primary-light: #e5e7eb;
            --color-primary-dark: #374151;
        }
        .bg-primary {
            background-color: var(--color-primary);
        }
        .bg-primary-light {
            background-color: var(--color-primary-light);
        }
        .text-primary {
            color: var(--color-primary);
        }
        .border-primary {
            border-color: var(--color-primary);
        }
        .hover\:bg-primary-dark:hover {
            background-color: var(--color-primary-dark);
        }
    </style>
</head>
<body class="bg-gray-50">
    <div id="app">
        <div :class="`theme-${theme}`">
            <!-- Header -->
            <header class="bg-white shadow-sm">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div class="flex items-center">
                        <h1 class="text-2xl font-bold text-primary">QuoteMaster</h1>
                        <nav class="hidden md:flex ml-10 space-x-8">
                            <a href="#" class="text-primary font-medium">Tableau de bord</a>
                            <a href="#" class="text-gray-500 hover:text-primary">Clients</a>
                            <a href="#" class="text-gray-500 hover:text-primary">Devis</a>
                            <a href="#" class="text-gray-500 hover:text-primary">Produits</a>
                        </nav>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="relative">
                            <button @click="toggleThemeMenu" class="flex items-center text-gray-500 hover:text-primary">
                                <span class="hidden md:inline">Thème</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <transition name="fade">
                                <div v-if="showThemeMenu" class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                                    <div class="py-1">
                                        <button @click="setTheme('red')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Rouge</button>
                                        <button @click="setTheme('blue')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bleu</button>
                                        <button @click="setTheme('white')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Blanc</button>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <button class="md:hidden text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div class="hidden md:flex items-center">
                            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                            <span class="ml-2 text-sm font-medium text-gray-700">John Doe</span>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Nouveau devis</h2>
                    <div class="flex space-x-3">
                        <button @click="saveQuote" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Enregistrer
                        </button>
                        <button @click="exportToPDF" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark">
                            Exporter PDF
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Client Info -->
                    <div class="lg:col-span-1">
                        <div class="bg-white shadow rounded-lg p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Informations client</h3>
                            <ClientForm v-model:client="quote.client" />
                        </div>

                        <div class="bg-white shadow rounded-lg p-6 mt-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Paramètres du devis</h3>
                            <div class="space-y-4">
                                <div>
                                    <label for="quote-number" class="block text-sm font-medium text-gray-700">Numéro de devis</label>
                                    <input type="text" id="quote-number" v-model="quote.number" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                </div>
                                <div>
                                    <label for="quote-date" class="block text-sm font-medium text-gray-700">Date</label>
                                    <input type="date" id="quote-date" v-model="quote.date" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                </div>
                                <div>
                                    <label for="quote-validity" class="block text-sm font-medium text-gray-700">Validité (jours)</label>
                                    <input type="number" id="quote-validity" v-model="quote.validityDays" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                </div>
                                <div>
                                    <label for="quote-notes" class="block text-sm font-medium text-gray-700">Notes</label>
                                    <textarea id="quote-notes" v-model="quote.notes" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quote Items -->
                    <div class="lg:col-span-2">
                        <div class="bg-white shadow rounded-lg p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-lg font-medium text-gray-900">Articles</h3>
                                <div class="flex space-x-2">
                                    <button @click="addProductItem" class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Produit
                                    </button>
                                    <button @click="addCustomItem" class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Ligne libre
                                    </button>
                                </div>
                            </div>

                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix unitaire</th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TVA</th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <transition-group name="slide-fade">
                                            <QuoteItem 
                                                v-for="(item, index) in quote.items" 
                                                :key="item.id"
                                                :item="item" 
                                                :index="index"
                                                @update-item="updateItem"
                                                @remove-item="removeItem"
                                            />
                                        </transition-group>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Totals -->
                            <div class="mt-8 border-t border-gray-200 pt-6">
                                <div class="flex justify-end">
                                    <div class="w-64 space-y-2">
                                        <div class="flex justify-between">
                                            <span class="text-sm text-gray-600">Total HT</span>
                                            <span class="text-sm font-medium">{{ formatCurrency(quoteTotals.totalHT) }}</span>
                                        </div>
                                        <div class="flex justify-between" v-for="tax in quoteTotals.taxes" :key="tax.rate">
                                            <span class="text-sm text-gray-600">TVA {{ tax.rate }}%</span>
                                            <span class="text-sm font-medium">{{ formatCurrency(tax.amount) }}</span>
                                        </div>
                                        <div class="flex justify-between border-t border-gray-200 pt-2 mt-2">
                                            <span class="text-base font-medium">Total TTC</span>
                                            <span class="text-base font-medium">{{ formatCurrency(quoteTotals.totalTTC) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script>
        const { createApp, ref, computed, onMounted, nextTick } = Vue;
        const { defineStore, createPinia } = Pinia;
        const { jsPDF } = window.jspdf;

        // Pinia Store
        const useQuoteStore = defineStore('quote', {
            state: () => ({
                quotes: [],
                products: [],
                clients: [],
                currentTheme: 'blue'
            }),
            actions: {
                async fetchProducts() {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 500));
                    this.products = [
                        { id: 1, name: 'Site web vitrine', description: 'Création d\'un site web vitrine', price: 1200, taxRate: 20 },
                        { id: 2, name: 'Site e-commerce', description: 'Création d\'un site e-commerce', price: 3500, taxRate: 20 },
                        { id: 3, name: 'Maintenance mensuelle', description: 'Maintenance et mises à jour', price: 300, taxRate: 20 },
                        { id: 4, name: 'Formation CMS', description: 'Formation à la gestion du CMS', price: 500, taxRate: 10 },
                        { id: 5, name: 'Hébergement annuel', description: 'Hébergement et nom de domaine', price: 250, taxRate: 20 }
                    ];
                },
                async fetchClients() {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 500));
                    this.clients = [
                        { id: 1, name: 'Client A', email: 'client.a@example.com', address: '123 Rue Principale', city: 'Paris', postalCode: '75001', phone: '0123456789' },
                        { id: 2, name: 'Client B', email: 'client.b@example.com', address: '456 Avenue Centrale', city: 'Lyon', postalCode: '69001', phone: '0987654321' },
                        { id: 3, name: 'Client C', email: 'client.c@example.com', address: '789 Boulevard Secondaire', city: 'Marseille', postalCode: '13001', phone: '0654321098' }
                    ];
                },
                saveQuote(quote) {
                    // Generate ID if new quote
                    if (!quote.id) {
                        quote.id = Date.now();
                    }
                    
                    // Update or add quote
                    const index = this.quotes.findIndex(q => q.id === quote.id);
                    if (index >= 0) {
                        this.quotes[index] = quote;
                    } else {
                        this.quotes.push(quote);
                    }
                    
                    return quote;
                },
                setTheme(theme) {
                    this.currentTheme = theme;
                    localStorage.setItem('quoteTheme', theme);
                }
            }
        });

        // Components
        const ClientForm = {
            template: `
                <div class="space-y-4">
                    <div>
                        <label for="client-name" class="block text-sm font-medium text-gray-700">Nom</label>
                        <input type="text" id="client-name" v-model="client.name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    </div>
                    <div>
                        <label for="client-email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="client-email" v-model="client.email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    </div>
                    <div>
                        <label for="client-address" class="block text-sm font-medium text-gray-700">Adresse</label>
                        <input type="text" id="client-address" v-model="client.address" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="client-city" class="block text-sm font-medium text-gray-700">Ville</label>
                            <input type="text" id="client-city" v-model="client.city" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                        <div>
                            <label for="client-postalCode" class="block text-sm font-medium text-gray-700">Code postal</label>
                            <input type="text" id="client-postalCode" v-model="client.postalCode" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                    </div>
                    <div>
                        <label for="client-phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
                        <input type="tel" id="client-phone" v-model="client.phone" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    </div>
                </div>
            `,
            props: {
                modelValue: {
                    type: Object,
                    required: true
                }
            },
            emits: ['update:modelValue'],
            computed: {
                client: {
                    get() {
                        return this.modelValue;
                    },
                    set(value) {
                        this.$emit('update:modelValue', value);
                    }
                }
            }
        };

        const QuoteItem = {
            template: `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div v-if="item.type === 'product'">
                            <select v-model="selectedProductId" @change="updateProduct" class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                <option value="">Sélectionner un produit</option>
                                <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
                            </select>
                            <p v-if="item.description" class="text-xs text-gray-500 mt-1">{{ item.description }}</p>
                        </div>
                        <div v-else>
                            <input type="text" v-model="item.description" placeholder="Description" class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <input type="number" v-model.number="item.quantity" min="1" class="block w-20 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <input type="number" v-model.number="item.unitPrice" min="0" step="0.01" class="block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <select v-model.number="item.taxRate" class="block w-20 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                            <option value="0">0%</option>
                            <option value="5.5">5.5%</option>
                            <option value="10">10%</option>
                            <option value="20">20%</option>
                        </select>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {{ formatCurrency(item.quantity * item.unitPrice * (1 + item.taxRate / 100)) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button @click="$emit('remove-item', index)" class="text-red-600 hover:text-red-900">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </td>
                </tr>
            `,
            props: {
                item: {
                    type: Object,
                    required: true
                },
                index: {
                    type: Number,
                    required: true
                }
            },
            emits: ['update-item', 'remove-item'],
            setup(props, { emit }) {
                const quoteStore = useQuoteStore();
                const selectedProductId = ref(props.item.productId || '');

                const products = computed(() => quoteStore.products);

                const updateProduct = () => {
                    if (selectedProductId.value) {
                        const product = quoteStore.products.find(p => p.id === selectedProductId.value);
                        if (product) {
                            emit('update-item', {
                                ...props.item,
                                productId: product.id,
                                description: product.description || product.name,
                                unitPrice: product.price,
                                taxRate: product.taxRate
                            });
                        }
                    }
                };

                const formatCurrency = (value) => {
                    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
                };

                return {
                    selectedProductId,
                    products,
                    updateProduct,
                    formatCurrency
                };
            }
        };

        // App
        const app = createApp({
            setup() {
                const quoteStore = useQuoteStore();
                
                // Theme management
                const showThemeMenu = ref(false);
                const theme = computed(() => quoteStore.currentTheme);
                
                const toggleThemeMenu = () => {
                    showThemeMenu.value = !showThemeMenu.value;
                };
                
                const setTheme = (newTheme) => {
                    quoteStore.setTheme(newTheme);
                    showThemeMenu.value = false;
                };
                
                // Quote data
                const quote = ref({
                    id: null,
                    number: 'DEV-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 1000),
                    date: new Date().toISOString().split('T')[0],
                    validityDays: 30,
                    notes: '',
                    client: {
                        name: '',
                        email: '',
                        address: '',
                        city: '',
                        postalCode: '',
                        phone: ''
                    },
                    items: []
                });
                
                // Computed totals
                const quoteTotals = computed(() => {
                    const totals = {
                        totalHT: 0,
                        taxes: [],
                        totalTTC: 0
                    };
                    
                    // Calculate HT and group taxes
                    const taxesMap = {};
                    
                    quote.value.items.forEach(item => {
                        const itemHT = item.quantity * item.unitPrice;
                        totals.totalHT += itemHT;
                        
                        const taxAmount = itemHT * (item.taxRate / 100);
                        
                        if (!taxesMap[item.taxRate]) {
                            taxesMap[item.taxRate] = 0;
                        }
                        taxesMap[item.taxRate] += taxAmount;
                    });
                    
                    // Convert taxes map to array
                    for (const rate in taxesMap) {
                        totals.taxes.push({
                            rate: parseFloat(rate),
                            amount: taxesMap[rate]
                        });
                    }
                    
                    // Calculate TTC
                    totals.totalTTC = totals.totalHT + totals.taxes.reduce((sum, tax) => sum + tax.amount, 0);
                    
                    return totals;
                });
                
                // Methods
                const addProductItem = () => {
                    quote.value.items.push({
                        id: Date.now() + Math.random().toString(36).substr(2, 9),
                        type: 'product',
                        productId: null,
                        description: '',
                        quantity: 1,
                        unitPrice: 0,
                        taxRate: 20
                    });
                };
                
                const addCustomItem = () => {
                    quote.value.items.push({
                        id: Date.now() + Math.random().toString(36).substr(2, 9),
                        type: 'custom',
                        description: '',
                        quantity: 1,
                        unitPrice: 0,
                        taxRate: 20
                    });
                };
                
                const updateItem = (updatedItem) => {
                    const index = quote.value.items.findIndex(item => item.id === updatedItem.id);
                    if (index >= 0) {
                        quote.value.items[index] = updatedItem;
                    }
                };
                
                const removeItem = (index) => {
                    quote.value.items.splice(index, 1);
                };
                
                const saveQuote = async () => {
                    const savedQuote = await quoteStore.saveQuote(quote.value);
                    quote.value = savedQuote;
                    
                    // Show success message
                    alert('Devis enregistré avec succès !');
                };
                
                const exportToPDF = async () => {
                    // In a real app, we would generate a proper PDF with jsPDF
                    // For this example, we'll just show a success message
                    alert('Export PDF en cours... (simulé dans cet exemple)');
                    
                    // Actual PDF generation would look something like this:
                    /*
                    const element = document.getElementById('pdf-content');
                    const canvas = await html2canvas(element);
                    const imgData = canvas.toDataURL('image/png');
                    
                    const pdf = new jsPDF();
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('devis-' + quote.value.number + '.pdf');
                    */
                };
                
                const formatCurrency = (value) => {
                    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
                };
                
                // Lifecycle hooks
                onMounted(async () => {
                    await quoteStore.fetchProducts();
                    await quoteStore.fetchClients();
                    
                    // Load theme from localStorage if available
                    const savedTheme = localStorage.getItem('quoteTheme');
                    if (savedTheme) {
                        quoteStore.setTheme(savedTheme);
                    }
                });
                
                return {
                    showThemeMenu,
                    theme,
                    toggleThemeMenu,
                    setTheme,
                    quote,
                    quoteTotals,
                    addProductItem,
                    addCustomItem,
                    updateItem,
                    removeItem,
                    saveQuote,
                    exportToPDF,
                    formatCurrency
                };
            },
            components: {
                ClientForm,
                QuoteItem
            }
        });

        // Use Pinia
        const pinia = createPinia();
        app.use(pinia);

        // Mount the app
        app.mount('#app');
    </script>
</body>
</html>