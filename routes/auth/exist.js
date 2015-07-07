var express = require('express');
var mysql = require('mysql');
var str2json = require('string-to-json');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var router = express.Router();

var connection = mysql.createConnection({
    'host':'appjam.cyjao5zjyirq.us-west-2.rds.amazonaws.com',
    'user':'user',
    'password':'appjam123',
    'database':'camble'
});

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: 'Gmail',
    auth: { user: 'giseopl@gmail.com', pass: 'dlrltjq14' }
});

router.post('/',function(req, res, next){   

     connection.query("select * from camble_users where camble_school_id=? and user_mail=?;",
        [req.body.camble_school_id, req.body.mail_address], function(error, cursor){
        if(cursor.length > 0){
            console.log(cursor);
            var flag; 
            var message;
            var mailOptions = {
                from: '캠블 <camble@camble.com>',
                to: req.body.mail_address,
                subject: '캠블 사용자 인증번호입니다.',
                html: '<h1>인증 번호 : '+req.body.auth_number+'</h1>'
            };

            smtpTransport.sendMail(mailOptions, function(error, res){

                    if (error){
                        console.log(error);
                        flag = 0;
                        message = error;
                    } else {
                        console.log("Message sent : " + res.message);
                        connection.query("insert auth set auth_number=?, sc_code=?, camble_school_id=?, user_mail=?;",
                            [req.body.auth_number, req.body.sc_code, req.body.camble_school_id, req.body.mail_address],function(error, info){
                                if(error==null){
                                    flag = 1;
                                    response(flag, info.insertId);
                                }else{
                                    flag = 0;
                                    response(flag, info.message);
                                }
                            });
                        message = res.message;
                    }
                    smtpTransport.close();
                    
            });
        }
        else{
            res.status(503).json({message : "Not Found Auth Log"});   
        }
    });

    function response(flag, Authkey){
        if(flag==0) res.status(503).json(error);
        else res.status(200).json({message : "success", key : Authkey});
    }
});

router.post('/check',function(req, res, next){
    console.log(req.body.key);
    console.log(req.body.input_number);
    connection.query("select * from auth where id=?;",
    [req.body.key], function(error, cursor){
        if(cursor[0].auth_number!=req.body.input_number){
            res.status(503).json({message : "Authentication Failure"});
        }else{
            connection.query("select school.sc_code, user.id from camble_users as user inner join camble_schools as school on user.camble_school_id=school.id where user.camble_school_id=? and user.user_mail=?;",
                [cursor[0].camble_school_id, cursor[0].user_mail], function(error, cursor){
                    if(error==null){
                        res.status(200).json(cursor[0]);
                    }else{
                        res.status(200).json({message : "Not Found Mail"});
                    }
                });
                
        }
    });
});



module.exports = router;