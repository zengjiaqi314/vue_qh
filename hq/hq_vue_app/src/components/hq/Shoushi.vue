<template>
  <div id="shoushi">
    <!--(1)顶部导航条-->
    <titlebar
        leftHead="<返回"
        :centerHead="z"
        rightHead="..."
      ></titlebar>
    <!-- 首饰页图片 精选酒店 -->
    <div class="shoushi-img mt50">
      <img class="shoushi-img1" src="../../assets/xp-pic/jiudian014.jpg"/>
    </div>
    <!-- 首饰页产品 酒店展示 -->
    <div  v-for="(item,i) of list" :key="i">
      <div class="shoushi-F1" v-if="item.cid == 1">
        <div class="shoushi-pic" @click='shoushi(item.lid)'>
        <img class="shoushi-pic1" :src="'http://127.0.0.1:5050/'+item.spic"/>
        </div>
        <div class="shoushi-dateli" @click='shoushi(item.lid)'>
          <div class="shoushi-name">{{item.sname}}</div>
          <div class="shoushi-flex">
            <div><span class="shoushi-you">top</span></div>
            <div class="shoushi-price">
              <div class="price-size">￥{{item.sprice.toFixed(2)}}</div>
            </div>
            <div><span class="shoushi-span2">{{item.sfukuan}}人付款</span></div>
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
      z:"酒店",
    }
  },
  created() {
    this.loadMore()
  },
  methods: {
    // 点击商品传送商品ID
    shoushi(i){
      this.$router.push({
        path:'/LPdetali',
        query:{
          lid:i
        }
      })
    },
    loadMore(){
      var url="/shoushi";
      this.axios.get(url).then(res=>{
        var rows=this.list.concat(res.data.data);
        this.list=rows;
        // console.log(this.list);
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
.shoushi-img{
  width: 100%;
  margin-top: 50px;
}
.shoushi-img1{
  width: 100%;
}
.shoushi-F1{
  display: flex;
  padding: 10px;
  border-bottom:1px solid #f3f3f3;
}
.shoushi-dateli{
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.shoushi-price{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.shoushi-pic1{
  width: 114px;
  margin-right: 10px;
}
.shoushi-name{
  font-size: .28rem;
  color: #333;
}
.shoushi-you{
  background: #fef5e6;
  font-size: 8px;
  color: #faa105;
  border-radius: .2rem;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 8px;
}
.price-size{
  font-size: 14px;;
  color: #ff7100;
  margin-right: 8px;
}
.shoushi-span2{
  color: #999;
  font-size: 12px;
}
</style>
