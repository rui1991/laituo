// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 引入axios
import axios from 'axios'

// 引入qs
import qs from 'qs'

// 引入echarts
import echarts from 'echarts'

// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

// 引入兼容IE插件
import 'babel-polyfill'

// 引入字体图标
import '@/assets/font/iconfont.css'

// 引入公共样式
import '@/assets/css/base.css'

// 注册axios
// axios.defaults.baseURL = 'http://www.allsps.com:82'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;'
Vue.prototype.$axios = axios

// 注册qs
Vue.prototype.$qs = qs

// 注册elementui
Vue.use(ElementUI)

// 注册echarts
Vue.prototype.$echarts = echarts

// Vue.prototype.reqApi = () => '/api'
Vue.prototype.reqApi = () => 'http://47.98.173.227:8080'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
