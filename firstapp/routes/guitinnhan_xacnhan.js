var express = require('express');
var router = express.Router();
var request = require("request");
var xacnhan = require('../models/tinnhan.js') ;
var Q = require("q");

var guiTinNhan = function(sdt, maxacnhan){
  var deferred = Q.defer();
  var api_uri = 'http://api.esms.vn/MainService.svc/xml/SendMultipleMessage_V4/';
  var tinnhan = '<RQST>'+
                '<APIKEY>A9CF3F7A9A689742765090B67A222A</APIKEY>'+
                '<SECRETKEY>2E2E6468851BF11879A6610E97480C</SECRETKEY>'+ 
                '<SMSTYPE>7</SMSTYPE>'+
                '<CONTENT>Procleaner: Mã xác nhận của bạn là ' +maxacnhan+ '</CONTENT>'+
                '<CONTACTS>'+
                  '<CUSTOMER>'+
                      '<PHONE>'+sdt+'</PHONE>'+
                  '</CUSTOMER>'+
                '</CONTACTS>'+
              '</RQST>';
  request({
    uri: api_uri,
    method: "POST",
    headers: {
      'Content-Type': 'application/raw;charset=UTF-8',
    },
    body: tinnhan
  }, function(error, response, body) {
      if(error) console.log(err)
      else{
        deferred.resolve();
      }
  });
  return deferred.promise;
}
router.post('/',function(req,res){
  
  var maxacnhan = null;
  xacnhan.timXacNhan(req.body.sdt, function(err, xacnhan_callback){
    if(err) throw err;
    else {
      console.log(xacnhan_callback);
      if(xacnhan_callback != null){
        maxacnhan = xacnhan_callback.maxacnhan;
        guiTinNhan(req.body.sdt, maxacnhan).then(function(){
          res.end('done');
        });
      }else{
        xacnhan.luuXacNhan(req.body.sdt, function(err, xacnhan_callback2){
          if (err) throw err;
          else {
            console.log(xacnhan_callback2);
            maxacnhan = xacnhan_callback2.maxacnhan;
            guiTinNhan(req.body.sdt, maxacnhan).then(function(){
              res.end('done');
            });
          }
        })
      }
    }
  })
  
  
});
module.exports = router;