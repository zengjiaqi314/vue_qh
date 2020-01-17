<template>
  <div id="theme_app">
    <!--(1)顶部导航条-->
    <titlebar
        leftHead="<返回"
        :centerHead="z"
        rightHead="..."
      ></titlebar>
    <div id="theme">
      <!-- 头部图片 -->
      <div class="header">
        <img class="header-img" src="../../assets/xp-pic/meishi05.jpg"/>
      </div>
      <!-- 1楼标题 -->
      <div class="one-title">
        <div class="one-title-border">
          <div class="one-title-size">舟山特产</div>
        </div>
      </div>
      <!-- 1楼产品展示 -->
      <div id="F1">
        <div v-for="(item,i) of list" :key="i" class="one-theme" @click='dateli(item.lid)'>
          <div class="one-theme-1">
            <img class="one-theme-img" :src="'http://127.0.0.1:5050/'+item.pic"/><!-- 图片 -->
            <div class="one-theme-title">{{item.title}}</div><!-- 标题 -->
            <div class="one-1">
            <span class="one-theme-priec">￥{{item.price}}</span><!-- 价格 -->
            <span class="one-span">销量：0</span><!-- 销量 -->
            </div>
          </div>
        </div>
      </div>
      <!-- 中部图片 -->
      <div class="middle">
        <img class="middle-img" src="../../assets/xp-pic/meishi01.jpg"/>
      </div>
      <!-- 2楼头部 -->
      <div class="tow-title">
        <div class="tow-title-border">
          <div class="tow-title-size">当地特色</div>
        </div>
      </div>
      <!-- 2楼产品展示 -->
      <div class="tow-theme"  v-for="(item,i) of list" :key="i">
        <div class="tow-theme-1">
          <img class="tow-theme-img" :src="'http://127.0.0.1:5050/'+item.pic"/><!-- 图片 -->
          <div class="tow-column">
            <div class="tow-theme-title">{{item.title}}</div><!-- 标题 -->
            <div class="tow-1">
            <span class="tow-theme-priec">￥{{item.price}}</span><!-- 价格 -->
            <span class="tow-span">销量：0</span><!-- 销量 -->
            </div>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//1:引入顶部导航条子组件
import titlebar from "./common/Titlebar.vue"
export default {
  data(){
    return {
      list:[],
      z:"美食",
    }
  },
  created(){
    this.loadMore();
  },
  methods:{
    dateli(i){
      this.$router.push({
        path:'/Detalis',
        query:{
          id:i
        }
      })
  },
    loadMore(){
      //1:创建变量url
      var url="/detalis";
      //3:发送ajax请求
      this.axios.get(url).then(res=>{
        var rows=this.list.concat(res.data.data);
        this.list=rows;
        console.log(this.list);
      })
    }
  },
    //2:注册子组件
  components:{
    "titlebar":titlebar,   //注册顶部导航条
  }
  
}
</script>
<style scoped>
*{margin: 0;padding: 0;}
/*页面在外层DIV*/
#theme{
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;
}
/*头部图片样式*/
.header-img{width: 100%;}
.one-title,.tow-title{/*1楼,2楼标题样式*/
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid  rgb(248, 248, 251);
}
.one-title-border,.tow-title-border{/*1楼,2楼标题边框样式*/
  border-left: 4px solid #1296db;
}
.one-title-size,.tow-title-size{/*1楼,2楼标题文字*/
  color: rgb(102, 102, 102);
  font-size: 0.328125rem;
  line-height: 0.984375rem;
  padding-left: 16px;
}
/*1楼产品样式*/
#F1{/*产品 外层DIV*/
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  justify-content:space-around;
  margin-top: 10px
}
.one-theme{
  width:48%;
  margin-bottom: 10px;
}
.one-theme-1{/*单个产品*/
  width: 100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.one-theme-img{width:100%;height: 116px;}/*产品图片*/
.one-theme-title{/*产品标题*/
  display:block;
  justify-content:start;
  font-size:14px;
  line-height:21px;
  margin:5px 0;
  padding-left:5px;
  color:rgb(102, 102, 102);
}
.one-1{/*产品价格 销量样式*/
  display:flex;
  justify-content: flex-start;
  align-items: center;
}
.one-theme-priec{/*产品价格样式*/
  color:rgb(255, 102, 0);
  font-size:14px;
  line-height:21px;
  margin-right:5px;
  white-space:nowrap;
}
.one-span{/*产品销量*/
  color:rgb(168, 168, 168);
  font-size:12px;
  line-height:17px;
  white-space:nowrap;
}
.middle{/*中部图片栏背景*/
  width:100%;
  height: 187px; 
  background-color: rgb(248, 248, 251);
  display: flex;
  justify-content: center;
  padding-top:15px; 
  padding-bottom:15px; 
}
.middle-img{/*中部图片样式*/
  width: 100%;
  height: 100%;
}
.tow-theme{
  width: 100%;
}
.tow-theme-1{/*2楼产品外层div样式*/
  width: 100%;
  height: 105px;
  margin-left: 10px;
  padding-top:5px; 
  padding-bottom:5px; 
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid  rgb(248, 248, 251);
}
.tow-theme-img{/*2楼产品图片*/
  width: 25%;
}
.tow-column{
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  margin-left: 10px;
}
.tow-theme-title{/*2楼产品标题样式*/
  display:block;
  justify-content:start;
  font-size:14px;
  line-height:21px;
  padding-left:5px;
  color:rgb(102, 102, 102);
}
.tow-theme-priec{/*2楼产品价格样式*/
  color:rgb(255, 102, 0);
  font-size:14px;
  line-height:21px;
  margin-right:10px;
}
.tow-span{/*2楼产品销量样式*/
  color:rgb(168, 168, 168);
  font-size:12px;
  line-height:17px;
  white-space:nowrap;
}
</style>
