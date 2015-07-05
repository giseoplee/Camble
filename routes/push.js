var express = require('express');
var gcm = require('node-gcm');
var bodyParser = require('body-parser');
var router = express.Router();



// router.post('/',function(req, res, next){   

    var message = new gcm.Message();
    var sender = new gcm.Sender('AIzaSyD2FS9Wr1usEDBUBzGJm7kNVxSwhfRe4M4');
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
    //registrationIds.push('APA91bFmxOrglhIadOeikgTVpdCxMBmyc7SIFkZH-6yAQT6DsQW1zOURGU3xjAG0kFq5L8NT5zN-jN5NcfeomZPlDgo3hlk3WKoB4PRK3NQ2NV6LU5KfBDM'); // adb
        sender.send(message, registrationIds, 4, function (err, result) {
            console.log(result);
        });

        // sender.sendNoRetry(message, registrationIds, function (err, result) {
        //     console.log(result);
        // });

// });

// sender.send(message, registrationIds, 4, function (err, result) {
//     console.log(result);
// });


module.exports = router;