<template lang='pug'>
form(@submit.prevent='validateForm').form.flex-col
  h4.form-title Post a Job

  fieldset.form-fieldset
    input(
      v-model='position'
      type='text'
      required
    ).form-input
    label.form-label Position
    .form-border
    .form-bar

  fieldset.form-fieldset
    .flex.flex-wrap
      .form-radio-container.flex
        input(
          v-model='employment'
          type='radio'
          value='Full Time'
          checked
        ).form-radio
        label.form-label--radio Full Time
      .form-radio-container.flex
        input(
          v-model='employment'
          type='radio'
          value='Part Time'
        ).form-radio
        label.form-label--radio Part Time

  fieldset.form-fieldset
    input(
      v-model='business'
      type='text'
      required
    ).form-input
    label.form-label Restaurant
    .form-border
    .form-bar

  fieldset.form-fieldset
    vue-google-autocomplete(
      id='map'
      ref='address'
      @placechanged='setLocation'
      placeholder=''
      required
    ).form-input
    label.form-label Location
    .form-border
    .form-bar

  fieldset.form-fieldset
    textarea(
      v-model='description'
      rows='4'
      required
    ).form-input
    label.form-label.form-label--textarea Description
    .form-border
    .form-bar

  fieldset.form-fieldset
    input(
      v-model='contact'
      type='text'
      name='email'
      v-validate='"required|email"'
      key='contact-email'
      required
    ).form-input
    label.form-label Email
    .form-border
    .form-bar

  input(
    type='submit'
    value='Submit'
    :class='{"error": errors.any()}'
    ).form-submit
</template>


<script>
import firebase from '~/plugins/firebase'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  components: {
    VueGoogleAutocomplete
  },
  data () {
    return {
      position: '',
      business: '',
      location: '',
      employment: 'Full Time',
      description: '',
      contact: ''
    }
  },
  methods: {
    setLocation (addressData, placeResultData, id) {
      // @param {Object} addressData Data of the found location
      // @param {Object} placeResultData PlaceResult object
      // @param {String} id Input container ID
      this.location = addressData
    },
    validateForm () {
      console.log('validate error: ', this.errors)
      this.$validator.validateAll().then(res => {
        this.submitForm()
      })
    },
    submitForm () {
      const data = {
        position: this.position,
        business: this.business,
        location: this.location,
        employment: this.employment,
        description: this.description,
        contact: this.contact,
        created: Date.now(),
        user_email: firebase.auth().currentUser.email
      }
      firebase.database().ref('posts/').push().set(data).then(res => {
        this.submitSuccess(res)
      }).catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorCode: ', errorCode)
        console.log('errorMessage: ', errorMessage)
        this.submitError(error)
      })
    },
    submitSuccess (res) {
      console.log(res)
      this.$router.replace('/')
      this.$store.dispatch('getJobPosts')
    },
    submitError (error) {
      console.log(error)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.contact = this.$store.state.currentUser.email
    })
  }
}
</script>


<style lang='sass' scoped>
@import '~assets/sass/main.sass'

</style>
