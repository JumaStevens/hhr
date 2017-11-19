<template lang='pug'>
section.page-post
  PostJob
</template>


<script>
import PostJob from '~/components/PostJob.vue'

export default {
  components: {
    PostJob
  },
  transition: {
    name: 'list',
    mode: 'out-in'
  },
  data () {
    return {}
  },
  beforeCreate () {
    if (!this.$store.state.currentUser) {
      this.$router.replace('/auth')
    }
  }
}
</script>


<style lang='sass'>
@import '~assets/sass/config/__export.sass'

.page-post
  width: 100%
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center

</style>
