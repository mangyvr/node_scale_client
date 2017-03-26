var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  // console.log(res.locals.scaleData);
  res.render('scale/scale.ejs', {scaleData: res.locals.scaleData});
});

module.exports = router;
