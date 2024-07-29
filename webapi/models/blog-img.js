//dependencies
var restful  = require('node-restful');
var mongoose = restful.mongoose;


//schema
var blogImgSchema = new mongoose.Schema(
	{
		ten : String,
		url: String
	});

//return model
module.exports  =  restful.model('blogimg', blogImgSchema);

