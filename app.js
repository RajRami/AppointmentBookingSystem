var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./controllers/index');
const appointments = require('./controllers/appointments')

var app = express();

//DB connection using .env file
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log('Connected')
}).catch(() => {
  console.log('Cannot connect')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/appointments', appointments);

// hbs helper function to pre-select correct dropdown option
// const hbs = require('hbs')

// hbs.registerHelper("setChecked", function getSelectedValue (currentVal, selectedVal){
//   let selectedProperty = ''
//   if (currentVal == selectedVal) {
//     selectedProperty = ' checked'
//   }
//   return new hbs.SafeString(`<input type="checkbox" name="confirmed" id="confirmed" value="${selectedProperty}">`)
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
