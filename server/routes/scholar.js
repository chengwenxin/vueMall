var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('../util/util');
var $conf = require('../conf/conf');
// 使用连接池
var pool = mysql.createPool($conf.mysql);
router.use(express.static('public'));



//ueditor 获取图片
router.get('/ueditor/img',(req, res, next) => {
  let sql = `select * from policy`
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
})

//资助政策
router.get('/policy',(req, res, next) => {

  let sql = `select * from policy order by update_date desc`
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
})

//资助政策详情
router.get('/policy/detail',(req, res, next) => {
  let id = req.query.id
  let sql = `select * from policy where id = ${id}`;
  pool.query(sql, (err, result) => {
    if(result && result.length>0){
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
})

//资助中心简介
router.get('/introduction',(req, res, next) => {
  let id = 0
  let sql = `select * from introduction where id = ${id}`;
  pool.query(sql, (err, result) => {
    if(result && result.length>0){
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
})
//中心简介阅读次数
router.get('/introduction/readingtimes',(req, res, next) => {
  let id = 0
  let reading_times = 0
  let updatesql = ''
  let sql = `select * from introduction where id = ${id}`;
  pool.query(sql, (err, result) => {
   if(!err){
    if(result && result.length>0){
      result = result[0]
    }
    reading_times = result.reading_times + 1
    updatesql =`update introduction set reading_times= ${reading_times} where id =${id}`;
    pool.query(updatesql,(err,result) => {
      if(!err){
        // console.log(result)
      }
    })
   }
  })
})


//通知公告
router.get('/announcement',(req, res, next) => {

  let sql = `select * from announcement order by update_date desc`
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
})

//通知公告详情
router.get('/announcement/detail',(req, res, next) => {
  let id = req.query.id
  let sql = `select * from announcement where id = ${id}`;
  pool.query(sql, (err, result) => {
    if(result && result.length>0){
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
})
//工作动态
router.get('/working',(req, res, next) => {

  let sql = `select * from working order by update_date desc`
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
})

//工作动态详情
router.get('/working/detail',(req, res, next) => {
  let id = req.query.id
  let sql = `select * from working where id = ${id}`;
  pool.query(sql, (err, result) => {
    if(result && result.length>0){
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
})
//阅读次数
router.get('/readingtimes',(req, res, next) => {
  let id = req.query.id
  let reading_times = 0
  let updatesql = ''
  let sql = `select * from policy where id = ${id}`;
  pool.query(sql, (err, result) => {
   if(!err){
    if(result && result.length>0){
      result = result[0]
    }
    reading_times = result.reading_times + 1
    updatesql =`update policy set reading_times= ${reading_times} where id =${id}`;
    pool.query(updatesql,(err,result) => {
      if(!err){
        res.json({
          status: '-1',
          msg: '获取数据成功',
          content: result
        });
      }else {
        res.json({
          status: '1',
          msg: '获取数据成功',
          content: result
        });
      }
    })
   }
  })
})

module.exports = router;
