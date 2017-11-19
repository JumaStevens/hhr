<template lang='pug'>
form(@submit.prevent='validateForm').form.flex-col
  h4.form-title Update Job Post

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
      :id='"map" + post.key'
      ref='address'
      @placechanged='setLocation'
      placeholder=''
      v-model='location'
      text='hello'
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

  div.flex-row.submit-container
    input(
      type='submit'
      value='Delete'
      @click='submitType="delete"'
      ).form-submit.delete
    input(
      type='submit'
      value='Update'
      @click='submitType="update"'
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
  props: {
    post: {
      required: true
    }
  },
  data () {
    return {
      position: this.post.position,
      business: this.post.business,
      location: this.post.location,
      employment: this.post.employment,
      description: this.post.description,
      contact: this.post.user_email,
      submitType: ''
    }
  },
  methods: {
    setLocation (addressData, placeResultData, id) {
      // @param {Object} addressData Data of the found location
      // @param {Object} placeResultData PlaceResult object
      // @param {String} id Input container ID
      console.log(addressData)
      this.location = addressData
    },
    validateForm () {
      console.log('validate error: ', this.errors)
      this.$validator.validateAll().then(res => {
        if (this.submitType === 'update') this.updateJob()
        else if (this.submitType === 'delete') this.deleteJob()
      })
    },
    updateJob () {
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
      const update = {}
      update['posts/' + this.post.key] = data
      firebase.database().ref().update(update).catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorCode: ', errorCode)
        console.log('errorMessage: ', errorMessage)
      }).then(res => {
        this.$router.replace('/')
        this.$store.dispatch('getJobPosts')
      })
    },
    deleteJob () {
      firebase.database().ref('posts/' + this.post.key).remove().catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorCode: ', errorCode)
        console.log('errorMessage: ', errorMessage)
      }).then(res => this.$router.replace('/'))
    }
  },
  mounted () {
    const l = this.location
    if (typeof l === 'object') {
      const formatAddress = l.route + ', ' + l.locality + ', ' + l.administrative_area_level_1 + ', ' + l.country
      this.$refs.address.update(formatAddress)
    }
  }
}
</script>


<style lang='sass' scoped>
@import '~assets/sass/config/__export.sass'

.submit-container
  justify-content: space-between
  & input
    width: calc(50% - 8px)

.delete
  background: $error

</style>
