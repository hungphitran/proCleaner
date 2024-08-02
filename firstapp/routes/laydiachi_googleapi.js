var express = require('express');
var router = express.Router();
var request = require("request");


// router.post('/',function(req,res){
//   const curLocation=lay
//   var api_uri = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
//         req.body.lat + ',' + req.body.lng + '&key=AIzaSyAeHdGJNuQbztJP9zfVTX60dJG2Uiyk1pg';
//   request({
//   uri: api_uri,
//   method: "GET",
//   timeout: 10000,
//   followRedirect: true,
//   maxRedirects: 10
//   }, function(error, response, body) {
//     res.end(body);
//   });
// });



router.post('/', function(req, res) {
  
  const lat = parseFloat(req.body.lat);
  const lng = parseFloat(req.body.lng);

  if (isNaN(lat) || isNaN(lng)) {
    res.status(400).send('Invalid latitude or longitude');
    return;
  }

  const api_uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAeHdGJNuQbztJP9zfVTX60dJG2Uiyk1pg`;

  request({
    uri: api_uri,
    method: 'GET',
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  }, function(error, response, body) {
    if (error) {
      console.error('Request error:', error);
      res.status(500).send('Internal server error');
      return;
    }
    console.log('API Response:', body);
    res.status(response.statusCode).send(body);
  });
});



module.exports = router;