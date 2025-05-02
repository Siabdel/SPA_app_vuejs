
const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        const height = ref(null);
        const weight = ref(null);
        const imc = ref(null);

        const calculateIMC = () => {
            // Calcul de l'IMC: poids (kg) / (taille (m))²
            const heightInMeters = height.value / 100;
            imc.value = weight.value / (heightInMeters * heightInMeters);
        };

        // Interprétation de l'IMC
        const interpretation = computed(() => {
            if (imc.value === null) return '';
            
            if (imc.value < 16.5) return 'Famine';
            if (imc.value < 18.5) return 'Maigreur';
            if (imc.value < 25) return 'Corpulence normale';
            if (imc.value < 30) return 'Surpoids';
            if (imc.value < 35) return 'Obésité modérée';
            if (imc.value < 40) return 'Obésité sévère';
            return 'Obésité morbide';
        });

        // Catégorie de l'IMC
        const category = computed(() => {
            if (imc.value === null) return '';
            
            if (imc.value < 16.5) return 'Famine';
            if (imc.value < 18.5) return 'Maigreur';
            if (imc.value < 25) return 'Normal';
            if (imc.value < 30) return 'Surpoids';
            if (imc.value < 35) return 'Obésité classe 1';
            if (imc.value < 40) return 'Obésité classe 2';
            return 'Obésité classe 3';
        });

        // Classe CSS pour la barre de progression en fonction de l'IMC
        const imcClass = computed(() => {
            if (imc.value === null) return '';
            
            if (imc.value < 18.5) return 'bg-underweight';
            if (imc.value < 25) return 'bg-normal';
            if (imc.value < 30) return 'bg-overweight';
            if (imc.value < 35) return 'bg-obese1';
            return 'bg-obese2';
        });

        // Largeur de la barre de progression (pour l'affichage visuel)
        const progressWidth = computed(() => {
            if (imc.value === null) return 0;
            
            // On limite l'affichage entre 15 et 40 pour une meilleure visualisation
            const min = 15;
            const max = 40;
            const clamped = Math.min(max, Math.max(min, imc.value));
            return ((clamped - min) / (max - min)) * 100;
        });

        return {
            height,
            weight,
            imc,
            interpretation,
            category,
            imcClass,
            progressWidth,
            calculateIMC
        };
    }
}).mount('#app');