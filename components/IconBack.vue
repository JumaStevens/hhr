<template lang='pug'>
nuxt-link(
  to='/'
  :class='{ white: onJobPost }'
).inner-container
  div.lines.l1
  div.lines.l2
  div.lines.l3
</template>


<script>

export default {
  computed: {
    onJobPost () {
      console.log(this.$route)
      return this.$route.name === 'job'
    }
  }
}
</script>


<style lang='sass' scoped>
@import '~assets/sass/config/__export.sass'

.inner-container
  width: 1.5rem
  height: 1.25rem
  //border-radius: 50%
  background-color: transparent
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: center
  //padding: 1rem 0

  &.white .lines
    background-color: white

  .lines
    width: 100%
    height: .125rem
    background-color: $black
    transition: transform 500ms

  .l1
    transform: translate(-25%, 175%) rotate(-45deg) scaleX(.5)
  .l2
    transform: translateX(0) scaleX(.95)
  .l3
    transform: translate(-25%, -175%) rotate(45deg) scaleX(.5)
</style>
