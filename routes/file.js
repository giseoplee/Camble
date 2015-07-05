var express = require('express');
var mysql = require('mysql');
var str2json = require('string-to-json');
var bodyParser = require('body-parser');
var router = express.Router();


var connection = mysql.createConnection({
    'host':'appjam.cyjao5zjyirq.us-west-2.rds.amazonaws.com',
    'user':'user',
    'password':'appjam123',
    'database':'camble'
});

// TODO : 파일 업로드 구현.
router.post('/', function(request, response, next) {

   var title = request.body.title;
   var content = request.body.content;
   var files = request.files;

   if (title == undefined || content == undefined ||
         files == undefined || files.length < 1) {

      response.sendStatus(403);
   }
   else {

      connection.query('insert into photo(title, content, path) values (?, ?, ?);', [ title, content, files.photo.path ], function (error, info) {

         if (error != undefined)
            response.sendStatus(503);
         else
            response.redirect('/photos/' + info.insertId);
      });
   }
});


module.exports = router;

module.exports = router;