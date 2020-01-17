<template>
  <div class="page-head">
     <h3 class="goBackdiv" @click="goBack">{{leftHead}}</h3>
     <h3>{{centerHead}}</h3>
     <h3 class="share">{{rightHead}}</h3>
  </div>
</template>
<script>
export default {
  props:{
    leftHead:{default:""},
    centerHead:{default:""},
    rightHead:{default:""},
  },
  methods: {
    goBack(){
      console.log("返回上一级")
      this.$router.go(-1)
    }
  },
}
</script>
<style scoped>
.page-head{
  display: flex;
  position: fixed;
  top: 0;left: 0;
  z-index:999;
  width:100%;
  justify-content: space-between; 
  align-items: center /*子元素垂直居中*/;
  background-color:#000;
  height:50px;line-height: 50px;
  color:#fff;
}
.goBackdiv{
  padding-left:20px;
}
.share{
  padding-right:30px;
}
</style>
