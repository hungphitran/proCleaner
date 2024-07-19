var restful = require('node-restful');
var mongoose = restful.mongoose;

var ChamCongSchema = new mongoose.Schema({
	cmnd : {type: Number, ref: 'nhanvien'},
   	hoten : String,
    nuangay : Boolean,
});

module.exports =  restful.model('chamcong', ChamCongSchema);