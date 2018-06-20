const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyparser=require('body-parser');
const app = express();
var mongojs = require('mongojs')
var db = mongojs('personalDiary', ['notes'])

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

  // Home Route
app.get('/', function(req, res){
      //res.sendFile(path.join(__dirname+'\\index.html'));
      res.render('index');
      //The below line is to use Templating Engine along with
      /*res.render('index', {
        title:'Articles'
      });*/
  });

//Account Authentication
app.post('/account', function(req, res){
var bPass = validatePasword(req);
  if(bPass){
    var content = null;
    db.notes.find(function (err, docs) {
      res.render('index',{
        result:'success',
        data:docs
      });
    });
  }

  else {
    res.render('index',{
      result:'err'
    });
  }
});

//Posting Module
app.post('/account/postArticle', function(req, res){
  var note = {
    title : req.body.per_title,
    date : req.body.per_date,
    content : req.body.per_note
  }
  //console.log(title+' '+date+' '+note);
  db.notes.insert(note, function(err, result){
    if(err){
      res.render('index',{
        result:'err',
        subResult:'dbErr'
      })
    }

    db.notes.find(function (err, docs) {
      res.render('index',{
        result:'articlePosted',
        data:docs
      });
    });

  });
});

//Logout module
app.get('/logout', function(req, res){
  res.redirect('/');
})

  // Start Server
  app.listen(3003, function(er){
    console.log('Server started on port 3003');
  });


//Functions

function validatePasword(req){

  var d = new Date();
  var h = d.getHours()%10;
  var day = d.getDate()%10;
  var m = d.getMonth()%10+1;
  var cPin;
  if(day%2==0)
  {
  cPin = [5,h,8,day,2,m];
  cPin = parseInt(cPin.join(''));
  }
  else{
  cPin = [h,5,day,8,m,2];
  cPin = parseInt(cPin.join(''));
  }

  //console.log('Pin is: '+cPin+' You entered: '+req.body.psswd);

  if(parseInt(req.body.psswd)==cPin)
  return true;
  else
  return false;

}
