var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  // console.log(res.locals.scaleData);
  res.render('scale/scale.ejs', {scaleData: res.locals.scaleData});
});

router.get('/scale_js', function(req, res, next) {
  res.render('scale/scale_js.ejs');
});

router.get('/scale_info', function(req, res, next) {
  // res.setHeader('Content-Type', 'application/json');
  res.json(JSON.stringify({ scaleData: res.locals.scaleData

                          }));
});

module.exports = router;
