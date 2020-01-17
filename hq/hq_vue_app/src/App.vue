<template>
 <div class="app-container">
  <!--显示组件容器-->
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
 </div>
</template>
<style>
.app-container{
   padding-top:0px;
   padding-bottom:0px;
   overflow-x:hidden;
}
</style>
