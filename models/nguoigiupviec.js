var restful = require('node-restful');
var mongoose = restful.mongoose;

var NgvSchema = new mongoose.Schema({
    cmnd : String,
    hoten : String,
    ngaysinh : Date,
    sodt : String,
    quequan : String,
    diachi : {
        phuong : String,
        quan : String
    },
    sotruong :[],
    sonamkinhnghiem : Number,
    motakinhnghiem : String,
    hinhanh : String,
    giaykhamsuckhoe : [],
    //trangthai : Boolean,
    luongcodinh : Number,
    mucluongtheogio : Number,
    danhgia: String,
    gioitinh: String,
    tinhtranghonnhan: String,
    dantoc: String,
    trinhdohocvan: String,
    chieucao: Number,
    cannang: Number,
    thongtincon: []
});
module.exports = restful.model('nguoigiupviec',NgvSchema);