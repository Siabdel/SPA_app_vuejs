<script setup>
import { ref, onMounted, computed } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap CSS
import './assets/main.css'; // Votre fichier CSS personnalisé

// --- Configuration ---
const city = ref('Paris'); // Ville par défaut
const country = ref('France'); // Pays par défaut
const mosqueName = ref('Mosquée locale (exemple)'); // Nom de la mosquée (à adapter)
const prayerTimeMethod = ref(2); // Méthode de calcul (2 = ISNA, à ajuster si besoin)

// --- États Réactifs ---
const prayerTimes = ref(null);
const loading = ref(true);
const error = ref(null);
const currentDate = ref(new Date());
const currentTime = ref(new Date()); // Pour la mise à jour de l'heure actuelle

// --- API Fetch ---
const fetchPrayerTimes = async () => {
  loading.value = true;
  error.value = null;
  try {
    // Utilisation de l'API Aladhan (pas besoin de clé pour cet endpoint simple)
    // Documentation: https://aladhan.com/prayer-times-api
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city.value}&country=${country.value}&method=${prayerTimeMethod.value}`);
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.statusText} (Status: ${response.status})`);
    }
    const data = await response.json();
    if (data.code === 200) {
      // On ne garde que les prières principales + lever du soleil
      const mainPrayers = {
        Fajr: data.data.timings.Fajr,
        Sunrise: data.data.timings.Sunrise,
        Dhuhr: data.data.timings.Dhuhr,
        Asr: data.data.timings.Asr,
        Maghrib: data.data.timings.Maghrib,
        Isha: data.data.timings.Isha,
      };
      prayerTimes.value = mainPrayers;
    } else {
      throw new Error(data.status || 'Erreur lors de la récupération des horaires.');
    }
  } catch (err) {
    console.error("Erreur fetchPrayerTimes:", err);
    error.value = err.message;
    prayerTimes.value = null; // Réinitialiser en cas d'erreur
  } finally {
    loading.value = false;
  }
};

// --- Calcul de la Prochaine Prière ---
const nextPrayerInfo = computed(() => {
  if (!prayerTimes.value) return { name: '...', time: '...' };

  const now = currentTime.value; // Utilise l'heure mise à jour
  const todayStr = now.toISOString().split('T')[0]; // Format YYYY-MM-DD

  const prayerMoments = Object.entries(prayerTimes.value)
    // Convertir les heures HH:mm en objets Date complets pour aujourd'hui
    .map(([name, time]) => ({
      name,
      time,
      dateObj: new Date(`${todayStr}T${time}:00`),
    }))
    // Garder seulement les prières standard pour la comparaison (exclure Sunrise par ex. pour "prochaine prière")
    .filter(p => ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(p.name))
    // Trier par heure
    .sort((a, b) => a.dateObj - b.dateObj);

  // Trouver la première prière après l'heure actuelle
  const nextPrayer = prayerMoments.find(p => p.dateObj > now);

  // Si on a trouvé une prière pour aujourd'hui
  if (nextPrayer) {
    return { name: nextPrayer.name, time: nextPrayer.time };
  } else {
    // Si toutes les prières d'aujourd'hui sont passées, la prochaine est Fajr demain
    // Pour la simplicité de l'affichage, on affiche Fajr d'aujourd'hui
    // Une version plus complexe irait chercher les horaires de demain
    const fajr = prayerMoments.find(p => p.name === 'Fajr');
    return { name: `Fajr (Demain)`, time: fajr ? fajr.time : '...' };
  }
});

// --- Formatage ---
const formattedDate = computed(() => {
  return currentDate.value.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

// --- Cycle de Vie ---
onMounted(() => {
  fetchPrayerTimes();
  // Met à jour la date et l'heure actuelle toutes les minutes
  setInterval(() => {
    currentDate.value = new Date(); // Met à jour la date affichée au cas où on passe minuit
    currentTime.value = new Date(); // Met à jour l'heure pour le calcul de la prochaine prière
  }, 60000); // Toutes les 60 secondes

  // Met à jour l'heure actuelle plus fréquemment pour affichage si besoin (optionnel)
  // setInterval(() => {
  //   currentTime.value = new Date();
  // }, 1000);
});

</script>

<template>
  <div class="mawaqit-container container mt-4">
    <div class="card shadow-sm prayer-card">
      <div class="card-header text-center bg-primary text-white">
        <h1 class="h4 mb-0">Horaires des Prières</h1>
      </div>
      <div class="card-body">
        <!-- Affichage Erreur -->
        <div v-if="error" class="alert alert-danger">
          Erreur: {{ error }}
        </div>

        <!-- Affichage Chargement -->
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Chargement...</span>
          </div>
          <p class="mt-2">Chargement des horaires...</p>
        </div>

        <!-- Affichage Principal -->
        <div v-if="!loading && prayerTimes && !error">
          <div class="location-info text-center mb-3 pb-3 border-bottom">
            <h2 class="h5 city-name">{{ city }}, {{ country }}</h2>
            <p class="mosque-name text-muted mb-1">{{ mosqueName }}</p>
            <p class="current-date small">{{ formattedDate }}</p>
          </div>

          <div class="next-prayer text-center mb-4">
            <h3 class="h6 text-uppercase text-muted">Prochaine Prière</h3>
            <p class="display-6 next-prayer-name">{{ nextPrayerInfo.name }}</p>
            <p class="h3 next-prayer-time">{{ nextPrayerInfo.time }}</p>
          </div>

          <ul class="list-group list-group-flush prayer-times-list">
            <li v-for="(time, name) in prayerTimes" :key="name"
                class="list-group-item d-flex justify-content-between align-items-center prayer-item"
                :class="{ 'active-prayer': name === nextPrayerInfo.name.replace(' (Demain)', '') }">
              <span class="prayer-name">{{ name }}</span>
              <span class="prayer-time fw-bold">{{ time }}</span>
            </li>
          </ul>
        </div>
         <div v-else-if="!loading && !error && !prayerTimes" class="alert alert-warning">
            Aucune donnée d'horaire de prière trouvée pour cette ville ou méthode.
        </div>
      </div>
       <div class="card-footer text-center text-muted small">
        Horaires fournis par AlAdhan.com (Méthode: {{ prayerTimeMethod }})
      </div>
    </div>
  </div>
</template>

<style>
/* Import de police optionnelle (ex: Google Fonts) */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

body {
  background-color: #f8f9fa; /* Fond légèrement gris */
  font-family: 'Roboto', sans-serif;
}

.mawaqit-container {
  max-width: 600px; /* Limite la largeur sur les grands écrans */
}

.prayer-card {
  border: none; /* Supprime la bordure par défaut de la carte */
  background-color: #ffffff; /* Fond blanc pour la carte */
}

.card-header {
  border-bottom: none; /* Supprime la ligne sous le header */
}

.location-info .city-name {
  color: #333;
  font-weight: bold;
}

.location-info .mosque-name {
    font-size: 0.9rem;
}

.location-info .current-date {
    font-size: 0.85rem;
    color: #6c757d;
}

.next-prayer {
  padding: 1rem;
  background-color: #e9f5ff; /* Fond bleu très clair */
  border-radius: 0.25rem;
  margin-left: -1rem; /* Compense le padding du card-body */
  margin-right: -1rem; /* Compense le padding du card-body */
}

.next-prayer .next-prayer-name {
  color: #0d6efd; /* Bleu Bootstrap primaire */
  font-weight: bold;
}
.next-prayer .next-prayer-time {
    color: #333;
}

.prayer-times-list .prayer-item {
  border-right: none;
  border-left: none;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
}

.prayer-times-list .prayer-item:first-child {
  border-top: none;
}
.prayer-times-list .prayer-item:last-child {
  border-bottom: none;
}

.prayer-times-list .prayer-name {
  color: #555;
}

.prayer-times-list .prayer-time {
  color: #000;
}

/* Style pour la prière active/prochaine */
.active-prayer {
  background-color: #cfe2ff; /* Fond bleu clair Bootstrap */
  color: #052c65 !important; /* Texte bleu foncé */
  border-left: 5px solid #0d6efd !important; /* Bordure bleue à gauche */
  margin-left: -5px; /* Compense la bordure */
  padding-left: calc(1rem + 5px); /* Ajuste le padding */
}

.active-prayer .prayer-name,
.active-prayer .prayer-time {
    color: #052c65 !important; /* Assure que le texte est bien visible */
    font-weight: bold;
}

/* Ajustements responsives si nécessaire */
@media (max-width: 576px) {
  .next-prayer .display-6 {
    font-size: 2rem; /* Réduit la taille du nom de la prière sur petits écrans */
  }
   .next-prayer .h3 {
    font-size: 1.5rem; /* Réduit la taille de l'heure sur petits écrans */
  }
   .prayer-card .card-body,
   .prayer-card .card-header,
   .prayer-card .card-footer {
       padding-left: 0.8rem;
       padding-right: 0.8rem;
   }
   .next-prayer {
     margin-left: 0;
     margin-right: 0;
     padding: 0.8rem;
   }
   .active-prayer {
       padding-left: calc(0.8rem + 5px); /* Ajuste le padding pour mobile */
   }

}

</style>