var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var id = req.session.idngv;
  	res.render('ngv_chitiet', {id:id});
});
router.post('/', function(req, res, next){
	req.session.idngv = req.body.idngv;
	res.redirect('/nguoi_giup_viec');
})
module.exports = router;