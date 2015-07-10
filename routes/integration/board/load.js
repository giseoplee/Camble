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

router.get('/', function(req, res, next){
	var query = connection.query("select id, posts_writer, posts_title, posts_content , view_count, likes_count, comment_count, camble_school_code, updated_at from camble_integration_board order by id desc limit 20;",
		function(error, cursor){

			if(error==null){
				res.status(200).json(cursor);
			}
			else{
				res.status(503).json({message : "Board List Load fail"});
			}
		});

});



module.exports = router;