var restful = require('node-restful');
var mongoose = restful.mongoose;

var NgvbanSchema = new mongoose.Schema({
	cmnd : String,
	ngay : Date,
	giobd : Number,
	giokt : Number
});
module.exports = restful.model('ngvban',NgvbanSchema);