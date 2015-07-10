var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();


var connection = mysql.createConnection({

    user : 'user',
    password : 'appjam123',
    database : 'camble',
    host : 'appjam.cyjao5zjyirq.us-west-2.rds.amazonaws.com'
});

router.post('/', function(req, res, next) { 

    connection.query("select school.id,user.user_nickname from camble_schools as school inner join camble_users as user on school.id=user.camble_school_id where school.sc_code=? and user.id=?;",
        [req.body.sc_code, req.body.user_auth_key], function(error, cursor){

            if(cursor.length > 0){
              var query =  connection.query("insert univ_"+req.body.sc_code+"_board_comment set univ_"+req.body.sc_code+"_board_id=?, camble_user_id=?, comment_writer=?, comment_content=?, created_at=now(), updated_at=now();",
                    [req.body.univ_board_id, req.body.user_auth_key, cursor[0].user_nickname, req.body.comment_content], function(error, info){
                        console.log(query);
                        if(error==null){
                            logWrite(cursor[0].id, req.body.user_auth_key, req.body.univ_board_id, info.insertId, req.body.sc_code);
                        }else{
                            res.status(503).json({message : "Comment Write Fail"});
                        }
                    });
            }else{
                res.status(503).json({message : "Access Denied"});
            }
         
        });

    function logWrite(sc_id, user_id, board_id, comment_id, sc_code){
        connection.query("insert log_camble_writer set camble_school_id=?, camble_user_id=?, camble_univ_board_id=?, camble_univ_board_comment_id=?, created_at=now();",
            [sc_id, user_id, board_id, comment_id], function(error , info){
                if(error==null){
                    connection.query("update univ_"+sc_code+"_board set comment_count = comment_count+1 where id=?;", [board_id], function(error, info){
                        if(error==null){
                            connection.query("update camble_integration_board set comment_count = comment_count+1 where camble_school_code=? and univ_board_id=?;",
                                [sc_code, board_id], function(error, info){
                                    if(error==null){
                                        res.status(200).json({message : "Comment Write Full Success"});    
                                    }else{
                                        res.status(200).json({message : "Integration Board Write Fail"});    
                                    }
                                });
                        }else{
                            res.status(503).json({message : "board table count update fail"});
                        }
                    });
                }else{
                    res.status(503).json({message : "Comment Log Write Fail"});
                }
            });
    }
	
});           

module.exports = router;





