import { createApp } from 'vue'
import './style.css'
import { createVuetify } from 'vuetify' 
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './components/router/router.js'
import { createPinia } from 'pinia'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'

const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
});

library.add(faFilm)

createApp(App).use(vuetify).use(pinia).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')