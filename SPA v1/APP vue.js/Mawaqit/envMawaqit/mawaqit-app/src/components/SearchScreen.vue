<script setup>
// Ajout de onMounted
import { ref, onMounted } from 'vue'

const props = defineProps({
  currentCountry: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['city-selected', 'search-closed'])

// États pour la recherche de ville
const searchQuery = ref('')
const searchResult = ref(null)
const isLoading = ref(false) // Chargement de la recherche de ville
const searchError = ref(null)
const cityFound = ref(false)

// --- NOUVEAUX États pour la sélection de pays ---
const countries = ref([]) // Liste des noms de pays
const selectedCountry = ref('') // Pays actuellement sélectionné dans le dropdown
const countriesLoading = ref(true)
const countriesError = ref(null)

// --- Fonction pour récupérer les pays ---
const fetchCountries = async () => {
  countriesLoading.value = true
  countriesError.value = null
  try {
    // Utilisation de l'API REST Countries (v3.1) pour obtenir les noms communs
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name')
    if (!response.ok) {
      throw new Error(`Erreur API Pays: ${response.statusText}`)
    }
    const data = await response.json()
    // Extraire les noms communs et trier alphabétiquement
    countries.value = data.map((country) => country.name.common).sort((a, b) => a.localeCompare(b)) // Tri alphabétique

    // Initialiser le pays sélectionné avec la valeur de la prop après chargement
    // Vérifier si le pays actuel existe dans la liste chargée
    if (countries.value.includes(props.currentCountry)) {
      selectedCountry.value = props.currentCountry
    } else if (countries.value.length > 0) {
      // Fallback si le pays de la prop n'est pas exactement dans la liste
      // selectedCountry.value = countries.value[0]; // Ou laisser vide pour forcer la sélection
      selectedCountry.value = '' // Force l'utilisateur à choisir
    }
  } catch (err) {
    console.error('Erreur fetchCountries:', err)
    countriesError.value = 'Impossible de charger la liste des pays.'
    countries.value = [] // Vider en cas d'erreur
  } finally {
    countriesLoading.value = false
  }
}

// --- MODIFICATION : Fonction pour lancer la recherche ---
const performSearch = async () => {
  // Vérifier si un pays est sélectionné
  if (!selectedCountry.value) {
    searchError.value = 'Veuillez sélectionner un pays.'
    searchResult.value = null
    cityFound.value = false
    return
  }
  if (!searchQuery.value.trim()) {
    searchError.value = 'Veuillez entrer un nom de ville.'
    searchResult.value = null
    cityFound.value = false
    return
  }

  isLoading.value = true // Chargement recherche ville
  searchError.value = null
  searchResult.value = null
  cityFound.value = false
  const cityToSearch = searchQuery.value.trim()
  const countryToSearch = selectedCountry.value // Utilise le pays sélectionné

  try {
    // Utilise selectedCountry.value ici
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${cityToSearch}&country=${countryToSearch}&method=2`,
    )
    const data = await response.json()

    if (response.ok && data.code === 200) {
      searchResult.value = {
        name: cityToSearch,
        country: countryToSearch, // Garde le pays utilisé pour la recherche
      }
      cityFound.value = true
    } else if (
      data.code === 404 ||
      data.status === 'INVALID_REQUEST' ||
      (data.data && typeof data.data === 'string')
    ) {
      throw new Error(
        `Ville "${cityToSearch}" non trouvée ou invalide dans le pays "${countryToSearch}".`,
      )
    } else {
      throw new Error(data.status || `Erreur API Aladhan (${response.status})`)
    }
  } catch (err) {
    console.error('Erreur pendant la recherche de ville:', err)
    searchError.value = err.message
    searchResult.value = null
    cityFound.value = false
  } finally {
    isLoading.value = false // Fin chargement recherche ville
  }
}

// --- MODIFICATION : Fonction pour sélectionner la ville trouvée ---
const selectCity = () => {
  if (searchResult.value) {
    // Émet la ville ET le pays sélectionné
    emit('city-selected', {
      name: searchResult.value.name,
      country: searchResult.value.country, // Assure-toi que c'est bien le pays sélectionné qui est émis
    })
  }
}

// --- Cycle de vie : Charger les pays au montage ---
onMounted(() => {
  fetchCountries()
})

// --- Observer les changements de la prop pour potentiellement resynchroniser ---
// (Optionnel, utile si App.vue pouvait changer le pays PENDANT que SearchScreen est ouvert)
// watch(() => props.currentCountry, (newVal) => {
//   if (!countriesLoading.value && countries.value.includes(newVal)) {
//      selectedCountry.value = newVal;
//   } else if (!countriesLoading.value) {
//      selectedCountry.value = ''; // Reset si le nouveau pays prop n'est pas dans la liste
//   }
// });
</script>

<template>
  <div class="search-screen-container p-3 bg-light border rounded mb-4">
    <h3 class="text-center mb-3 search-title">Rechercher Ville et Pays</h3>

    <!-- Affichage erreur chargement pays -->
    <div v-if="countriesError" class="alert alert-warning small p-2">
      {{ countriesError }}
    </div>

    <!-- Formulaire de recherche -->
    <form @submit.prevent="performSearch">
      <!-- --- MODIFICATION : Input Group avec Ville ET Pays --- -->
      <div class="input-group mb-3">
        <!-- Sélecteur de Pays -->
        <select
          class="form-select"
          aria-label="Sélectionner un pays"
          v-model="selectedCountry"
          :disabled="countriesLoading || isLoading"
          style="flex: 1 1 40%"
        >
          <option value="" disabled>
            <span v-if="countriesLoading">Chargement pays...</span>
            <span v-else>-- Choisir un pays --</span>
          </option>
          <option v-for="countryName in countries" :key="countryName" :value="countryName">
            {{ countryName }}
          </option>
        </select>

        <!-- Input Ville -->
        <input
          type="text"
          class="form-control"
          placeholder="Entrez une ville..."
          aria-label="Nom de la ville"
          v-model="searchQuery"
          :disabled="countriesLoading || isLoading"
          style="flex: 1 1 60%"
        />

        <!-- Bouton Rechercher -->
        <button class="btn btn-primary" type="submit" :disabled="isLoading || countriesLoading">
          <span v-if="!isLoading">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </span>
          <span
            v-else
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
      </div>
      <!-- --- FIN MODIFICATION : Input Group --- -->
    </form>

    <!-- Zone de résultats / erreurs (Recherche Ville) -->
    <div class="search-feedback mt-3">
      <div v-if="isLoading" class="text-center text-muted">
        <div class="spinner-border text-primary spinner-border-sm" role="status"></div>
        <span class="ms-2">Recherche de la ville...</span>
      </div>
      <div v-if="searchError" class="alert alert-danger small p-2">
        {{ searchError }}
      </div>
      <div v-if="cityFound && searchResult && !isLoading" class="card result-card">
        <div class="card-body p-2">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p class="mb-0 fw-bold">{{ searchResult.name }}</p>
              <small class="text-muted">{{ searchResult.country }}</small>
            </div>
            <button class="btn btn-sm btn-success" @click="selectCity">Sélectionner</button>
          </div>
        </div>
      </div>
      <div
        v-if="!cityFound && !isLoading && !searchError && searchQuery && selectedCountry"
        class="text-center text-muted mt-3 small"
      >
        Aucun résultat trouvé pour "{{ searchQuery }}" dans {{ selectedCountry }}.
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles existants */
.search-screen-container {
  /* background-color: #f8f9fa; */
  /* border: 1px solid #dee2e6; */
}
.search-title {
  color: #4a0e67;
  font-weight: bold;
}
.search-feedback {
  min-height: 50px;
}
.result-card {
  background-color: #fff;
  border: 1px solid #ccc;
}
.btn-success {
  background-color: #198754;
  border-color: #198754;
}

/* Ajustements pour l'input group */
.input-group .form-select {
  /* Optionnel: ajuster la bordure si besoin entre select et input */
  border-right: 1px solid #ced4da;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group .form-control {
  border-radius: 0; /* Enlever les coins arrondis du milieu */
}
.input-group .btn-primary {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: #6f42c1;
  border-color: #6f42c1;
}
.input-group .btn-primary:hover {
  background-color: #5a32a3;
  border-color: #5a32a3;
}

/* Focus styles (optionnel mais sympa) */
.input-group .form-control:focus,
.input-group .form-select:focus {
  border-color: #a47dda;
  box-shadow: 0 0 0 0.25rem rgba(111, 66, 193, 0.25);
  z-index: 3; /* Pour que l'ombre passe au dessus des autres éléments du groupe */
}

/* Responsive */
@media (max-width: 576px) {
  .search-screen-container {
    padding: 0.8rem;
  }
  .search-title {
    font-size: 1.25rem;
  }
  /* Sur très petits écrans, on peut forcer les éléments à s'empiler */
  /* .input-group { flex-wrap: wrap; } */
  /* .input-group > * { flex-basis: 100% !important; margin-bottom: 0.5rem; } */
  /* .input-group .form-control, .input-group .form-select, .input-group .btn { border-radius: .25rem !important; } */
  /* Laisser Bootstrap gérer par défaut pour le moment */
}
</style>
