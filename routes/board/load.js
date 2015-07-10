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

router.get('/:sc_code', function(req, res, next){
	var query = connection.query("select id, posts_writer, posts_title, posts_content , view_count, likes_count, comment_count, updated_at from univ_"+req.params.sc_code+"_board order by id desc limit 20;",
		function(error, cursor){

			if(error==null){
				res.status(200).json(cursor);
			}
			else{
				res.status(503).json({message : "Board List Load fail"});
			}
		});

});

router.get('/:sc_code/hot', function(req, res, next){
	var query = connection.query("select id, posts_writer, posts_title, posts_content , view_count, likes_count, comment_count, updated_at from univ_"+req.params.sc_code+"_board order by likes_count desc limit 20;",
		function(error, cursor){

			if(error==null){
				res.status(200).json(cursor);
			}
			else{
				res.status(503).json({message : "Hot Board List Load fail"});
			}
		});

});


module.exports = router;