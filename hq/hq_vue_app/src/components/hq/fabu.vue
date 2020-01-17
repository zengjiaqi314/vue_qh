<template>
  <div>
    <!-- 头部 -->
    <!-- <div class="header">
      <h3 class="px_10"><a href="javascript:history.go(-1)" style="color:#fff">返回</a></h3>
      <h3 class="px_10">发布</h3>
      <h3 class="px_10"></h3>
    </div> -->
    <titlebar
      leftHead="<返回"
      centerHead="发布"
      rightHead="..."
    ></titlebar>
    <div class="mt_50">
      <input type="text" class="shuru shuru1" placeholder="请输入标题">
    </div>
    <div>
      <textarea class="shuru shuru2" placeholder="请输入内容"></textarea>
      <van-uploader class="sc" v-model="file" multiple :max-count="1" />
      <img :src="i.content" alt="">
    </div>
    <div class="tanxin">
      <select id="sort" class="xuan">
        <option value="1" >--请选择分类--</option>
        <option value="1">--景点--</option>
        <option value="2">--酒店--</option>
        <option value="3">--美食--</option>
        <option value="4">--攻略--</option>
      </select>
    </div>
    <button class="btn" @click="fabu($event)">立即发布</button>
  </div>
</template>

<script>
//1:引入顶部导航条子组件
import titlebar from "./common/Titlebar.vue"
import qs from 'qs'
export default {
  data(){
    return{
      file:[],
      i:'',
      sort:''
    }
  },
  methods: {
    beforeRouteLeave(to,from,next){
    console.log(`路由离开home...`);
    //如果从首页跳到products
    if(to.name=="title"){
      to.meta.keepAlive=false;
    }
    next();
  },
    fabu(e){
      var v3= e.currentTarget.previousElementSibling
      var v2=v3.previousElementSibling
      var v1=v2.previousElementSibling
      var sort=v3.firstElementChild.value
      this.sort=sort
      var t_content=v2.firstElementChild.value
      var title=v1.firstElementChild.value
      var pic=this.file[0]
      //console.log(value3)
      //console.log(value2)
      pic = JSON.stringify(pic)
      //console.log(pic)
      if(!title){
        this.$toast("请写标题!");
        return
      }
      if(!t_content){
        this.$toast("请写内容!");
        return
      }
      var obj={title,t_content,sort,pic}
      this.axios.post("puttopic", qs.stringify(obj)).then(res=>{
        if(res.data.code==-2){
          this.$toast("请登陆!");
          this.$router.push("/login");
        }else if(res.data.code=1){
          this.$toast("发布成功");
          this.$router.push({path:'/title?sort=' + sort});
        }
      })
    }
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
.mt_50{margin-top: 50px}
.bg_ddd{background: #ddd}
.bg_fff{background: #fff}

.shuru{
  width: 94%;
  margin: 0 3%;
  border: 0;
  outline: none;
}
.shuru1{
  height: 30px;
  border-bottom: 1px solid #ddd;
}
.shuru2{
  height:150px;
  font-size: 14px;
  padding-top: 5px;
  resize:none;
  border-bottom: 1px solid #ddd;
}
textarea::-webkit-scrollbar {
  display: none;
}
.tanxin{
  display: flex;
  flex-direction:row-reverse;
}
.xuan{
  outline: none;
  background: #eee;
  border-radius: 5px;
  font-size: 12px;
  margin: 10px;
}
.btn{
  color: #fff;
  font-weight:700;
  background: #e67;
  width: 90%;height: 40px;
  margin: 0 5%;
}
</style>