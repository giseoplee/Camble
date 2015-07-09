var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();


var connection = mysql.createConnection({
    'host':'appjam.cyjao5zjyirq.us-west-2.rds.amazonaws.com',
    'user':'user',
    'password':'appjam123',
    'database':'camble'
});

router.post('/', function(req, res, next){
	var query = connection.query("update univ_"+req.body.sc_code+"_board set view_count = view_count+1 where id=?",[req.body.univ_board_id], function(error, info){
		console.log(query);
		if(error==null){
			res.status(200).json({message : "Posts View Count Up Success"});
		}else{
			res.status(200).json({message : "Posts View Count Up Fail"});
		}
	});
});

module.exports = router;