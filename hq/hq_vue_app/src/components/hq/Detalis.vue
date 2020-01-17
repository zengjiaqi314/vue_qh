<template>
  <div id="detalis">
  <!--(1)顶部导航条-->
      <titlebar
        leftHead="<返回"
        :centerHead="z"
        rightHead="..."
      ></titlebar>
    <!-- 详情页轮播 数据加载  -->
    <div class="detalis-swipe mt50">
      <mt-swipe :auto="4000" :show-indicators="false">
        <mt-swipe-item>
          <img style="width:100%" :src="'http://127.0.0.1:5050/'+list[0].pic"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 商品详情 -->
    <div class="detail">
      <!-- 商品标题 -->
      <div class="detail-title">
        <div>{{list[0].title}}</div>
      </div>
      <!-- 商品价格 -->
      <div class="detail-price">
        <span>¥</span>
        <span>{{list[0].price.toFixed(2)}}</span>
      </div>
      <!-- 服务时长 费用说明 -->
      <div class="detail-timelong">
          <span class="span1">服务时长</span>
          <span class="span2">{{list[0].starttime}}</span>
      </div>
      <!-- 营业时段 使用说明 -->
      <div class="detail-time">
          <span class="span1">营业时段</span>
          <span class="span2">{{list[0].endtime}}</span>
      </div>
      <!-- 预约日期 退改说明 -->
      <div class="detail-order">
          <span class="span1">预约日期</span>
          <span class="span2">{{list[0].dateday}}</span>
      </div>
      <!-- 其他说明 -->
      <div class="detail-goods">
        <span class="span1">取货方式</span>
      </div>
    </div>
    <!-- 预约说明 -->
    <div class="goods-appointments">
      <!-- 预约标题  预约须知 -->
      <div class="goods-appointments-1">
        预约说明
      </div>
      <!-- 预约详情 -->
      <span class="goods-appointments-2">xx月xx日前使用有效</span>
    </div>
    <!-- 评论 -->
    <div class="goods-comment">
      <div class="line"></div>
      <div class="goods-comment-size">评论</div>
      <div class="line"></div>
    </div>
    <div class="comment">
      评论(0)
    </div>
    <div class="comment-div"></div>
    <div class="goods-comment">
      <div class="line"></div>
      <div class="goods-comment-size">详情</div>
      <div class="line"></div>
    </div>
    <div class="comment">
      产品详情  
    </div>
    <!-- 详情底部 -->
    <div class="detali-btn">
      <div class="detali-btn1">
        <div><img class="detali-btn1-img" src="../../assets/dingdan.png"/></div>
        <div class="detali-btn1-size">订单</div>
      </div>
      <div class="detali-btn2">
        <div><img class="detali-btn1-img" src="../../assets/dianpu.png"/></div>
        <div class="detali-btn1-size">店铺</div>
      </div>
      <div class="detali-btn3">去预约</div>
    </div>
  </div>
</template>
<script>
//1:引入顶部导航条子组件
import titlebar from "./common/Titlebar.vue"
export default {
  data(){
    return {
      list:[{title:"",price:0}],
      z:"详情",
    }
  },
  created() {
    this.loadMore();
  },
  methods: {
    loadMore(){
      var url="detali";
      var lid=this.$route.query.id;
      var obj={lid};
      this.axios.get(url,{params:obj}).then(res=>{
        this.list=res.data.data;
        console.log(this.list[0]);
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
.mt50{margin-top: 50px}
/*详情页轮播*/
.detalis-swipe {
  width: 100%;
  height: 250px;
}
 /* 商品详情样式 */
.detail{
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 10px;
}
.detail-title{
  display: flex;
  align-items: center;
  font-size: 16px;
  padding-bottom: 8px;display: flex;
  align-items: center;
  font-size: 16px;
  padding-bottom: 8px;
}
.detail-price{
  font-weight: bold;
  font-size: 20px;
  color: #ff7100;
  padding-right: 50px;
}
.detail-timelong{/*服务时长*/
  margin-top: 5px;
  margin-bottom: 5px;
}
.detail-time{/*营业时段*/
  margin-bottom: 5px;
}
.span1,.span3,.goods-appointments-1,.goods-appointments-2{
  display: inline-block;
  font-size: 14px;
  color: #666;
}
.span2{
  display: inline-block;
  font-size: 14px;
  margin-left: 8px;
}
.detail-goodsspan3{/*取货方式*/
  margin-top: 5px;
}
/* 预约说明样式 */
.goods-appointments{
  display: flex;
  flex-flow: column;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
}
.goods-appointments-1{
  font-size: 16px;
  color: rgb(102, 102, 102);
  padding-bottom: 8px;
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
.comment-div{
  width: 100%;
  padding:10px;
}
.detali-btn{
  display:flex;/*弹性布局*/
  position: fixed;/*固定定位*/
  bottom:0;
  z-index: 999;/*浮在所有元素上方*/
  width: 100%;/*充满父元素*/
  background-color:#fff;
  height: 48px;
}
.detali-btn1,.detali-btn2{
  width: 15%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #666;
  font-size: .24rem;
}
.detali-btn1-img{
  width: 20px;
  height: 20px;
}
.detali-btn3{
  width:70%;
  height: 100%;
  background-color: #ff7100;
  color: #fff;
  line-height:48px;
  font-size: .3rem;
  text-align: center;
}
</style>
