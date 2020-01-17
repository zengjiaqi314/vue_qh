<template>
  <div class="bg">
    <!-- <div class="header">
      <h3 class="px_10"><a href="javascript:history.go(-1)" style="color:#fff">返回</a></h3>
      <h3 class="px_10">{{sort1}}</h3>
      <h3 class="px_10">...</h3>
    </div> -->
    <!-- 顶部搜索 -->
    <!-- <div class="f1 mt_50 pt_10">
      <input placeholder="搜索" class="input1" >
      <img src="../../assets/tongzhi.png" alt="">
      <img src="../../assets/geren.png" alt="">
    </div> -->
    <titlebar
      leftHead="<返回"
      :centerHead="sort1"
      rightHead="..."
    ></titlebar>
    <!-- 顶部大图 -->
    <div class="bgimg mt_50">
      <div class="f3">
        <img src="../../assets/zjq/311.png" alt="" class="w_20 px_10">
        <div class="">
          <h4>{{sort1}}</h4>
          <p class="font_12 py_2">话题<span>{{num}}</span></p>
      </div>
      </div>
    </div>

    <div class="p_10 bg2 my_10 colord3">全部</div>
    <!-- 内容 -->
    <div class="bg2 mb_10" v-for="(item,i) of list" :key="i">
      <div class="f2 pt_10">
        <router-link :to="{path:'/details',query:{ tid:item.tid}}">
          <div class="f21">
            <div>
              <img src="../../assets/zjq/xiangpian.jpg" alt="" class="user">
            </div>
            <!-- 话题发表人和发表时间 -->
            <div class="px_10">
              <p>{{item.t_name}}</p>
              <p class="font_12 color666">{{item.t_times}}</p>
            </div>
          </div>
          <!-- 话题标题,内容,图片 -->
          <h3 class="py_2">{{item.title}}</h3>
          <h4 class="color666 py_2 yincang">{{item.t_content}}</h4>
          <img class="w_60 py_2" :src='item.pic'>
        </router-link>
        
        <div class="bor3 my_10"></div>
        <!-- 话题底部菜单 -->
        <div class="f1 font_12 pb_10">
          <div class="color666" @click="fenxiang">
            <img src="../../assets/zjq/fenxiang.png" alt="" class="txtimg">
            {{item.t_share}}
          </div>
          <router-link class="color666" 
            :to="{path:'/details',query:{ tid:item.tid}}">
            <img src="../../assets/zjq/guankan.png" alt="" class="txtimg">
            {{item.t_look}}
          </router-link>
          <div class="color666" @click="shuoshuo">
            <img class="txtimg"
              src="../../assets/zjq/shuoshuo.png" 
              :data-tid="item.tid"
              :data-t_discuss="item.t_discuss"
              >{{item.t_discuss}}
          </div>
          <div class="color666" @click="zan">
            <img class="txtimg"
              :data-zan="item.zan"
              :data-tid="item.tid"
              :data-t_praise="item.t_praise"
              :src="'http://127.0.0.1:5050/'+item.zan"
            >{{item.t_praise}}
          </div>
        </div>
      </div>
    </div>

    <div class="f1 color666 p_10">没有更多了</div>

    <!-- 输入框 -->
    <div class="shuru" v-show="put1">
      <div class="shuru1">
        <div class="quxiao" @click="quxiao">取消</div>
        <div class="fabiao" @click="fabiao($event)">发表</div>
      </div>
      <div class="shuru2">
        <textarea class="tex"></textarea>
      </div>
    </div>

    <div class="pos1">
      <div class="bor1" @click="tiao"><img src="../../assets/zjq/xie.png" alt=""></div>
      <div class="bor1"><img src="../../assets/zjq/kefu1.png" alt=""></div>
    </div>

  </div>
</template>

<script>
import Qs from "qs"
//1:引入顶部导航条子组件
import titlebar from "./common/Titlebar.vue"
export default {
  created() {
    var sort=this.$route.query.sort;
    //console.log(sort)
    if(sort==1){this.sort1="景点"}
    if(sort==2){this.sort1="酒店"}
    if(sort==3){this.sort1="美食"}
    if(sort==4){this.sort1="攻略"}
    this.loadMore(sort);
  },
  data() {
    return {
      sort1:"",
      num:"",
      list:[],//务器返回结果
      pno:0,//当前显示页码
      put1:false,
      t_discuss:"",
      tid:""
    }
  },
  methods: {
    tiao(){
      this.$router.push("/fabu");
    },
    zan(e){
      var zan = e.target.dataset.zan;
      var tid = e.target.dataset.tid;
      var t_praise = e.target.dataset.t_praise;
      //获取当前元素中所有内容
      var el = e.currentTarget;
      //console.log(el);
      if(zan=="zan.png"){
        zan=0;
        t_praise++
      }else {
        zan=1;
        t_praise--
      }
      var obj={zan,tid,t_praise};
      // console.log(obj)
      this.axios.get("zan",{params:obj}).then(res=>{
        // console.log(res.data)
        if(res.data.code==-2){
          this.$router.push("/login");
        }else if(res.data.code==1){
          this.$toast("点赞成功");
          el.innerHTML=`<img data-v-f5a648ee="" data-zan=zan2.png data-tid=${tid} data-t_praise=${t_praise} src="http://127.0.0.1:5050/zan2.png" class="txtimg">${t_praise}`
          // window.location.reload();
        }else if(res.data.code==2){
          this.$toast("取消点赞");
          el.innerHTML=`<img data-v-f5a648ee="" data-zan=zan.png data-tid=${tid} data-t_praise=${t_praise} src="http://127.0.0.1:5050/zan.png" class="txtimg">${t_praise}`
          // window.location.reload();
        }
      })
    },
    shuoshuo(e){
      this.put1=true;
      var tid = e.target.dataset.tid;
      var t_discuss = e.target.dataset.t_discuss;
      this.tid=tid;
      this.t_discuss=t_discuss;
    },
    quxiao(){
      this.put1=false;
    },
    fabiao(e){
      var tid=this.tid
      var t_discuss=this.t_discuss
      var value=e.currentTarget.parentElement.nextElementSibling.firstElementChild.value
      if(!value){ return }
      //console.log(value)
      var obj={value,tid,t_discuss}
      //console.log(Qs.stringify(obj))
      this.axios.get("/putdiscuss", {params: obj} ).then(res=>{
        if(res.data.code==-2){
          this.$toast("请登陆!");
          this.$router.push("/login");
        }else if(res.data.code=1){
          this.$toast("评论成功");
          this.$router.push({path:'/details?tid=' + tid});
        }
      })
    },
    fenxiang(){
      console.log("分享")
    },
    title(e){
      var sort = e.target.dataset.sort;
      // this.$router.push("/title");
      this.$router.push({path:'/title?sort=' + sort});
    },
    loadMore(sort){
      //功能:加载下一页数据
      this.pno++;
      //console.log(1);
      //1:创建变量url
      var url = "title";
      //2:创建变量obj 
      var obj = {
        sort:sort,
        pno:this.pno
        };
      //3:发送ajax请求
      this.axios.get(url,{params:obj}).then(res=>{
        //console.log(2);
        //4:获取服务器返回结果;保存返回数据
        var datas=res.data.data;
        this.num=datas.length;
        //发送ajax请求,查找用户是否点赞
        this.axios.get("iszan").then(res=>{
          //console.log(res.data.code)
          //console.log(res.data.data)
          //判断是否登录
          if(res.data.code==1){
            //获取服务器返回用户点赞列表;
            var datas2=res.data.data;
            //匹配话题列表和用户点赞情况
            for(var i=0;i<datas.length;i++){
              for(var j=0;j<datas2.length;j++){
                if(datas[i].tid==datas2[j].tid){
                  datas[i].zan="zan2.png"
                }
              }
            }
          }
        })
        for(var i=0;i<datas.length;i++){
          if(datas[i].sort==1){datas[i].sort1="景点"}
          if(datas[i].sort==2){datas[i].sort1="酒店"}
          if(datas[i].sort==3){datas[i].sort1="美食"}
          if(datas[i].sort==4){datas[i].sort1="攻略"}
          if(!datas[i].pic){datas[i].pic="00.png"}
          if(!datas[i].zan){datas[i].zan="zan.png"}
        }
        //5:在data添加属性list
        var rows = this.list.concat(res.data.data)
        this.list = rows;
        //6:在模板创建循环显示数据   43
      })
    },
  },
  components:{
    "titlebar":titlebar   //注册顶部导航条
  }
}
</script>

<style scoped>
*{margin:0;padding:0}
a{
	color: #000;
	text-decoration:none
}

.header{
	width: 100%;
	height:50px;line-height: 50px;
	background:#000;
	color:#fff;
  display:flex;
  position:fixed;left: 0;top: 0;
	justify-content: space-between;
	z-index:1000;
}

.mt_50{margin-top: 50px;}
.mb_10{margin-bottom: 10px;}
.my_10{margin: 10px 0;}
.px_10{padding: 0 10px;}
.py_2{padding:2px 0;}
.p_10{padding: 10px;}
.pt_10{padding-top: 10px;}
.pb_10{padding-bottom: 10px;}
.w_20{width: 20%;}
.w_60{width: 60%;}
.h_100{line-height: 100%;}

.bg{background: #eee;}
.bg2{background: #fff;}

.f1{
  display: flex;
  align-items:center;
  justify-content:space-around ;
}
.input1{
  width: 60%;height: 20px;
  outline:0;
  padding:1px 10px 1px 30px;
  background:#fff url(../../assets/zjq/sousuo.png) no-repeat 5px;
}
.bgimg{
  background: url(../../assets/zjq/31.png) no-repeat;
  background-size:cover;
}
.f3{
  display: flex;
  align-items:flex-start;
  color: #fff;
  padding: 10px 0;
  margin: 10px 0;
  background:rgba(0, 0, 0, .6)
}

.f2{
	width: 90%;
  margin: 0 auto;
}
.f21{
  display: flex;
  align-items: center;
}
.user{
	height: 50px;
	border: 1px solid transparent ;
	border-radius:50%;
	vertical-align:middle;
}
.yincang{
	overflow: hidden;
	white-space: nowrap;
	text-overflow:ellipsis;
}

.h_50{line-height: 50px;}
.color666{color: #666;}
.colord3{color: #d36980;}
.font_12{font-size:12px;}
.bor3{border:0.5px solid #ddd;}
.pos1{
  position:fixed;
  right: 5%;bottom: 10%;
}
.bor1{
  width: 40px;height: 40px;
	background: #d36980;
  border-radius:50%;
  margin: 10px 0;
  display: flex;
  align-items:center;
  justify-content:center;
}
.txtimg{
	width: 30px;
	vertical-align:middle
}

.shuru{
  width: 100%; height: 150px;
  background: #fff;
  border:1px solid #ddd;
  position:fixed;
  top:50%;
  margin-top: -76px
}
.shuru1{
  width: 100%; height: 30px;
	display:flex;
	align-items:center;
	justify-content: space-between
}
.quxiao{
  margin-left: 3%;
}
.fabiao{
  margin-right: 3%;
  color: #666;
}
.shuru2{
  width:100%;
}
.tex{
	width:94%; height:120px;
  margin:0 3%;
  border: 0;
  outline: none;
  resize:none;
}
textarea::-webkit-scrollbar {
  display: none;
}
</style>