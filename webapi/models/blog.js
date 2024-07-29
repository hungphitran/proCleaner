//dependencies
var restful  = require('node-restful');
var mongoose = restful.mongoose;


//schema
var blogSchema = new mongoose.Schema(
	{
		ten : String,
		ngayviet : Date,
		noidungdaidien: String,
		noidung : String,
		tags : [],
		url: String

	});

//return model
module.exports  =  restful.model('blog', blogSchema);

