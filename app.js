let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let routes = require('./routes/index');
routes(app);
app.use(session({
  secret:'secret',
  cookie:{
    maxAge:1000*60*30
  }
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

/**
 * 链接数据库MongoDB
 * @type {Mongoose}
 */
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/User') ;   //连接本地数据库User
let db = mongoose.connection;

mongoose.Promise = global.Promise;
// 连接成功
db.on('open', function(){
  console.log('MongoDB Connection Succeed');
});
// 连接失败
db.on('error', function(){
  console.log('MongoDB Connection Error');
});

/**
 * 使用json解析
 * @type {Parsers}
 */
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
module.exports = app;
