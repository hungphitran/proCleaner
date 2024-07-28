var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.render('blog_admin');
});
router.get('/:id1', function(req, res, next) {
  	res.render('blog_admin');
});
router.get('/:id1/:id2', function(req, res, next) {
  	res.render('blog_admin');
});
module.exports = router;
