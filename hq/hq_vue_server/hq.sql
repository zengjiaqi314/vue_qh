SET NAMES UTF8;
DROP DATABASE IF EXISTS hq;
CREATE DATABASE hq CHARSET=UTF8;
USE hq;

/*用户表*/
CREATE TABLE hq_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(50),
  upwd  VARCHAR(32),
  u_name VARCHAR(10),
  uhead VARCHAR(128),
  usex  bool,
  uphone VARCHAR(11),
  ubirthday VARCHAR(15)
);
/*点赞表*/
CREATE TABLE hq_zan (
  zid INT PRIMARY KEY AUTO_INCREMENT,  /*点赞编号*/
  uid INT,                             /*点赞人编号*/
  tid INT,                             /*话题编号*/
  did INT,                              /*评论编号*/
  iszan BOOL                           /*是否赞*/
);
/*话题表*/
CREATE TABLE hq_topic (
  tid INT PRIMARY KEY AUTO_INCREMENT,  /*话题编号*/
  uid INT,                    /*话题发表人编号*/
  t_name VARCHAR(10),          /*话题发表人*/
  t_times VARCHAR(32),         /*话题发表时间*/
  title VARCHAR(32),           /*话题标题*/
  t_content VARCHAR(200),      /*话题内容*/
  pic VARCHAR(65000),             /*话题图片*/
  t_share INT,                 /*话题分享次数*/
  t_look INT,                  /*话题观看次数*/
  t_discuss INT,               /*话题评论数量*/
  t_praise INT,                /*话题点赞数量*/
  hot BOOL,                    /*话题是否热门*/
  sort INT                     /*话题类别*/
);
/*评论表*/
CREATE TABLE hq_discuss (
  did INT PRIMARY KEY AUTO_INCREMENT,  /*评论编号*/
  uid INT,                            /*评论发表人编号*/
  d_name VARCHAR(10),                  /*评论发表人*/
  d_times VARCHAR(32),                 /*评论发表时间*/
  d_content VARCHAR(128),              /*评论内容*/
  d_praise INT,                        /*评论点赞数量*/
  tid INT                              /*评论归属的话题编号*/
);
/*回复表*/
CREATE TABLE hq_reply (
  rid INT PRIMARY KEY AUTO_INCREMENT,  /*回复编号*/
  uid INT,                    /*回复发表人编号*/
  r_name VARCHAR(10),          /*回复发表人*/
  r_content VARCHAR(128),      /*回复内容*/
  did INT,                     /*回复归属的评论编号*/
  tid INT                      /*回复归属的话题编号*/
);

/*创建商品详情表*/
CREATE TABLE hq_detalis(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),   #商品标题
  price DECIMAL(10,2),    #商品价格
  starttime VARCHAR(30),   #服务时长
  endtime VARCHAR(25),   #营业时段
  dateday VARCHAR(10),   #预约日期
  pic VARCHAR(255)    #商品图片
);

/*创建首饰分类表*/
CREATE TABLE hq_shoushi(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  cid INT,  #类型
  sname VARCHAR(32),   #礼品名字
  sprice DECIMAL(10,2),    #礼品价格
  sfukuan INT,            #礼品付款人数
  spic VARCHAR(255),    #礼品图片
  yunfei VARCHAR(32),    #运费
  kucun INT,             #库存
  xiangqing VARCHAR(255)    #产品详情
);

/*创建购物车表*/
CREATE TABLE hq_shopcart(
  id  INT PRIMARY KEY AUTO_INCREMENT,   #l=>g购物车ID
  lid INT,      #商品ID
  price DECIMAL(10,2),    #商品价格
  count INT,            #商品数量
  lname VARCHAR(255),     #商品名
  uid   INT,        #u=>空     #用户ID
  is_checked BOOLEAN,       #是否选中
  pic VARCHAR(255)          #商品图片
);

/**用户订单**/
CREATE TABLE hq_order(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  time VARCHAR(100),         #下单时间
  address_id INT,         #用户地址
  status INT            #订单状态  1-等待付款  2-等待发货  3-待收货  4-已签收，待评价  5-已取消
);

/**联系我们表**/
CREATE TABLE hq_message(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(50),
  uphone VARCHAR(50)
);


/*xp创建美食表*/
CREATE TABLE hq_meishi(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  mid INT,              #分类id
  mname VARCHAR(255),   #美食名
  pic VARCHAR(255),    #美食图片
  mdetails VARCHAR(1000),  #美食详情
  zhishu VARCHAR(16)      #推荐指数
);
/*xp创建景区表*/
CREATE TABLE hq_jingqu(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  jid INT,              #分类id
  jname VARCHAR(255),   #景区名
  price INT,            #门票价格
  pic VARCHAR(255),    #景区图片
  jdetails VARCHAR(1000)  #景区介绍
);
/*xp创建酒店分类表*/
CREATE TABLE hq_jiudian(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  jid INT,            #酒店类名
  jname VARCHAR(255),   #酒店名称
  price DECIMAL(10,2),    #酒店价格
  pic VARCHAR(255)    #酒店图片
);

/*预约表*/
CREATE TABLE tl_yy(
  yid INT PRIMARY KEY AUTO_INCREMENT,  /*编号*/
  uid INT,               /*预约人ID*/
  phone VARCHAR(13),     /*预约电话号码*/
  isShoot BOOL,        /*是否拍摄*/
  isCar BOOL,        /*是否需要婚车*/
  isGift BOOL,             /*是否需要礼物*/
  isServe BOOL,             /*是否需要招待*/
  zhuoshu INT        /*婚宴桌数*/
);
/*用户表*/
INSERT INTO hq_user VALUES
(1,"Tom","123456","Tom",null,null,null,null),
(2,"king","123456","king",null,null,null,null),
(3,"123456","123456","123456",null,null,null,null);

/*插入酒店分类表*/
INSERT INTO hq_jiudian VALUES(NULL,1,'舟山希尔顿酒店','3899','jiudian014.jpg');
INSERT INTO hq_jiudian VALUES(NULL,1,'舟山喜来登绿城酒店','2999','jiudian010.jpg');
INSERT INTO hq_jiudian VALUES(NULL,1,'舟山开元曼居酒店','1999','jiudian07.jpg');
INSERT INTO hq_jiudian VALUES(NULL,1,'舟山天竺山庄民宿','2188','jiudian04.jpg');
/*xp插入景区表*/
INSERT INTO hq_jingqu VALUES(NULL,1,'南海观音大佛',299,'putuoshan.jpg','舟山打卡地之一，值得推荐！');
INSERT INTO hq_jingqu VALUES(NULL,1,'西天景区',350,'xitian.jpg','舟山打卡地之一，值得推荐！');
INSERT INTO hq_jingqu VALUES(NULL,1,'普济寺',199,'pujishi.jpg','舟山打卡地之一，值得推荐！');
INSERT INTO hq_jingqu VALUES(NULL,1,'佛顶山',199,'fodingshan.jpg','舟山打卡地之一，值得推荐！');
/*xp插入美食表*/
INSERT INTO hq_meishi VALUES(NULL,1,'红膏炝蟹','meishi01.jpg','舟山当地特色美食之一，值得推荐！','★★★★★');
INSERT INTO hq_meishi VALUES(NULL,1,'咸菜大黄鱼','meishi02.jpg','舟山当地特色美食之一，值得推荐！','★★★★');
INSERT INTO hq_meishi VALUES(NULL,1,'海棠糕','meishi05.jpg','舟山当地特色美食之一，值得推荐！','★★★');
INSERT INTO hq_meishi VALUES(NULL,2,'盐焗虾','meishi03.jpg','舟山当地特色美食之一，值得推荐！','★★★★★');

/*话题表*/
INSERT INTO hq_topic VALUES
(1,1,"YOHO","2018-08-22 18:30","黑色婚纱的含义","一提到婚纱，人们便会想到纯洁无暇的白色婚纱。但是你知道吗，不同颜色的婚纱寓意不同。你知道黑色婚纱的寓意是什么？在西班牙，黑色婚纱代表忠诚，意味着新娘对新郎的爱将至死不渝。","http://127.0.0.1:5050/01.png",2,138,2,2,1,1),
(2,1,"YOHO","2018-08-23 18:45","婚庆礼品教你选","选购礼物需要根据被送人的年龄性别等等","http://127.0.0.1:5050/00.png",2,136,1,8,1,2),
(3,1,"YOHO","2018-08-23 18:55","婚庆礼品教你选2","选购礼物需要根据被送人的年龄性别等等","http://127.0.0.1:5050/00.png",2,166,0,6,0,2);

/*评论表*/
INSERT INTO hq_discuss VALUES
(1,2,"Tom","2018-08-22 18:30","挺不错的",11,1),
(2,2,"Tom","2018-08-22 18:45","很喜欢",12,1),
(3,2,"Tom","2018-08-22 18:45","很喜欢",15,2);

/*回复*/
INSERT INTO hq_reply VALUES
(1,3,"King","赞同",1,1),
(2,2,"Tom","高兴",1,1),
(3,2,"Tom","高兴",3,2);


/*插入商品详情数据*/
INSERT INTO hq_detalis VALUES(NULL,'红膏炝蟹','500','2小时、4小时、6小时','00:00-当日23:00','夏季','meishi01.jpg');
INSERT INTO hq_detalis VALUES(NULL,'咸菜大黄鱼','500','12小时','09:00-当日23:00','春季','meishi02.jpg');
INSERT INTO hq_detalis VALUES(NULL,'海棠糕','500','12小时','09:00-当日23:00','秋季','meishi05.jpg');
INSERT INTO hq_detalis VALUES(NULL,'盐焗虾','500','12小时','09:00-当日22:00','全年','meishi03.jpg');


/*插入首饰详情数据*/
INSERT INTO hq_shoushi VALUES(NULL,1,'舟山希尔顿酒店','3899','0','jiudian014.jpg','%10','10','舟山打卡地之一，值得推荐！');
INSERT INTO hq_shoushi VALUES(NULL,1,'舟山喜来登绿城酒店','2999','111','jiudian010.jpg','%10','11','舟山打卡地之一，值得推荐！');
INSERT INTO hq_shoushi VALUES(NULL,1,'舟山开元曼居酒店','1899','222','jiudian07.jpg','%10','13','舟山打卡地之一，值得推荐！');
INSERT INTO hq_shoushi VALUES(NULL,1,'舟山天竺山庄民宿','2688','222','jiudian04.jpg','%10','13','舟山打卡地之一，值得推荐！');
INSERT INTO hq_shoushi VALUES(NULL,2,'南海观音大佛','500','0','putuoshan.jpg','含服务费','100','舟山打卡地之一，值得推荐！');
INSERT INTO hq_shoushi VALUES(NULL,2,'西天景区','500','1','xitian.jpg','含服务费','1000','舟山打卡地之一，值得推荐！');
INSERT INTO hq_shoushi VALUES(NULL,2,'普济寺','500','2','pujishi.jpg','含服务费','10','舟山打卡地之一，值得推荐！');
INSERT INTO hq_shoushi VALUES(NULL,2,'佛顶山','500','2','fodingshan.jpg','含服务费','10','舟山打卡地之一，值得推荐！');