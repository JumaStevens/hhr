<template lang='pug'>
.app
  navigation
  navigation-menu
  nuxt
</template>


<script>
import Navigation from '~/components/Navigation.vue'
import NavigationMenu from '~/components/NavigationMenu.vue'

export default {
  components: {
    Navigation,
    NavigationMenu
  },
  beforeCreate () {
    this.$store.dispatch('getCurrentUser')
  }
}
</script>


<style lang='sass'>
.app
  position: relative
  width: 100vw
  min-height: 100vh
</style>
