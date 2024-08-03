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
    console.log('tin nhan luu : ', sdtkhachhang)
    xacnhan.save(function(err){
        console.log('luu xac nhan loi ne: ',err) 
        if(err){
            console.log('e1')
            callback(err);
        }else{
            console.log('e2')
            callback(null, xacnhan);
        }
    })
}
function timXacNhan(sdtkhachhang, callback){
    console.log(sdtkhachhang)
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
    var query = tinnhanDB.findOne({'sdtkhachhang':sdtkhachhang}).deleteOne();
    console.log('remove otp')
    query.exec();
}
// Exports
module.exports.luuXacNhan = luuXacNhan;
module.exports.timXacNhan = timXacNhan;
module.exports.xoaXacNhan = xoaXacNhan;
