var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ueditor = require("ueditor")
var index = require('./routes/index');
var scholar = require('./routes/scholar');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/ue",ueditor(path.join(__dirname,'public'),function(req,res,next){
  // 读文件路径
let  fs = require('fs');
let fileNames=fs.readdirSync('public/file').map(file => ('10.239.219.21:8081/api/file/'));
  if(req.query.action === 'config'){
    console.log(req.query)
  }
  if(req.query.action === 'uploadimage'){
    // 获得上传图片的信息
    var foo = req.ueditor;
    var img_url = 'images';
    res.ue_up(img_url); 
  }else  if(req.query.action === 'uploadfile'){
    // 获得上传图片的信息
    var foo = req.ueditor;
    var file_url = 'file';
    //要保存的地址，其他操作由ueditor来做
    res.ue_up(file_url); 
    res.send({
      urlList:fileNames
    })
  }
    //  客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
     // 要展示给客户端的文件夹路径
      var dir_url = 'images';
      // 客户端会列出 dir_url 目录下的所有图片
      res.ue_list(dir_url)  
  }else {
    res.setHeader('Content-Type', 'application/json');
    // 这里填写 ueditor.config.json 这个文件的路径
    res.redirect('/static/ue/nodejs/config.json')
  }
}))
// 拦截请求
app.use(function (req,res,next) { 
  //请求中有cookies.userId 就继续执行，否则查看请求是否为未登录可访问页面（若是，可继续访问），反之提示未登录
  if(req.cookies.number){
    next();
  }else{
      console.log("url:"+req.originalUrl);
      if(req.originalUrl.indexOf('/login')>-1 ||   req.originalUrl.indexOf('/register')>-1 ||  req.originalUrl.indexOf('/college')>-1 || req.originalUrl.indexOf('/logout')>-1 || req.originalUrl.indexOf('/scholar')>-1 ){
          next();
      }else{
          res.json({
            status:'0',
            msg:'当前未登录,请先登录',
            result:''
          });
      }
  }
});
//路由控制
app.use('/', index);
app.use('/scholar', scholar);

// 404异常处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
