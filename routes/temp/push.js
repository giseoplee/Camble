var express = require('express');
var gcm = require('node-gcm');
var bodyParser = require('body-parser');
var router = express.Router();



// router.post('/',function(req, res, next){   

    var message = new gcm.Message();
    var sender = new gcm.Sender('AIzaSyD2FS9Wr1usEDBUBzGJm7kNVxSwhfRe4M4');
    
    //var sender = new gcm.Sender('AIzaSyD9IMI78WEvciscQuv7sRyO_dV4Bu4als8');
    var registrationIds = [];

    // Optional

    var message = new gcm.Message({
        collapseKey: 'demo',
        delayWhileIdle: true,
        timeToLive: 3,
        data: {
            echo : '[댓글 알림] \"짬뽕 맛있는 집 추천점여\" 게시글에 댓글이 달렸습니다.'
        }
    });

    registrationIds.push('APA91bGQJX8pXk4DQ4blqBf4d9K09zBXdm7nE7M6d-Q8yCXL3A5TiC92ZRFHMlOSIvpwBOf5M89caFe4C2LGvSsOct6gNxzWfK2kaFxA3oP3TTqhrSLR4SI'); // 내 안드로이드
    //ftZVMi6iSpM:APA91bEtc47kXwTeUY4W6rM7jJ4sUe8_psmtMAqV2d9W9Z7DPuntn--Sl9FotwMERbY-TFJDAnr4gvGINl4zIghcvW72RX7rupL1pGkizO5l9OrfcncHXJ8USsINAQAxcXRI5YD8K-i6 // 전예
    //'cRrFKqCO9a4:APA91bE5CBcPSDfaBsr1Jy_wmLeS7WExNxO4HPXo6MCLSPyM2x34-oZDoARtlOnIBPDEJZEK-1ID709YdD_6sFytvmWhr1eoBV1BbrrgKNlK5cFidrNn_HopcpX7Hom0Qghz0pVROyYR'
    //registrationIds.push('APA91bFmxOrglhIadOeikgTVpdCxMBmyc7SIFkZH-6yAQT6DsQW1zOURGU3xjAG0kFq5L8NT5zN-jN5NcfeomZPlDgo3hlk3WKoB4PRK3NQ2NV6LU5KfBDM'); // adb
    sender.send(message, registrationIds, 4, function (err, result) {
        console.log(result);
    });

        // sender.sendNoRetry(message, registrationIds, function (err, result) {
        //     console.log(result);
        // });

//});

// sender.send(message, registrationIds, 4, function (err, result) {
//     console.log(result);
// });
    
    // router.get('/register/all',function(req,res,next){
    //     res.status(200).send(registrationIds);
    // });



    // router.get('/register/:token',function(req,res,next){
    //     registrationIds.push(req.params.token);
    //     res.status(200).send("good job");
    // });


    // router.post('/message',function(req,res,next){

    //     var message = new gcm.Message({

    //         collapseKey : 'demo',
    //         delayWhileIdle : true,
    //         timeToLive : 3,
    //         data : {
    //             title : req.body.title,
    //             messages : req.body.message
    //         }
    //     });

    //     sender.send(message, registrationIds, 4, function(err, result){
    //         if(error==null){
    //             console.log(result);    
    //         }else{
    //             console.log(error);
    //         }
            
    //     });

    //     res.status(200).json({"messages" : "success"});
            
    //     });

 module.exports = router;