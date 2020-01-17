<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <!--(1)顶部导航条-->
      <titlebar
        leftHead="<返回"
        :centerHead="z"
        rightHead="..."
      ></titlebar>
      <!--(2)面板组件-->
      <mt-tab-container class="page-wrap-content" v-model="active">
        <mt-tab-container-item id="jx">
          <!-- 引入页面1 -->
          <Shouye></Shouye>
        </mt-tab-container-item>
        <mt-tab-container-item id="sq">
          <!-- 引入页面2 -->
          <div id="community"></div>
          <community></community>
        </mt-tab-container-item>
        <mt-tab-container-item id="gy">
          <!-- 引入页面3 -->
          <about></about>
        </mt-tab-container-item>
        <mt-tab-container-item id="me">
          <!-- 引入页面4 -->
          <myhome></myhome>
        </mt-tab-container-item>
      </mt-tab-container>
      <!--(3)底部导航条tabbar-->
      <mt-tabbar fixed v-model="active">
        <!--native 启用浏览器原生:事件-->
        <mt-tab-item id="jx" @click.native="changeState(0)">
          <tabbaricon
             :focused="currentIdx[0].isSelect"
             :selectedImage="require('../../assets/ic_jxs_selected.png')"
             :normalImage="require('../../assets/ic_jxs_normal.png')"
          ></tabbaricon>
          精选
        </mt-tab-item>
        <mt-tab-item id="sq" @click.native="changeState(1)">
          <tabbaricon
             :focused="currentIdx[1].isSelect"
             :selectedImage="require('../../assets/ic_sqs_selected.png')"
             :normalImage="require('../../assets/ic_sqs_normal.png')"
          ></tabbaricon>
          社区
        </mt-tab-item>
        <mt-tab-item id="gy" @click.native="changeState(2)">
          <tabbaricon
             :focused="currentIdx[2].isSelect"
             :selectedImage="require('../../assets/ic_gys_selected.png')"
             :normalImage="require('../../assets/ic_gys_normal.png')"
          ></tabbaricon>
            关于
        </mt-tab-item> 
        <mt-tab-item id="me" @click.native="changeState(3)">
          <tabbaricon
             :focused="currentIdx[3].isSelect"
             :selectedImage="require('../../assets/ic_mes_selected.png')"
             :normalImage="require('../../assets/ic_mes_normal.png')"
          ></tabbaricon>
          我的
        </mt-tab-item>                   
      </mt-tabbar>
    </div>
  </div>
</template>
<script>

//1:引入顶部导航条子组件
import titlebar from "./common/Titlebar.vue"
//3:引入底部导航条图标组件
import TabBarIcon from "./common/TabBarIcon.vue"
import community from "./community.vue"
import About from "./About.vue"
import Shouye from "./Shouye.vue"
import MyHome from "./MyHome.vue"

export default {
  data(){
    return{
      z:"精选",
      active:"jx",////默认第一个按钮选中
      currentIdx:[     //下面数组保存按钮状态
        {isSelect:true}, //0 第一按钮状态
        {isSelect:false},//1 第二按钮状态
        {isSelect:false},//2 第三按钮状态
        {isSelect:false} //3 第四按钮状态
     ]
    }
  },
  methods:{
    changeState(idx){
      //功能:完成图片状态切换
      //console.log(idx)
      //1:创建循环遍状态数组
      for(var i=0;i<this.currentIdx.length;i++){
      //2:如果当前下标与idx相同 元素true
        if(i == idx){
        this.currentIdx[i].isSelect=true;
        }else{//3:其它元素false
          this.currentIdx[i].isSelect=false;
        }
      }
      if(idx==0){this.z="精选"}
      if(idx==1){this.z="社区"}
      if(idx==2){this.z="关于"}
      if(idx==3){this.z="个人中心"}
    },
  },
  //2:注册子组件
  components:{
    "tabbaricon":TabBarIcon,//注册底部导航图片
    "titlebar":titlebar,   //注册顶部导航条
    "community":community,
    "about":About,
    "Shouye":Shouye,
    "myhome":MyHome,
  }
}
</script>
<style scoped>
 /*功能：覆盖原生按钮文字颜色:选中*/
 .mint-tabbar>.mint-tab-item.is-selected{
   background-color:transparent;
   color:#fa3cd1;/*粉红色*/
 }
 /*默认颜色   15;25*/
 .mint-tabbar>.mint-tab-item{
   color:#999999;/*灰色*/
 }
 .page-wrap-content{
   padding-top:48px;
 }
</style>