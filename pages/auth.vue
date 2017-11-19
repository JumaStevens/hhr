<template lang='pug'>
.container
  form(@submit.prevent='validateForm').form.flex-col
    h4.form-title Login / Sign Up

    fieldset.form-fieldset
      input(
        v-model='email'
        type='text'
        name='email'
        v-validate='"required|email"'
        key='contact-email'
        required
      ).form-input
      label.form-label Email
      .form-border
      .form-bar

    fieldset.form-fieldset
      input(
        v-model='password'
        type='text'
        required
      ).form-input
      label.form-label Password
      .form-border
      .form-bar

    .flex
      input(
        type='submit'
        value='Sign Up'
        @click='submitType = "createUser"'
      ).form-submit

      input(
        type='submit'
        value='Login'
        @click='submitType = "signIn"'
      ).form-submit
</template>


<script>
import firebase from '~/plugins/firebase'

export default {
  transition: {
    name: 'list',
    mode: 'out-in'
  },
  data () {
    return {
      email: '',
      password: '',
      submitType: ''
    }
  },
  methods: {
    validateForm () {
      console.log('submitType: ', this.submitType)
      console.log('validate error: ', this.errors)
      if (this.errors.items.length > 0) {
        return
      }
      this.$validator.validateAll().then(res => {
        if (this.submitType === 'createUser') {
          this.checkUserExist()
        } else if (this.submitType === 'signIn') {
          this.signIn()
        }
      })
    },
    checkUserExist () {
      firebase.auth().fetchProvidersForEmail(this.email).catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorCode: ', errorCode)
        console.log('errorMessage: ', errorMessage)
      }).then(providers => {
        if (providers.length > 0) {
          this.signIn()
        } else {
          this.createUser()
        }
      })
    },
    createUser () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorCode: ', errorCode)
        console.log('errorMessage: ', errorMessage)
      }).then(user => {
        this.$store.dispatch('getCurrentUser')
        this.$router.replace('post')
      })
    },
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorCode: ', errorCode)
        console.log('errorMessage: ', errorMessage)
      }).then(user => {
        this.$store.dispatch('getCurrentUser')
        this.$router.replace('post')
      })
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

.form-submit
  width: calc(50% - 8px)
  &:first-child
    margin-right: auto
    color: $black
    background: transparent
    border: 2px solid $black
    padding: calc(#{$fs-1} - 4px) 0
</style>
