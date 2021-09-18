import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
library.add(faSortUp)
library.add(faSortDown)
library.add(faSort)

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
