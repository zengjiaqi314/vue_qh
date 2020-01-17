<template>
  <div>
  <!--底部导航条图片切换-->
  <img :src="focused?selectedImage:normalImage" class="imgstyle"/>
  </div>
</template>
<script>
//任务:创建底部导航条
//子组件:功能显示一张图片
//如果焦点:显示绿色图片
//如果失去焦点:显示灰色图片
export default {
  props:{
    focused:false,  //当前图片是否焦点true
    selectedImage:{default:""},//焦点图片
    normalImage:{default:""}   //失去焦点图片
  }
}
</script>
<style scoped>
  .imgstyle{
    width:30px;
    height:30px;
  }
</style>

