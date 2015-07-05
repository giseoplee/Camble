var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GS_Express', contents: "이건 콘텐츠 입니다."});
});

module.exports = router;
