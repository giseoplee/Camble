// 댓글 좋아요 눌렀을 시
var express = require('express');
var fs = require('fs');
var mysql = require('mysql');
var path = require('path');

var router = express.Router();
var connection = mysql.createConnection({

    user : 'user',
    password : 'appjam123',
    database : 'camble',
    host : 'appjam.cyjao5zjyirq.us-west-2.rds.amazonaws.com'
});


router.post('/increment', function(req, res, next){ //sc_code : "학교 코드", user_auth_key : "사용자 키", univ_board_id : "게시판 글 번호"

    connection.query("insert univ_"+req.body.sc_code+"_likes set content_id=?, camble_user_id=?, content_sort=0, created_at=now();",
        [req.body.univ_board_comment_id, req.body.user_auth_key], function(error, info){
            if(error==null){
                connection.query("update univ_"+req.body.sc_code+"_board_comment set likes_count = likes_count+1 where id=?;", 
                [req.body.univ_board_comment_id], function(error, info){
                    if(error==null){
                        res.status(200).json({message : "Comment Like Increment all Success"}); 
                    }else{
                        res.status(503).json({message : "Comment Like Count Update Fail"}); 
                    }
                });
            }else{
                res.status(503).json({message : "Comment Like Increment Fail"});    
            }
        });
});


router.post('/decrement', function(req, res, next){
    
    connection.query("delete from univ_"+req.body.sc_code+"_likes where content_sort=0 and content_id=? and camble_user_id=?;",
        [req.body.univ_board_comment_id, req.body.user_auth_key], function(error, info){
            if(error==null){
                connection.query("update univ_"+req.body.sc_code+"_board_comment set likes_count = likes_count-1 where id=?;", 
                [req.body.univ_board_comment_id], function(error, info){
                    if(error==null){
                        res.status(200).json({message : "Comment Like Decrement all Success"});
                    }else{
                        res.status(503).json({message : "Comment Like Count Update Fail"});
                    }
                });
            }else{
                res.status(503).json({ message : "Comment Like Decrement Fail"});   
            }
    });     
});

module.exports = router;   