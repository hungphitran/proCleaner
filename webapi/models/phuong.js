//dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var PhuongSchema = new mongoose.Schema({
  tenphuong : { type : String, unique : true },
  //1 khu vực có nhiều quận
  quan : { type : String, ref : "quan"},
});
module.exports = restful.model('phuong',PhuongSchema);