var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('../util/util');
var $conf = require('../conf/conf');
// 使用连接池
var pool = mysql.createPool($conf.mysql);
router.use(express.static('public'));

//开搞目录
router.get('/',(req, res, next) => {
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
module.exports = router;
