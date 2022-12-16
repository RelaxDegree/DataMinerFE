import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import Papa from 'papaparse';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(Papa)
new Vue({
  render: h => h(App),
}).$mount('#app')
