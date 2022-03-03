import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
Vue.component('vue-ueditor-wrap', VueUeditorWrap)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
