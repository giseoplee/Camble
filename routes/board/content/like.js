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

router.post('/increment', function(req, res, next){ //sc_code : "학교 코드", user_auth_key : "사용자 키", univ_board_id : "게시판 글 번호"

	connection.query("insert univ_"+req.body.sc_code+"_likes set content_id=?, camble_user_id=?, content_sort=1, created_at=now();",
		[req.body.univ_board_id, req.body.user_auth_key], function(error, info){
			if(error==null){
				connection.query("update univ_"+req.body.sc_code+"_board set likes_count = likes_count+1 where id=?;", 
				[req.body.univ_board_id], function(error, info){
					if(error==null){
						res.status(200).json({message : "Like Increment all Success"});	
					}else{
						res.status(503).json({message : "Like Count Update Fail"});	
					}
				});
			}else{
				res.status(503).json({message : "Like Increment Fail"});	
			}
		});
});


router.post('/decrement', function(req, res, next){

	var query = connection.query("delete from univ_"+req.body.sc_code+"_likes where content_sort=1 and content_id=? and camble_user_id=?;",
		[req.body.univ_board_id, req.body.user_auth_key], function(error, info){
			console.log(query);
			if(error==null){
				connection.query("update univ_"+req.body.sc_code+"_board set likes_count = likes_count-1 where id=?;", 
				[req.body.univ_board_id], function(error, info){
					if(error==null){
						res.status(200).json({message : "Like Decrement all Success"});
					}else{
						res.status(503).json({message : "Like Count Update Fail"});
					}
				});
			}else{
				res.status(503).json({ message : "Like Decrement Fail"});	
			}
	});		
});

module.exports = router;