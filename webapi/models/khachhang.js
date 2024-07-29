//dependencies
var restful  = require('node-restful');
var mongoose = restful.mongoose;


//schema
var khSchema = new mongoose.Schema(
	{
		hoten : String,
		sdt : String,
		matkhau : String,
		diachi : String,
		email : String

	});

//return model
module.exports  =  restful.model('khachhang', khSchema);

