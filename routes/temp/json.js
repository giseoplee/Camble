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

// var smtpTransport = nodemailer.createTransport("SMTP",{
//     service: 'Gmail',
//     auth: { user: 'giseopl@gmail.com', pass: 'dlrltjq14' }
// });

// router.post('/',function(req, res, next){   

//     var flag; 
//     var message;
//     var returnAuth;

//     var mailOptions = {
//         from: '캠블 <camble@camble.com>',
//         to: req.body.mail_address,
//         subject: '캠블 사용자 인증번호입니다.',
//         html: '<h1>인증 번호 : '+req.body.auth_number+'</h1>'
//     };

//     smtpTransport.sendMail(mailOptions, function(error, res){

//             if (error){
//                 console.log(error);
//                 flag = 0;
//                 message = error;
//             } else {
//                 console.log("Message sent : " + res.message);
//                 connection.query("insert auth set auth_number=?, nickname=?, sc_code=?, camble_school_id=?, user_mail=?;",
//                     [req.body.auth_number, req.body.nickname, req.body.sc_code, req.body.camble_school_id, req.body.mail_address],function(error, info){
//                         if(error==null){
//                             flag = 1;
//                             response(flag, info.insertId);
//                         }else{
//                             flag = 0;
//                             response(flag, info.message);
//                         }
//                     });
//                 message = res.message;
//             }
//             smtpTransport.close();
            
//     });

//     function response(flag, Authkey){
//         var auth = returnAuth;
//         if(flag==0){
//             res.status(503).json(error);
//         }
//         else res.status(200).json({message : "success", key : Authkey});
//     }
// });

// router.post('/check',function(req, res, next){

//     connection.query("select * from auth where id=?;",
//     [req.body.key], function(error, cursor){
//         if(cursor[0].auth_number!=req.body.input_number){
//             res.status(503).json({message : "Authentication Failure"});
//         }else{
//             connection.query("insert camble_users set camble_school_id=?, user_nickname=?, user_mail=?, created_at=now(), updated_at=now();",
//               [cursor[0].camble_school_id, cursor[0].nickname, cursor[0].user_mail] ,function(error, info){
//                 if(error==null){
//                     res.status(200).json({"user_auth" : "success"});
//                 }else{
//                     res.status(503).json({"user_auth" : "fail"});
//                 }
//             });
//         }
//     });

// });



// //학교 ID 값으로 해당 학교 정보 불러오기 (select) 

// router.get('/:school_id', function(req, res, next) {
//     connection.query('select * from camble_schools where id=?;',
//                      [req.params.school_id], function (error, cursor) { 
//         if (cursor.length > 0)
//             res.json(cursor);
//         else
//            res.json({message : "not_found_data"});
//     });
// });


// url 요청 시 인자 없이 DB쿼리 사용 및 해당 내용 가져오기

// router.get('/',function(req,res,next) {
//            connection.query('select * from cambl_school' +
//            ' order by id desc limit 10;',function(error,cursor){
//            	if(!cursor){
//            		res.send(error.message);
//            	}
//     res.json(cursor);
//     });
// });


// sc_code 받아서 테이블 생성하기 {어드민에서 사용}
router.post('/', function(req, res, next) {
var query = connection.query('create table univ_'+req.body.sc_code+'_board('+
                 'id int(11) not null auto_increment primary key,'+
                 'camble_school_id int(11) not null,'+
                 'camble_user_id int(11) not null,'+
                 'posts_writer varchar(45) not null,'+
                 'posts_title varchar(255) not null,'+
                 'posts_content text, '+
                 'posts_image varchar(200), '+
                 'view_count int(10) default 0, '+
                 'likes_count int(10) default 0, '+
                 'comment_count int(5) default 0, '+
                 'top_fixed tinyint(1) default 0, '+
                 'category int(4) default 0, '+
                 'created_at datetime not null, '+
                 'updated_at datetime not null, '+
                 'foreign key (camble_school_id) references camble_schools (id), '+
                 'foreign key (camble_user_id) references camble_users (id) );',
                  function (error, info) {
                    if(error==null) {
                           var comment_query = connection.query('create table univ_'+req.body.sc_code+'_board_comment('+
                                             'id int(11) not null auto_increment primary key, '+
                                             'univ_'+req.body.sc_code+'_board_id int(11) not null, '+
                                             'camble_user_id int(11) not null, '+
                                             'comment_writer varchar(45) not null, '+
                                             'comment_content text, '+
                                             'likes_count int(10) default 0, '+
                                             'created_at datetime not null, '+
                                             'updated_at datetime not null, '+
                                             'foreign key (camble_user_id) references camble_users (id), '+
                                             'foreign key(univ_'+req.body.sc_code+'_board_id) references univ_'+req.body.sc_code+'_board (id) on delete cascade );',
                                              function (error, info) {
                                                    if (error==null) {
                                                        var print_q = connection.query("create table univ_"+req.body.sc_code+"_likes("+
                                                                         "id int(11) not null auto_increment primary key,"+
                                                                         "content_id int(11) not null,"+
                                                                         "camble_user_id int(11) not null,"+
                                                                         "content_sort tinyint(1) not null,"+
                                                                         "created_at datetime not null,"+
                                                                         "foreign key (camble_user_id) references camble_users (id),"+
                                                                         "index (content_sort),"+
                                                                         "index (content_id) );", function(error, info){
                                                                                                        console.log(print_q);
                                                                                                        if(error==null){
                                                                                                            res.status(200).json({message : "All Table Create Success"});
                                                                                                        }else{
                                                                                                            connection.query("drop table univ_"+req.body.sc_code+"_board;");
                                                                                                            connection.query("drop table univ_"+req.body.sc_code+"_board_comment;");
                                                                                                            res.status(503).json({message : "Likes Table Create Fail"});
                                                                                                        }
                                                                                                });
                                                                            }
                                                                            else{
                                                                                connection.query("drop table univ_"+req.body.sc_code+"_board;");
                                                                                res.status(503).json(error);
                                                                            }
                                                                        });
                                                                    }
                                                                    else{
                                                                        res.status(503).json(error);
                                                                    }
                                                                });
                                                            });

// create table univ_kau_likes(
//     id int(11) not null auto_increment primary key,
//     content_id int(11) not null,
//     camble_user_id int(11) not null,
//     content_sort tinyint(1) not null,
//     created_at datetime not null,
//     foreign key (camble_user_id) references camble_users (id), # fk set
//     index (content_sort),
//     index (content_id)
// );



module.exports = router;