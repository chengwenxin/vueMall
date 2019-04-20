var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('../util/util');
var $conf = require('../conf/conf');
// 使用连接池
var pool = mysql.createPool($conf.mysql);
router.use(express.static('public'));

//资助政策
router.get('/policy',(req, res, next) => {

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

//通知公告
router.get('/announcement',(req, res, next) => {

  let sql = `select * from announcement`
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

  let sql = `select * from working`
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
        // console.log(result)
      }
    })
   }
  })
})

module.exports = router;
