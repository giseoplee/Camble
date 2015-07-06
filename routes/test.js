var express = require('express');
var mysql = require('mysql');
//var mysql = require('mysql');
//var http = require('http');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('테스트 용');
// });

var connection = mysql.createConnection({
    'host':'appjam.cyjao5zjyirq.us-west-2.rds.amazonaws.com',
    'user':'user',
    'password':'appjam123',
    'database':'camble'
});

router.get('/:school_id', function(req, res, next) {
    connection.query('select * from camble_school where id=?;',
                     [req.params.school_id], function (error, cursor) { 
        if (cursor.length > 0)
            res.status(200).json(cursor);
        else
           res.status(503).json({message : "not_found_data"});
    });
});

router.get('/', function(req, res, next) {
    connection.query('select * from camble_schools;', function (error, cursor) { 
        if (cursor.length > 0)
            res.status(200).json(cursor);
        else
           res.status(503).json({message : "not_found_data_yo!!!!!!!!!!!!!"});
    });
});

// router.get('/',function(req,res,next) {
//            connection.query('select * from cambl_school' +
//            ' order by id desc limit 10;',function(error,cursor){
//            	if(!cursor){
//            		res.send(error.message);
//            	}
//     res.json(cursor);
//     });
// });

router.post('/', function(req, res, next) {
    res.status(200).json(req);
});

module.exports = router;