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

// response = univ_sc_code_board {id(글번호),  posts_writer(작성자 닉네임), posts_title(글 제목), view_count(게시글 View 갯수), likes_count(게시글 좋아요 수), created_at(게시글 작성 시간)}

router.post('/', function(req, res, next){
	connection.query("select id, posts_writer, posts_title, view_count, likes_count, created_at from univ_"+req.body.sc_code+"_board order by id desc limit 20;",
		function(error, cursor){
			if(error==null){
				res.status(200).json(cursor);
			}
			else{
				res.status(503).json({message : "Board List Load fail"});
			}
		}

});



module.exports = router;