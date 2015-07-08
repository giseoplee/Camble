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
	console.log(req.body.sc_code);
	console.log(req.body.user_auth_key);
	console.log(req.body.posts_title);
	console.log(req.body.posts_content);

	connection.query("select school.id,user.user_nickname from camble_schools as school inner join camble_users as user on school.id=user.camble_school_id where school.sc_code=? and user.id=?;",
		[req.body.sc_code, req.body.user_auth_key], function(error, cursor){

			if(cursor.length > 0){
				var query = connection.query("insert univ_"+req.body.sc_code+"_board set camble_school_id=?, camble_user_id=?, posts_writer=?, posts_title=?, posts_content=?, created_at=now(), updated_at=now();",
					[cursor[0].id, req.body.user_auth_key, cursor[0].user_nickname, req.body.posts_title, req.body.posts_content], function(error, info){
						if(error==null)
						{
							res.status(200).json({message : "wirte_success"});
						}else{
							res.status(503).json({message : "wirte_fail"});
						}
					}
				 );
			}else{
				res.status(503).json({message : "Not Found School ID"});
			}
		});

});



module.exports = router;