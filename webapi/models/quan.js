//dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var QuanSchema = new mongoose.Schema({
	 tenquan : String,
   	 khuvuc : String
})
module.exports = restful.model('quan',QuanSchema);