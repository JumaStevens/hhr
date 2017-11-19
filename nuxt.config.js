module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'HHR',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAmEfAXt4bOgcruxk1X_2DbH7S4k9UjBxw&libraries=places', type: 'text/javascript' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/sass/main.sass'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vee-validate'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    {src: '~/plugins/vee-validate'}
  ]
}
