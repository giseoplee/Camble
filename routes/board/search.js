// 검색기능
var express = require('express');
var fs = require('fs');
var mysql = require('mysql');
var path = require('path');

var router = express.Router();
var connection = mysql.createConnection({

    user : 'user',
    password : 'appjam123',
    database : 'camble',
    host : 'appjam.cyjao5zjyirq.us-west-2.rds.amazonaws.com'
});


router.post('/', function(req,res,next){  // sc_code , search_content
   var query = connection.query('select * from univ_'+req.body.sc_code +'_board where posts_title like \'%' 
                     + req.body.search_content + '%\' order by id desc limit 20;',
                     function(error, cursor){
       console.log(query);
        if(error == null){
            res.status(200).json(cursor);
        }
        else{
            res.status(503).json({message:"Fail to search"});
        }
    });
});
module.exports = router;