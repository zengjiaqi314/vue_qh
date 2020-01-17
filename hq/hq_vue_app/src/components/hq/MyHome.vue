<template>
<div>
  <div class="a1">
    <div class="a2" @click="home">
      <div class="a3">
        <img src="../../assets/myhome/mm.png">
      </div>
      <div style="display:flex;width:98%;">
        <span class="a4" v-show="bl" @click.stop.prevent="dl">登录</span>
        <span class="a4">{{a}}</span>
        <span class="a4" v-show="bl2" @click.stop.prevent="tc">退出</span>
      </div>
      <!-- <div class="a5">
        <img src="../../assets/myhome/t.png">
      </div> -->
    </div>
  </div>
  <div class="cr"></div>
  <div class="b1">
    <div class="b2" @click="one">
      <img src="../../assets/myhome/2.png" class="b3">
      待付款
    </div>
    <div class="b2" @click="two">
      <img src="../../assets/myhome/3.png" class="b3">
      待发货
    </div>
    <div class="b2" @click="three">
      <img src="../../assets/myhome/h.png" class="b3">
      待收货
    </div>
    <div class="b2" @click="four">
      <img src="../../assets/myhome/5.png" class="b3">
      待评价
    </div>
  </div>
  <div class="cr"></div>
  <div class="c1">
    <div class="c4" @click="address">
      <img src="../../assets/myhome/c.png" class="c3">
      收货地址
    </div>
    <div class="c2" @click="car">
      <img src="../../assets/myhome/b.png" class="c3">
      购物车
    </div>
    <div class="c2">
      <img src="../../assets/myhome/a.png" class="c3">
      系统通知
    </div>
  </div>
  <div class="cr"></div>
  <div class="d1">
    <div class="d3">
      <img src="../../assets/myhome/6.png" class="d4">
      会员卡
    </div>
    <div class="d2">
      <img src="../../assets/myhome/7.png" class="d4">
      优惠券
    </div>
    <div class="d2">
      <img src="../../assets/myhome/8.png" class="d4">
      积分
    </div>
    <div class="d2">
      <img src="../../assets/myhome/9.png" class="d4">
      储值金
    </div>
  </div>
</div>
</template>
<script>

export default {
  created(){//组件创建成功后夹子
    this.loadMore();//加载数据
    this.a=sessionStorage.getItem("uname");
    this.uid =sessionStorage.getItem("uid");
  },
  data(){ //保存共享数据
    return{
      a:"",
      uid:"",
      list:[],
      uname:"",
      upwd:"",
      bl:true,
      bl2:false
    }
  },
  methods:{//添加函数
    loadMore(){//页面加载数据
      if(sessionStorage.uid){
        this.bl=false;
        this.bl2=true;
      }
    },
    dl(){
      this.bl=false
      this.$router.push("/login");
    },
    tc(){
      this.bl=true;
      this.bl2=false;
      delete sessionStorage.uid
      delete sessionStorage.uname
      this.axios.get("/tc").then(res=>{
        if(res.data.code==1){
          this.$messagebox("消息","成功退出");
          this.a='';
          this.uid ='';
        }
      })
    },
    one(){
      if(this.uid){
        console.log(1);
        //this.$router.push("/Info");
      }else{
        this.$toast("请先登录!")
        this.$router.push("/Login");
      }
    },
    two(){
      if(this.uid){
        console.log(1);
        //this.$router.push("/Info");
      }else{
        this.$toast("请先登录!")
        this.$router.push("/Login");
      }
    },
    three(){
      if(this.uid){
        console.log(1);
        //this.$router.push("/Info");
      }else{
        this.$toast("请先登录!")
        this.$router.push("/Login");
      }
    },
    four(){
      if(this.uid){
        console.log(1);
        //this.$router.push("/Info");
      }else{
        this.$toast("请先登录!")
        this.$router.push("/Login");
      }
    },
    address(){
      if(this.uid){
        this.$router.push("/Address");
      }else{
        this.$toast("请先登录!")
        this.$router.push("/Login");
      }
    },
    car(){
      if(this.uid){
        this.$router.push("/Cart");
      }else{
        this.$toast("请先登录!")
        this.$router.push("/Login");
      }
    },
    home(){
    //   if(this.uid){
    //     this.$router.push("/Info");
    //   }else{
    //     this.$toast("请先登录!")
    //     this.$router.push("/Login");
    //   }
    },
  },
}
</script>
<style scoped>
  .cr{
    width:100%;
    height:10px;
    background-color:#eaeaea;
  }
  .a1{
    display:flex;
    height:150px;
  }
  .a2{
    /*justify-content: space-between;*/
    display:flex;
    margin-top:50px;
    margin-left:10px;
    width:100%;
    height:50px;
  }
  .a3{
    width:50px;
  }
  .a4{
    width:100%;
    padding-top:20px;
  }
  .a5{
    margin-right:5px;
    padding-top:7px;
  }
  .b1{
    justify-content: space-around;
    display:flex;
    width:100%;
    height:100px;
  }
  .b2{
    color:#666666;
    padding-top:22px;
    width:54px;
  }
  .b3{
    margin-left:6px;
  }
  .c1{
    width:100%;
    height:300px;
  }
  .c2{
    color:#666666;
    height:100px;
    border-top:1px solid #eaeaea;
  }
  .c3{
    margin-top:31px;
    margin-left:21px;
  }
  .c4{
    color:#666666;
    height:100px;
  }
  .d1{
    width:100%;
    height:400px;
    margin-bottom: 100px
  }
  .d2{
    height:100px;
    border-top:1px solid #eaeaea;
    color:#666666;
  }
  .d3{
    height:100px;
    color:#666666;
  }
  .d4{
    margin-top: 31px;
    margin-left: 21px;
  }
</style>