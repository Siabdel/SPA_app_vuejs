<script setup>
import { computed, ref, watchEffect } from 'vue'

const props = defineProps({
  // Reçoit l'heure actuelle du parent
  currentTime: {
    type: Date,
    required: true,
  },
})

// Refs pour les angles de rotation (en degrés)
const hourRotation = ref(0)
const minuteRotation = ref(0)
const secondRotation = ref(0) // Ajouté pour l'aiguille des secondes

// Met à jour les rotations lorsque currentTime change
watchEffect(() => {
  const now = props.currentTime
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  // Calcul des degrés (0 degré = position 12h)
  // Aiguille des heures: 360 deg / 12 h = 30 deg/h. + Mouvement basé sur les minutes
  hourRotation.value = ((hours % 12) + minutes / 60) * 30
  // Aiguille des minutes: 360 deg / 60 min = 6 deg/min. + Mouvement basé sur les secondes
  minuteRotation.value = (minutes + seconds / 60) * 6
  // Aiguille des secondes: 360 deg / 60 s = 6 deg/s
  secondRotation.value = seconds * 6
})

// Styles calculés pour appliquer la rotation
const hourHandStyle = computed(() => ({
  transform: `rotate(${hourRotation.value}deg)`,
}))
const minuteHandStyle = computed(() => ({
  transform: `rotate(${minuteRotation.value}deg)`,
}))
const secondHandStyle = computed(() => ({
  transform: `rotate(${secondRotation.value}deg)`,
}))
</script>

<template>
  <div class="analog-clock-container text-center">
    <p class="text-muted small mb-2">Heure Actuelle</p>
    <div class="clock-face">
      <div class="clock-hand hour-hand" :style="hourHandStyle"></div>
      <div class="clock-hand minute-hand" :style="minuteHandStyle"></div>
      <div class="clock-hand second-hand" :style="secondHandStyle"></div>
      <div class="center-dot"></div>
      <!-- Marques des heures (simplifié) -->
      <div class="hour-mark mark-12">|</div>
      <div class="hour-mark mark-3">|</div>
      <div class="hour-mark mark-6">|</div>
      <div class="hour-mark mark-9">|</div>
    </div>
  </div>
</template>

<style scoped>
.analog-clock-container {
  margin-top: 1rem; /* Espace au-dessus */
}

.clock-face {
  position: relative;
  width: 150px; /* Taille de l'horloge */
  height: 150px;
  border: 4px solid #333;
  border-radius: 50%;
  margin: 0 auto; /* Centrer */
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.clock-hand {
  position: absolute;
  bottom: 50%; /* Part du centre */
  left: 50%;
  transform-origin: bottom center; /* Point de rotation */
  background-color: #333;
  border-radius: 2px;
  /* Assure que l'aiguille est au-dessus du fond mais sous le point central */
  z-index: 1;
}

.hour-hand {
  width: 4px;
  height: 40px; /* Longueur */
  background-color: #000;
  margin-left: -2px; /* Centre horizontalement (moitié de la largeur) */
}

.minute-hand {
  width: 3px;
  height: 55px;
  background-color: #222;
  margin-left: -1.5px;
}

.second-hand {
  width: 1px;
  height: 60px;
  background-color: #d9534f; /* Rouge pour les secondes */
  z-index: 2; /* Au-dessus des autres aiguilles */
  margin-left: -0.5px;
}

.center-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background-color: #d9534f;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 3; /* Au-dessus de tout */
}

/* Marques simples (pourraient être améliorées avec plus de CSS ou SVG) */
.hour-mark {
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  color: #555;
}
.mark-12 {
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
}
.mark-3 {
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
}
.mark-6 {
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
}
.mark-9 {
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
}
</style>
