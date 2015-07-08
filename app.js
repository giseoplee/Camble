var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var test = require('./routes/test');
var json = require('./routes/json');
var push = require('./routes/push');
var file  = require('./routes/file');
var new_login  = require('./routes/auth/new');
var existing_login  = require('./routes/auth/exist');
var content_write  = require('./routes/board/content/write');
var board_load  = require('./routes/board/load');
var multer = require('multer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(express.json()); // http 리퀘스트 body json 형태 사용 가능
// app.use(express.urlencoded());
// app.use(express.multipart()); // 파일 업로드 사용
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ 
   dest: './files/',
   rename: function (fieldname, filename) {
    return "image_" + Date.now() + "." + filename.split('.').pop(); 
  }
}));

app.use('/file', file);
app.use('/', routes);
app.use('/test', test);
app.use('/json', json);
app.use('/file', file);
app.use('/auth/new', new_login);
app.use('/auth/exist', existing_login);
app.use('/board/content/write', content_write);
app.use('/board/load', board_load);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
//app.listen(3000);
