import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
require('@/assets/main.scss');

// Connexion à l'api
window.api = axios.create({
  baseURL: "https://docketu.iutnc.univ-lorraine.fr:14001",
  // withCredentials: true
});
window.api_adress = axios.create({
  baseURL: "https://api-adresse.data.gouv.fr"
});

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
