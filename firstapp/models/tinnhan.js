var db = require('../lib/db');
var tinnhanSchema = new db.Schema({
    maxacnhan: Number,
    sdtkhachhang: Number,
    thoigianhethan: { type: Date, expires: 5*60, default: Date.now }
});


var tinnhanDB = db.mongoose.model('tinnhanxacnhan', tinnhanSchema);

//ham random ma xac nhan
function taoMaXacNhan(){
    var min = 10000;
    var max = 99999;
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}
function luuXacNhan(sdtkhachhang, callback){
    var xacnhan = new tinnhanDB();
    xacnhan.maxacnhan = taoMaXacNhan();
    xacnhan.sdtkhachhang = sdtkhachhang;
    xacnhan.save(function(err){
        if(err){
            callback(err);
        }else{
            callback(null, xacnhan);
        }
    })
}
function timXacNhan(sdtkhachhang, callback){
    var query = tinnhanDB.findOne({'sdtkhachhang':sdtkhachhang});
    query.exec(function(err, xacnhan){
        if(err){
            callback(err);
        }else{
            callback(null, xacnhan);
        }
    })
}
function xoaXacNhan(sdtkhachhang){
    var query = tinnhanDB.findOne({'sdtkhachhang':sdtkhachhang}).remove();
    query.exec();
}
// Exports
module.exports.luuXacNhan = luuXacNhan;
module.exports.timXacNhan = timXacNhan;
module.exports.xoaXacNhan = xoaXacNhan;
