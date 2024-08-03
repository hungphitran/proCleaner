var express = require('express');
var router = express.Router();
var request = require("request");
var xacnhan = require('../models/tinnhan.js') ;
var Q = require("q");
var https = require('follow-redirects').https;
var fs = require('fs')
// sid:ACa9bebf9fa456a6be6a48cae7b72f406c
//token: cd8602a2fb0e6d6ee9a4c1820fb2caf6
require('dotenv').config()




var guiTinNhan= async function(sdt,maxacnhan){
  //var deferred = Q.defer();
  
  var https = require('follow-redirects').https;
  //var fs = require('fs');
  sdt=sdt.slice(1);
  var options = {
      'method': 'POST',
      'hostname': '1vk4dn.api.infobip.com',
      'path': '/sms/2/text/advanced',
      'headers': {
          'Authorization': `App ${process.env.appId}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      'maxRedirects': 20
  };
  
  return new Promise((resolve, reject) => {
    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            resolve(body.toString());
        });

        res.on("error", function (error) {
            console.error('loi request: ', error);
            reject(error);
        });
    });

    var postData = JSON.stringify({
        "messages": [
            {
                "destinations": [{"to": `+84${sdt}`}],
                "from": "ServiceSMS",
                "text": `${maxacnhan}`
            }
        ]
    });

    req.write(postData);
    req.end();
});
}


// var guiTinNhan = function(sdt, maxacnhan){
//   var deferred = Q.defer();
//   var api_uri = 'http://api.esms.vn/MainService.svc/xml/SendMultipleMessage_V4/';
//   var tinnhan = '<RQST>'+
//                 '<APIKEY>A9CF3F7A9A689742765090B67A222A</APIKEY>'+
//                 '<SECRETKEY>2E2E6468851BF11879A6610E97480C</SECRETKEY>'+ 
//                 '<SMSTYPE>7</SMSTYPE>'+
//                 '<CONTENT>Procleaner: Mã xác nhận của bạn là ' +maxacnhan+ '</CONTENT>'+
//                 '<CONTACTS>'+
//                   '<CUSTOMER>'+
//                       '<PHONE>'+sdt+'</PHONE>'+
//                   '</CUSTOMER>'+
//                 '</CONTACTS>'+
//               '</RQST>';
//   request({
//     uri: api_uri,
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/raw;charset=UTF-8',
//     },
//     body: tinnhan
//   }, function(error, response, body) {
//       if(error) console.log(err)
//       else{
//         deferred.resolve();
//       }
//   });
//   return deferred.promise;
// }

router.post('/',function(req,res){
  console.log('request body: ',req.body)
  var maxacnhan = null;
  xacnhan.timXacNhan(req.body.sdt, function(err, xacnhan_callback){
    if(err) throw err;
    else {
      console.log(xacnhan_callback);
      if(xacnhan_callback != null){
        maxacnhan = xacnhan_callback.maxacnhan;
        guiTinNhan(req.body.sdt, maxacnhan)
        .then(function(){
          console.log('gui tin nhan thanh cong toi so : ',req.body.sdt)
          res.status(200).end('done');
        })
        .catch((error)=>{
          console.log("khong gui dc tin nhan",error)
          res.status(404).end('error')
        })
      }else{
        xacnhan.luuXacNhan(req.body.sdt, function(err, xacnhan_callback2){
          if (err) throw err;
          else {
            console.log(xacnhan_callback2);
            maxacnhan = xacnhan_callback2.maxacnhan;
            guiTinNhan(req.body.sdt, maxacnhan).then(function(){
              res.status(200).end('done');
            })
            .catch((error)=>{
              console.log("khong gui dc tin nhan",error)
              res.status(404).end('error')
            })
          }
        })
      }
    }
  })
  
  
});

module.exports = router;