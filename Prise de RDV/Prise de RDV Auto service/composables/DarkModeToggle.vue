
<template>
  <button
    class="dark-mode-toggle"
    :class="{ 'dark': isDarkMode }"
    :aria-label="toggleLabel"
    @click="toggleTheme"
    @keydown.enter.space="toggleTheme"
  >
    <span class="toggle-track">
      <span class="toggle-thumb">
        <span class="icon-moon">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S14.2,8,12,8z"/>
            <path fill="currentColor" d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"/>
            <path fill="currentColor" d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"/>
            <path fill="currentColor" d="M4.9,5.5c-0.3,0-0.5-0.1-0.7-0.3L2.3,3.3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l2.1,2.1c0.4,0.4,0.4,1,0,1.4C5.4,5.4,5.2,5.5,4.9,5.5z"/>
            <path fill="currentColor" d="M21.7,20.7c-0.3,0-0.5-0.1-0.7-0.3l-2.1-2.1c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l2.1,2.1c0.4,0.4,0.4,1,0,1.4C22.2,20.6,21.9,20.7,21.7,20.7z"/>
            <path fill="currentColor" d="M2.3,20.7c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l2.1-2.1c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-2.1,2.1C2.8,20.6,2.5,20.7,2.3,20.7z"/>
            <path fill="currentColor" d="M19.1,5.5c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l2.1-2.1c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-2.1,2.1C19.6,5.4,19.3,5.5,19.1,5.5z"/>
          </svg>
        </span>
        <span class="icon-sun">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S14.2,8,12,8z"/>
            <path fill="currentColor" d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"/>
            <path fill="currentColor" d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"/>
            <path fill="currentColor" d="M4.9,5.5c-0.3,0-0.5-0.1-0.7-0.3L2.3,3.3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l2.1,2.1c0.4,0.4,0.4,1,0,1.4C5.4,5.4,5.2,5.5,4.9,5.5z"/>
            <path fill="currentColor" d="M21.7,20.7c-0.3,0-0.5-0.1-0.7-0.3l-2.1-2.1c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l2.1,2.1c0.4,0.4,0.4,1,0,1.4C22.2,20.6,21.9,20.7,21.7,20.7z"/>
            <path fill="currentColor" d="M2.3,20.7c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l2.1-2.1c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-2.1,2.1C2.8,20.6,2.5,20.7,2.3,20.7z"/>
            <path fill="currentColor" d="M19.1,5.5c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l2.1-2.1c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-2.1,2.1C19.6,5.4,19.3,5.5,19.1,5.5z"/>
          </svg>
        </span>
      </span>
    </span>
  </button>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'

export default {
  name: 'DarkModeToggle',
  props: {
    // Permet de forcer un mode spécifique (prioritaire sur les préférences système)
    forcedMode: {
      type: String,
      default: null,
      validator: value => value === null || value === 'light' || value === 'dark'
    },
    // Enregistrer la préférence dans localStorage
    persist: {
      type: Boolean,
      default: true
    },
    // Clé de stockage localStorage
    storageKey: {
      type: String,
      default: 'darkMode'
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const isDarkMode = ref(false)
    const toggleLabel = computed(() => 
      isDarkMode.value ? 'Désactiver le mode sombre' : 'Activer le mode sombre'
    )

    // Vérifie les préférences système
    const checkSystemPreference = () => {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // Charge la préférence depuis localStorage
    const loadSavedPreference = () => {
      if (!props.persist) return null
      const saved = localStorage.getItem(props.storageKey)
      if (saved === 'true') return true
      if (saved === 'false') return false
      return null
    }

    // Applique le thème au document
    const applyTheme = (dark) => {
      isDarkMode.value = dark
      document.documentElement.classList.toggle('dark-mode', dark)
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
      emit('change', dark)
      
      if (props.persist) {
        localStorage.setItem(props.storageKey, dark)
      }
    }

    // Bascule entre les thèmes
    const toggleTheme = () => {
      if (props.forcedMode) return
      applyTheme(!isDarkMode.value)
    }

    // Initialisation
    onMounted(() => {
      if (props.forcedMode) {
        applyTheme(props.forcedMode === 'dark')
        return
      }

      const savedPreference = loadSavedPreference()
      if (savedPreference !== null) {
        applyTheme(savedPreference)
      } else {
        applyTheme(checkSystemPreference())
      }

      // Surveille les changements système
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener('change', (e) => {
          if (!props.forcedMode && !props.persist) {
            applyTheme(e.matches)
          }
        })
      }
    })

    // Watch forcedMode changes
    watch(() => props.forcedMode, (newVal) => {
      if (newVal) {
        applyTheme(newVal === 'dark')
      }
    })

    return {
      isDarkMode,
      toggleLabel,
      toggleTheme
    }
  }
}
</script>

<style lang="scss" scoped>
.dark-mode-toggle {
  --toggle-width: 52px;
  --toggle-height: 28px;
  --toggle-padding: 2px;
  --thumb-size: calc(var(--toggle-height) - (var(--toggle-padding) * 2));
  --transition-speed: 0.3s;
  
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--toggle-width);
  height: var(--toggle-height);
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:focus-visible {
    .toggle-track {
      box-shadow: 0 0 0 2px var(--bs-primary);
    }
  }
  
  .toggle-track {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    background-color: var(--bs-gray-300);
    transition: background-color var(--transition-speed) ease;
    
    .dark & {
      background-color: var(--bs-gray-700);
    }
  }
  
  .toggle-thumb {
    position: absolute;
    top: var(--toggle-padding);
    left: var(--toggle-padding);
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform var(--transition-speed) ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    
    .dark & {
      transform: translateX(calc(var(--toggle-width) - var(--thumb-size) - (var(--toggle-padding) * 2)));
      background-color: var(--bs-dark);
    }
  }
  
  .icon-moon,
  .icon-sun {
    position: absolute;
    display: flex;
    opacity: 0;
    transition: opacity 0.2s ease;
    color: var(--bs-gray-600);
    
    svg {
      display: block;
    }
    
    .dark & {
      color: var(--bs-gray-300);
    }
  }
  
  .icon-moon {
    right: 6px;
    
    .dark & {
      opacity: 1;
    }
  }
  
  .icon-sun {
    left: 6px;
    
    :not(.dark) & {
      opacity: 1;
    }
  }
}
</style>