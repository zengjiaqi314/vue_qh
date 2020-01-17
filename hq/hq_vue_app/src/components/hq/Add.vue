<template>
  <div>
   <mt-field label="联系人" placeholder="姓名"></mt-field>
    <mt-field label="电话" placeholder="手机号码"></mt-field>
    <mt-field label="地址" placeholder="选择收货地址"></mt-field>
    <mt-field label="补充说明" placeholder="详细地址(例如门牌号等)"></mt-field>
    <mt-button type="primary" size="large">确认</mt-button>
    <mt-button type="defult" size="large" @click="cancle">取消</mt-button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  methods:{
    cancle(){
      this.$router.push("Address")
    }
  }
}
</script>


<style scoped>

</style>
