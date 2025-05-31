<template>
  <div v-if="visible" :class="`alert alert-${type} alert-dismissible fade show`" role="alert">
    {{ message }}
    <button type="button" class="btn-close" @click="hide"></button>
  </div>
</template>

<script>
export default {
  props: ['message', 'type', 'visible'],
  methods: {
    hide() {
      this.$emit('hide')
    }
  }
}
</script>