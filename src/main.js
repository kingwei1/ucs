import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

//配置文件
// import config from '../public/config.js';
// Vue.prototype.$config = config;
//后台接口
import http from './assets/api/api';
Vue.prototype.$http = http;
//引入苏州vdcp
import vdcp from './assets/static/vdcpfile.js';
Vue.prototype.$vdcp =vdcp;

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
