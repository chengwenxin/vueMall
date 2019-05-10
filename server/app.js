var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ueditor = require("ueditor")
var index = require('./routes/index');
var scholar = require('./routes/scholar');
var app = express();
// var multiparty = require("multiparty")

// app.use(multiparty({uploadDir:'./public/file'}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/ue",ueditor(path.join(__dirname,'public'),function(req,res,next){
  //  读文件路径
let  fs = require('fs');
let fileNames=fs.readdirSync('public/file').map(file => ('127.0.0.1:8081/api/file/'));
  if(req.query.action === 'config'){
    console.log(req.query)
  }
  if(req.query.action === 'uploadimage'){
    // 这里你可以获得上传图片的信息
    var foo = req.ueditor;
    var img_url = 'images';
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }else  if(req.query.action === 'uploadfile'){
    // 这里你可以获得上传图片的信息
    var foo = req.ueditor;
    var file_url = 'file';
    res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    res.send({
      urlList:fileNames
    })
  }
    //  客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
      var dir_url = 'images'; // 要展示给客户端的文件夹路径
      res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
  }else {
    res.setHeader('Content-Type', 'application/json');
    // 这里填写 ueditor.config.json 这个文件的路径
    res.redirect('/static/ue/nodejs/config.json')
  }
}))

app.use(function (req,res,next) { // 拦截请求
  //请求中有cookies.userId 就继续执行，否则查看请求是否为未登录可访问页面（若是，可继续访问），反之提示未登录
  if(req.cookies.number){
    next();
  }else{
      console.log("url:"+req.originalUrl);
      if(req.originalUrl.indexOf('/login')>-1 || req.originalUrl.indexOf('/register')>-1 || req.originalUrl.indexOf('/logout')>-1 || req.originalUrl.indexOf('/scholar')>-1 ){
      console.log("url1:"+req.originalUrl);
          next();
      }else{
          res.json({
            status:'10001',
            msg:'当前未登录',
            result:''
          });
      }
  }
});

app.use('/', index);
app.use('/scholar', scholar);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
