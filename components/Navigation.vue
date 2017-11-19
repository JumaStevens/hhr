<template lang='pug'>
section
  icon-menu(
    @click.native='toggleMenu'
    v-show='onIndex'
  )
  icon-back(
    v-show='notOnIndex'
  )
  nuxt-link(
    v-show='onIndexMenuClose'
    to='/post'
  ).post Create Job
</template>


<script>
import IconMenu from '~/components/IconMenu.vue'
import IconBack from '~/components/IconBack.vue'

export default {
  components: {
    IconMenu,
    IconBack
  },
  data () {
    return {}
  },
  computed: {
    onIndex () {
      return this.$route.name === 'index'
    },
    onIndexMenuClose () {
      return this.onIndex && !this.$store.state.menuOpen
    },
    notOnIndex () {
      return !this.onIndex
    }
  },
  methods: {
    toggleMenu () {
      this.$store.commit('toggleMenuOpen')
    }
  },
  created () {
    console.log('route: ', this.$route)
  }
}
</script>


<style lang='sass' scoped>
@import '~assets/sass/config/__export.sass'

section
  position: fixed
  z-index: 100
  left: calc(100vw/12)
  top: 10vh
  width: calc((100vw/12)*10)
  display: flex
  justify-content: space-between
  align-items: center

.post
  border: .125rem solid $black
  border-radius: 25px
  padding: $fs-2 $fs-1
</style>
