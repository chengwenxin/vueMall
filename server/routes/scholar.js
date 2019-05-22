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
  let totalCount = 0
  let {pageSize,currentPage} = req.query
  let college = req.query.college?'%'+req.query.college+'%':'%%'
  let category = req.query.category?'%'+req.query.category+'%':'%%'
  let grade = req.query.grade?'%'+req.query.grade+'%':'%%'
  let size = pageSize * (currentPage -1 )
  let totalCountsql = `select count(*) from policy where college like '${college}' and title like '${category}' and grade like '${grade}'`
  let sql =` SELECT * from policy where college like '${college}' and title like '${category}' and grade like '${grade}' ORDER BY  detailDate DESC,id DESC LIMIT ${size},${pageSize}`
  pool.query(totalCountsql,(err,result) => {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      totalCount = result[0]['count(*)']
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
              content: result,
              totalCount
            });
        }
      })
    }
  })
})

//删除资助政策
router.post('/policy/delete',(req, res, next) => {
  let id = req.body.id
  let sql = `delete from policy where id = ${id}`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
        res.json({
          status: '1',
          msg: '成功',
          content: result
        });
    }
  })
})
//删除通知公告
router.post('/announcement/delete',(req, res, next) => {
  let id = req.body.id
  let sql = `delete from announcement where id = ${id}`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
        res.json({
          status: '1',
          msg: '成功',
          content: result
        });
    }
  })
})
//删除工作动态
router.post('/working/delete',(req, res, next) => {
  let id = req.body.id
  let sql = `delete from working where id = ${id}`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
        res.json({
          status: '1',
          msg: '成功',
          content: result
        });
    }
  })
})
//更新工作动态
router.post('/working/update',(req, res, next) => {
  let {author, title,content,detailDate,id,update_date} = req.body
  let sql = `update working set author= '${author}',update_date ='${update_date}', title ='${title}',content='${content}',detailDate='${detailDate}' where id = ${id}`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
        res.json({
          status: '1',
          msg: '成功',
          content: result
        });
    }
  })
})
//更新资助政策
router.post('/policy/update',(req, res, next) => {
  let {author, title,content,detailDate,isApply,id,update_date} = req.body
  let sql = `update policy set author= '${author}',update_date ='${update_date}', title ='${title}',content='${content}',detailDate='${detailDate}',isApply='${isApply}' where id = ${id}`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
        res.json({
          status: '1',
          msg: '成功',
          content: result
        });
    }
  })
})
//更新通知公告
router.post('/announcement/update',(req, res, next) => {
  let {author, title,content,detailDate,id,update_date} = req.body
  let sql = `update announcement set author= '${author}',update_date ='${update_date}', title ='${title}',content='${content}',detailDate='${detailDate}', where id = ${id}`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
        res.json({
          status: '1',
          msg: '成功',
          content: result
        });
    }
  })
})
//更新中心简介
router.post('/introduction/update',(req, res, next) => {
  let {author, title,content,detailDate,id,update_date} = req.body
  let sql = `update introduction set author= '${author}',update_date ='${update_date}', title ='${title}',content='${content}',detailDate='${detailDate}' where id = ${id}`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
        res.json({
          status: '1',
          msg: '成功',
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
  let sql = `select * from introduction`;
  pool.query(sql, (err, result) => {
    // if(result && result.length>0){
    //   result = result[0]
    // }
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
router.get('/announcement',(req, res, next) => {
  let totalCount = 0
  let {pageSize,currentPage} = req.query
  let size = pageSize * (currentPage -1 )
  let totalCountsql = `select count(*) from announcement`
  let sql =` SELECT o.* from (SELECT * from announcement ) o ORDER BY detailDate DESC, id DESC LIMIT ${size},${pageSize}`
  pool.query(totalCountsql,(err,result) => {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      totalCount = result[0]['count(*)']
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
              content: result,
              totalCount
            });
        }
      })
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
  let totalCount = 0
  let {pageSize,currentPage} = req.query
  let size = pageSize * (currentPage -1 )
  let totalCountsql = `select count(*) from working`
  let sql =` SELECT o.* from (SELECT * from working ) o ORDER BY detailDate  DESC,id  DESC LIMIT ${size},${pageSize}`
  pool.query(totalCountsql,(err,result) => {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      totalCount = result[0]['count(*)']
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
              content: result,
              totalCount
            });
        }
      })
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
  let table = req.query.table
  let updatesql = ''
    updatesql =`update ${table} set reading_times= reading_times+1 where id =${id}`;
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
  //  }
  // })
})

module.exports = router;
