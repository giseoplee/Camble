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
	connection.query("update univ_"+req.body.sc_code+"_board set view_count = view_count+1 where id=?",[req.body.univ_board_id], function(error, info){
		if(error==null){
			connection.query("update camble_integration_board set view_count = view_count+1 where camble_school_code=? and univ_board_id=?;",
				[req.body.sc_code, req.body.univ_board_id], function(error, info){
					if(error==null){
						like_check(req.body.sc_code, req.body.univ_board_id, req.body.user_auth_key, "Integration Board Update Success, ");
					}else{
						like_check(req.body.sc_code, req.body.univ_board_id, req.body.user_auth_key, "Integration Board Update Fail, ");
					}
			});
		}else{
			res.status(200).json({message : "Posts View Count Up Fail"});
		}
	});

	function like_check(sc_code, board_id, user_id, msg){
		connection.query("select * from univ_"+sc_code+"_likes where content_sort=1 and content_id=? and camble_user_id=?", 
			[board_id, user_id], function(error, cursor){
				if(cursor.length>0){
					res.status(200).json({message : msg+"Posts View Count Up and User Like exist", like_flag : "1"});
				}
				else{
					res.status(200).json({message : msg+"Posts View Count Up, User Like not exist", like_flag : "0"});
				}
		});
	}

});



module.exports = router;