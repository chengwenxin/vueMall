var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('../util/util');
var $conf = require('../conf/conf');
// 使用连接池
var pool = mysql.createPool($conf.mysql);
router.use(express.static('public'));



//ueditor 获取图片
router.get('/ueditor/img', (req, res, next) => {
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

//奖助学金项目
router.get('/policy', (req, res, next) => {
  let totalCount = 0
  let {
    pageSize,
    currentPage
  } = req.query
  let college = req.query.college ? '%' + req.query.college + '%' : '%%'
  college = req.query.college==='所有' || req.query.college==='' ? '%%':college

  let category = req.query.category ? '%' + req.query.category + '%' : '%%'
  category = req.query.category==='所有' || req.query.category==='' ? '%%':category

  let grade = req.query.grade ? '%' + req.query.grade + '%' : '%%'
  grade = req.query.grade==='所有' || req.query.grade==='' ? '%%':grade

  let size = pageSize * (currentPage - 1)
  let totalCountsql = ''
  let sql =''
  if(grade==='%本科生%'){
    sql = ` SELECT * from policy where college like '${college}' or college like '%所有%' and title like '${category}' and grade not like '研究生' ORDER BY  detailDate DESC,id DESC LIMIT ${size},${pageSize}`
    totalCountsql = `select count(*) from policy where college like '${college}' or college like '%所有%' and title like '${category}' and grade not like '研究生'`

  }else{
    sql = ` SELECT * from policy where college like '${college}' or college like '%所有%' and title like '${category}' and grade like '${grade}' ORDER BY  detailDate DESC,id DESC LIMIT ${size},${pageSize}`
    totalCountsql = `select count(*) from policy where college like '${college}' or college like '%所有%'  and title like '${category}' and grade like '${grade}'`

  }
  pool.query(totalCountsql, (err, result) => {
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

//删除奖助学金项目
router.post('/policy/delete', (req, res, next) => {
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
router.post('/announcement/delete', (req, res, next) => {
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
router.post('/working/delete', (req, res, next) => {
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
router.post('/working/update', (req, res, next) => {
  let {
    author,
    title,
    content,
    detailDate,
    id,
    update_date
  } = req.body
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
//更新奖助学金项目
router.post('/policy/update', (req, res, next) => {
  let {
    author,
    title,
    content,
    detailDate,
    isApply,
    id,
    update_date,
    college,
    grade,
    announcementTime,
    auditTime,
    validTime,
    places,
    money
  } = req.body


  college = college.join(';')
  grade = grade.join(';')

  let startTime = validTime[0]
  let endTime = validTime[1]



  let sql = `update policy set college= '${college}',announcementTime= '${announcementTime}',auditTime= '${auditTime}',
  startTime= '${startTime}', places= '${places}', money= '${money}',
  endTime= '${endTime}',grade= '${grade}',
   author= '${author}',update_date ='${update_date}', title ='${title}',content='${content}',detailDate='${detailDate}',isApply='${isApply}' where id = ${id}`;
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
router.post('/announcement/update', (req, res, next) => {
  let {
    author,
    title,
    content,
    detailDate,
    validTime,
    id,
    update_date
  } = req.body
  
  let startTime = validTime[0]
  let endTime = validTime[1]
  let sql = `update announcement set startTime= '${startTime}', endTime= '${endTime}', author= '${author}',update_date ='${update_date}', title ='${title}',content='${content}',detailDate='${detailDate}' where id = ${id}`;
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
router.post('/introduction/update', (req, res, next) => {
  let {
    author,
    title,
    content,
    detailDate,
    id,
    update_date
  } = req.body
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
//奖助学金项目详情
router.get('/policy/detail', (req, res, next) => {
  let id = req.query.id
  let sql = `select * from policy where id = ${id}`;
  pool.query(sql, (err, result) => {
    if (result && result.length > 0) {
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
router.get('/introduction', (req, res, next) => {
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


//通知公告
router.get('/announcement', (req, res, next) => {
  let totalCount = 0
  let {
    pageSize,
    currentPage,
  } = req.query
  let college = req.query.college ? '%' + req.query.college + '%' : '%%'
  let category = req.query.category ? '%' + req.query.category + '%' : '%%'

  let size = pageSize * (currentPage - 1)
  

  let totalCountsql = ''
  let sql = ''
  if(req.query.endTime){
    let endTime = req.query.endTime
    totalCountsql = `select count(*) from announcement where endTime>'${endTime}' and college like '${college}' and title like '${category}' `
    sql = ` SELECT * from announcement where endTime>'${endTime}' and  college like '${college}' and title like '${category}'  ORDER BY  detailDate DESC,id DESC LIMIT ${size},${pageSize}`
  }else{
    totalCountsql = `select count(*) from announcement where  college like '${college}' and title like '${category}' `
    sql = ` SELECT * from announcement where  college like '${college}' and title like '${category}'  ORDER BY  detailDate DESC,id DESC LIMIT ${size},${pageSize}`
  }
  console.log(sql)

  pool.query(totalCountsql, (err, result) => {
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
router.get('/announcement/detail', (req, res, next) => {
  let id = req.query.id
  let sql = `select * from announcement where id = ${id}`;
  pool.query(sql, (err, result) => {
    if (result && result.length > 0) {
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
//插入获奖名单
router.post('/announcement/table/add', (req, res, next) => {
  let {
    list,
    year
  } = req.body
  let values = ''
  list.forEach(item => {
    values += `('${item.category}','${item.number}','${year}'),`
  })
  values = values.slice(0, (values.length - 1))
  let sql = `insert into announcementTable(category,number,year) values ${values}`;
  // let sql = `insert into announcementTable(category,number,year) values ('测试奖学金','2019002','2019'),('测试奖学金','2019001','2019')`
  console.log(sql)
  pool.query(sql, function (err, result) {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      res.json({
        status: '1',
        msg: 'success',
        content: result
      });
    }
  })
})

//工作动态
router.get('/working', (req, res, next) => {
  let totalCount = 0
  let {
    pageSize,
    currentPage
  } = req.query
  let size = pageSize * (currentPage - 1)
  let totalCountsql = `select count(*) from working`
  let sql = ` SELECT o.* from (SELECT * from working ) o ORDER BY detailDate  DESC,id  DESC LIMIT ${size},${pageSize}`
  pool.query(totalCountsql, (err, result) => {
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
router.get('/working/detail', (req, res, next) => {
  let id = req.query.id
  let sql = `select * from working where id = ${id}`;
  pool.query(sql, (err, result) => {
    if (result && result.length > 0) {
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
router.get('/readingtimes', (req, res, next) => {
  let id = req.query.id
  let table = req.query.table
  let updatesql = ''
  updatesql = `update ${table} set reading_times= reading_times+1 where id =${id}`;
  pool.query(updatesql, (err, result) => {
    if (!err) {
      res.json({
        status: '-1',
        msg: '获取数据成功',
        content: result
      });
    } else {
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
