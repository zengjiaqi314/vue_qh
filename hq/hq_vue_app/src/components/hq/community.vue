<template>
  <div>
    <!-- 头部 -->
    <!-- <div class="header">
      <h3 class="px_10"><a href="javascript:history.go(-1)" style="color:#fff">返回</a></h3>
      <h3 class="px_10">话题</h3>
      <h3 class="px_10"></h3>
    </div> -->
    <!-- 顶层大图 -->
    <div class="mb_10">
      <img src="../../assets/zjq/1.png" alt="" class="w_100 h_70">
    </div>
    <!-- 热门话题和今日话题
    <div class="f1 mb_10">
      <div class="w_40"">
        <img src="../../assets/21.png" class="w_100">
      </div>
      <div class="w_40"">
        <img src="../../assets/22.png" class="w_100">
      </div>
    </div>
    <div class="bor mb_10"></div> -->

    <!-- 话题导航 -->
    <h3 class="cen mb_10">发现话题</h3>
    <div class="f1 ht">
      <router-link class="w_23 bg1"
      :to="{path:'/title',query:{ sort:1}}" >
        <h4 class="huati"><span class="pos_b">景点</span></h4>
      </router-link>
      <router-link class="w_23 bg2"
      :to="{path:'/title',query:{ sort:2}}" >
        <h4 class="huati"><span class="pos_b">酒店</span></h4>
      </router-link>
      <router-link class="w_23 bg3"
      :to="{path:'/title',query:{ sort:3}}" >
        <h4 class="huati"><span class="pos_b">美食</span></h4>
      </router-link>
      <router-link class="w_23 bg4"
      :to="{path:'/title',query:{ sort:4}}" >
        <h4 class="huati"><span class="pos_b">攻略</span></h4>
      </router-link>
    </div>
    <!-- 中间大图 -->
    <div class="cen"><img src="../../assets/zjq/4.png" alt="" class="w_85"></div>

    <!-- 话题内容主体 -->
    <div v-for="(item,i) of list" :key="i">
      <div class="f2" >
        <!-- 话题发表人 -->
        <router-link :to="{path:'/details',query:{ tid:item.tid}}">
          <div>
            <img src="../../assets/zjq/xiangpian.jpg" class="user">
            <span class="h_50">{{item.t_name}}</span>
          </div>
          <!-- 话题标题,内容和图片 -->
          <div>
            <h3 class="py_2">{{item.title}}</h3>
            <p  class="color666 py_2 yincang">{{item.t_content}}</p>
            <img  class="w_60" :src="item.pic">
          </div>
          <!-- 话题发表时间和归属 -->
          <div class="f3 mb_10 font_12 py_2" >
            <div class="py_2">{{item.t_times}}</div>
            <div class="bor2" @click.prevent.stop="title"
            :data-sort="item.sort"
            >{{item.sort1}}</div>
          </div>
          <!-- 话题回复 -->
          <div class="f4">查看全部{{item.t_discuss}}评论</div>
        </router-link>
        <!-- 话题底部菜单 -->
        <div class="f5">
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
              :src="'http://127.0.0.1:5050/'+item.zan"
              :data-zan="item.zan"
              :data-tid="item.tid"
              :data-t_praise="item.t_praise"
              >
              <span>{{item.t_praise}}</span>
          </div>
        </div>
      </div>
      <!-- 底部灰色条 -->
      <div class="bor mb_10"></div>
    </div>

    <div class="f6 mb_100 color666" @click="loadMore">没有更多了</div>

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

    <!-- <div class="footer">
      <h3 class="px_10">精选</h3>
      <h3 class="px_10">社区</h3>
      <h3 class="px_10">关于</h3>
      <h3 class="px_10">我们</h3>
    </div> -->
  </div>
</template>

<script>
import Qs from "qs"
export default {
  created(){//组件创建成功后加载
    this.loadMore();//加载数据
  },
  data() {
    return {
      list:[],
      put1:false,
      tid:"",
      t_discuss:"",
    }
  },
  methods: {
    zan(e){
      var aaa=e.currentTarget.firstElementChild
      var bbb=e.currentTarget.lastElementChild
      var t_praise=bbb.textContent
      var aaa1="http://127.0.0.1:5050/zan.png"
      var aaa2="http://127.0.0.1:5050/zan2.png"
      var zan=0
      if(aaa.src==aaa1){
        t_praise++;
        zan=0;
        aaa.src=aaa2;
        bbb.textContent=t_praise
      }else{
        t_praise--;
        zan=1;
        aaa.src=aaa1;
        bbb.textContent=t_praise
      }
      var tid = e.target.dataset.tid;
      var obj={zan,tid,t_praise};
      this.axios.get("zan",{params:obj}).then(res=>{
         if(res.data.code==-2){
           this.$router.push("/login");
         }else if(res.data.code==1){
           this.$toast("点赞成功");
         }else if(res.data.code==2){
           this.$toast("取消点赞");
         }
       })
    },
    shuoshuo(e){
      //修改put1值弹出输入框
      this.put1=true;
      //获得当前点击元素的值保存到data
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
      this.$router.push({path:'/title?sort=' + sort});
    },
    loadMore(){
      //发送ajax请求,加载所有话题
      this.axios.get("title").then(res=>{
        //console.log(1);
        //获取服务器返回结果;保存返回数据
        var datas=res.data.data;
        //发送ajax请求,查找用户是否点赞
        this.axios.get("iszan").then(res=>{
          //console.log(2)
          //判断是否登录,如果登录
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
          //用户未点赞或者未登录的默认
          if(!datas[i].zan){datas[i].zan="zan.png"}
        }
        //在data添加属性list
        this.list = res.data.data
      })
    },
  },
}
</script>

<style scoped>
*{margin:0;padding:0}
a{
	color: #000;
	text-decoration:none
}
.header,.footer{
	width: 100%;
	height:50px;line-height: 50px;
	background:#000;
	color:#fff;
  display:flex;
  position:fixed;left: 0;
	justify-content: space-between;
	z-index:1000;
}
.header{top: 0;}
.footer{bottom: 0;}

.mt_50{margin-top: 50px;}
.mb_100{margin-bottom: 100px;}
.mb_10{margin-bottom: 10px;}
.py_2{padding:2px 0;}
.px_10{padding: 0 10px;}
.w_100{width: 100%;}
.w_85{
  width: 85%;
  height: 150px;
  margin: 10px 0;
}
.w_60{width: 60%;}
.w_40{width: 40%;}
.w_23{width: 23%;}
.h_70{height: 210px;}
.h_50{line-height: 50px;}
.color666{color: #666;}
.font_12{font-size:12px;}

.f1{
	display:flex;
	align-items:center;
	justify-content: space-around
}
.bor{
	height: 10px;width: 100%;
	background: #ddd;
}
.cen{
  text-align: center;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.huati{
	width: 100%; height:0;
	padding: 50% 0;
	text-align:center;
	color: #fff;
	overflow: hidden;
	white-space: nowrap;
	text-overflow:ellipsis;
	background: rgba(0, 0, 0, .6);
}
.pos_b{
	position:relative;
	bottom:10px;
}
.bg1{
	background: url(../../assets/zjq/31.png)no-repeat;
	background-size:cover;
}
.bg2{
	background: url(../../assets/zjq/32.png)no-repeat;
	background-size:cover;
}
.bg3{
	background: url(../../assets/zjq/33.png)no-repeat;
	background-size:cover;
}
.bg4{
	background: url(../../assets/zjq/34.png)no-repeat;
	background-size:cover;
}
.f2{
	width: 90%;
	margin: 0 auto;
}
.user{
	height: 50px;
	border: 2px solid transparent ;
	border-radius:50%;
	vertical-align:middle;
}
.yincang{
	overflow: hidden;
	white-space: nowrap;
	text-overflow:ellipsis;
}
.f3{
	display:flex;
	justify-content: space-between;
}
.bor2{
	background: #ddd;
  padding: 2px 10px;
	border:1px solid #ddd;
	border-radius: 10px;
}
.f4{
  padding: 5px 10px;
  text-align: center;
  margin-bottom: 10px;
  font-size:12px;
  color: blue; 
	background: #ddd;
}
.f5{
  padding: 10px 0;
  border-top:1px solid #ddd;
  font-size:12px;
  display:flex;
	align-items:center;
	justify-content: space-around;
}
.f6{
	height:50px ;line-height: 50px;
	text-align: center;
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