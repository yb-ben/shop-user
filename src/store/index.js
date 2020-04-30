import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart  from './modules/cart'
import getters from './getters'
import loading from "./modules/loading";
import navbar from "./modules/navbar";

Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  modules: {
    user,cart,loading,navbar
  }
});
export default store
