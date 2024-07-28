var express = require('express');
var router = express.Router();
var request = require("request");
var xacnhan = require('../models/tinnhan.js') ;

router.post('/',function(req,res){
  
  var maxacnhan = null;
  xacnhan.timXacNhan(req.body.sdt, function(err, xacnhan_callback){
    if(err) throw err;
    else {
      console.log(xacnhan_callback);
      if(xacnhan_callback != null){
        if(req.body.maxacnhan == xacnhan_callback.maxacnhan){
          xacnhan.xoaXacNhan(req.body.sdt);
          res.end('true');
        }
        else
          res.end('false');
      }else{
        res.end('false');
      }
    }
  })
  
  
});
module.exports = router;