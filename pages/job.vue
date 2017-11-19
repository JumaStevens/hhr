<template lang='pug'>
section.page.job-post
  article
    header
      h3 {{ post.position }}
      h4 {{ post.business }} | {{ post.location.locality }}, {{ post.location.administrative_area_level_1 }}
    aside
      span {{ post.employment }}
      span {{ elapsedTime() }}
    main
      p {{ post.description }}
    a(:href='"mailto:" + post.contact') Contact
</template>


<script>
import firebase from '~/plugins/firebase'

export default {
  components: {},
  transition: {
    name: 'list',
    mode: 'out-in'
  },
  data () {
    return {
      post: false
    }
  },
  methods: {
    elapsedTime () {
      const now = Date.now()
      const created = this.post.created
      const elapsedTime = Math.round((now - created) / (1000 * 60 * 60 * 24))
      if (elapsedTime < 2) return 'Posted Today'
      else return 'Posted ' + elapsedTime + ' days ago'
    }
  },
  beforeMount () {
    const self = this
    const id = this.$route.params.id
    firebase.database().ref('posts/' + id).on('value', function (snapshot) {
      self.post = snapshot.val()
    })
  }
}
</script>


<style lang='sass' scoped>
@import '~assets/sass/config/__export.sass'

.list-enter-active, .list-leave-active
  transition: all 1s

.list-enter, .list-leave-to
  opacity: 0
  transform: translateY(30px)

.nav.lines
  background-color: $white

.job-post
  min-height: 100vh
  background-color: $black
  display: grid
  grid-template-columns: repeat(12, 1fr)
  grid-template-rows: 13.5vw auto
  grid-gap: 1vw

  & article
    grid-column: 4 / span 6
    grid-row: 2 / 3
    display: flex
    flex-direction: column

  & h3
    font-size: $fs3
    color: $white

  & h4
    font-size: $fs
    color: $white

  & aside

    & span
      color: $white
      font-size: $fs-1
      border-bottom: .125rem solid $white
      white-space: nowrap
      display: inline

    & span:nth-child(1)
      margin-right: $fs1

  & main
    margin-top: $fs1

    & h5
      font-size: $fs1
      color: $white

    & p
      color: $white
      font-size: $fs
      max-width: 38rem

  & a
    color: $black
    border-radius: 4px
    background-color: $white
    display: flex
    justify-content: center
    align-items: center
    padding: $fs-2 $fs-1
    margin-top: $fs2
</style>
