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

router.post('/',function(req, res, next){

	connection.query("update univ_"+req.body.sc_code+"_board set view_count = view_count+1 where id=?;",
		[req.body.univ_board_id],function(error, info){
			if(error==null){
				connection.query("select camble_user_id, comment_writer, comment_content, likes_count, updated_at from univ_"+req.body.sc_code+"_board_comment where univ_"+req.body.sc_code+"_board_id=? order by id desc;",
					[req.body.univ_board_id], function(error, cursor){
						if(cursor.length > 0){
							res.status(200).json(cursor);
						}else{
							res.status(200).json({message : "Null Comment"});
						}
					});
			}
	});
});


module.exports = router;