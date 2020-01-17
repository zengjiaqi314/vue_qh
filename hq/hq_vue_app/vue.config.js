module.exports={
  chainWebpack:config=>{
    //删除编译后的预获取操作
    config.plugins.delete("prefetch")
  }
}