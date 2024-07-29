var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anhdatrang2203@gmail.com",
    pass: "txbo brng giqm driz"
  }
});

// console.log(smtpTransport); // Check if the transport is correctly created

router.post('/', function(req, res){
  var noidung = req.body.ten + '\n' + req.body.email + '\n' + req.body.sdt + '\n' + req.body.noidung;

  let mailOptions = {
    from: 'anhdatrang2203@gmail.com',
    to: 'nckhe222024@gmail.com',
    subject: 'Liên hệ',
    text: noidung,
  };

  // Send email
  smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      // Send error response to user
      return res.status(500).json({ 'error': error.message });
    }
    console.log('Message sent: %s', info.messageId);
    res.send("Email sent successfully!");
  });
});





// router.post('/',function(req,res){
//   var noidung = req.body.ten + '\n' + req.body.email + '\n' + req.body.sdt + '\n' + req.body.noidung;
  // var mailOptions={
  //   to : 'anhdavang2203@gmail.com',
  //   subject : 'Liên hệ',
  //   text : noidung
  // }
  // Set up email data
  // let mailOptions = {
  //   from: 'anhdatrang2203@gmail.com',
  //   to: 'anhdavang2203@gmail.com',
  //   subject: 'Hello',
  //   text: 'Hello world?',
  //   html: '<b>Hello world?</b>'
  // };
  
  // Send email
  // smtpTransport.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log('Message sent: %s', info.messageId);
  // });


    // if(error){
    //   console.error(error)
    //   res.status(500).json({'error: ':error});
    // }else{
    //   console.log("Message sent: " + response.message);
    //   res.send("sent");
    // }


  // });
module.exports = router;