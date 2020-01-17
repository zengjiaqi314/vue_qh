import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

//功能:引入mint-ui组件库 32
//1:将mint-ui组件库中所有组件引入当前项目
import MintUI from "mint-ui"
//2:单独引入mint-ui样式文件
import "mint-ui/lib/style.css"
//3:注册
Vue.use(MintUI)

//功能:引入vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//4:引入图标样式
import "./meishifont/iconfont.css"

//5:引入第三方ajax库axios
//6:引入axios
import axios from "axios"
//7:配置访问服务器基础地址
axios.defaults.baseURL="http://127.0.0.1:5050/"
//8:配置发送请求保存session信息
axios.defaults.withCredentials=true;
//9:将axios注册vue
Vue.prototype.axios = axios;

import qs from 'qs'
Vue.prototype.qs = qs

new Vue({
  router,
  store,
  render: h => h(App),  //App App.vue根组件
}).$mount('#app')
