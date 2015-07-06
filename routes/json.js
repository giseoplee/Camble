var express = require('express');
var mysql = require('mysql');
var str2json = require('string-to-json');
// var http = require('http');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer'); // 메일 사용
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('테스트 용');
// });

var connection = mysql.createConnection({
    'host':'appjam.cyjao5zjyirq.us-west-2.rds.amazonaws.com',
    'user':'user',
    'password':'appjam123',
    'database':'camble'
});

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: 'Gmail',
    auth: {
        user: 'giseopl@gmail.com',
        pass: 'dlrltjq14'
    }
});

//메일 발송하기, request가 timeout이 될 때까지 계속 연결되어 있음 

router.post('/',function(req, res, next){   

    var flag; 
    var message;

    //console.log(req.body);
    var mailOptions = {
        from: '캠블 <camble@camble.com>',
        to: req.body.mail_address,
        subject: '캠블 사용자 인증번호입니다.',
        html: '<h1>인증 번호는 '+req.body.auth_number+'입니다!</h1>'
    };

    smtpTransport.sendMail(mailOptions, function(error, res){

            if (error){
                console.log(error);
                // res.send(error);
                flag = 0;
                message = error;
            } else {
                console.log("Message sent : " + res.message);
                //res.send(res.message);
                flag = 1;
                message = res.message;
            }
            smtpTransport.close();
            response(flag, message);
    });

    function response(flag, message){
        if(flag==0){
            res.json(error);
        }
        else res.json({flag : "success"});
    }

});



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


// // sc_code 받아서 테이블 생성하기 {어드민에서 사용}
// router.post('/', function(req, res, next) {
// var query = connection.query('create table univ_'+req.body.sc_code+'_board('+
//                  'id int(11) not null auto_increment primary key,'+
//                  'camble_school_id int(11) not null,'+
//                  'camble_user_id int(11) not null,'+
//                  'posts_writer varchar(45) not null,'+
//                  'posts_title varchar(255) not null,'+
//                  'posts_contents text, '+
//                  'posts_image varchar(200), '+
//                  'view_count int(10) default 0, '+
//                  'likes_count int(10) default 0, '+
//                  'comment_count int(5) default 0, '+
//                  'top_fixed tinyint(1) default 0, '+
//                  'category int(4) default 0, '+
//                  'created_at datetime not null, '+
//                  'updated_at datetime not null, '+
//                  'foreign key (camble_school_id) references camble_schools (id), '+
//                  'foreign key (camble_user_id) references camble_users (id) );',
//                   function (error, info) {
//                     if(error==null) {
//                            var comment_query = connection.query('create table univ_'+req.body.sc_code+'_board_comment('+
//                                              'id int(11) not null auto_increment primary key, '+
//                                              'univ_'+req.body.sc_code+'_board_id int(11) not null, '+
//                                              'camble_user_id int(11) not null, '+
//                                              'comment_writer varchar(45) not null, '+
//                                              'comment_contents text, '+
//                                              'likes_count int(10) default 0, '+
//                                              'created_at datetime not null, '+
//                                              'updated_at datetime not null, '+
//                                              'foreign key (camble_user_id) references camble_users (id), '+
//                                              'foreign key(univ_'+req.body.sc_code+'_board_id) references univ_'+req.body.sc_code+'_board (id) on delete cascade );',
//                                               function (error, info) {
//                             if (error==null) {
//                                 res.json({ message : "table_create_success" });
//                             }
//                             else
//                                 connection.query("drop table univ_"+req.body.sc_code+"_board;");
//                                 res.json(error);
//                             });
//                     }
//                     else{
//                         res.json(error);
//                     }
//                 });
//             });



module.exports = router;