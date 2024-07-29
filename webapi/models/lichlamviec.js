var restful = require('node-restful');
var mongoose = restful.mongoose;

var LichLVSchema = new mongoose.Schema({
	idchitietyc : String,
	nguoigiupviec : String,
	ngaylam : Date,
	giobatdau : Number,
	gioketthuc : Number
});
module.exports = restful.model('lichlamviec',LichLVSchema);