import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import axios from 'axios'
// import Papa from 'papaparse';
import 'element-ui/lib/theme-chalk/index.css'

 
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)
// Vue.use(Papa)
new Vue({
  render: h => h(App),
}).$mount('#app')
