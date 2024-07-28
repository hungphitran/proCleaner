var express = require('express');
var router = express.Router();
var request = require("request");


router.post('/',function(req,res){
  var api_uri = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
        req.body.lat + ',' + req.body.lng + '&key=AIzaSyAeHdGJNuQbztJP9zfVTX60dJG2Uiyk1pg';
  request({
  uri: api_uri,
  method: "GET",
  timeout: 10000,
  followRedirect: true,
  maxRedirects: 10
  }, function(error, response, body) {
    res.end(body);
  });
});
module.exports = router;