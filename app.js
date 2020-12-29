var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var productRouter = require('./routes/products');
var sessionauth = require("./middleware/sessionAuth");
const mongoose= require("mongoose");
const sessionAuth = require('./middleware/sessionAuth');

var app = express();
//session
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
app.use(sessionAuth);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);

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

mongoose.connect("mongodb+srv://hassanBilal:hassan@cluster1.ab09b.mongodb.net/SemProject?authSource=admin&replicaSet=atlas-xfg92j-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",{ useNewUrlParser: true ,useUnifiedTopology: true}).then(()=>{
  console.log("Connection to mongoDB Successfull");
}).catch((err)=>{
console.log("Connection error");
console.log(err);
});

module.exports = app;
