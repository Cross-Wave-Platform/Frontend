import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    light: true,
    themes: {
      light: {
        primary: 0x2D7535,
        secondary: 0xC6D033,
        accent: 0x3F5185,
        background: 0xFBFFC5
      }
    }
  }
})
