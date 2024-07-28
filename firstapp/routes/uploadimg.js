var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var request = require("request");
var Q = require("q");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


var saveNewImg = function(_name){
    var deferred = Q.defer();
    var imgdata = JSON.stringify({
        ten: _name,
        url: 'http://procleaner.vn/hinhanh/blog/'+_name
    });
    request({
      uri: 'http://procleaner.vn:4444/api/blogimg',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: imgdata
    }, function(error, response, body) {
        if(error)
          deferred.resolve('failed')
        else
          deferred.resolve(body);
    });
    return deferred.promise;
}
router.post('/', upload.single('file'), function (req, res) {

    fs.stat('./public/hinhanh/blog/'+req.file.originalname, function(err, stat) {
      if(err == null) {
        res.end('exists');
      } else if(err.code == 'ENOENT') {
          var tempPath = req.file.path,
          targetPath = path.resolve('./public/hinhanh/blog/'+req.file.originalname);
          fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            saveNewImg(req.file.originalname).then(function(data){
              if(data == 'failed') console.log('failed');
              else res.end('upload completed');
            })
          });
      } else {
          console.log('Some other error: ', err.code);
      }
    });
    
});
module.exports = router;