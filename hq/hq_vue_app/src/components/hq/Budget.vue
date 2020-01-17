<template>
  <div>
    <div class="budget_head">
      <img style="width:100%" src="../../assets/works1.png">
    </div>
    <div class="budget_serve">
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <div class="aa">
            选择服务
          </div>
          <van-cell
            v-for="(item, i) in list"
            clickable
            :key="item"
            :title="item"
            @click="toggle(i)"
          >
            <van-checkbox
              :name="item"
              ref="checkboxes"
              slot="right-icon"
            />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
    <div class="hy">婚宴桌数</div>
    <div class="num">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell class="num-cc" title="1-5桌" clickable @click="radio = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell class="num-cc" title="5-10桌" clickable @click="radio = '2'">
            <van-radio slot="right-icon" name="2" />
          </van-cell>
          <van-cell class="num-cc" title="10-15桌" clickable @click="radio = '3'">
            <van-radio slot="right-icon" name="3" />
          </van-cell>
          <van-cell class="num-cc" title="15桌以上" clickable @click="radio = '4'">
            <van-radio slot="right-icon" name="4" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <van-cell-group class="user_phone">
      <van-field v-model="phone" placeholder="请输入接受信息的手机号码" />
    </van-cell-group>
    <input class="Btn" type="button" value="提交按钮"  @click="openConfirm">
  </div>
</template>

<script>
export default {
  data(){
    return{
      radio:0,
      result:[],
      phone:"",
      list:["拍摄","婚车","礼物","招待"],
      s1:0,
      s2:0,
      s3:0,
      s4:0,
    }
  },
  methods: {
    openConfirm(){
      // console.log(this)
      var zs = this.radio;
      var phone = this.phone;
      var s1 = this.s1;
      var s2 = this.s2;
      var s3 = this.s3;
      var s4 = this.s4;
      if(!phone){
        alert("请输入电话号码")
        return;
      }
      var url = "openConfirm";
      var obj = {s1,s2,s3,s4,zs,phone}
      console.log(obj)
      this.axios.get(url, {params:obj} ).then(res=>{
        if(res.data.code==-2){
          this.$toast("请登陆!");
          this.$router.push("/Login")
        } else if(res.data.code==1){
         //console.log("1")
         this.$toast("提交成功");
         history.go(-1)
        }
      })
    }, 
    toggle(i) {
      // this.$refs.checkboxes[i].toggle();
      if(i==0){
        if(this.s1==0){
          this.s1=1
        }else{
          this.s1=0
        }
      }
      if(i==1){
        if(this.s2==0){
          this.s2=1
        }else{
          this.s2=0
        }
      }
      if(i==2){
        if(this.s3==0){
          this.s3=1
        }else{
          this.s3=0
        }
      }
      if(i==3){
        if(this.s4==0){
          this.s4=1
        }else{
          this.s4=0
        }
      }
    },
  },
}
</script>
<style scoped>
  .budget_serve{
    border:2px solid rgb(231, 230, 230);
    margin:20px 20px 10px 20px;
  }
  .aa{
    font-size: 18px;
    background:#faf7f7;
    border-bottom:1px solid rgb(221, 220, 220);
    color:#757575;
    padding:10px 0px 10px 0px;
  }
  .hy{
    height:40px;
    font-size: 18px;
    line-height:40px;
    color:#757575;
    background:#faf7f7;
    margin:10px 20px 10px 20px;
  }
  .num{
    margin:10px 150px 20px 20px;
  }
  .num-cc{
    font-size:17px;
    color:#000;
    margin:0px 0px 10px 0px;
    border:1.5px solid #000;
  }
  .user_phone{
    border:2px solid#beb5b5;
    margin:20px 20px 10px 20px;
  }
  .Btn{
    width:335px;
    height:40px;
    border:0;
    border-radius: 20px;
    color:#fff;
    background:rgb(255, 131, 158);
    margin:20px 20px 20px 20px;
  }
</style>