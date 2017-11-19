<template lang='pug'>
section(:class='{ active: menuOpen }')
  nav
    nuxt-link(
      to='/'
      @click.native='closeMenu'
    ).link View Jobs
    nuxt-link(
      to='/post'
      @click.native='closeMenu'
    ).link Create Job
    nuxt-link(
      v-if='currentUserPosts'
      to='/update'
      @click.native='closeMenu'
    ).link Posts ({{ currentUserPosts }})
    nuxt-link(
      v-if='!currentUser'
      to='/auth'
      @click.native='closeMenu'
    ).link Login / Sign up
    sign-out(
      v-if='currentUser'
      @click.native='closeMenu'
    ).link
</template>


<script>
import SignOut from '~/components/SignOut.vue'

export default {
  components: {
    SignOut
  },
  data () {
    return {}
  },
  computed: {
    menuOpen () {
      return this.$store.state.menuOpen
    },
    currentUser () {
      return this.$store.getters.getCurrentUser
    },
    currentUserPosts () {
      const posts = this.$store.getters.getCurrentUserPosts
      return posts.length
    }
  },
  methods: {
    closeMenu () {
      this.$store.commit('toggleMenuOpen')
    }
  }
}
</script>


<style lang='sass' scoped>
@import '~assets/sass/config/__export.sass'

section
  position: fixed
  top: 0
  left: 0
  z-index: 99
  width: 100%
  min-height: 100vh
  background: $black
  opacity: 0
  visibility: hidden
  transition: opacity 250ms, visibility 0ms 250ms

  &.active
    opacity: 1
    visibility: visible
    transition: opacity 500ms, visibility 0ms

nav
  margin-top: 25vh
  display: flex
  flex-direction: column
  align-items: center

a
  position: relative
  font-size: $fs1
  color: $white
  text-transform: uppercase
  margin-bottom: $fs
  +mq-s
    font-size: $fs2
  +mq-m
    font-size: $fs3

  &:last-child
    margin-bottom: unset

  // hover line
  &::after
    content: ''
    width: 100%
    height: 2px
    position: absolute
    left: 0
    bottom: $fs-3
    opacity: 0
    background: white
    transition: transform 500ms, opacity 500ms
    +mq-s
      bottom: $fs-1

  &:hover::after
    opacity: 1
    transform: translateY($fs-3)
    +mq-s
      transform: translateY($fs-1)




</style>
