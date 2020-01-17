import Vue from 'vue'
import VueRouter from 'vue-router'

//导航
import index from '../components/hq/Index.vue'
//登录,注册
import login from '../components/hq/Login.vue'
import reg from '../components/hq/reg.vue'
//商品
import Paishe from '../components/hq/Paishe.vue'
import Detalis from '../components/hq/Detalis.vue'
import Lipin from '../components/hq/Lipin.vue'
import LPdetali from '../components/hq/LPdetali.vue'
import Shoushi from '../components/hq/Shoushi.vue'
import Zhifu from '../components/hq/Zhifu.vue'
import yushuan from '../components/hq/Budget.vue'
//购物车
import Cart from '../components/hq/Cart.vue'
import Address from "../components/hq/Address.vue"
import Add from "../components/hq/Add.vue"
//社区
// import community from '../components/hq/community.vue'
import title from '../components/hq/title.vue'
import fabu from '../components/hq/fabu.vue'
import details from '../components/hq/details.vue'

Vue.use(VueRouter)

const routes = [
  //导航
  {
    path: '/',
    //name: 'index',
    component: index,
    meta: {keepAlive: true}
  },
  //登录
  {path: '/login',component: login},
  {path: '/reg',component: reg},
  //商品
  {path: '/Paishe',component: Paishe},
  {path: '/Detalis',component: Detalis},
  {path: '/Lipin',component: Lipin},
  {path: '/LPdetali',component: LPdetali},
  {path: '/Shoushi',component: Shoushi},
  {path: '/Zhifu',component: Zhifu},
  {path: '/yushuan',component: yushuan},
  //购物车
  {path: '/Cart',component: Cart},
  {path:'/Address',component:Address},
  {path:'/Add',component:Add},
  //社区
  //{path: '/community',component: community},
  {path: '/title',component: title},
  {path: '/fabu',component: fabu},
  {path: '/details',component: details,},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router