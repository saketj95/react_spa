var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var authenticateUserApi = require('./routes/authenticateUserApi');
var getUsername = require('./routes/getUsername');
var showProfileData = require('./routes/showProfileData');
var addNewContact = require('./routes/addNewContact');
var showContactData = require('./routes/showContactData');
var addNewUser = require('./routes/addNewUser');
var checkDuplicateUser = require('./routes/checkDuplicateUser');
var checkDuplicateNumber = require('./routes/checkDuplicateNumber');
var changeDetails = require('./routes/changeDetails');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/users', users);
app.use('/authenticateUserApi',authenticateUserApi);
app.use('/getUsername',getUsername);
app.use('/showProfileData',showProfileData);
app.use('/addNewContact',addNewContact);
app.use('/showContactData',showContactData);
app.use('/addNewUser',addNewUser);
app.use('/checkDuplicateUser',checkDuplicateUser);
app.use('/checkDuplicateNumber',checkDuplicateNumber);
app.use('/changeDetails',changeDetails);

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

app.listen(7000, function () {
    console.log('Project is running on port 7000!')
});

module.exports = app;
