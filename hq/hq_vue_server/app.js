//功能：学子商城服务器程序
//1:下载四个第三方模块
//express           web服务器
//mysql             mysql驱动
//express-session   会话对象
//cors              跨域
//[8080脚手架   5050服务器]
//npm i express mysql express-session cors
//安装 npm i body-parser
//2:引入第三方模块
const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const cors = require("cors");

//引入body-parser中间件模块
const bodyParser=require('body-parser');

//3:创建数据库连接池
var pool = mysql.createPool({
   host:"127.0.0.1",
   user:"root",
   password:"",
   port:3306,
   connectionLimit:15,
   database:"hq"
})
//4:创建web服务器
var server = express();
//5:配置跨域
//允许跨域程序端口
server.use(cors({
    //允许哪个程序列表 脚手架
    origin:["http://127.0.0.1:8080",
    "http://localhost:8080"],
    //每次请求验证
    credentials:true
}));
//6:配置session对象
server.use(session({
   secret:"128位安全字符串",//加密条件
   resave:true,            //请求更新数据
   saveUninitialized:true  //保存初始化数据
}))
//7:指定静态目录  public
server.use(express.static("public")); 

//使用body-parser中间件
server.use( bodyParser.urlencoded({
  extended:false
}) );

//8:启动监听端口  5050
server.listen(5050);


//功能1:完成用户登录验证
server.get("/login",(req,res)=>{
  //1:获取参数 uname upwd
  var n = req.query.uname;
  var p = req.query.upwd;
  //2:创建sql
  var sql = "SELECT uid,u_name FROM hq_user WHERE uname = ? AND upwd =?";
  //3:发送sql并且结果返回脚手架
  pool.query(sql,[n,p],(err,result)=>{
     //4:如果发生严重错误抛出
     if(err)throw err;
     //5:登录成功用户名密码有错
     if(result.length==0){
       res.send({code:-1,msg:"用户名或密码有误"})
     }else{
       //6:登录成功
       //7:将登录成功用户id保存
       //session对象作为登录成功凭据
       //result=[{id:1}]
       //不写req.session.id error
       req.session.uid=result[0].uid;
       req.session.u_name=result[0].u_name;
       res.send({code:1,msg:"登录成功",data:result});
     }
  })
})

//注册
server.get("/reg",(req,res)=>{
  var n = req.query.uname;
  var p = req.query.upwd;
  //console.log(1);
  var obj = {uname:n,upwd:p,u_name:n};
  var sql ="SELECT uid FROM hq_user WHERE uname = ?";
  //console.log(2);
  pool.query(sql,[n],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      var sql = "INSERT INTO hq_user SET ? "
      //console.log(3);
      pool.query(sql,[obj],(err)=>{
        if(err) throw err;
        res.send({code:1,msg:"注册成功"})
      })
    }else{
      res.send({code:-1,msg:"注册失败，该用户名已存在"});
      //console.log(4);
      return;
    }
  })
})
//功能:完成用户退出
server.get("/tc",(req,res)=>{
  req.session.uid=null;
  req.session.u_name=null;
  res.send({code:1,msg:"退出成功"});
})


//功能2:话题列表显示
server.get("/title",(req,res)=>{
  //分类
  //1:参数  页码  一页几行
  // var pno = req.query.pno;
  // var ps = req.query.pageSize;
  //2:默认指定页码一页几行
  // if(!pno){pno=1}
  // if(!ps){ps=20}
  // var offset = (pno-1)*ps;
  // ps = parseInt(ps);
  var a=req.query.sort;
  if(!a){
    //var sql = "SELECT * FROM hq_topic LIMIT ?,?";
    var sql = "SELECT * FROM hq_topic ORDER BY tid DESC";
    pool.query(sql,(err,result)=>{
      if(err)throw err;
      res.send({code:1,msg:"查询成功",data:result})
    })
  }else{
    var sql = "SELECT * FROM hq_topic WHERE sort=? ORDER BY tid DESC";
    pool.query(sql,[a],(err,result)=>{
      if(err)throw err;
      res.send({code:1,msg:"查询成功",data:result})
    })
  }
})

//功能3:查询用户是否点赞
server.get("/iszan",(req,res)=>{
  //获取当前登录用户uid
  var uid = req.session.uid;
  //如果用户没登录返回错误信息
  if(!uid){
    res.send({code:-2,msg:"请登录"});
    return;
  }
  var sql = "SELECT * FROM hq_zan WHERE uid = ?";
  pool.query(sql,[uid],(err,result)=>{
    if(err)throw err;
    if(result.length==0){
      res.send({code:-1,msg:"没有点赞"})
    }else{
      res.send({code:1,msg:"已经点赞",data:result})
    }
  })
})

//功能4:用户话题点赞
server.get("/zan",(req,res)=>{
  //获取当前登录用户uid
  var uid = req.session.uid;
  //如果用户没登录返回错误信息
  if(!uid){
    res.send({code:-2,msg:"请登录"});
    return;
  }
  //获取数据
  var zan = req.query.zan;
  var tid = req.query.tid;
  var t_praise = req.query.t_praise;
  //修改点赞数量
  var sql1 = "UPDATE hq_topic SET t_praise=? WHERE tid=? ";
  pool.query(sql1,[t_praise,tid],(err)=>{
    if(err)throw err;
    //判断用户是否已经点赞
    if(zan==0){
      //如果用户没点赞,就插入点赞
      var iszan=1;
      var obj={uid,tid,iszan}
      var sql2="INSERT INTO hq_zan SET ? ";
      pool.query(sql2,[obj],(err)=>{
        if(err)throw err;
        res.send({code:1,msg:"点赞成功"})
      })
    }else if(zan==1){
      //如果用户已经点赞,就删除点赞
      var sql2="DELETE FROM hq_zan WHERE uid=? AND tid=?";
      pool.query(sql2,[uid,tid],(err)=>{
        if(err)throw err;
        res.send({code:2,msg:"取消点赞"})
      })
    }
  })
})

//功能5:话题详情显示
server.get("/detail",(req,res)=>{
  var tid=req.query.tid;
    var sql = "SELECT * FROM hq_topic WHERE tid=?";
    pool.query(sql,[tid],(err,result)=>{
      if(err)throw err;
      res.send({code:1,msg:"查询成功",data:result})
    })
})

//功能6:话题评论列表显示
server.get("/details",(req,res)=>{
  var tid=req.query.tid;
  var sql = "SELECT * FROM hq_discuss WHERE tid=? ORDER BY did DESC";
  pool.query(sql,[tid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
})

//功能7:用户评论点赞
server.get("/zan2",(req,res)=>{
  //获取当前登录用户uid
  var uid = req.session.uid;
  //如果用户没登录返回错误信息
  if(!uid){
    res.send({code:-2,msg:"请登录"});
    return;
  }
  //获取数据
  var zan = req.query.zan;
  var did = req.query.did;
  var d_praise = req.query.d_praise;
  //修改点赞数量
  var sql1 = "UPDATE hq_discuss SET d_praise=? WHERE did=? ";
  pool.query(sql1,[d_praise,did],(err)=>{
    if(err)throw err;
    //判断用户是否已经点赞
    if(zan==0){
      //如果用户没点赞,就插入点赞
      var iszan=1;
      var obj={uid,did,iszan}
      var sql2="INSERT INTO hq_zan SET ? ";
      pool.query(sql2,[obj],(err)=>{
        if(err)throw err;
        res.send({code:1,msg:"点赞成功"})
      })
    }else if(zan==1){
      //如果用户已经点赞,就删除点赞
      var sql2="DELETE FROM hq_zan WHERE uid=? AND did=?";
      pool.query(sql2,[uid,did],(err)=>{
        if(err)throw err;
        res.send({code:2,msg:"取消点赞"})
      })
    }
  })
})

//功能8:查询评论的回复显示
server.get("/reply",(req,res)=>{
  //1:获取参数 
  var tid = req.query.tid;
  //2:创建sql
  var sql = "SELECT * FROM hq_reply WHERE tid=? ORDER BY rid DESC";
  //3:发送sql并且结果返回脚手架
  pool.query(sql,[tid],(err,result)=>{
    //4:如果发生严重错误抛出
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result});
  })
})

//功能9:话题观看次数+1
server.get("/look",(req,res)=>{
  var tid=req.query.tid;
  var t_look=req.query.t_look;
  t_look++;
  var sql = "UPDATE hq_topic SET t_look=? WHERE tid=? ";
  pool.query(sql,[t_look,tid],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"插入成功"});
    }
  })
})

//功能10:插入评论
server.get("/putdiscuss",(req,res)=>{
  //获取当前登录用户uid
  var uid = req.session.uid;
  //如果用户没登录返回错误信息
  if(!uid){
    res.send({code:-2,msg:"请登录"});
    return;
  }
  //1:获取参数 
  var d_name = req.session.u_name;
  var d_times= new Date();
  d_times=d_times.toLocaleString()
  var d_content= req.query.value;
  var d_praise=0;
  var tid = req.query.tid;
  var obj={uid,d_name,d_times,d_content,d_praise,tid}

  var t_discuss = req.query.t_discuss;
  t_discuss++;
  //console.log(obj)
  //2:创建sql
  var sql = "INSERT INTO hq_discuss SET ? ";
  var sql2 = "UPDATE hq_topic SET t_discuss=? WHERE tid=?";
  //发送sql
  pool.query(sql2,[t_discuss,tid],(err)=>{
    //如果发生严重错误抛出
    if(err)throw err;
  })
  pool.query(sql,[obj],(err,result)=>{
    //4:如果发生严重错误抛出
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"插入成功"});
    }
  })
})

//功能11:插入回复
server.get("/putreply",(req,res)=>{
  //获取当前登录用户uid
  var uid = req.session.uid;
  //如果用户没登录返回错误信息
  if(!uid){
    res.send({code:-2,msg:"请登录"});
    return;
  }
  //1:获取参数 
  var r_name = req.session.u_name;
  var r_content= req.query.value;
  var did= req.query.did;
  var tid= req.query.tid;
  var obj={uid,r_name,r_content,did,tid}
  //console.log(obj)
  //2:创建sql
  var sql = "INSERT INTO hq_reply SET ? ";
  pool.query(sql,[obj],(err,result)=>{
    //4:如果发生严重错误抛出
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"插入成功"});
    }
  })
})

//功能12:插入话题
server.post("/puttopic",(req,res)=>{
  //获取当前登录用户uid
  var uid = req.session.uid;
  //如果用户没登录返回错误信息
  if(!uid){
    res.send({code:-2,msg:"请登录"});
    return;
  }
  //1:获取参数 
  var t_name = req.session.u_name;
  var t_times= new Date();
  t_times=t_times.toLocaleString()
  var title=req.body.title;
  var t_content= req.body.t_content;
  var sort= req.body.sort;
  var pic= req.body.pic;
  //console.log(pic)
  if(!pic){
    pic="http://127.0.0.1:5050/00.png"
  }else{
    pic=JSON.parse(pic).content
  }
  //console.log(pic)
  var t_share=0
  var t_look=0
  var t_discuss=0
  var t_praise=0
  var hot=0
  var obj={uid,t_name,t_times,title,t_content,pic,t_share,t_look,t_discuss,t_praise,hot,sort}
  //console.log(obj)
  //2:创建sql
  var sql = "INSERT INTO hq_topic SET ? ";
  pool.query(sql,[obj],(err,result)=>{
    //4:如果发生严重错误抛出
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"插入成功"});
    }
  })
})
/*********************************** */
//xp首页美食显示
server.get("/meishi",(req,res)=>{
  //x:sql
  var sql = " SELECT * FROM hq_meishi";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
})
//xp首页景区显示
server.get("/jingqu",(req,res)=>{
  //x:sql
  var sql = " SELECT * FROM hq_jingqu";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
})
//xp商品详情页显示
server.get("/jiudian",(req,res)=>{
  //x:sql
  var sql = " SELECT * FROM hq_jiudian";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
})

/*************************************************** */
//xp商品详情页显示
server.get("/detalis",(req,res)=>{
  //x:sql
  var sql = " SELECT * FROM hq_detalis";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
})
//xp根据商品id查询商品
server.get("/detali",(req,res)=>{
  var obj=req.query;
  //console.log(obj.lid);
  var sql="select * from hq_detalis where lid=?";
  pool.query(sql,[obj.lid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
})
//xp首饰页数据查询
server.get("/shoushi",(req,res)=>{
  //x:sql
  var sql = " SELECT * FROM hq_shoushi";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
  //x:json
})
//xp根据首饰，礼品id查询数据
server.get("/ssdetalis",(req,res)=>{
  var obj=req.query;
  //console.log(obj.lid);
  var sql="select * from hq_shoushi where lid=?";
  pool.query(sql,[obj.lid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
})

//xp添加购物车
//1.get  /addcrt
server.get("/addcart",(req,res)=>{
  //2.获取当前登录用户id
  var uid = req.session.uid;
  //3.如果用户没登录返回错误信息，并且返回此函数
  //4.获取参数 编号/价格/名称
  var {lid,lname,price,n,pic,uid} = req.query
  //5.查询指用户是否购买过此商品
  var sql="SELECT id FROM hq_shopcart WHERE uid=? AND lid=?";
  //6.执行sql
  pool.query(sql,[uid,lid],(err,result)=>{
    if(err) throw err; 
    //7.在回调函数中(模拟同步)
    //8.如果没有买过此商品
    if(result.length==0){
      var sql=`insert into hq_shopcart values(null,${lid},${price},${n},'${lname}',${uid},1,'${pic}')`;
      console.log(sql)      
    }else{
      var sql=`update hq_shopcart set count=count+${n} where uid=${uid} and lid=${lid}`;
    }
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send({code:1,msg:"添加成功"})
    })
  })
})

//hzx Cart功能:查询当前用户购物车信息
server.get("/findcart",(req,res)=>{
  //3:创建sql语句
  var uid=req.query.uid;
  // console.log(uid);
  var sql = "SELECT id,lid,lname,price,count,pic,is_checked FROM hq_shopcart WHERE uid = ?";
  //4:执行sql语句
  pool.query(sql,[uid],(err,result)=>{
      
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
  //5:将服务器返回结果发送脚手架
})

//hzx Cart功能:删除当前用户购物车商品
server.get("/delete",(req,res)=>{
var id=req.query.id;
console.log(id);
var sql="DELETE FROM hq_shopcart WHERE id=? ";
pool.query(sql,[id],(err,result)=>{
  console.log(555);
  if(err) throw err;
  res.send({code:1,msg:"删除成功",data:result})
})
})

//hzx About功能:将用户姓名和手机号插入表格
server.get("/insert",(req,res)=>{
  var uname=req.query.uname;
  var uphone=req.query.uphone;
  var sql="INSERT INTO hq_message VALUES (null,?,?)";
  pool.query(sql,[uname,uphone],(err,result)=>{
    console.log(2);
    if(err) throw err;
    res.send({code:1,msg:"插入成功",data:result})
  })
})

//tl 预约表
//1:get /openConfirm
server.get("/openConfirm",(req,res)=>{
  //2:获取当前登录用户uid
  var uid = req.session.uid;
  //console.log(uid)
  //3:如果用户没登录返回错误信息
  //  并且返回此函数
  if(!uid){
    res.send({code:-2,msg:"请登录"});
    return;
  }
  var zs = req.query.zs;
  var phone = req.query.phone;
  var s1 = req.query.s1;
  var s2 = req.query.s2;
  var s3 = req.query.s3;
  var s4 = req.query.s4;
  var obj={
    uid:uid,
    phone:phone,
    isShoot:s1,
    isCar:s2,
    isGift:s3,
    isServe:s4,
    zhuoshu :zs
  }
  //console.log(obj)
  var sql = "INSERT INTO tl_yy SET ? "
  pool.query(sql,[obj],(err)=>{
    if(err) throw err;
    res.send({code:1,msg:"成功"})
  })
})
