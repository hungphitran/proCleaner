var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var request = require("request");
var Q = require("q");


var removeImg = function(_id){
    var deferred = Q.defer();
    request({
      uri: 'http://procleaner.vn:4444/api/blogimg/'+_id,
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    }, function(error, response, body) {
        if(error)
          deferred.resolve('failed')
        else
          deferred.resolve('done');
    });
    return deferred.promise;
}
router.post('/', function (req, res) {
  if(typeof req.body !== 'undefined'){
    fs.stat('./public/hinhanh/blog/'+req.body.ten, function(err, stat) {
      if(err == null) {
        var targetPath = path.resolve('./public/hinhanh/blog/'+req.body.ten);
        fs.unlinkSync(targetPath);
        removeImg(req.body._id).then(function(data){
          if(data == 'done') res.end('done');
          else res.end('failed');
        })
      } else if(err.code == 'ENOENT') {
        
      } else {
          console.log('Some other error: ', err.code);
      }
    });
    
  }
});
module.exports = router;