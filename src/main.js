import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
//import 'amfe-flexible/index'
import { Dialog } from 'vant'
import './permission'
import { Toast, NavBar , ActionSheet,Form, Field, Button,Image ,Loading} from 'vant';
import Common from './utils/common';

Vue.config.productionTip = false


Vue.use(Dialog).use(Form).use(Field)
    .use(Button).use(NavBar).use(ActionSheet)
    .use(Image).use(Common).use(Loading)
    .use(Toast)
;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
