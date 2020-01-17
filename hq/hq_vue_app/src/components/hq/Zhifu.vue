<template>
  <div>
    <h3>支付页面</h3>
    <button @click="H">返回商品页</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    H(){
      this.$router.go(-1)
    },
  },
}
</script>