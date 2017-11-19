<template lang='pug'>
header(ref='container' :style='{top}')
  h1
    span We are
    span
      | Hospitalitarian
      br
      | Hurricane
      br
      | Relief
  abbr(title='Hospitalitarian Hurricane Relief') HHR
</template>


<script>
export default {
  data () {
    return {
      top: 'unset'
    }
  },
  methods: {
    setTop () {
      const elem = this.$refs.container
      this.top = 'calc(50vh - ' + elem.clientHeight / 2 + 'px)'
    }
  },
  mounted () {
    this.setTop()
  }
}
</script>


<style lang='sass' scoped>
@import '~assets/sass/config/__export.sass'
header
  position: sticky

h1
  display: flex
  text-transform: capitalize
  white-space: nowrap
  letter-spacing: 0.05rem

span:nth-child(1)
    margin-right: calc((100vw/12)/2)

abbr
  font-size: $fs2*3
  letter-spacing: 0.05rem
  text-decoration: none
  font-weight: bold

</style>
