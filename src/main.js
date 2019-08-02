// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from './api/http'
//引入mint-ui  组件里面还是要按组件引入
import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'

import axios from 'axios'
Vue.prototype.$ajax = axios;
Vue.config.productionTip = false

//挂载全局
Vue.prototype.$http = http // ajax请求方法

import '@/assets/css/my-mint.css'  //修改mint-ui的默认样式
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
