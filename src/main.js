import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.config.productionTip = false

// création d'une constante accessible avec this.$drupal / this.$drupal.url
Vue.prototype.$drupal = {
  url: '',
  authorization: "",
}



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')