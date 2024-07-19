//dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var YeuCauSchema =  new mongoose.Schema(
{
	ngaydatyeucau : Date,
	ngaybatdau : Date,
	ngayketthuc : Date,
	chiphi : Number,
	nhanvienxuly : String,
	sdtkhachhang : String,
	hoten: String,
	loaiyeucau : String,
	trangthai : String,
	diachi: String,
	loaidichvu: [],
	quan: String,

	giachuan: Number,
	sogiongoaigio: Number,
	phingoaigio: Number,
	phingoaigiongv: Number,
	chiphingoaigio:Number,
	phithoathuan: Number,

	hinhthuctt: String,
	nhanvienttcmnd: String,
	nhanvientthoten: String,

	noidat: String
});

//return model
module.exports = restful.model('yeucau',YeuCauSchema);