<template lang='pug'>
button.icon-menu
  div(
    :class='{ open: menuOpen, close: !menuOpen }'
  ).inner-container
    div.lines.l1
    div.lines.l2
    div.lines.l3
</template>


<script>

export default {
  computed: {
    menuOpen () {
      return this.$store.state.menuOpen
    }
  }
}
</script>


<style lang='sass' scoped>
@import '~assets/sass/config/__export.sass'

.icon-menu
  background-color: transparent

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

.lines
  width: 100%
  height: .125rem
  background-color: $black
  animation-duration: 500ms
  animation-fill-mode: forwards
  transition: background-color 500ms

// menu is close
.close
  & .l1
    animation-name: close-l1
  & .l2
    animation-name: close-l2
  & .l3
    animation-name: close-l3
// menu is open
.open
  & .lines
    background: $white
  & .l1
    animation-name: open-l1
  & .l2
    animation-name: open-l2
  & .l3
    animation-name: open-l3

// menu icon open animation
@keyframes open-l1
  50%
    transform: translateY(calc(0.75rem - 150%)) scale(1) rotate(0deg)
  100%
    transform: translateY(calc(0.75rem - 150%)) scale(1) rotate(45deg)
@keyframes open-l2
  50%, 100%
    transform: scale(0)
@keyframes open-l3
  50%
    transform: translateY(calc(-0.75rem + 150%)) scale(1) rotate(0deg)
  100%
    transform: translateY(calc(-0.75rem + 150%)) scale(1) rotate(-45deg)

// menu icon close animation
@keyframes close-l1
  0%
    transform: translateY(calc(0.75rem - 150%)) scale(1) rotate(45deg)
  50%
    transform: translateY(calc(0.75rem - 150%)) scale(1) rotate(0deg)
  100%
    transform: translateY(0) scale(1) rotate(0deg)
@keyframes close-l2
  0%, 50%
    transform: scale(0)
  100%
    transform: scale(1)
@keyframes close-l3
  0%
    transform: translateY(calc(-0.75rem + 150%)) scale(1) rotate(-45deg)
  50%
    transform: translateY(calc(-0.75rem + 150%)) scale(1) rotate(0deg)
  100%
    transform: translateY(0) scale(1) rotate(0deg)
</style>
