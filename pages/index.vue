<template lang='pug'>
section.container
  MainHeader.title
  JobList.jobs
</template>

<script>
import MainHeader from '~/components/MainHeader.vue'
import JobList from '~/components/JobList.vue'

export default {
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  components: {
    MainHeader,
    JobList
  }
}
</script>

<style lang='sass' scoped>
@import '~assets/sass/config/__export.sass'

.container
  position: relative
  width: 100vw
  min-height: 100vh
  display: grid
  grid-template-columns: repeat(12, 1fr)
  grid-template-rows: 10vh 80vh 10vh 10vh auto
  grid-auto-rows: minmax(100px, auto)
  grid-gap: 1%

.title
  grid-column: 2 / span 2
  grid-row: 2 / 3
  align-self: end

.jobs
  //height: 100vh
  width: 100%
  grid-column: 2 / span 10
  grid-row: 5 / 7
  +mq-s
    grid-column: 3 / span 8
    grid-row: 5 / 7
  +mq-m
    grid-column: 4 / span 6
    grid-row: 5 / 7

</style>
