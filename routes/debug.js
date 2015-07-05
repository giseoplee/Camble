var express = require('express');
var mysql = require('mysql');
// var http = require('http');
var bodyParser = require('body-parser');
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


// //학교 ID 값으로 해당 학교 정보 불러오기 (select) 

// router.get('/:school_id', function(req, res, next) {
//     connection.query('select * from cambl_school where id=?;',
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

router.post('/', function(req, res, next) {
    var board_create = 'create table univ_'+req.body.sc_code+'_board( id int(11) not null auto_increment primary key,'+
                 'camble_school_id int(11) not null,'+
                 'camble_user_id int(11) not null,'+
                 'posts_writer varchar(45) not null,'+
                 'posts_title varchar(255) not null,'+
                 'posts_contents text, '+
                 'posts_image varchar(200), '+
                 'view_count int(10) default 0, '+
                 'likes_count int(10) default 0, '+
                 'comment_count int(5) default 0, '+
                 'top_fixed tinyint(1) default 0, '+
                 'category int(4) default 0, '+
                 'created_at datetime not null, '+
                 'updated_at datetime not null, '+
                 'foreign key (camble_school_id) references camble_school (id), '+
                 'foreign key (camble_user_id) references camble_user (id) );';

    connection.query(borad_create,function(error, info){
        if(!error){
            res.json({message : "테이블 생성 성공"});
        }else{
            res.json({message : "테이블 생성 실패"});
            res.json(error);
        }
    });
});
// connection.query(
//                  , function (error, info) {
//                     if (error == null) {
//                             // connection.query('create table univ_?_board_comment('+
//                             //                  'id int(11) not null auto_increment primary key, '+
//                             //                  'univ_kau_board_id int(11) not null, '+
//                             //                  'camble_user_id int(11) not null, '+
//                             //                  'comment_writer varchar(45) not null, '+
//                             //                  'comment_contents text, '+
//                             //                  'likes_count int(10) default 0, '+
//                             //                  'created_at datetime not null, '+
//                             //                  'updated_at datetime not null, '+
//                             //                  'foreign key (camble_user_id) references camble_user (id), '+
//                             //                  'constraint fk_question foreign key(univ_kau_board_id) references univ_kau_board (id) on delete cascade );',
//                             //                  [req.body.sc_code], function (error, cursor) {
//                             // if (cursor.length > 0) {
//                             //     res.json({ message : "table_create_success" });
//                             // }
//                             // else
//                             //     //res.status(503).json({ result : false, reason : "Cannot post article" });
//                             //     res.json({ message : "comment_table_create_error" });
//                             // });
//                             res.send(info);
//                     }
//                     else
//                         //res.status(503).json(error);
//                         res.json({message : "board_table_create_error"});
//                     });
//                 });

// router.post('/', function(req, res, next) {
//     var json = req.body;
//     res.send(json.sc_code);
// });

module.exports = router;