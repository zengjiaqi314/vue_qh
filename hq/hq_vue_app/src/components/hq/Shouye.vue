<template>
  <div id="Shouye" class="mb">
    <!-- 首页轮播 景区图 -->
    <div class="swipe">
      <mt-swipe :auto="4000" :show-indicators="false">
        <mt-swipe-item>
          <img style="width:100%;height:100%;" src="../../assets/xp-pic/putuoshan.jpg"/>
        </mt-swipe-item>
        <mt-swipe-item>
          <img style="width:100%;height:100%;" src="../../assets/xp-pic/jingqu04.jpg"/>
        </mt-swipe-item>
        <mt-swipe-item>
          <img style="width:100%;height:100%;" src="../../assets/xp-pic/pujishi.jpg"/>
        </mt-swipe-item>
        <mt-swipe-item>
          <img style="width:100%;height:100%;" src="../../assets/xp-pic/xitian.jpg"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 导航栏 美食 景点 住宿 -->
    <div class="one">
      <!-- 出行预算 -->
      <div @click="yushuan">
        <img class="Dhimg" src="../../assets/xp-pic/yusuan.png" alt="">
        <p>出行预算</p>
      </div>
      <!-- 美食推荐 -->
      <div @click="Paishe">
        <img class="Dhimg" src="../../assets/xp-pic/meishi.png" alt="">
        <p>美食推荐</p>
      </div>
      <!-- 热门景点 -->
      <div @click="Lipin">
        <img class="Dhimg" src="../../assets/xp-pic/jingqu.png" alt="">
        <p>热门景点</p>
      </div>
      <!-- 精选酒店 -->
      <div @click="Shoushi">
        <img class="Dhimg" src="../../assets/xp-pic/jiudian.png" alt="">
        <p>精选酒店</p>
      </div>
    </div>
    <!-- 公告 -->
    <div class="GG"> 
      <img class="ZT-img1" src="../../assets/xp-pic/gonggao.png" alt="">
      <div>
        <marquee>玫瑰花语：爱情、爱与美、容光焕发 </marquee>
      </div>
    </div>
    <!-- 地址 -->
    <div class="DZ"> 
      <div class="DZ-1"><img src="../../assets/img13.png" alt=""></div>
      <div class="DZ-2">
        <img src="../../assets/xp-pic/weixin.png" alt="">
        <img src="../../assets/xp-pic/dianhua.png" alt="">
      </div>
    </div>
    <!-- 热门摄影师 当地向导 --> 
    <div id="hotCamerist">
      <div class="ZT-1">
        <div class="ZT-2">
          <img class="ZT-img1" src="../../assets/xp-pic/daoyou.png" alt="">
          <p class="ZT-P">当地导游</p>
        </div>
        <div class="ZT-3">查看更多</div>
      </div>
    <!-- 摄影师照片 -->
      <div class="sys">
        <div class="syspic1">
          <img style="width:100%;height:100%" src="../../assets/sys1.png">
         <div class="sysname">李丽丽</div>
        </div>
        <div class="syspic2">
          <img style="width:100%;height:100%" src="../../assets/sys2.png">
         <div class="sysname">麦德里</div>
        </div>
        <div class="syspic3">
          <img style="width:100%;height:100%" src="../../assets/sys3.png">
         <div class="sysname">陈一休</div>
        </div>
      </div>
    </div>
    <!-- 热门主题 热门景点 -->
    <div class="ZT">
      <div class="ZT-1">
        <div class="ZT-2">
          <img class="ZT-img1" src="../../assets/xp-pic/jingqu.png" alt="">
          <p class="ZT-P">人气景点</p>
        </div>
        <div @click="Lipin" class="ZT-3">查看更多</div>
      </div>
      <!-- 数据加载 -->
      <div v-for="(item,i) of list3" :key="i">
        <div class="ZT-4" @click="Lipin" v-if="item.jid==1" >
          <img class="ZT-jingqu1" :src="'http://127.0.0.1:5050/'+item.pic"/>
          <div class="ZT-4-1">{{item.jname}}</div>
        </div>
      </div>
    </div>
    <!-- 到店选购 美食推荐 -->
    <div class="ZT">
      <div class="ZT-1">
        <div class="ZT-2">
          <img class="ZT-img1" src="../../assets/xp-pic/meishi.png" alt="">
          <p class="ZT-P">美食推荐</p>
        </div>
      </div>
    <!-- 产品展示 美食展示 -->
    <!-- 数据加载 -->
      <div class="ZT-CP">
        <div v-for="(item,i) of list2" :key="i">
          <div class="ZT-CP-1" @click="Paishe" v-if="item.mid == 1">
            <img class="CP-img" :src="'http://127.0.0.1:5050/'+item.pic"/><!-- 图片 -->
            <div class="CP-size">{{item.mname}}</div><!-- 标题 -->
            <div class="CP-1">
            <span class="CP-span">推荐指数:</span><!-- 价格 -->
            <span class="CP-span1">{{item.zhishu}}</span><!-- 销量 -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 预约服务 酒店精选 -->
    <div class="ZT">
      <div class="ZT-1">
        <div class="ZT-2">
          <img class="ZT-img1" src="../../assets/xp-pic/jiudian.png" alt="">
          <p class="ZT-P">酒店精选</p>
        </div>
      </div>
    </div>
    <!-- 商品列表 酒店展示 -->
    <!-- 数据加载 -->
    <div id="F1">
        <div v-for="(item,i) of list1" :key="i" class="one-theme" style="margin-bottom: 10px"  @click='dateli(item.lid)'>
          <div v-if="item.jid==1">
          <div class="one-theme-1" >
            <img class="one-theme-img" :src="'http://127.0.0.1:5050/'+item.pic"/><!-- 图片 -->
            <div class="one-theme-title">{{item.jname}}</div><!-- 标题 -->
            <div class="one-1">
            <span class="one-theme-priec">￥{{item.price.toFixed(2)}}</span><!-- 价格 -->
            <span class="one-span">销量：0</span><!-- 销量 -->
            </div>
          </div>
        </div>
        </div>

    </div>
  </div>
</template>
<script>

export default {
  created(){
    this.loadMore();
  },
  data(){
    return {
      list1:[],
      list2:[],
      list3:[],
    }
  },
  methods:{
    yushuan(){
      this.$router.push("/yushuan");
    },
    Paishe(){
      this.$router.push("/Paishe");
    },
    Lipin(){
      this.$router.push("/Lipin");
    },
    Shoushi(){
      this.$router.push("/Shoushi");
    },
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
      var url1="/jiudian";
      var url2="/meishi";
      var url3="/jingqu";
      this.axios.get(url1).then(res=>{
        var rows1=this.list1.concat(res.data.data);
        this.list1=rows1;
      })
      this.axios.get(url2).then(res=>{
        var rows2=this.list2.concat(res.data.data);
        this.list2=rows2;
      })
      this.axios.get(url3).then(res=>{
        var rows3=this.list3.concat(res.data.data);
        this.list3=rows3;
      })
    }
  },
}
</script>
<style scoped>
.mt{margin-top: 100px}
.mb{margin-bottom: 100px}
.Shouye{
  background-color: rgb(248, 248, 251);
}
.swipe{
  height: 200px;
  width: 100%;
}
/* 1L样式 */
.one{ /* 导航栏外层DIV */
    width: 100%;
    display: flex;
    justify-content:space-around; 
    padding-top: 20px;
    padding-bottom: 10px;
    margin-bottom: 3px;
    background-color: rgb(255, 255, 255);
  }
.one>div{/* 导航栏内容布局样式*/
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  color: rgb(102, 102, 102);
  font-size: 1rem;
  font-weight:500;
}
.one>div>p{/* 导航栏内容文字样式 */
  margin-top:10px;
}
.Dhimg{/* 导航栏图片样式 */
  width: 35px;
  height: 35px;
}
/* 公告栏样式 */
.GG{/* 公告栏外层DIV */
  display: flex;
  align-items: center;
  width: 100%;
  padding-top:5px; 
  padding-bottom:5px; 
  color: rgb(102, 102, 102);
  font-size: 0.5rem;
  background-color: rgb(255, 255, 255);
}
.GG>img{/* 公告栏图标样式 */
  margin-right:5px; 
}
.GG>span{/* 公告栏文字样式 */
  behavior:"scroll";
}
/* 地址栏样式 */
.DZ{/* 地址栏外层DIV */
  width: 100%;
  display: flex;
  background-color:  rgb(255, 255, 255);
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}
.DZ-1{width: 70%;}/* 地址栏图片DIV样式 */
.DZ-1>img{width: 100%;}/* 地址栏图片样式 */
.DZ-2{/* 地址栏微信图标样式 */
  width: 30%;
  display: flex;
  align-items: center;
  justify-content:space-around;
  }
/*摄影师样式*/ 
.sys{
  display:flex;
  justify-content:center;
  width:100%;
}
.syspic1,.syspic2,.syspic3{
  width:25%;
  margin-left: 5px;
  margin-right: 5px;
  position: relative;
}
.sysname{
  width:100%;
  height:20px;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color:rgba(0,0,0,0.5);
  text-align: center;
  color: #fff;
  font-size: 0.328125rem;
  line-height: 20px;
}
/* 主题栏样式 */
.ZT{/* 主题栏外层DIV样式 */
  width: 100%;
  display: flex;
  flex-direction:column;
  margin-top: 10px;
  background-color:  rgb(255, 255, 255);
}
.ZT-1{/* 主题栏头部外层DIV */
  width:100%;
  display: flex;
  justify-content: center;
  justify-content: space-between;
  align-items: center;
  padding-top:8px;
  padding-bottom:8px;
}
.ZT-2{/* 主题栏头部内容样式 */
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
}
.ZT-img1{width: 20px;margin-right:8px;}/* 主题栏头部图标*/
.ZT-3{margin-right: 15px;color: rgb(153, 153, 153);font-size: 0.28125rem;}/* 主题栏头部"查看更多"样式 */
.ZT-P{color: rgb(102, 102, 102);font-size: 0.304688rem;font-weight: bold;}/* 主题栏头部文字样式 */

.ZT-jingqu1{
  width: 100%;
  height:100%;
}
.ZT-4{/* 主题1 外层div样式 */
  width:100%;
  height: 240px;
  margin-bottom: 5px;
  position: relative;}
.ZT-4-1{/* 主题栏内容外层DIV样式 */
  width:100%;
  height:60px;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color:rgba(0,0,0,0.5);
  text-align: center;
  color: #fff;
  font-size:20px;
  line-height: 60px;
}
.ZT-CP{/*产品 外层DIV*/
  width: 100%;
  display: flex;
  justify-content:space-around;
  background-color:  rgb(255, 255, 255);
}
.ZT-CP-1{/*产品 内容DIV*/
  display:flex;
  flex-direction:column;
  justify-content:center;
  margin-left:10px;
  white-space:nowrap;
}
.CP-img{width:100%;}/*产品 img大小*/
.CP-1{/*产品 价格销量DIV*/
  display:flex;
  justify-content: flex-start;
  align-items: center;
}
.CP-size{/*产品 标题字体样式*/
  display:block;
  justify-content:start;
  font-size:14px;
  line-height:21px;
  margin:5px 0;
  padding-left:5px;
  color:rgb(102, 102, 102);
}

.CP-span{/*产品 价格字体样式*/
  color:rgb(168, 168, 168);
  font-size:12px;
  line-height:17px;
  margin-right:5px;
  white-space:nowrap;
}
.CP-span1{/*产品 销量字体样式*/
  color:rgb(255, 102, 0);
  font-size:12px;
  line-height:17px;
  white-space:nowrap;
}
/*预约服务 主题产品*/
/*1楼产品样式*/
#F1{/*产品 外层DIV*/
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  justify-content:space-around;
  margin-top: 10px
}
.one-theme{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  justify-content:space-around;
  width:46%;
}
.one-theme-1{/*单个产品*/
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.one-theme-img{width:100%;height:70%;}/*产品图片*/
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
</style>
