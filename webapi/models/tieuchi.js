//dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var TieuChiSchema = new mongoose.Schema({
	tentieuchi :  String,
	giachuan: Number,
	phuphi: String,
	phingoaigiongv: Number,
	phingoaigiokh: Number,
	diengiai :String
});
let tieuchi= restful.model('tieuchi',TieuChiSchema);
module.exports=tieuchi