<template lang='pug'>
section.container.flex-col
  update-job(
    v-for='post in jobPosts'
    :key='post.key'
    :post='post'
  ).post
</template>


<script>
import UpdateJob from '~/components/UpdateJob.vue'

export default {
  components: {
    UpdateJob
  },
  transition: {
    name: 'list',
    mode: 'out-in'
  },
  data () {
    return {}
  },
  computed: {
    jobPosts () {
      return this.$store.state.jobPosts
    }
  },
  beforeCreate () {
    if (!this.$store.state.currentUser) {
      this.$router.replace('/auth')
    }
  }
}
</script>


<style lang='sass' scoped>
@import '~assets/sass/config/__export.sass'

.container
  width: 100%
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center

.post
  margin-bottom: 40px
  &:first-child
    margin-top: 40px

</style>
