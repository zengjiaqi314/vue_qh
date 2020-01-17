<template>
  <div>
    <!-- <div class="header">
      <h3 class="px_10"><a href="javascript:history.go(-1)" style="color:#fff">返回</a></h3>
      <h3 class="px_10">详情</h3>
      <h3 class="px_10">...</h3>
    </div> -->
    <titlebar
      leftHead="<返回"
      centerHead="详情"
      rightHead="..."
    ></titlebar>
    <!-- 话题详情 -->
    <div class="f1">
      <div class="f12">
        <div>
          <img src="../../assets/zjq/xiangpian.jpg" alt="" class="user">
        </div>
        <div class="px_10">
          <p>{{list.t_name}}</p>
          <p class="font_12 color666">
            <span class="pr_10">{{list.t_times}}</span>
            <span class="pr_5">人气</span>{{list.t_look}}
          </p>
        </div>
      </div>
      <p class="py_10">{{list.title}}</p>
      <p class="font_12 mb_10 color666">{{list.t_content}}</p>
      <img class="w_100 py_2" 
        :src="list.pic">
    </div>
    <!-- 评论数量和点赞数量 -->
    <div class="f2 bor_t bor_b p_10">
      <span>全部评论 ({{list.t_discuss}})</span>
      <span>赞 ({{list.t_praise}})</span>
    </div>
    <!-- 评论列表 -->
    <div class="f3 bor_b" v-for="(item,i) of list3" :key="i">
      <div class="pr_10">
        <!-- 左边头像 -->
        <img src="../../assets/zjq/xiangpian.jpg" alt="" class="user">
      </div>
      <!-- 右边其他 -->
      <div class="w_100" >
        <!-- 评论人和评论点赞 -->
        <div class="f2">
          <div>{{item.d_name}}</div>
          <div  @click="zan">
            <img class="txtimg"
              :data-zan="item.zan"
              :data-did="item.did"
              :data-d_praise="item.d_praise"
              :src="'http://127.0.0.1:5050/'+item.zan"
            >{{item.d_praise}}
          </div>
        </div>
        <!-- 评论楼层和时间 -->
        <div class="font_12 color666" @click="huifu"
          :data-did="item.did">
          {{list3.length-i}}楼 {{item.d_times}}
        </div>
        <!-- 评论内容 -->
        <div class="py_10" @click="huifu"
          :data-did="item.did">{{item.d_content}}</div>
        <!-- 回复列表 -->
        <div class="bg1 color666 font_12" 
          @click="huifu"
          v-for="(item2,j) of item.reply" :key="j">
          <p :data-did="item.did">
            {{item2.r_name}} 回复: {{item2.r_content}}
          </p>
        </div>
      </div> 
    </div>

    <div class="f4">没有更多了</div>
    <div class="footer">
      <div class="input1" @click="shuoshuo"
        >来说说我的看法...</div>
      <div class="w_10" @click="shuoshuo">
        <img src="../../assets/zjq/shuoshuo.png" class="txtimg">
      </div>
      <div class="w_10" @click="zan2">
        <img class="txtimg"
          :data-zan="list.zan"
          :data-tid="list.tid"
          :data-t_praise="list.t_praise"
          :src="'http://127.0.0.1:5050/'+list.zan"
        >
      </div>
    </div>

        <!-- 输入框 -->
    <div class="shuru" v-show="put">
      <div class="shuru1">
        <div class="quxiao" @click="quxiao">取消</div>
        <div class="fabiao" v-show="put1"
          @click="fabiao($event)">发表</div>
        <div class="fabiao" v-show="put2"
          @click="fabiao2($event)">发表</div>
      </div>
      <div class="shuru2">
        <textarea class="tex"></textarea>
      </div>
    </div>

  </div>
</template>

<script>
import Qs from "qs"
//1:引入顶部导航条子组件
import titlebar from "./common/Titlebar.vue"
export default {
  created() {
    var tid=this.$route.query.tid;
    //console.log(tid)
    this.loadMore(tid);
  },
  data() {
    return {
      sort1:"",
      list:[],//务器返回结果
      list2:[],//务器返回结果
      reply1:[],//务器返回结果
      list3:[],//务器返回结果
      put:false,
      put1:false,
      put2:false,
      did:"",
    }
  },
  methods: {
    huifu(e){
      this.put=true;
      this.put2=true;
      var did = e.target.dataset.did;
      this.did=did;
    },
    shuoshuo(){
      this.put=true;
      this.put1=true;
    },
    quxiao(){
      this.put=false;
      this.put1=false;
      this.put2=false;
    },
    //发表回复
    fabiao2(e){
      //console.log(1)
      var tid=this.$route.query.tid;
      var did=this.did;
      var value=e.currentTarget.parentElement.nextElementSibling.firstElementChild.value
      if(!value){ return }
      //console.log(value)
      var obj={tid,did,value}
      this.axios.get("/putreply", {params: obj} ).then(res=>{
        if(res.data.code==-2){
          this.$toast("请登陆!");
          this.$router.push("/login");
        }else if(res.data.code=1){
          this.$toast("回复成功");
          this.quxiao()
          window.location.reload();
        }
      })
    },
    //发表评论
    fabiao(e){
      var tid=this.$route.query.tid;
      var t_discuss=this.list.t_discuss
      var value=e.currentTarget.parentElement.nextElementSibling.firstElementChild.value
      if(!value){ return }
      //console.log(value)
      var obj={value,tid,t_discuss}
      console.log(Qs.stringify(obj))
      this.axios.get("/putdiscuss", {params: obj} ).then(res=>{
        if(res.data.code==-2){
          this.$toast("请登陆!");
          this.$router.push("/login");
        }else if(res.data.code=1){
          this.$toast("评论成功");
          this.quxiao()
          window.location.reload();
        }
      })
    },
    zan2(e){
      var zan = e.target.dataset.zan;
      var tid = e.target.dataset.tid;
      var t_praise = e.target.dataset.t_praise;
      //获取当前元素中所有内容
      var el = e.currentTarget;
      //console.log(el);
      if(zan=="zan.png"){
        zan=0;
        t_praise++;
        this.list.t_praise=t_praise
      }else {
        zan=1;
        t_praise--;
        this.list.t_praise=t_praise
      }
      var obj={zan,tid,t_praise};
      // console.log(obj)
      this.axios.get("/zan",{params:obj}).then(res=>{
        // console.log(res.data)
        if(res.data.code==-2){
          this.$router.push("/login");
        }else if(res.data.code==1){
          this.$toast("点赞成功");
          el.innerHTML=`<img data-v-8d64e93c src="http://127.0.0.1:5050/zan2.png" class="txtimg" data-zan="zan2.png" data-tid=${tid} data-t_praise=${t_praise}>`
          // window.location.reload();
        }else if(res.data.code==2){
          this.$toast("取消点赞");
          el.innerHTML=`<img data-v-8d64e93c src="http://127.0.0.1:5050/zan.png" class="txtimg" data-zan="zan.png" data-tid=${tid} data-t_praise=${t_praise}>`
          // window.location.reload();
        }
      })
    },
    zan(e){
      var zan = e.target.dataset.zan;
      var did = e.target.dataset.did;
      var d_praise = e.target.dataset.d_praise;
      //获取当前元素中所有内容
      var el = e.currentTarget;
      //console.log(el);
      if(zan=="zan.png"){
        zan=0;
        d_praise++
      }else {
        zan=1;
        d_praise--
      }
      var obj={zan,did,d_praise};
      // console.log(obj)
      this.axios.get("/zan2",{params:obj}).then(res=>{
        // console.log(res.data)
        if(res.data.code==-2){
          this.$router.push("/login");
        }else if(res.data.code==1){
          this.$toast("点赞成功");
          el.innerHTML=`<img data-v-f5a648ee="" data-zan=zan2.png data-did=${did} data-d_praise=${d_praise} src="http://127.0.0.1:5050/zan2.png" class="txtimg">${d_praise}`
          // window.location.reload();
        }else if(res.data.code==2){
          this.$toast("取消点赞");
          el.innerHTML=`<img data-v-f5a648ee="" data-zan=zan.png data-did=${did} data-d_praise=${d_praise} src="http://127.0.0.1:5050/zan.png" class="txtimg">${d_praise}`
          // window.location.reload();
        }
      })
    },
    loadMore(tid){
      this.loadMore1(tid);
      this.loadMore2(tid);
      this.loadMore3(tid);
    },
    //加载评论的回复列表
    loadMore3(tid){
      //查询话题的所有回复
      var obj={tid}
      this.axios.get("/reply",{params:obj}).then(res=>{
        //console.log(res.data.data)
        this.reply1 = res.data.data
        //console.log(1)
        var list2=this.list2;
        var reply1=this.reply1;
        //话题的评论和回复匹配
        for(var i=0;i<list2.length;i++){
          list2[i].reply=[]
          for(var j=0;j<reply1.length;j++){
            if(list2[i].did==reply1[j].did){
              list2[i].reply.push(reply1[j])
            }
          }
        }
        //console.log(2)
        this.list3=list2
        //console.log(this.list3)
      })
    },
    //加载评论列表
    loadMore2(tid){
      var obj2 = {tid};
      this.axios.get("/details",{params:obj2}).then(res=>{
        var datas2=res.data.data;
        //console.log(datas2)
        //发送ajax请求,查找用户是否点赞
        this.axios.get("/iszan").then(res=>{
          //判断是否登录
          if(res.data.code==1){
            //获取服务器返回用户点赞列表;
            var datas3=res.data.data;
            //匹配话题列表和用户点赞情况
            for(var i=0;i<datas2.length;i++){
              for(var j=0;j<datas3.length;j++){
                if(datas2[i].did==datas3[j].did){
                  datas2[i].zan="zan2.png"
                }
              }
            }
          }
        })
        for(var i=0;i<datas2.length;i++){
          if(!datas2[i].zan){datas2[i].zan="zan.png"}
        }
        //5:在data添加属性list
        var rows = this.list2.concat(res.data.data)
        this.list2 = rows;
        //6:在模板创建循环显示数据   43
      })
    },
    //跳转到本页面,观看次数+1,加载话题详情
    loadMore1(tid){
      var obj={tid}
      //跳转到本页面,观看次数自动加一
      this.axios.get("/detail",{params:obj}).then(res=>{
        var datas=res.data.data;
          this.axios.get("/iszan").then(res=>{
          //判断是否登录
            if(res.data.code==1){
            //获取服务器返回用户点赞列表;
              var datas1=res.data.data;
            //匹配话题列表和用户点赞情况
              for(var i=0;i<datas1.length;i++){
                if(datas1[i].tid==datas[0].tid){
                  datas[0].zan="zan2.png"
                }
              }
            }
          })
        if(!datas[0].zan){datas[0].zan="zan.png"}
        this.list = datas[0];
        //console.log(this.list)
        var t_look=datas[0].t_look;
        var obj2={tid,t_look}
        this.axios.get("/look",{params:obj2}).then(res=>{})
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
li{list-style:none}

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

.mt_50{margin-top: 60px;}
.mb_10{margin-bottom: 10px;}
.px_10{padding: 0 10px;}
.py_10{padding: 10px 0;}
.py_2{padding:2px 0;}
.p_10{padding:10px;}
.pr_10{padding-right:10px;}
.pr_5{padding-right:5px;}
.w_100{width: 100%;}
.font_12{font-size: 12px;}
.color666{color: #666;}

.f1{
	width: 90%;
  margin: 60px auto 10px;
}
.f12{
  display: flex;
  align-items: center;
}
.user{
	height: 50px;
	border: 1px solid transparent ;
	border-radius:50%;
	vertical-align:middle;
}
.h_50{line-height: 50px;}
.f2{
  display: flex;
  justify-content: space-between;

}
.bor_t{border-top: 8px solid #ddd;}
.bor_b{border-bottom: 1px solid #ddd;}
.f3{
  display: flex;
  padding: 10px;
}
.bg1{background: #ddd;}
.f4{
  padding: 10px;
  margin-bottom: 50px;
  text-align: center;
  color: #666;
  font-size: 14px
}
.footer{
	width: 100%;
  height:25px;
  background:#fff;
  border-top:1px solid #ddd;
  display:flex;
  padding: 10px 0;
  position:fixed;left: 0;bottom: 0;
	justify-content: space-around;
	z-index:1000;
  }
.input1{
  width: 60%;
  padding: 3px 10px;
  background: #ddd;
  color: #666;
  border: 0;
  border-radius: 5px;
  outline:0;
}
.w_10{width: 10%;}
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