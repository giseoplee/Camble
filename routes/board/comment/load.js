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

var list = new Array();

router.post('/',function(req, res, next){

    query =connection.query("select comments.id from univ_"+req.body.sc_code+"_board_comment as comments inner join univ_dongduk_likes as likes on comments.id=likes.content_id where likes.content_sort=0 and likes.camble_user_id=?;",
	[req.body.user_auth_key], function(error, cursor){

		if(cursor.length > 0){
				for(var i=0; i<cursor.length; i++){
					list.push(cursor[i].id);
				}
			connection.query("select id ,camble_user_id, comment_writer, comment_content, likes_count, updated_at from univ_"+req.body.sc_code+"_board_comment where univ_"+req.body.sc_code+"_board_id=? order by id desc;",
				[req.body.univ_board_id], function(error, cursor){
					for(var j=0; j<list.length; j++){
						for(var k=0; k<cursor.length; k++){
							if(cursor[k].id==list[j]){
								cursor[k].like_flag = "1";
							}else if(cursor[k].id!=list[j] && cursor[k].like_flag!="1"){
								cursor[k].like_flag = "0";
							}
						}
					}
					res.status(200).json(cursor);
				});
		}else{
			connection.query("select id ,camble_user_id, comment_writer, comment_content, likes_count, updated_at from univ_"+req.body.sc_code+"_board_comment where univ_"+req.body.sc_code+"_board_id=? order by id desc;",
				[req.body.univ_board_id], function(error , cursor){
					if(error==null){
						res.status(200).json(cursor);
					}
				});		
		}
	});
});

module.exports = router;