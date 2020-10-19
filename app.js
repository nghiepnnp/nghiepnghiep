const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flush = require('connect-flash');

const db = require('./utils/db');



const app = express();
require('./middlewares/session')(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flush());

// json
// app.use(function (req, res, next) {
//     res.setHeader('Content-Type', 'application/json');
//     next();
// });

// Gọi hàm local xl session
require('./middlewares/locals')(app);






app.use('*', function (req, res, next) {
    //res.locals.session = req.session;
    res.locals.lcCart = req.session.cart;
    next();
})

// function ignoreFavicon(req, res, next) {
//     if (req.originalUrl === '/favicon.ico') {
//       console.log("Hello" + req.originalUrl);
//     } else {
//         next();
//     }
// }


// app.use(ignoreFavicon);


require('./middlewares/routes')(app);


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'cskh.phuongnghiep@gmail.com',
//       pass: '123456M1'
//     }
//   });
  
//   const mailOptions = {
//     from: 'cskh.phuongnghiep@gmail.com',
//     to: 'nghiepnguyen8499@gmail.com',
//     subject: 'Test mail nodejs',
//     text: 'So easy!'
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });




//app.use('/users', usersRouter);



// const fn_done = function (results) {
//   console.log(results);
// }
// const fn_fail = function (error) {
//   console.log(error);
// }

// db.load(
//   "select * from categories",
//   function (results) {
//     console.log(results)
//   },
//   function (error) {
//     console.log(error)
//   }
// );

// db.load(
//   "select * from products",
//   function (results) {
//     for (const pro of results) {
//       console.log(`${pro.ProductName}, ${pro.Price}`);
//     }
//   },
//   function (error) {
//     console.log(error)
//   }
// );
// async function main() {
//   const pm = db.load("select * from products");
//   const rows = await pm;
//   for (const pro of rows) {
//     console.log(`${pro.ProductName}, ${pro.Price}`);
//   }
// }
// main();

// Kiểm tra req session, gná local

































// catch 404 and forward to error handler
app.use(function (req, res) {
    res.render('error');
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