import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //(1):共享数据
  state:{
    age:21,      //全局共享数据年龄 21
    title:"",
    details:"",
  },
  //(2):修改数据方法
  mutations:{
    addAge(state,num){state.age+= num;}, //增加年龄
    subAge(state,num){state.age-= num;},  //减少年龄
    putTitle(state,e){state.title=e},
    putDetails(state,e){state.details=e},
  },
  //(3):获取数据方法 
  getters:{
    getAge(state){return state.age},//获取年龄
    getTitle(state){return state.title}
  },
  //(4):异步修改数据方法
  actions: {
  },
  modules: {
  }
})


