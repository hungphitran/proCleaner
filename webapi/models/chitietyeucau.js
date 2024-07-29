//dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var ChiTietYeuCauSchema = new mongoose.Schema(
	{
		idyeucau : String,
		giobatdau : Date,
		gioketthuc : Date,
		nguoigiupviec : String,
		nhanxet : String,
		matdo :String,
		hudo : String,
		lienlac : String,
		trangthai :String,
		sogiongoaigio:Number,
    	phingoaigio:Number,
    	chiphingoaigio:Number
	});


//return model
module.exports =  restful.model('chitietyeucau', ChiTietYeuCauSchema);