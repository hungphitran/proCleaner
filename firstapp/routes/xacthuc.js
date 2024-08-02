var express = require('express');
var router = express.Router();
var request = require("request");
var xacnhan = require('../models/tinnhan.js') ;
const { promise } = require('q');

router.post('/',function(req,res){
  
  //var maxacnhan = null;
  xacnhan.timXacNhan(req.body.sdt, function(err, xacnhan_callback){
    //console.log('xacnhancallback: ',xacnhan_callback)
    if(err) throw err;
    else {
      console.log(err, xacnhan_callback)
      if(xacnhan_callback != null){
        if( req.body.maxacnhan == xacnhan_callback.maxacnhan){
          console.log('mã xác nhận đúng')
          xacnhan.xoaXacNhan(req.body.sdt);
          return res.status(200).end('true');
        }
        else
        return res.status(500).end('false');
      }else{
        return res.status(500).end('false');
      }
    }
  })
  
  
});
module.exports = router;