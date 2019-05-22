var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $conf = require('../conf/conf');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var path = require('path')
var fs = require("fs")
const xlsx = require('node-xlsx')
// 使用连接池
var pool = mysql.createPool($conf.mysql);
router.use(express.static('public'));
//导出excel
//  路径转换  论文中必须强调这个
//    var dirname = __dirname.replace(/\\/g, "/")
// var fileName = path.join(dirname, "../public/file", fileName)
router.post('/export', function (req, res, next) {
  const {
    category
  } = req.body
  let dataSheet = [
    ['审核序号', '资助项目名称', '学号', '姓名', '年级', '专业', '学院', '性别', '年龄', '出生日期', '民族', '身份证号', '手机号', '邮箱', '银行卡号', '申请过程是否弄虚作假', '考试作弊', '校外租住', '其他诚信问题', '政治面貌',
      '类别', '是否全日制', '外语类别', '外语水平', '外语分数',
      '学制', '学历', '入学日期', '毕业日期', '学分成绩', '综测成绩', '学分班级排名', '学分年级排名', '综测班级排名',
      '综测年级排名', '是否有挂科记录', '科研成果', '籍贯', '家庭住址', '家庭具体情况', '是否为建档贫困生', '申请理由',
      '其他说明','申请学号','申请日期','初审账户','初审人','初审回复','初审结果','初审日期','复审账户','复审人','复审回复','复审结果','复审日期'
  
    ]
  ];
  let pathName = category + '.xlsx'
  let sql = `select * from apply,audit where apply.category = audit.category and audit.category = '${category}' and audit.secondAuditStatus = '复审通过'`
  pool.query(sql, function (err, result) {
    if (err) throw err;
    //保证查询有值
    if (result.length > 0) {
      //获取键值
      let keys = Object.keys(result[0])
      //循环遍历 将对象转换成数组
      result.forEach(item => {
        let temp = []
        keys.forEach(key => {
          temp.push(item[key])
        })
        dataSheet.push(temp)
      })
    }
    writeExcel(dataSheet, pathName, 'sheet')
  })

  function writeExcel(sheet, fileName, sheetName) {
    let buffer = xlsx.build([{
      name: sheetName,
      data: sheet
    }])
    var dirname = __dirname.replace(/\\/g, "/")
    var fileName = path.join(dirname, "../public/file", fileName)
    fs.writeFile(fileName, buffer, function (err) {
      if (err) {
        res.json({
          status: '-1',
          content: sheet
        })
      } else {
        let tempPath = 'http://127.0.0.1:8081/api/file/' + pathName
        res.json({
          status: '1',
          path: tempPath
        })
      }
    })
  }
})



//登录
router.post('/login', function (req, res, next) {
  //对输入的密码进行加密
  let number = req.body.number || ''
  let password = req.body.password || ''
  let sql = `select * from user where number = '${number}'`
  pool.query(sql, function (err, result) {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      if (result && result.length > 0) {
        result = result[0]
        if (result.password === password) {
          res.cookie('number', number, {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 设置cookie时间,
            httpOnly: true
          });
          res.json({
            status: '1',
            msg: '登录成功！',
            content: result
          });
        } else {
          res.json({
            status: '-1',
            msg: '用户名或密码错误！'
          });
        }
      } else {
        res.json({
          status: '-1',
          msg: '用户名错误！'
        });
      }

    }
  })
})
//登出
router.post('/logout', function (req, res, next) {
  res.clearCookie('number')
  res.json({
    status: '1',
    msg: '登出成功！'
  })
})
//修改密码
router.post('/modifypassword', function (req, res, next) {
  //对输入的密码进行加密
  let {
    number,
    password,
    newPassword
  } = req.body
  let sql = `select * from user where number = '${number}'`
  pool.query(sql, function (err, result) {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      if (result && result.length > 0) {
        result = result[0]
        if (result.password === password) {
          let updateSql = `update user set password = '${newPassword}' where number = '${number}'`
          pool.query(updateSql, function (err, result) {
            if (!err) {
              res.json({
                status: '1',
                msg: '修改成功！',
                content: result
              });
            } else {
              res.json({
                status: '-1',
                msg: err.message
              })
            }
          })
        } else {
          res.json({
            status: '2',
            msg: '密码错误！'
          });
        }
      }
    }
  })
})


//注册
router.post('/register', function (req, res, next) {
  let querysql = `select number from user where number = ${req.body.number}`
  let registersql = `insert into user(number,name,password,role,college,major,grade) values('${req.body.number}','${req.body.name}','${req.body.password}','${req.body.role}','${req.body.college}','${req.body.major}','${req.body.grade}')`;
  pool.query(querysql, function (err, result) {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      if (result.length > 0) {
        res.json({
          status: '-1',
          msg: '账户已存在'
        });
      } else {
        pool.query(registersql, function (err, result) {
          if (err) {
            res.json({
              status: '-1',
              msg: err.message
            });
          } else {
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


//获取用户信息
//获取管理员用户信息
router.post('/user/list', function (req, res, next) {
  let totalCount = 0
  let {
    pageSize,
    currentPage
  } = req.body
  let size = pageSize * (currentPage - 1)
  let totalCountsql = `select count(*) from user where role != '学生' `
  let sql = `select * from user where role != '学生' ORDER BY id DESC LIMIT ${size},${pageSize}`
  pool.query(sql, function (err, result1) {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      pool.query(totalCountsql, function (err, result) {
        totalCount = result[0]['count(*)']
        if (!err) {
          res.json({
            status: '1',
            msg: 'success',
            content: result1,
            totalCount
          });
        } else {
          res.json({
            status: '-1',
            msg: err.message
          });
        }
      })

    }
  })
})
router.post('/user/update', function (req, res, next) {
  let sql = ''
  if (req.body.id) {
    sql = `replace  into user(id,number,password,name,role,college,grade) values(${req.body.id},'${req.body.number}','${req.body.password}','${req.body.name}','${req.body.role}','${req.body.college}','${req.body.grade}')`
  } else {
    sql = `insert  into user(number,password,name,role,college,grade) values('${req.body.number}','${req.body.password}','${req.body.name}','${req.body.role}','${req.body.college}','${req.body.grade}')`
  }
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
router.post('/user/delete', function (req, res, next) {
  let ids = req.body.ids.join(',')
  ids = '(' + ids + ')'
  let sql = `delete from user where id in ${ids} `
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

//文件上传
router.post('/upload', multipartMiddleware, (req, res, next) => {
  if (req.cookies && req.cookies.number) {
    var dirname = __dirname.replace(/\\/g, "/")
    var des_file = path.join(dirname, "../public/file", req.files.file.originalFilename)
    fs.readFile(req.files.file.originalFilename, function (err, data) {
      fs.writeFile(des_file, data, function (err) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            status: '1',
            msg: "上传成功",
            filename: "http://127.0.0.1:8081/api/file/" + req.files.file.originalFilename
          });
        }
      });
    });

  }
})

//查询个人基本信息
router.get('/information/base', (req, res, next) => {
  if (req.cookies && req.cookies.number) {
    let sql = `select * from user a left join information b on a.number = b.sno where a.number = '${req.cookies.number}'`
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
  }
})


//修改个人基本信息
router.post('/information/update', (req, res, next) => {
  if (req.cookies && req.cookies.number) {
    let {
      college,
      major,
      grade,
      gender,
      age,
      birthday,
      nation,
      cardId,
      phone,
      mail,
      bankCard,
      credibility,
      cheat,
      rent,
      breach,
      political,
      studentType,
      isFullTime,
      foreignLang,
      foreignLevel,
      foreignGrade,
      educationalSystem,
      educationalBackground,
      enrolmentTime,
      graduationTime,
      creditScore,
      comprehensiveResult,
      creditClassRanking,
      creditGradeRanking,
      comprehensiveClassRanking,
      comprehensiveGradeRanking,
      result,
      address,
      family,
      isPoor,
      applyReason,
      others,
      home,
      failureCourse
    } = req.body
    let sql = `replace into information(sno, gender,age, birthday, nation,cardId,phone,mail, bankCard, credibility, cheat,  rent,breach,political, studentType,      isFullTime, educationalSystem, educationalBackground,      enrolmentTime,      graduationTime,      creditScore,      comprehensiveResult,      creditClassRanking,      creditGradeRanking,      comprehensiveClassRanking,      comprehensiveGradeRanking,      result,      address,      family,      isPoor,      applyReason,      others,      home,      failureCourse,foreignLang,foreignLevel,foreignGrade)
     values('${req.cookies.number}','${gender}','${age}','${birthday}','${nation}','${cardId}','${phone}','${mail}','${bankCard}','${credibility}','${cheat}','${rent}','${breach}','${political}','${studentType}','${isFullTime}','${educationalSystem}','${educationalBackground}','${enrolmentTime}', '${graduationTime}','${creditScore}','${comprehensiveResult}','${creditClassRanking}', '${creditGradeRanking}','${comprehensiveClassRanking}','${comprehensiveGradeRanking}','${result}','${address}', '${family}','${isPoor}','${applyReason}','${others}','${home}','${failureCourse}','${foreignLang}','${foreignLevel}','${foreignGrade}');`
    let updatesql = `update user  set college = '${college}',major='${major}',grade ='${grade}' where number ='${req.cookies.number}';`
    pool.query(sql, (err, result) => {
      if (!err) {
        pool.query(updatesql, (err, result) => {
          if (!err) {
            res.json({
              status: '1',
              msg: '修改成功',
            });
          } else {
            res.json({
              status: '-1',
              msg: err
            });
          }
        })
      } else {
        res.json({
          status: '-1',
          msg: err
        });
      }
    })

  }
})

//ueditor 获取content
router.post('/ueditor/content', (req, res, next) => {
  if (req.cookies && req.cookies.number) {
    let {announcementTime,auditTime,college,grade,validTime} = req.body
    college=college.join(';')
    grade=grade.join(';')
    let startTime = validTime[0] 
    let endTime = validTime[1]
    let sql = ''
    if (req.body.type === "资助政策") {
      sql = `insert into policy(author, update_date, title,content,detailDate,isApply,announcementTime,auditTime,startTime,endTime,college,grade) values('${req.body.author}','${req.body.update_date}','${req.body.title}','${req.body.content}','${req.body.detailDate}','${req.body.isApply}',
      '${announcementTime}','${auditTime}','${startTime}','${endTime}','${college}','${grade}')`
    } else if (req.body.type === "通知公告") {
      let publicDay = req.body.publicDay ? req.body.publicDay : 0
      sql = `insert into announcement(author, update_date, title,content,detailDate,publicDay) values('${req.body.author}','${req.body.update_date}','${req.body.title}','${req.body.content}','${req.body.detailDate}',${publicDay})`
    } else if (req.body.type === "工作动态") {
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


//新增审核
router.post('/audit/insert', function (req, res, next) {
  //辅导员对应的学生申请
  let sql = `SELECT * from user AS a INNER JOIN (select instructor from college ,user where college.college = user.college AND  user.role = '学生' AND user.number = '${req.body.number}') AS b on a.number = b.instructor`
  console.log(sql)
  pool.query(sql, function (err, result) {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      if (result.length > 0) {
        result = result[0]
        let insertsql = `insert into audit(number,name,category,firstAuditNumber,firstAudit,applyDate) values('${req.body.number}','${req.body.name}','${req.body.category}','${result.instructor}','${result.name}','${req.body.applyDate}')`;
        console.log(insertsql)
        pool.query(insertsql, function (err, result) {
          if (err) {
            res.json({
              status: '-1',
              msg: err.message
            });
          } else {
            res.json({
              status: '1',
              msg: result
            });
          }
        })
      }
    }
  })

})


//查询审核列表
router.post('/audit/list', function (req, res, next) {
  let sql = ''
  if (req.body.category) {
    sql = `select * from audit where number = '${req.cookies.number}' and category = '${req.body.category}'  ORDER BY id DESC `;
    pool.query(sql, function (err, result) {
      if (err) {
        res.json({
          status: '-1',
          msg: err.message
        });
      } else {
        if (result.length < 1) {
          res.json({
            status: '1',
            msg: "success",
            content: result
          });
        } else {
          res.json({
            status: '2',
            msg: "该资助项目已申请，无法重复申请",
          });
        }
      }
    })
  } else {
    let totalCount = 0
    let {
      pageSize,
      currentPage
    } = req.body
    let size = pageSize * (currentPage - 1)
    let countSql = ''

    if (req.body.role === '0') {
      sql = `select * from audit where number = '${req.cookies.number}'  order by  applyDate DESC LIMIT ${size},${pageSize}`;
      countSql = `select count(*) from audit where number = '${req.cookies.number}'`
    } else if (req.body.role === '1') {
      sql = `select * from audit where firstAuditNumber = '${req.cookies.number}'  order by  applyDate DESC LIMIT ${size},${pageSize}`;
      countSql = `select count(*) from audit where firstAuditNumber = '${req.cookies.number}'`
    } else if (req.body.role === '2') {
      sql = `select * from audit  where firstAuditStatus = '初审通过' order by  applyDate DESC LIMIT ${size},${pageSize}`;
      countSql = `select count(*) from audit where firstAuditStatus = '初审通过'`
    }
    pool.query(sql, function (err, result1) {
      if (err) {
        res.json({
          status: '-1',
          msg: err.message
        });
      } else {
        pool.query(countSql, function (err, result) {
          totalCount = result[0]['count(*)']
          if (!err) {
            res.json({
              status: '1',
              msg: 'success',
              content: result1,
              totalCount
            });
          } else {
            res.json({
              status: '-1',
              msg: err.message
            });
          }
        })
      }
    })
  }
})

//查询申请记录  两个表左联
router.post('/apply/list', function (req, res, next) {
  let sql = `select * from user a LEFT JOIN information   b ON  a.number = b.sno where a.number ='${req.cookies.number}' `;
  pool.query(sql, function (err, result) {

    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      if (result.length > 0) {
        result = result[0]
      }
      res.json({
        status: '1',
        msg: "查询成功",
        content: result
      });
    }
  })
})

//查询申请记录   apply表
router.post('/apply/detail', function (req, res, next) {
  let sql = `select * from apply where sno ='${req.body.sno}' and category ='${req.body.category}' `;
  pool.query(sql, function (err, result) {

    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      });
    } else {
      if (result.length > 0) {
        result = result[0]
      }
      res.json({
        status: '1',
        msg: "查询成功",
        content: result
      });
    }
  })
})
//新增申请信息
router.post('/apply/add', (req, res, next) => {
  if (req.cookies && req.cookies.number) {
    let {
      category,
      name,
      college,
      major,
      grade,
      gender,
      age,
      birthday,
      nation,
      cardId,
      phone,
      mail,
      bankCard,
      credibility,
      cheat,
      rent,
      breach,
      political,
      studentType,
      isFullTime,
      foreignLang,
      foreignLevel,
      foreignGrade,
      educationalSystem,
      educationalBackground,
      enrolmentTime,
      graduationTime,
      creditScore,
      comprehensiveResult,
      creditClassRanking,
      creditGradeRanking,
      comprehensiveClassRanking,
      comprehensiveGradeRanking,
      result,
      address,
      family,
      isPoor,
      applyReason,
      others,
      home,
      failureCourse
    } = req.body
    let sql = ''
    if (!req.body.isAdmin) {
      sql = `insert into apply(sno,category,name,college,major,grade, gender,age, birthday, nation,cardId,phone,mail, bankCard, credibility, cheat,  rent,breach,political, studentType,      isFullTime, educationalSystem, educationalBackground,      enrolmentTime,      graduationTime,      creditScore,      comprehensiveResult,      creditClassRanking,      creditGradeRanking,      comprehensiveClassRanking,      comprehensiveGradeRanking,      result,      address,      family,      isPoor,      applyReason,      others,      home,      failureCourse,foreignLang,foreignLevel,foreignGrade)
      values('${req.cookies.number}','${category}','${name}','${college}','${major}','${grade}','${gender}','${age}','${birthday}','${nation}','${cardId}','${phone}','${mail}','${bankCard}','${credibility}','${cheat}','${rent}','${breach}','${political}','${studentType}','${isFullTime}','${educationalSystem}','${educationalBackground}','${enrolmentTime}', '${graduationTime}','${creditScore}','${comprehensiveResult}','${creditClassRanking}', '${creditGradeRanking}','${comprehensiveClassRanking}','${comprehensiveGradeRanking}','${result}','${address}', '${family}','${isPoor}','${applyReason}','${others}','${home}','${failureCourse}','${foreignLang}','${foreignLevel}','${foreignGrade}');`

    } else {
      updatesql = `update information  set credibility='${req.body.credibility}', cheat='${req.body.cheat}',  rent='${req.body.rent}',breach='${req.body.breach}' where sno ='${req.body.sno}'`
      pool.query(updatesql, (err, result) => {
        console.log(err)
      })
      sql = `update apply  set credibility='${req.body.credibility}', cheat='${req.body.cheat}',  rent='${req.body.rent}',breach='${req.body.breach}' where id ='${req.body.id}'`
    }
    pool.query(sql, (err, result) => {
      if (!err) {
        res.json({
          status: '1',
          msg: '新增成功',
        });
      } else {
        res.json({
          status: '-1',
          msg: err
        });
      }
    })
  }
})
// 查询学院专业班级
router.get('/college/list', function (req, res, next) {
  // 内连接
  let sql = `select * from college,major,grade where college.college = major.college AND major.major = grade.major`
  // let sql=` select * from college a LEFT JOIN major b on a.college = b.college LEFT JOIN grade c on b.major = c.major`
  pool.query(sql, function (err, result) {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      })
    } else {
      res.json({
        status: '1',
        msg: 'success',
        content: result
      })
    }
  })
})
//初审
router.post('/audit/first/replace', function (req, res, next) {
  let {
    id,
    firstAuditStatus,
    firstResponse,
    firstAuditDate
  } = req.body
  sql = `update audit set firstAuditStatus='${firstAuditStatus}',firstResponse='${firstResponse}',firstAuditDate='${firstAuditDate}' where id='${id}'`
  console.log('复审：', sql)
  pool.query(sql, function (err, result) {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      })
    } else {
      res.json({
        status: '1',
        msg: '初审成功',
        content: result
      })
    }
  })
})
//复审
router.post('/audit/second/replace', function (req, res, next) {
  let {
    id,
    secondAuditStatus,
    secondResponse,
    secondAuditDate,
    secondAudit,
    secondAuditNumber
  } = req.body
  sql = `update audit set secondAuditNumber='${secondAuditNumber}',secondAuditStatus='${secondAuditStatus}',secondResponse='${secondResponse}',secondAuditDate='${secondAuditDate}',secondAudit='${secondAudit}' where id='${id}'`
  pool.query(sql, function (err, result) {
    if (err) {
      res.json({
        status: '-1',
        msg: err.message
      })
    } else {
      res.json({
        status: '1',
        msg: '初审成功',
        content: result
      })
    }
  })
})
router.get('/enum/college',function(req,res){
  let sql = `select college from college`
  let policySql = `select title from policy` 
  pool.query(sql,function(err,college){
    if(err) throw err
    pool.query(policySql,function(err,category){
      if(err) throw err
      res.json({
        status:'1',
        content:{college,category}
      })
    })
  })


})
module.exports = router;
