import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Element from 'element-ui'
import 'element-theme-chalk'
import filters from './lib/filters.js'

const Socket = require('wsrecon')
const socket = new Socket('ws://localhost:8081')

socket.on('open', async (event) => {
  console.log('Connection open')
})

socket.on('message', (data, event) => {
  console.log('Received message', data)
  if (data.action === 'message') {
    store.commit('message', data.result)
  }
})

//Gjøre socket tilgjengelig i alle components
Vue.prototype.$socket = socket

Vue.use(Element)

// gjøre filters tilgengelig overalt
for(const f in filters) {
  Vue.filter(f, filters[f])
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
