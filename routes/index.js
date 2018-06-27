// Home Route
var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
    //res.sendFile(path.join(__dirname+'\\index.html'));
    res.render('index');
    //The below line is to use Templating Engine along with
    /*res.render('index', {
      title:'Articles'
    });*/
});

module.exports = router;
