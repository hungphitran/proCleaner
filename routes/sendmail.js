var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "vn.procleaner@gmail.com",
    pass: "3Tcompany"
  }
});

router.post('/',function(req,res){
  var noidung = req.body.ten + '\n' + req.body.email + '\n' + req.body.sdt + '\n' + req.body.noidung;
  var mailOptions={
    to : 'cs@procleaner.vn',
    subject : 'Liên hệ',
    text : noidung
  }
  console.log(req.body);
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      res.json({yo: error});
    }else{
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});
module.exports = router;