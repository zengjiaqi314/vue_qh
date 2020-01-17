<template>
  <div>
    <div class="shouhuo">收货地址</div>
    <input class="input" type="text" placeholder="暂无收货地址" disabled="true">
    <div class="xinzen" @click="run">+&nbsp;新增地址</div>
  </div>
</template>

<script>
export default {
  methods:{
    run(){
      this.$router.push("/Add");
    }
  }
}
</script>

<style scoped>
.shouhuo{
  width: 100%;
  padding-top:5px;
  padding-left:5px;
  font-size:13px;
}
.input{
  width: 100%;
  border:none;
  height:40px;
  background-color:#ccc;
  padding-left:10px;
  margin-top:5px;
}
.xinzen{
  width: 100%;
  height:35px;
  position: fixed;
  bottom:0;
  text-align: center;
  line-height:35px;
  background-color:#ccc;
}
</style>

