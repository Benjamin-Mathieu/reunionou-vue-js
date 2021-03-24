import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
require('@/assets/main.scss');

// Connexion à l'api
window.api = axios.create({
  baseURL: "https://allweb.fun/coop/api"
});

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
