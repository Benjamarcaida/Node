var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride =  require('method-override');
let session = require("express-session");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carritoRouter = require('./routes/carrito');
var productsRouter = require("./routes/products")
var administRouter = require("./routes/administ");
//const e = require('express');
var recordameMiddleware = require('./middlewares/recordameMiddleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({secret : "Secreto"}));
app.use(recordameMiddleware);

app.use(function (req, res, next) {
  res.locals.userLog = req.session.usuarioLogueado
  next();
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/carrito', carritoRouter);
app.use('/products', productsRouter);
app.use('/administrador', administRouter);

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

module.exports = app;
