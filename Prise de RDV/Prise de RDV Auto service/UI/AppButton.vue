
<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled || loading"
    @click="handleClick"
    @mousedown="startRipple"
    @mouseup="endRipple"
    @mouseleave="endRipple"
    @keydown.enter.space="handleKeydown"
    @keyup.enter.space="handleKeyup"
  >
    <span v-if="$slots.icon" class="button-icon">
      <slot name="icon"></slot>
    </span>
    
    <span class="button-content">
      <slot></slot>
    </span>
    
    <span v-if="loading" class="button-loader">
      <svg viewBox="0 0 50 50" class="spinner">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
      </svg>
    </span>
    
    <span v-if="showRipple" class="ripple" :style="rippleStyle"></span>
  </button>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'

export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: 'button',
      validator: value => ['button', 'submit', 'reset'].includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: value => [
        'primary', 
        'secondary', 
        'success', 
        'danger', 
        'warning', 
        'info', 
        'light', 
        'dark',
        'outline-primary',
        'outline-secondary',
        'outline-dark'
      ].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    rounded: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const { isDarkMode } = useTheme()
    
    // Ripple effect
    const showRipple = ref(false)
    const rippleX = ref(0)
    const rippleY = ref(0)
    const rippleSize = ref(0)
    
    const rippleStyle = computed(() => ({
      left: `${rippleX.value}px`,
      top: `${rippleY.value}px`,
      width: `${rippleSize.value}px`,
      height: `${rippleSize.value}px`
    }))
    
    // Classes dynamiques
    const buttonClasses = computed(() => [
      'app-button',
      `button-${props.variant}`,
      `button-${props.size}`,
      {
        'button-rounded': props.rounded,
        'button-block': props.block,
        'button-loading': props.loading,
        'button-dark': isDarkMode.value,
        'button-disabled': props.disabled
      }
    ])
    
    // Handlers
    const handleClick = (e) => {
      if (!props.disabled && !props.loading) {
        emit('click', e)
      }
    }
    
    const startRipple = (e) => {
      if (props.disabled || props.loading) return
      
      const rect = e.currentTarget.getBoundingClientRect()
      rippleX.value = e.clientX - rect.left
      rippleY.value = e.clientY - rect.top
      rippleSize.value = Math.max(rect.width, rect.height) * 2
      
      showRipple.value = true
    }
    
    const endRipple = () => {
      showRipple.value = false
    }
    
    const handleKeydown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.currentTarget.classList.add('button-active')
      }
    }
    
    const handleKeyup = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.currentTarget.classList.remove('button-active')
        handleClick(e)
      }
    }
    
    return {
      buttonClasses,
      showRipple,
      rippleStyle,
      handleClick,
      startRipple,
      endRipple,
      handleKeydown,
      handleKeyup
    }
  }
}
</script>

<style lang="scss" scoped>
.app-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  overflow: hidden;
  cursor: pointer;
  
  // Variants de taille
  &.button-small {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  &.button-medium {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
  }
  
  &.button-large {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  
  // Variants de style
  &.button-primary {
    background-color: var(--bs-primary);
    color: white;
    
    &:hover:not(.button-disabled) {
      background-color: darken(var(--bs-primary), 10%);
    }
  }
  
  &.button-secondary {
    background-color: var(--bs-secondary);
    color: white;
    
    &:hover:not(.button-disabled) {
      background-color: darken(var(--bs-secondary), 10%);
    }
  }
  
  &.button-outline-primary {
    background-color: transparent;
    border-color: var(--bs-primary);
    color: var(--bs-primary);
    
    &:hover:not(.button-disabled) {
      background-color: rgba(var(--bs-primary-rgb), 0.1);
    }
  }
  
  &.button-outline-secondary {
    background-color: transparent;
    border-color: var(--bs-secondary);
    color: var(--bs-secondary);
    
    &:hover:not(.button-disabled) {
      background-color: rgba(var(--bs-secondary-rgb), 0.1);
    }
  }
  
  &.button-outline-dark {
    background-color: transparent;
    border-color: var(--bs-dark);
    color: var(--bs-dark);
    
    &:hover:not(.button-disabled) {
      background-color: rgba(var(--bs-dark-rgb), 0.1);
    }
  }
  
  // Dark mode adaptations
  &.button-dark {
    &.button-outline-dark {
      border-color: var(--bs-light);
      color: var(--bs-light);
      
      &:hover:not(.button-disabled) {
        background-color: rgba(var(--bs-light-rgb), 0.1);
      }
    }
  }
  
  // États
  &.button-rounded {
    border-radius: 50px;
  }
  
  &:not(.button-rounded) {
    border-radius: 6px;
  }
  
  &.button-block {
    display: flex;
    width: 100%;
  }
  
  &.button-disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
  
  &.button-active {
    transform: translateY(1px);
  }
  
  &.button-loading {
    .button-content {
      opacity: 0;
    }
  }
  
  // Éléments internes
  .button-icon {
    display: inline-flex;
    margin-right: 0.5rem;
    font-size: 1.2em;
  }
  
  .button-content {
    transition: opacity 0.2s ease;
  }
  
  .button-loader {
    position: absolute;
    
    .spinner {
      width: 1.5em;
      height: 1.5em;
      animation: rotate 1s linear infinite;
      
      circle {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
      }
    }
  }
  
  // Ripple effect
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  
  // Animations
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
  
  @keyframes ripple {
    to {
      transform: scale(1);
      opacity: 0;
    }
  }
}
</style>