<template lang='pug'>
a(@click='signOut') Sign out
</template>


<script>
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {}
  },
  methods: {
    signOut () {
      firebase.auth().signOut().catch(function (error) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorCode: ', errorCode)
        console.log('errorMessage: ', errorMessage)
      }).then(() => this.$router.replace('/'))
    }
  }
}
</script>


<style lang='sass' scoped>
@import '~assets/sass/config/__export.sass'

</style>
