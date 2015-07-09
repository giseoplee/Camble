var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();


var connection = mysql.createConnection({

    user : 'user',
    password : 'appjam123',
    database : 'camble',
    host : 'appjam.cyjao5zjyirq.us-west-2.rds.amazonaws.com'
});

router.get('/', function(req, res, next){
	connection.query("select id, sc_name, sc_code, sc_domain, sc_logo_image from camble_schools;", function(error , cursor){
		if(!error){
			res.status(200).json(cursor);
		}else{
			res.status(503).json({message : "School List Load Fail"});
		}
	});
});

module.exports = router;