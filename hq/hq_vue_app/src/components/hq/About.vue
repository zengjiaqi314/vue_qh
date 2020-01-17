<template>
  <div class="mb">
    <!-- 第一层图片 -->
    <div class="lou1">
      <div class="kuang">
        <div class="wenzi">舟山旅游</div>
      </div>
      <div class="liulan">
        <img src="../../assets/about_2.png" style="width:15.23px;height:15.23px;vertical-align: middle; "><span>浏览</span>
      </div>
      <div class="xihuan">
        <img src="../../assets/about_3.png" style="width:15.23px;height:15.23px;vertical-align: middle; "><span>喜欢</span>
      </div>
    </div>

    <!-- 第二层YHO婚纱摄影 -->
    <div class="lou2">
      <img src="../../assets/about_4.png" style="width:18.75px;height:18.75px;vertical-align:middle;margin-left:20px;">
      <div class="lou2_ch">舟山旅游 | </div>
      <div class="lou2_en">Super Preference</div>
    </div>

    <!-- 第三层文字描述 -->
    <div class="lou3">
        靠谱的旅游攻略,自由行,自助游分享社区,海量旅游景点图片、游记、交通、美食、购物等自由行旅游攻略信息,舟山旅游获取自由行,自助游攻略信息更全面
    </div>

    <!-- 第四层地址电话 -->
    <div class="lou4">
      <div class="lou4_1">
        <img src="../../assets/about_5.png" style="width:21.09px;height:21.09px; margin-left:20px;vertical-align: middle;"><span>地址：舟山市定海区新城海天大道611号</span>
      </div>
      <div class="lou4_2">
        <img src="../../assets/about_6.png" style="width:21.09px;height:21.09px; margin-left: 20px;vertical-align: middle;"><span>电话：13684950889</span>
      </div>
    </div>

    <!-- 第五层图片-->
    <div class="lou5">
      <img src="../../assets/hzx/about_7.png" style="width:375px;height: 140.63px;">
    </div>

    <!-- 第六层YHO成功案例 -->
    <div class="lou6">
      <img src="../../assets/about_4.png" style="width: 18.75px;height: 18.75px;vertical-align:middle;margin-left:20px;">
      <div class="lou6_ch">旅游方案丨</div>
      <div class="lou6_en">Successful cases</div>
    </div>

    <!-- 第七层图片 -->
    <img src="../../assets/hzx/about_8.png" style="width:375px;height:164.06px;">
    <img src="../../assets/hzx/about_9.png" style="width:375px;height:164.06px;">
    <img src="../../assets/hzx/about_10.png" style="width:375px;height:164.06px;">

    <!-- 第八层联系我们 -->
    <div class="lou8">
      <img src="../../assets/about_11.png" style="width: 23.44px;height:23.44px;vertical-align:middle;margin-left:20px;">
      <div class="lou8_ch">联系我们</div>
    </div>

    <!-- 第九层提交按钮 -->
    <div class="lou9">
      <input type="text" placeholder="请输入姓名" v-model="uname">
      <input type="text" placeholder="请输入联系方式" v-model="uphone">
      <div class="submit" @click="submit">提交按钮</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      uname:"",
      uphone:"",
    }
  },
  methods:{
    submit(){
      var n=this.uname;
      var p=this.uphone;
      // console.log(n+":"+p);
      if(!n){
        this.$messagebox("提示","用户名不能为空!");
        return;
      }
      if(!p){
        this.$messagebox("提示","手机号不能为空!");
      }
      var obj={uname:n,uphone:p}
      this.axios.get("insert",{params:obj}).then(res=>{
        // console.log(123);
        console.log(res);
        this.$messagebox("提示","谢谢!");
      })
    }
  },
}
</script>

<style scoped>
.mt{margin-top: 50px}
.mb{margin-bottom: 100px}
.lou1{
      width:100%;
      height:118.36px;
      background-image:url(../../assets/hzx/about_1.png);
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      background-size:cover;
    }
    .kuang{
      width:167.58px;height:30.47px;
      background-color:rgba(255,255,255,0.5);
      margin:0 auto;
      position: relative;
      left:0px;top:45px;
      border-radius: 0.89rem;
    }
    .wenzi{
      font-weight: bold;
      font-size: 0.28rem;
      text-align: center;
      color:#000;
      padding-top:6px;
    }
    .liulan{
      width:44.23px;height:15.23px;
      position: absolute;
      left:14px;top:90px;
    }
    .liulan>span{
      width: 24px;height:13px;
      font-size: 9px;
      margin-left: .1rem;
      color:oldlace;
    }
    .xihuan{
      width:44.23px;height:15.23px;
      position: absolute;
      left:70px;top:90px;
    }
    .xihuan>span{
      width: 24px;height:13px;
      font-size: 9px;
      margin-left: .1rem;
      color:oldlace;
    }

    .lou2{
      width: 100%;height:26.88px;
      text-align: left;
      display: flex;
      padding-top:20px;
 
    }
    .lou2_ch{
      font-size:0.28rem;
      font-weight: bolder;
    }
    .lou2_en{
      font-size: 0.28rem;
      margin-left: 4px;
      color:gray;
      opacity: 0.6;
    }

    .lou3{
      height: 96px;
      line-height:24px;
      font-size: 0.28rem;
      color:rgb(102,102,102);
      padding:0 20px;
    }

    .lou4{
      width: 100%;
      height: 77.11px;
    }
    .lou4 span{
      font-size:0.28rem;
      color:gray;
    }
    .lou4 .lou4_1 {
      width: 100%;
      margin:10px auto;
    }
    
    .lou5{
      width: 100%;
      height: 140.63px;
      padding-left: 10px;
    }

    .lou6{
      width:100%;height: 46.88px;
      display: flex;
      padding-top:20px;
    }
    .lou6_ch{
      font-size:0.28rem;
      font-weight: bolder;
    }
    .lou6_en{
      font-size: 0.28rem;
      margin-left: 4px;
      color:gray;
      opacity: 0.6;
    }

    .lou8{
      width:100%;height:39.22px;
      display:flex;
      padding-top:20px;
    }
    .lou8_ch{
      font-size:0.28rem;
    }

    .lou9{
      width: 100%;height: 171.72px;
      
    }
    .lou9 input{
      width: 328.13px;height: 35.02px;
      margin-left:25px;
      margin-top:15px;
    }
    .submit{
      width:316.41px;height:41.02px;
      background-color:rgb(255,131,158);
      border-radius: 0.4rem;
      margin-top:15px;margin-left:27px;
      font-size:0.328rem;
      line-height:41.02px;
      text-align: center;
      color:#fff;
    }
</style>


