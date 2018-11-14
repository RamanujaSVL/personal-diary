var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs('personalDiary', ['notes'])

//Account Authentication
router.post('/', function(req, res){
var bPass = validatePasword(req);
  if(bPass){
    var content = null;
    db.notes.find(function (err, docs) {
      res.render('account',{
        result:'success',
        data:docs
      });
    });
  }

  else {
    res.render('index',{
      result:'err'
    });
    res.redirect('/');
  }
});

router.post('/postArticle', function(req, res){
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
      res.render('account',{
        result:'articlePosted',
        data:docs
      });
    });

  });
});

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

  console.log('Pin is: '+cPin+' You entered: '+req.body.psswd);

  if(parseInt(req.body.psswd)==cPin)
  return true;
  else
  return false;

}

module.exports = router;
