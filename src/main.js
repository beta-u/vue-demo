import Vue from 'vue'
// import Cookies from 'js-cookie'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import app from '@/components/layout/App'

import router from '@/router'

import { setAxiosPostContentType, handleHttpErrorNo } from '@/common/utils'
// import store from './store'
// import './permission' //流程、权限控制
setAxiosPostContentType()

Vue.use(Element, { size: 'medium' }) // set element-ui default size

// register global utility filters.
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })
Vue.prototype.$http = axios

new Vue({
  el: '#app',
  router,
  created() {
    handleHttpErrorNo.call(this)
  },
  render: h => h(app)
})
