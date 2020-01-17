<template>
  <div> 
    <!-- <h3>婚庆项目购物车.vue</h3> -->
    <div class="head">
      <div class="head_1">购物车</div>

    </div>
    <!-- 购物车商品信息 -->
    <div class="cart-item" v-for="(item,i) of list" :key="i">
      <div class="leftImgText">
        <input type="checkbox" v-model="item.is_checked" @change="changeItem">
        <img :src="'http://127.0.0.1:5050/'+item.pic">
        <div class="lname">
          {{item.lname}}
        </div>
        <span class="price">
          ¥{{item.price}}
        </span>
        <div clss="count">
          <button @click="jian(i)">-</button>
          <span>{{item.count}}</span> 
           <!-- list[i].count -->
          <button @click="jia(i)">+</button>
        </div>
        
      </div>
    </div>
    <!-- 合计 -->
    <div class="foot">
      <div class="foot_1">
          <input class="check" type="checkbox" @change="selectAll" v-model="allcb">
          <div class="qx">全选</div>
          <div class="heji">合计:¥<span>{{a}}</span></div>
      </div>
      <div class="foot_2">
        <div class="calc" @click="jump">结算</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:[],//购物车列表
      allcb:true,//保存全选按钮的状态
      a:0,//合计初始值
    }
  },
  methods:{
    loadMore(){
      var uid =sessionStorage.getItem("uid");
      this.axios.get("findcart",{params:{uid}}).then(res=>{
        console.log(res);
        var list=res.data.data;
        this.list=list;
        console.log(this.list);
        this.aaa();
      })
    },
    changeItem(){
      //功能：为商品复选框添加修改事件
      //如果所有商品状态为true全选状态为true
      //如果有一个商品状态为false全选状态为false
      //1创建变量sum累加商品状态数量
      var sum=0;
      //2创建循环遍历数据所有商品状态为true ++
      for(var item of this.list){
        if(item.is_checked){sum++}
      }
      //3如果sum和数组长度相同，全选为true，否则为false
      if(sum==this.list.length){
        this.allcb=true;
      }else{
        this.allcb=false;
      }
      this.aaa()
    },

    selectAll(){
      //功能:全选按钮状态切换处理函数
      //1获取全选按钮状态
      var cb=this.allcb;
      //2创建循环遍历购物车商品
      //3将全选状态赋值购物车商品状态
      for(var item of this.list){
        item.is_checked=cb;
      }
      if(!cb){
        console.log(0)
        this.a=0;
      }else{
        console.log(1)
        for(var i=0;i<this.list.length;i++){
        this.a+=this.list[i].price*this.list[i].count;
        }
      }
    },

    jian(i){
      if(this.list[i].count>1){
      this.list[i].count--;
      if(this.list[i].is_checked){
        this.a-=this.list[i].price*this.list[i];
      }
      }else{
        this.$messagebox.confirm("是否确认删除该商品?")
        .then(action=>{
          console.log("确认")
          var id=this.list[i].id
          console.log(id);
          this.axios.get("delete",{params:{"id":id}}).then(res=>{
            this.$toast("删除成功!")
            this.loadMore();
            console.log(res);
          })
        })
        .catch(err=>{console.log("取消")})
      }
      this.aaa();
    },

    jia(i){
      this.list[i].count++;
      this.aaa();
    },

    aaa(){
      //  console.log(this.list);
      this.a=0;
      for(var i=0;i<this.list.length;i++){
        this.list[i].a=0
       if(this.list[i].is_checked==1){
         console.log(this.list[i].price*this.list[i].count);
         this.list[i].a=this.list[i].price*this.list[i].count
       }else{
         this.list[i].a=0
       }
       this.a+=this.list[i].a;
      }
    },
    jump(){
      this.$router.push("Address");
    }
  },

  created(){
      this.loadMore();
    }
}

</script>

<style scoped>
  .head{
    width: 100%;height: 30px;
    display:flex;
    justify-content: space-between;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
  }
  .head_1{
    margin-left:45%;
  }
  .head_2{
    margin-right: 2%;
  }
  .foot{
    width:100%;height:40px;
    position: fixed;
    bottom:0;
    border-top:1px solid #ccc;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
  }
  .foot_1{
    width:70%;
  }
  .check{
    float: left;
    margin-left: 2%;
    margin-top:5%;
  }
  .qx{
    float: left;
  }
  .heji{
   float: right;
  }
  .foot_2{
    width: 30%;
    background-color:#ff7100;
    color:#fff;
  }
  .calc{
    padding-left:30%;
  }

  .leftImgText{
   display: flex;/*子元素水平对齐*/
   align-items: center;/*垂直居中*/
   border-bottom: 1px solid #ccc;
   justify-content:space-between;
   text-align: center;
   padding: 10px;
  }
 /*3:单独修改图片宽度和高度26*/
  .leftImgText img{
    width:50px;
    height:50px;
  }

</style>

