import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import { Dialog } from 'vant'

Vue.config.productionTip = false
Vue.use(Dialog)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
