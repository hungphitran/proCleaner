var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')


var routes = require('./routes/index');
var search = require('./routes/search');
var search_daihan = require('./routes/search_daihan');
var ngv_chitiet = require('./routes/ngv_chitiet');
var user = require('./routes/user');
var sendmail = require('./routes/sendmail');
var laydiachi = require('./routes/laydiachi_googleapi');
var guitinnhan = require('./routes/guitinnhan_xacnhan');
var luuyeucau_nh = require('./routes/luu_yeucau_nh');
var luuyeucau_dh = require('./routes/luu_yeucau_dh');
var luuyeucau_tt = require('./routes/luu_yeucau_tt');
var xacthuc = require('./routes/xacthuc'); 
var blog = require('./routes/blog');
var blog_admin = require('./routes/blog_admin');
var upload_img = require('./routes/uploadimg');
var remove_img = require('./routes/removeimg');

var app = express();
var fs = require('fs');
var methodOverride = require('method-override');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/public', express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'icon-vuong.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}))

app.use('/', routes);
app.use('/search', search);
app.use('/nguoi_giup_viec', ngv_chitiet);
app.use('/searchdaihan', search_daihan);
app.use('/taikhoan', user);
app.use('/sendmail', sendmail);
app.use('/layDiaChiGoogleApi', laydiachi);
app.use('/layTinNhanXacNhan', guitinnhan);
app.use('/luuyeucau_nh', luuyeucau_nh);
app.use('/luuyeucau_dh', luuyeucau_dh);
app.use('/luuyeucau_tt', luuyeucau_tt);
app.use('/xacthuc', xacthuc);
app.use('/blog', blog);
app.use('/blog_admin', blog_admin);
app.use('/uploadimg', upload_img);
app.use('/removeimg', remove_img);

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

