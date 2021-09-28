import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import linkify from 'vue-linkify'
Vue.config.productionTip = false

Vue.directive('linkified', linkify)
new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
