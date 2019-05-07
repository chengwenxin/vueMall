var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $conf = require('../conf/conf');
// 使用连接池
var pool = mysql.createPool($conf.mysql);
router.use(express.static('public'));

//登录
router.post('/login', function (req, res, next) {

  


  //对输入的密码进行加密
  let number = req.body.number || ''
  let password = req.body.password || ''
  let sql = `select password from user where number = ${number}`
  pool.query(sql, function (err, result) {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      if(result && result.length > 0){
        result = result[0]
        if(result.password === password){
          res.cookie('number', number, {
            path:'/',
            maxAge:1000*60*60*24*7, // 设置cookie时间,
            httpOnly:true
          });
          res.json({
            status: '1',
            msg: '登录成功！',
            result: result
          });
        }else{
          res.json({
            status: '-1',
            msg: '用户名或密码错误！'
          });
        }
      }else {
        res.json({
          status: '-1',
          msg: '用户名错误！'
        });
      }
      
    }
  })
})

//注册
router.post('/register', function (req, res, next) {
  console.log(req.body)
  let querysql = `select number from user where number = ${req.body.number}`
  let registersql = `insert into user(number,name,password,role,college,major,grade) values('${req.body.number}','${req.body.name}','${req.body.password}','${req.body.role}','${req.body.college}','${req.body.major}','${req.body.grade}')`;
  pool.query(querysql, function (err, result) {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      if(result.length > 0){
        res.json({
          status: '-1',
          msg: '账户已存在'
        });
      }else {
        pool.query(registersql,function(err,result){
          if(err){
            res.json({
              status: '-1',
              msg: err.message
            });
          }else{
            res.json({
              status: '1',
              msg: '注册成功'
            });
          }
        })
      }
    }
  })
})


//查询申请状态
router.get('/apply/list',(req, res, next) => {
  if(req.cookies && req.cookies.number) {
  let sql = `select * from apply where number = ${req.cookies.number}`
  pool.query(sql, (err, result) => {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
        res.json({
          status: '1',
          msg: '获取数据成功',
          content: result
        });
    }
  })
}
})

//查询个人基本信息
router.get('/information/base',(req, res, next) => {
  if(req.cookies && req.cookies.number) {
  let sql = `select * from user where number = ${req.cookies.number}`
  pool.query(sql, (err, result) => {
    if(result && result.length >0){
      result = result[0]
    }
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
        res.json({
          status: '1',
          msg: '获取数据成功',
          content: result
        });
    }
  })
}
})


//ueditor 获取content
router.post('/ueditor/content',(req, res, next) => {
  if(req.cookies && req.cookies.number){
   let sql =''
   if(req.body.type ==="资助政策"){
    sql = `insert into policy(author, update_date, title,content,detailDate,isApply) values('${req.body.author}','${req.body.update_date}','${req.body.title}','${req.body.content}','${req.body.detailDate}','${req.body.isApply}')`
   }else if(req.body.type === "通知公告"){
    sql = `insert into announcement(author, update_date, title,content,detailDate) values('${req.body.author}','${req.body.update_date}','${req.body.title}','${req.body.content}','${req.body.detailDate}')`
   }else if(req.body.type === "工作动态"){
    sql = `insert into working(author, update_date, title,content,detailDate) values('${req.body.author}','${req.body.update_date}','${req.body.title}','${req.body.content}','${req.body.detailDate}')`
   }
   pool.query(sql, (err, result) => {
     if (err) {
       res.json({
         status: '-1',
         msg: err.message
       });
     } else {
         res.json({
           status: '1',
           msg: '获取添加成功',
           content: result
         });
     }
   })
  }
})

module.exports = router;
