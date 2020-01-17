<template>
  <div id="LPdatelis">
    <!--(1)顶部导航条-->
    <titlebar
        leftHead="<返回"
        :centerHead="z"
        rightHead="..."
      ></titlebar>
    <!-- 首饰，礼品详情页 -->
    <div class="LPdetali-img">
      <img class="LPdetali-img1" :src="list[0].spic"/>
    </div>
    <!-- 商品详情 -->
    <div class="LPdetali">
      <!-- 商品标题 -->
      <div class="LPdetali-title">
        <div>{{list[0].sname}}</div>
      </div>
      <!-- 商品价格 -->
      <div class="LPdetali-price">
        <span>¥</span>
        <span>{{list[0].sprice.toFixed(2)}}</span>
      </div>
      <!-- 运费 库存 -->
      <div  class="LPdetali-yunfei">
        <div class="LPdetali-yunfei1">服务费:{{list[0].yunfei}}</div>
        <div class="LPdetali-kucun">库存:{{list[0].kucun}}</div>
      </div>
    </div>
    <div class="goods-comment">
      <div class="line"></div>
      <div class="goods-comment-size">详情</div>
      <div class="line"></div>
    </div>
    <div class="comment">
      产品详情
    </div>
    <div class="LPdetali-p mb50">
      <p>{{list[0].xiangqing}}</p>
    </div>
    <!-- 详情底部 -->
    <div class="LPdetali-btn">
      <div @click="cart" class="LPdetali-btn1">
        <div><img class="LPdetali-btn1-img" src="../../assets/gouwuche2.png"/></div>
        <div class="LPdetali-btn1-size">购物车</div>
      </div>
      <div class="LPdetali-btn2">
        <div><img class="LPdetali-btn1-img" src="../../assets/kefu.png"/></div>
        <div class="LPdetali-btn1-size">客服</div>
      </div>
      <div class="LPdetali-btn3">
        <div class="LPdetali-btn3-1" @click="jrcart"
          :data-lid="list[0].lid" 
          :data-lname="list[0].sname" 
          :data-price="list[0].sprice" 
          :data-pic="list[0].spic">加入购物车</div>
        <div @click="zhifu" class="LPdetali-btn3-2">立即购买</div>
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
      list:[{sname:"",sprice:0,spic:""}],
      ppp:"",
      z:"详情",
    }
  },
  created() {
    this.loadMore();
  },
  methods: {
    zhifu(){
      var uid = sessionStorage.getItem('uid')
      if (!uid){
        this.$toast("请先登录");
        this.$router.push({path:'/Login'})
        // 跳转至登录页面
      } else {
        // 跳转购物车页面
        this.$router.push({path:'/Zhifu'})
      }
    },
    // 加入购物车
    jrcart(event){
      //功能:添加至购物车
      //1.在参数中添加属性event
      //2.获取三个参数
      var uid  =  sessionStorage.getItem("uid");//history.go(0)
      console.log(uid);
      if(!uid){
        this.$toast("请先登录！");
        this.$router.push("/Login");
      }else{
      var lid=event.target.dataset.lid;
      var price=event.target.dataset.price;
      var lname=event.target.dataset.lname;
      var pic=this.ppp;
      var n=1;
      console.log(2);
      // console.log(id);
      //console.log(lid+":"+price+":"+lname+":"+pic);
      //3.创建变量obj
      var url="addcart";
      //4.发送ajax请求
      var obj={lid,lname,price,n,pic,uid}
      //5.发送ajax请求
      this.axios.get(url,{params:obj}).then(res=>{
          this.$toast("添加成功");
        })
      }
    },
    // 跳转购物车
    cart(){
      var uid = sessionStorage.getItem('uid')
      if (!uid){
        this.$toast("请先登录");
        this.$router.push({path:'/Login'})
        // 跳转至登录页面
      } else {
        // 跳转购物车页面
        this.$router.push({path:'/Cart'})
      }
    },
    loadMore(){
      var url="ssdetalis";
      var lid=this.$route.query.lid;
      var obj={lid};
      this.axios.get(url,{params:obj}).then(res=>{
        this.ppp=res.data.data[0].spic;
        res.data.data[0].spic='http://127.0.0.1:5050/'+res.data.data[0].spic
        this.list=res.data.data;
        // console.log(this.list[0]);
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
.mb50{margin-bottom: 50px}
.LPdetali-img{
  margin-top:50px;
  width: 100%;
  height: 375px;
  display: flex;
  justify-content: center;
}
.LPdetali-img1{
  height: 100%;
}
.LPdetali{
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 10px;
}
.LPdetali-title{
  display: flex;
  align-items: center;
  font-size: 16px;
  padding-bottom: 8px;display: flex;
  align-items: center;
  font-size: 16px;
  padding-bottom: 8px;
}
.LPdetali-price{
  font-weight: bold;
  font-size: 20px;
  color: #ff7100;
  padding-right: 50px;
}
.LPdetali-yunfei{
  display: flex;
  align-items: center;
  margin-top:8px; 
}
.LPdetali-yunfei1,.LPdetali-kucun{
  margin-right:10px;
  color: rgb(178, 178, 178);
  font-size: 0.24rem;
}
.goods-comment{
  width: 100%;
  background: rgb(244, 244, 244);
  color: rgb(178, 178, 178);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
.goods-comment-size{
  color: rgb(178, 178, 178);
  font-size: 0.24rem;
  margin-left: 3px;
  margin-right: 3px;
}
.line{
  width: 46px;
  height: 1px;
  background:#ccc;
}
.comment{
  width: 100%;
  font-size: 10px;
  color: #333;
  padding:10px 10px 0 10px;
}
.LPdetali-p{
  padding: 10px;
}
.LPdetali-p>p{
  margin: 0;
  font-size: 16px;
}
.LPdetali-btn{
  display:flex;/*弹性布局*/
  position: fixed;/*固定定位*/
  bottom:0;
  z-index: 999;/*浮在所有元素上方*/
  width: 100%;/*充满父元素*/
  background-color:#fff;
  height: 48px;
}
.LPdetali-btn1,.LPdetali-btn2{
  width: 15%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #666;
  font-size: .24rem;
}
.LPdetali-btn1-img{
  width: 20px;
  height: 20px;
}
.LPdetali-btn3{
  width:70%;
  height: 100%;
  display: flex;
}
.LPdetali-btn3-1,.LPdetali-btn3-2{
  width: 50%;
  height: 100%;
  background-color: #ff7100;
  color: #fff;
  line-height:48px;
  font-size: .3rem;
  text-align: center;
}
.LPdetali-btn3-1{
  background-color: #f5a623;
}
</style>
