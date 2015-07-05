var express = require('express');
var str2json = require('string-to-json');
var nodemailer = require('nodemailer'); 
var router = express.Router();


var smtpTransport = nodemailer.createTransport("SMTP", {
    service: 'Gmail',
    auth: {
        user: 'giseopl@gmail.com',
        pass: 'dlrltjq14'
    }
});

router.post('/',function(req, res, next){   

    var flag; 
    var message;

    var mailOptions = {
        from: '캠블 <Camble@camble.com>',
        to: req.body.mail_address,
        subject: '[Camble] 사용자 인증번호입니다.',
        html: '<h1>인증 번호 : '+req.body.auth_number+'</h1>'
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
            response(flag, message, req.body.auth_number);
});

function response(flag, message, auth){
        if(flag==0){
            res.status(503).json(error);
        }
        else{
            res.status(200).json({message : "mail_send_success"});
        }
    } 
});

module.exports = router;