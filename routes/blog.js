var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.render('blog');
});
router.get('/:id', function(req, res, next) {
  	res.render('blog');
});
router.get('/tag/:id', function(req, res, next) {
  	res.render('blog');
});
module.exports = router;
