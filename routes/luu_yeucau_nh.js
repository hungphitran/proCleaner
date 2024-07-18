var express = require('express');
var router = express.Router();
var request = require("request");
var Q = require("q");

var luuLichLamViec = function(cmnd, ngay, giobd, giokt, sdtkh, idctyc){
  var deferred = Q.defer();
  var ngay_arr = ngay.split('/');
  var data1 = JSON.stringify({
      idchitietyc: idctyc,
      nguoigiupviec: cmnd,
      ngaylam: new Date(Date.UTC(ngay_arr[2],Number(ngay_arr[1])-1,ngay_arr[0])),
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
var luuYeuCau = function(ngaybd, ngaykt, chiphi, hotenkhachhang, sdtkhachhang, diachikh, quan, trangthai, mangdichvu, giachuan, sogiongoaigio, chiphingoaigio, phingoaigio, phingoaigiongv){
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
      loaiyeucau: "Ngắn hạn",
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
var luuChiTietYeuCau = function(cmnd, ngay, giobd, giokt, yeucauid, sogiongoaigio, chiphingoaigio, phingoaigio){
    var deferred = Q.defer();
    var ngay_arr = ngay.split('/');
    var gio_bd = Math.floor(giobd/60);
    var phut_bd = giobd%60;
    var giobd_luuctyc = new Date(Date.UTC(ngay_arr[2], Number(ngay_arr[1])-1, ngay_arr[0], gio_bd, phut_bd, 0));
      
    var gio_kt = Math.floor(giokt/60);
    var phut_kt = giokt%60;
    var giokt_luuctyc = new Date(Date.UTC(ngay_arr[2], Number(ngay_arr[1])-1, ngay_arr[0], gio_kt, phut_kt, 0));            
    
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
  var promises = [];
    luuYeuCau(
              req.body.ngay,
              req.body.ngay,
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
                console.log(json_yc._id);
                for(i=0; i<req.body.mang_ngv_dcchon.length; i++){
                  (function(i) {
                    var promise = luuChiTietYeuCau(req.body.mang_ngv_dcchon[i].cmnd,
                                    req.body.ngay,
                                    req.body.giobd1,
                                    req.body.giokt1,
                                    json_yc._id,
                                    req.body.sogiongoaigioCtyc,
                                    req.body.chiphingoaigioCtyc,
                                    req.body.phingoaigio).then(function(body){
                                      var json_ctyc = JSON.parse(body);
                                      console.log(json_ctyc._id);
                                      console.log(json_ctyc.nguoigiupviec);
                                      luuLichLamViec(json_ctyc.nguoigiupviec,
                                            req.body.ngay,
                                            req.body.giobd1,
                                            req.body.giokt1,
                                            req.body.khachhang.sdt,
                                            json_ctyc._id);
                                    });
                    promises.push(promise);
                  })(i)
                }
                Q.all(promises).then(function(){
                  res.end('done');
                })
              })
});
module.exports = router;