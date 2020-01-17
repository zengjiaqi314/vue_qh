<template>
  <div id="lipin">
    <!--(1)顶部导航条-->
    <titlebar
        leftHead="<返回"
        :centerHead="z"
        rightHead="..."
      ></titlebar>
    <div style="margin-top:50px;"></div>
    <div v-for="(item,i) of list" :key="i">
      <div class="Lipin-F1" v-if="item.cid == 2">
        <!-- 礼品图片 景点图片 -->
        <div class="Lipin-F1-1" @click='lipin(item.lid)'>
          <img class="Lipin-img1" :src="'http://127.0.0.1:5050/'+item.spic"/>
        </div>
        <!-- 礼品名，礼品价格，付款人数 景点展示，介绍  -->
        <div class="Lipin-F1-2" @click='lipin(item.lid)'>
          <div class="Lipin-name">{{item.sname}}</div>
          <div class="Lipin-span1">
            <span class="Lipin-you">top</span>
          </div>
          <div class="Lipin-span2">
            <span>门票 : </span>
            <span class="Lipin-price">￥{{item.sprice.toFixed(2)}}</span>
            <span>/人起</span>
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
      list:[{price:0}],
      z:"景区",
    }
  },
  created() {
    this.loadMore()
  },
  methods: {
    lipin(i){
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
.Lipin-F1-1{
  width:100%;
  margin-top: 5px;
}
.Lipin-img1{
  width: 100%;
}
.Lipin-F1-2{
  padding-left: 10px;
  padding-right: 10px;
}
.Lipin-name{
  font-size: 14px;
  color: #333;
}
.Lipin-span1{
  margin-top: 5px;
}
.Lipin-you{
  background: #fef5e6;
  font-size: 8px;
  color: #faa105;
  border-radius: .2rem;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 8px;
}
.Lipin-size{
  color: #999;
  font-size: 12px;
}
.Lipin-span2{
  font-size: 12px;
  margin-top: 5px;
}
.Lipin-price,.nonecart-price{
  font-size: 16px;;
  color: #ff7100;
}
</style>
