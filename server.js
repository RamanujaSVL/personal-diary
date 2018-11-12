const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyparser=require('body-parser');
const app = express();

//Route Variables
  var index = require('./routes/index')
  var welcome = require('./routes/welcome')
  var account = require('./routes/account')
  var logout = require('./routes/logout')

//The below line is to use Templating Engine along with
  //app.set('views', path.join(__dirname, 'views'));
  //app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

//Adding Folders for Access to requests for JS/CSS files
  app.use(express.static('js'));

//Declaring variables to be sent from sever along with response
  app.use(function(req, res, next){
  res.locals.result=null;
  res.locals.data=null;
  next();
});

//Can't access form variables from html page without below middleware
  app.use(bodyparser.urlencoded({extended:false}));
  app.use(bodyparser.json());

// Home Module
  app.use('/',index)
  app.use('/welcome',welcome)

//Account Module
  app.use('/account',account)

//Logout module
  app.use('/logout',logout)

// Start Server
  app.listen(3003, function(er){
    console.log('Server started on port 3003');
  });
