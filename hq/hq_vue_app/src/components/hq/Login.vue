<template>
  <div>
    <mt-field placeholder="请输入用户名" v-model="uname"></mt-field>
    <mt-field placeholder="请输入密码" v-model="upwd" type="password"></mt-field>
    <mt-button size="large" @click="login">登陆</mt-button>
    <mt-button size="large" @click="reg">注册</mt-button>
  </div>
</template>
<script>
export default {
  data(){
    return{
      uname:"tom",
      upwd:"123456",
    }
  },
  methods:{
    reg(){
      this.$router.push("/reg")
    },
    login(){
      //功能:完成用户登录
      //1:创建正则表达式3~12
      var reg = /^[a-zA-Z0-9]{3,12}$/;
      //2:获取用户名和密码
      var u = this.uname;
      var p = this.upwd;
      //3:验证用户名不正确显示出错信息
      if(!reg.test(u)){
        this.$messagebox("信息","用户名格式错误");
        return;
      }
      //4:返回
      //5:验证用户密码不正确显示错误信息
      if(!reg.test(p)){
        this.$messagebox("信息","用户密码格式错误");
        return;
      }
      //6:返回
      //7:发送ajax请求！！
      var url = "login";
      var obj = {uname:u,upwd:p};
      this.axios.get(url,{params:obj}).then(res=>{//成功回调函数
        //8:获取服务器返回结果
        if(res.data.code==-1){
          this.$messagebox("消息","用户名或密码有误");
        //9:出错显示出错信息
        }else{
        //10:跳转/MyHome
          var d = res.data.data[0].uid;
          sessionStorage.setItem("uname", u);//history.go(0)
          sessionStorage.setItem("uid", d);//history.go(0)
          if(this.$route.query.zc==1){
            this.$router.push("/")
          }else{
            this.$router.go(-1);
          }
        }
      })
    }
  },
}
</script>