//dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//schema
var KhuVucSchema = new mongoose.Schema({
	tenkhuvuc: String

});


//return model
module.exports = restful.model('khuvuc',KhuVucSchema);