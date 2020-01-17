<template>
  <div>
    <mt-field placeholder="请输入用户名(3~12)" v-model="uname"></mt-field>
    <mt-field placeholder="请输入密码(3~12)" v-model="upwd" type="password"></mt-field>
    <mt-field placeholder="请确认密码" v-model="upwdd" type="password"></mt-field>
    <mt-button size="large" @click="regin">注册</mt-button>
  </div>
</template>
<script>
export default {
  data(){
    return{
      uname:"",
      upwd:"",
      upwdd:"",
    }
  },
  methods:{
    regin(){
      //console.log(1);
      var reg = /^[a-zA-Z0-9]{3,12}$/;
      var u = this.uname;
      var p = this.upwd;
      var w = this.upwdd;
      //console.log(2);
      //console.log(u+":"+p+":"+w);
      if(!reg.test(u)){
        this.$messagebox("信息","用户名格式错误");
        return;
      }
      if(!reg.test(p)){
        this.$messagebox("信息","用户密码格式错误");
        return;
      }
      if(p != w){
        this.$messagebox("信息","两次密码输入不一致");
        return;
      }
      //console.log(3);
      //console.log(u+":"+p+":"+w);
      var url = "reg";
      var obj = {uname:u,upwd:p};
      //console.log(4);
      //console.log(obj);
      this.axios.get(url,{params:obj})
      .then(res=>{//成功回调函数
        //console.log(5);
        //console.log(res);
      if(res.data.code==-1){
        console.log(6)
        this.$messagebox("消息","该用户名已存在");
      //9:出错显示出错信息
      }else{
        //console.log(7)
        this.$messagebox("消息","注册成功");
        this.$router.push( { path:"/Login", query:{zc:1} } );
      }
      })
    }
  }
}
</script>