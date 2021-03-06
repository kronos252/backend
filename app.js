let createError = require('http-errors');
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let sess;


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure:true
      // expires: 600000
  }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/login',function(req,res){
  sess = req.session;
//In this we are assigning email to sess.email letiable.
//email comes from HTML page.
  
  sess.pass=req.body.pass;
  sess.user=req.body.user;
  res.redirect('/users');
});
app.post('/logout',function(req,res){
  req.session.destroy();
//In this we are assigning email to sess.email letiable.
//email comes from HTML page.
  res.redirect('/users');
});
app.get('/signup',function(req,res,next){
  req.session.destroy();
  res.render("signup");
});
app.get('/logout',function(req,res){
  req.session.destroy();
//In this we are assigning email to sess.email letiable.
//email comes from HTML page.
  res.redirect('/');
});

app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.post('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

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
