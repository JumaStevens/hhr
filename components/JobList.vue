<template lang='pug'>
ul
  li(v-for='post in jobPosts')
    header
      h3 {{ post.position }}
      h4 {{ post.business }} | {{ post.location.locality }}, {{ post.location.administrative_area_level_1 }}
    aside
      p {{ post.employment }}
      p {{ elapsedTime(post) }}
    nuxt-link(:to='{name: "job", params: { id: post.key }}').link Read More
</template>


<script>
export default {
  computed: {
    jobPosts () {
      return this.$store.state.jobPosts
    }
  },
  methods: {
    elapsedTime (post) {
      const now = Date.now()
      const created = post.created
      const elapsedTime = Math.round((now - created) / (1000 * 60 * 60 * 24))
      if (elapsedTime < 2) return 'Posted Today'
      else return 'Posted ' + elapsedTime + ' days ago'
    }
  }
}
</script>


<style lang='sass' scoped>
@import '~assets/sass/config/__export.sass'

ul
  display: grid
  grid-gap: $fs 0
  margin-bottom: 80vh
  +mq-m
    grid-template-columns: repeat(4, 1fr)
    grid-auto-rows: $fs3
    grid-auto-flow: row
    grid-gap: $fs2 1vw

li
  align-self: start
  grid-column: 1 / span 4
  position: relative
  padding: $fs-1
  background: white
  display: grid
  grid-gap: calc(100vw/100)
  grid-template-columns: repeat(8, 1fr)
  grid-template-rows: repeat(3, auto)

  // &::before
  //   //content: ''
  //   position: absolute
  //   top: $fs-2
  //   left: $fs-2
  //   width: calc(100%/8*6)
  //   height: calc(100%-#{$fs-2}*2)
  //   background: white

li:nth-child(odd)
  +mq-m
    grid-column: 1 / span 2
li:nth-child(even)
  +mq-m
    grid-column: 3 / span 2

header
  position: relative
  z-index: 2
  grid-column: 1 / -2
  grid-row: 1 / 2

aside
  position: relative
  z-index: 2
  grid-column: 1 / 3
  grid-row: 2 / span 1
  display: flex
  align-items: flex-end
  padding-bottom: $fs
  +mq-m
    grid-row: 2 / span 2
    padding-bottom: unset

  & p:last-child
    margin-left: $fs/2


.link, a
  grid-column: 1 / 9
  grid-row: 3 / span 1
  min-height: $fs1
  position: relative
  line-height: 0
  font-size: 0
  color: transparent
  background: $black
  box-shadow: -2px 2px 6px lighten($black, 65%)
  +mq-m
    grid-column: 8 / 9
    grid-row: 1 / 4
    margin-top: unset



  &::after,
  &::before
    content: ''
    position: absolute
    top: 50%
    left: 50%
    width: $fs-1
    height: 0.125rem
    background: white
    transition: transform 100ms
  &::after
    transform: translate(-50%, -50%) rotate(0deg)
  &::before
    transform: translate(-50%, -50%) rotate(90deg)
  &:hover::before
    transform: translate(-50%, -50%) rotate(-135deg)
  &:hover::after
    transform: translate(-50%, -50%) rotate(-45deg)

h3
  font-size: $fs1

h4
  font-size: $fs-1

p
  font-size: $fs-1
  border-bottom: .125rem solid $black
  white-space: nowrap

</style>
