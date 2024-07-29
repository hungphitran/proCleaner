//dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var NhanvienSchema = new mongoose.Schema({
    cmnd : {type: Number, unique: true},
    hoten : String,
    quequan : String,
    sodt : Number,
    hinhanh : String,
    luong : Number,
    quyenhethong : Number,
    email : String
});
module.exports = restful.model('nhanvien',NhanvienSchema);