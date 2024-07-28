var express = require('express');
var router = express.Router();
var request = require("request");
var Q = require("q");

var luuLichLamViecDh = function(cmnd, ngay, giobd, giokt, sdtkh, idctyc){
    var deferred = Q.defer();
    var data1 = JSON.stringify({
        idchitietyc: idctyc,
        nguoigiupviec: cmnd,
        ngaylam: ngay,
        giobatdau: giobd,
        gioketthuc: giokt+60,
        khachhang: sdtkh
    });
    request({
      uri: 'http://procleaner.vn:4444/api/lichlamviec',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: data1
    }, function(error, response, body) {
        if(error)
          console.log(error)
        else
          deferred.resolve(body);
    });
    return deferred.promise;
}
var luuYeuCauDh = function(ngaybd, ngaykt, chiphi, hotenkhachhang, sdtkhachhang, diachikh, quan, trangthai, mangdichvu, giachuan, sogiongoaigio, chiphingoaigio, phingoaigio, phingoaigiongv){
  var deferred = Q.defer();
  var ngaybd_arr = ngaybd.split('/');
  var ngaykt_arr = ngaykt.split('/');
  var dayhientai = new Date();
  var new_yeucau = JSON.stringify({
      ngaydatyeucau: new Date(Date.UTC(dayhientai.getFullYear(),
                       dayhientai.getMonth(),
                       dayhientai.getDate(),
                       dayhientai.getHours(),
                       dayhientai.getMinutes(),
                       dayhientai.getSeconds())),
      ngaybatdau: new Date(Date.UTC(ngaybd_arr[2],Number(ngaybd_arr[1])-1,ngaybd_arr[0])),
      ngayketthuc: new Date(Date.UTC(ngaykt_arr[2],Number(ngaykt_arr[1])-1,ngaykt_arr[0])),
      chiphi: chiphi,
      giachuan: giachuan,
      sogiongoaigio: sogiongoaigio,
      phingoaigio: phingoaigio,
      phingoaigiongv: phingoaigiongv,
      chiphingoaigio: chiphingoaigio,
      phithoathuan: 0,
      nhanvienxuly: "",
      sdtkhachhang: sdtkhachhang,
      hoten: hotenkhachhang,
      loaiyeucau: "Dài hạn",
      trangthai: trangthai,
      diachi: diachikh + '/' +quan,
      loaidichvu: mangdichvu,
      quan: quan,
      noidat: "web_khachhang"
    });
    request({
        uri: 'http://procleaner.vn:4444/api/yeucau',
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: new_yeucau
    }, function(error, response, body) {
        if(error)
          console.log(error)
        else
          deferred.resolve(body);
    });
    return deferred.promise;
}
var luuChiTietYeuCauDh = function(cmnd, ngay, giobd, giokt, yeucauid, sogiongoaigio, chiphingoaigio, phingoaigio){
  var deferred = Q.defer();
  var gio_bd = Math.floor(giobd/60);
  var phut_bd = giobd%60;
  var _ngay = new Date(ngay);
  var giobd_luuctyc = _ngay.setHours(gio_bd+7, phut_bd)
    console.log('bbb');
  var gio_kt = Math.floor(giokt/60);
  var phut_kt = giokt%60;
  var giokt_luuctyc = _ngay.setHours(gio_kt+7, phut_kt)            
  
  var ctyc = JSON.stringify({
    idyeucau: yeucauid,
    giobatdau: giobd_luuctyc,
    gioketthuc: giokt_luuctyc,
    nguoigiupviec: cmnd,
    nhanxet: "",
    trangthai: "Chưa giao",
    hudo: "Không",
    matdo: "Không",
    lienlac: "Có",
    sogiongoaigio: sogiongoaigio,
    phingoaigio: phingoaigio,
    chiphingoaigio: chiphingoaigio
  });
  request({
    uri: 'http://procleaner.vn:4444/api/chitietyeucau',
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: ctyc
  }, function(error, response, body) {
    if(error)
      console.log(error)
    else
      deferred.resolve(body);
  });
  return deferred.promise;
}
router.post('/',function(req,res){
  var ctycpromises = [];
    luuYeuCauDh(
          req.body.ngaybd,
          req.body.ngaykt,
          req.body.chiphi,
          req.body.khachhang.hoten,
          req.body.khachhang.sdt,
          req.body.khachhang.diachi,
          req.body.quan,
          req.body.trangthaiyc,
          req.body.mangdichvu,
          req.body.phicobanlonnhat,
          req.body.sogiongoaigioYc,
          req.body.chiphingoaigioYc,
          req.body.phingoaigio,
          req.body.phingoaigiongv).then(function(body){
            var json_yc = JSON.parse(body);
            for(i=0; i<req.body.lichdaihan.length; i++){
              for(j=0; j<req.body.lichdaihan[i].dsNgvPhuHop.length; j++){
                if(req.body.lichdaihan[i].dsNgvPhuHop[j].selected == true){
                  var promise = luuChiTietYeuCauDh(req.body.lichdaihan[i].dsNgvPhuHop[j].data.cmnd,
                            req.body.lichdaihan[i].ngay,
                            req.body.giobd1,
                            req.body.giokt1,
                            json_yc._id,
                            req.body.sogiongoaigioCtyc,
                            req.body.chiphingoaigioCtyc,
                            req.body.phingoaigio).then(function(body){
                                var json_ctyc = JSON.parse(body);
                                console.log(json_ctyc);
                                var ngay = new Date(Date.parse(json_ctyc.giobatdau));
                                ngay.setHours(0,0);
                                var ngay_utc = new Date(Date.UTC(ngay.getFullYear(), ngay.getMonth(), ngay.getDate()));
                                luuLichLamViecDh(json_ctyc.nguoigiupviec,
                                            ngay_utc,
                                            req.body.giobd1,
                                            req.body.giokt1,
                                            req.body.khachhang.sdt,
                                            json_ctyc._id);
                              });
                  ctycpromises.push(promise);
                  console.log('aaaa');
                }
              }
            }
            
            Q.all(ctycpromises).then(function(){
              res.end('done');
            })
          })
});
module.exports = router;