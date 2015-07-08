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

router.post('/', function(req, res, next){  // req : sc_code ,  user_auth_key , univ_board_comment_id
           // res.status(200).json({message:"abc"});

    connection.query('select likes_count from univ_'+req.body.sc_code+'_board_comment where id =?;', [req.body.univ_board_comment_id],
                             function(error, cursor_likes){
                        

                if(cursor_likes.length > 0){
                    var query = connection.query('update univ_'+req.body.sc_code+'_board_comment set '
                                     + 'likes_count = ' + cursor_likes[0].likes_count + '+'+1+' where id = '
                                     + req.body.univ_board_comment_id + ';',
                                     function(error, result){
                        
                       if(error == null){
                         res.status(200).json({message:"success"});  
                       }
                        else{
                            res.status(503).json({message:"Fail to update 'Like'"});
                        }
                    });
                }
                else{
                    res.status(503).json({message:"Cannot find the comment"});                                                      
                }
            });   
});

module.exports = router;   