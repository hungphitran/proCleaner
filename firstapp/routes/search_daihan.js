var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var typesearch = req.body.typesearch;
	var quan = req.body.quan;
    var dichvu = req.body.dichvu;
    var ngaybd = req.body.ngaybd;
    var ngaykt = req.body.ngaykt;
    var giobd1 = req.body.giobd1;
    var giokt1 = req.body.giokt1;
    var q = '?type='+typesearch+'&quan=' + quan 
      + '&dichvu=' + dichvu +
      + '&ngaybd=' + ngaybd + '&ngaykt=' + ngaykt 
      + '&giobd1=' + giobd1 + '&giokt1=' + giokt1;
    res.redirect('/search' + q);
});
router.get('/', function(req, res, next) {
    res.render('search_daihan', { title: 'Express'});
});

/*
router.get('/', function(req, res, next) {
  res.json({ message: 'hello json' });
}); */

module.exports = router;