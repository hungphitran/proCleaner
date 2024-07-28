var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to cloud database
//var username = "phong168";
//var password = "omachi11";
//var address = '@ds035693.mongolab.com:35693/myhelper';
connect();
// Connect to mongo
function connect() {
 //var url = 'mongodb://' + username + ':' + password + address;
 mongoose.connect('mongodb://localhost/procleanerdb');
 //mongoose.connect(url);
}
function disconnect() {mongoose.disconnect()}