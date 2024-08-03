(function(){
	//search module
	var module = angular.module('SearchModule',
	 ['ngMaterial','ngMessages','ui.bootstrap','slickCarousel','ngRoute','ui.calendar','cancelable-q','ngCookies','nya.bootstrap.select']);
	
	//var chitietModule = angular.module('ChitietModule', ['ngMaterial','ngMessages','slickCarousel','ngRoute']);
	module.config(function($mdThemingProvider, $locationProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('green');
        //routing DOESN'T work without html5Mode
        $locationProvider.html5Mode({
        	enabled: true,
        	reloadOnSearch: true
        });
	});
	module.factory('doitacFactory', function($http, $q){
		var service = {};
		var api_url = 'http://localhost:4444/api';
		service.layDoiTac = async function(){
			// var deferred = $q.defer();
			// $http.get(api_url+'/doitac', { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     }).catch(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;
			try {
				const response = await $http.get(api_url + '/doitac', { cache: false });
				return response.data;
			} catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		return service;
	})
	module.factory('ngvFactory', function($http, $q){
		var service = {};
		var api_url = 'http://localhost:4444/api';
		service.layDanhSachNgvAll = async function(){
			// var deferred = $q.defer();
			// $http.get(api_url+'/nguoigiupviec?sort=hoten', { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     }).catch(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;
			try {
				const response = await $http.get(api_url + '/nguoigiupviec?sort=hoten', { cache: false });
				return response.data;
			} catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.layDanhSachNgv = function(ngay, giobd, giokt, chuoiquan){
			var deferred = $q.defer();
			var x = '';
			var q_ngv_trunglich = '?sort=hoten&ngaylam=' + ngay +
				'&giobatdau__lte=' + giokt +
				'&gioketthuc__gte=' + giobd;
			var q_ngv_ban = '?ngay=' + ngay +
				'&giobd__lte=' + giokt +
				'&giokt__gte=' + giobd;
			$http.get(api_url+'/lichlamviec'+q_ngv_trunglich, { cache: false})
		        .then(function(data) {
		        	x = '?cmnd__nin=';
		        	var flag = false;
		            for(i=0; i<data.length; i++){
		            	flag = true;
		            	x += data[i].nguoigiupviec;
		            	if(i != data.length-1) x += ',';
		            }
		            $http.get(api_url+'/ngvban'+q_ngv_ban, { cache: false})
				        .then(function(data) {
				        	for(i=0; i<data.length; i++){
				        		if(flag == true) x += ',';
				            	x += data[i].cmnd;
				            	if(i != data.length-1) x += ',';
				            }
				            x += '&diachi.quan__in=' + chuoiquan;
				            x += '&sort=-sonamkinhnghiem';
				        	$http.get(api_url+'/nguoigiupviec'+x, { cache: false})
						        .then(function(data) {
						        	deferred.resolve(data);
						        })
						        .catch(function(data) {
						            console.log('Error: ' + data);
				    			});
				        })
				        .catch(function(data) {
				            console.log('Error: ' + data);
		    			});
		        })
		        .catch(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
	    }
	    service.layDanhSachNgvDaiHan = function(ngay, giobd, giokt, chuoiquan, dichvu){
			var deferred = $q.defer();
			var x = '';
			var q_ngv_trunglich = '?sort=hoten&ngaylam=' + ngay +
				'&giobatdau__lte=' + giokt +
				'&gioketthuc__gte=' + giobd;
			var q_ngv_ban = '?ngay=' + ngay +
				'&giobd__lte=' + giokt +
				'&giokt__gte=' + giobd;
			$http.get(api_url+'/lichlamviec'+q_ngv_trunglich, { cache: false})
		        .then(function(data) {
		        	x = '?cmnd__nin=';
		        	var flag = false;
		            for(i=0; i<data.length; i++){
		            	flag = true;
		            	x += data[i].nguoigiupviec;
		            	if(i != data.length-1) x += ',';
		            }
		            $http.get(api_url+'/ngvban'+q_ngv_ban, { cache: false})
				        .then(function(data) {
				        	for(i=0; i<data.length; i++){
				        		if(flag==true) x += ',';
				            	x += data[i].cmnd;
				            	if(i != data.length-1) x += ',';
				            }
				        	x += '&diachi.quan__in=' + chuoiquan;
			        		x += '&sotruong__in=';
			        		for(i=0; i<dichvu.length; i++){
				        		x+= dichvu[i];
				        		if(i != dichvu.length-1) x += ',';
				        	}
				        	x += '&sort=-sonamkinhnghiem';
				            $http.get(api_url+'/nguoigiupviec'+x, { cache: false})
						        .then(function(data) {
						        	deferred.resolve(data);
						        })
						        .catch(function(data) {
						            console.log('Error: ' + data);
				    			});
				        })
				        .catch(function(data) {
				            console.log('Error: ' + data);
		    			});
		            
		        })
		        .catch(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
	    }
	    service.layNgvTheoCmnd = function(cmnd){
	    	var deferred = $q.defer();
			var q = '?cmnd=' + cmnd;
			$http.get(api_url+'/nguoigiupviec'+q, { cache: false})
		        .then(function(data) {
		        	deferred.resolve(data);
		        })
		        .catch(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
	    }
	    service.layNgvTheoId = function(id){
	    	var deferred = $q.defer();
			var q = '?_id=' + id;
			$http.get(api_url+'/nguoigiupviec'+q, { cache: false})
		        .then(function(data) {
		        	deferred.resolve(data);
		        })
		        .catch(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
	    }
	    service.layDanhSachNgvSub = function(id){
	    	var deferred = $q.defer();
			var q = '?_id__nin=' + id;
			$http.get(api_url+'/nguoigiupviec'+q, { cache: false})
		        .then(function(data) {
		        	deferred.resolve(data);
		        })
		        .catch(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
	    }
	    service.ngv_isSelected = function(ngv, ngv_selected_arr){
	    	var index = -1;
	    	for(i=0; i<ngv_selected_arr.length; i++)
	    		if(ngv.cmnd == ngv_selected_arr[i].cmnd)
	    			index = i;
			if (index !== -1) {
			    return {bgcheckmark:true};
			}
			else{
				return;
        	}
	    }
	    service.isSelected = function(ngv, btn, ngv_selected_arr){
	    	var index = -1;
	    	for(i=0; i<ngv_selected_arr.length; i++)
	    		if(ngv.cmnd == ngv_selected_arr[i].cmnd)
	    			index = i;
			if (index !== -1) {
				if(btn == 'chon')
			    	return false;
			    else
			    	return true;
			}
			else{
				if(btn == 'chon')
			    	return true;
			    else
			    	return false;
        	}
	    }
	    service.chon_ngv = function(ngv, ngv_selected_arr){
    		var index = -1;
	    	for(i=0; i<ngv_selected_arr.length; i++)
	    		if(ngv.cmnd == ngv_selected_arr[i].cmnd)
	    			index = i;
			if (index !== -1) {
			    ngv_selected_arr.splice(index, 1);
			    $('#'+ngv.cmnd).removeClass('bgcheckmark');
			}
			else{
				ngv_selected_arr.push(ngv);
        		$('#'+ngv.cmnd).addClass('bgcheckmark');
        	}
        }
        service.kiemtraLlv = function(id, ngay, giobd, giokt){
			var deferred = $q.defer();
			var q_ngv_trunglich = '?ngaylam=' + ngay +
				'&giobatdau__lte=' + giokt +
				'&gioketthuc__gte=' + giobd +
				'&nguoigiupviec=' + id;
			$http.get(api_url+'/lichlamviec'+q_ngv_trunglich, { cache: false})
		        .then(function(data) {
		        	deferred.resolve(data);
		        })
		        .catch(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
	    }
	    service.kiemtraLichBan = function(id, ngay, giobd, giokt){
			var deferred = $q.defer();
			var q_ngv_ban = '?ngay=' + ngay +
				'&giobd__lte=' + giokt +
				'&giokt__gte=' + giobd + '&cmnd=' + id;
        	$http.get(api_url+'/ngvban'+q_ngv_ban, { cache: false})
		        .then(function(data) {
		        	deferred.resolve(data);
		        })
		        .catch(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
	    }
	    return service;
	});
	module.factory('filterFactory', function($location, $mdDialog, $q, $http){
		var service = {};
		var api_url = 'http://localhost:4444/api';

		var _kinhnghiems = [
	    	{
	    		ten: 'Tất cả',
				id: 0
	    	},
			{
				ten: 'Từ 1 năm trở lên',
				id: 1
			},
			{
				ten: 'Từ 2 năm trở lên',
				id: 2
			},
			{
				ten: 'Từ 3 năm trở lên',
				id: 3
			},
			{
				ten: 'Từ 4 năm trở lên',
				id: 4
			},
			{
				ten: 'Từ 5 năm trở lên',
				id: 5
			}
		];
		var _tieuchis = [
			{
				ten: 'Chăm sóc bé',
				id: 1,
				data: false
			},
			{
				ten: 'Chăm sóc người già',
				id: 2,
				data: false
			},
			{
				ten: 'Chăm sóc sản phụ',
				id: 3,
				data: false
			},
			{
				ten: 'Nuôi bệnh',
				id: 4,
				data: false
			},
			{
				ten: 'Dọn dẹp vệ sinh',
				id: 5,
				data: false
			},
			{
				ten: 'Đưa đón bé đi học',
				id: 6,
				data: false
			},
			{
				ten: 'Nấu ăn',
				id: 7,
				data: false
			},
			{
				ten: 'Vệ sinh văn phòng',
				id: 8,
				data: false
			}
		];
		var _locdaihan = [
			{
	    		ten: 'Hàng ngày',
				id: 0
	    	},
			{
				ten: 'Các ngày trong tuần',
				id: 1
			},
			{
				ten: 'Ngày chẵn',
				id: 2
			},
			{
				ten: 'Ngày lẻ',
				id: 3
			},
			{
				ten: 'Hàng tuần',
				id: 4
			}
		];
		var _quans = [
			{
				ten: 'Quận 1',
				id: 1
			},
			{
				ten: 'Quận 2',
				id: 3
			},
			{
				ten: 'Quận 3',
				id: 4
			},
			{
				ten: 'Quận 4',
				id: 7
			},
			{
				ten: 'Quận 5',
				id: 1
			},
			{
				ten: 'Quận 6',
				id: 2
			},
			{
				ten: 'Quận 7',
				id: 5
			},
			{
				ten: 'Quận 8',
				id: 3
			},
			{
				ten: 'Quận 9',
				id: 4
			},
			{
				ten: 'Quận 10',
				id: 5
			},
			{
				ten: 'Quận 11',
				id: 6
			},
			{
				ten: 'Quận 12',
				id: 2
			},
			{
				ten: 'Quận Bình Tân',
				id: 4
			},
			{
				ten: 'Quận Thủ đức',
				id: 3
			},
			{
				ten: 'Quận Gò Vấp',
				id: 5
			},
			{
				ten: 'Quận Bình Thạnh',
				id: 6
			},
			{
				ten: 'Quận Tân Bình',
				id: 7
			},
			{
				ten: 'Quận Tân Phú',
				id: 1
			},
			{
				ten: 'Quận Phú Nhuận',
				id: 2
			}
		];
		var _data = {
			mang_tieuchi: [],
			isReverse: false,
			isReverse2: false,
			ngay: $location.search().ngay,
			ngaybd: $location.search().ngaybd,
			ngaykt: $location.search().ngaykt,
			sonamkn: 0,
			locdaihan: 0,
			quan: $location.search().quan,
			dichvu: $location.search().dichvu,
		    giobd1: $location.search().giobd1,
		    giokt1: $location.search().giokt1,
		    lichdaihan: [],
		    danhsachquan: [
		    	'Quận 1',
                'Quận 2',
                'Quận 3',
                'Quận 4',
                'Quận 5',
                'Quận 6',
                'Quận 7',
                'Quận 8',
                'Quận 9',
                'Quận 10',
                'Quận 11',
                'Quận 12',
                'Quận Thủ đức',
                'Quận Gò Vấp',
                'Quận Bình Thạnh',
                'Quận Tân Bình',
                'Quận Tân Phú',
                'Quận Phú Nhuận',
                'Quận Bình Tân'
		    ],
		    danhsachdichvu: [
		    	'Chăm sóc bé',
                'Chăm sóc người già',
                'Chăm sóc sản phụ',
                'Nuôi bệnh',
                'Dọn dẹp vệ sinh',
                'Đưa đón bé đi học',
                'Nấu ăn',
                'Vệ sinh văn phòng'
		    ],
		    availableOptions: [
			      {id: 360, name: '6:00 giờ'},
			      {id: 390, name: '6:30 giờ'},
			      {id: 420, name: '7:00 giờ'},
			      {id: 450, name: '7:30 giờ'},
			      {id: 480, name: '8:00 giờ'},
			      {id: 510, name: '8:30 giờ'},
			      {id: 540, name: '9:00 giờ'},
			      {id: 570, name: '9:30 giờ'},
			      {id: 600, name: '10:00 giờ'},
			      {id: 630, name: '10:30 giờ'},
			      {id: 660, name: '11:00 giờ'},
			      {id: 690, name: '11:30 giờ'},
			      {id: 720, name: '12:00 giờ'},
			      {id: 750, name: '12:30 giờ'},
			      {id: 780, name: '13:00 giờ'},
			      {id: 810, name: '13:30 giờ'},
			      {id: 840, name: '14:00 giờ'},
			      {id: 870, name: '14:30 giờ'},
			      {id: 900, name: '15:00 giờ'},
			      {id: 930, name: '15:30 giờ'},
			      {id: 960, name: '16:00 giờ'},
			      {id: 990, name: '16:30 giờ'},
			      {id: 1020, name: '17:00 giờ'},
			      {id: 1050, name: '17:30 giờ'},
			      {id: 1080, name: '18:00 giờ'},
			      {id: 1110, name: '18:30 giờ'},
			      {id: 1140, name: '19:00 giờ'},
			      {id: 1170, name: '19:30 giờ'},
			      {id: 1200, name: '20:00 giờ'}
			    ],
	    };
	    service.getDSKinhNghiem = function(){
	    	return _kinhnghiems;
	    }
	    service.getDSTieuChi = async function(){
	    	//var deferred = $q.defer();
			// $http.get(api_url+'/tieuchi', { cache: false},)
		    //     .success(function(data) {
		    //     	deferred.resolve(data);
		    //     })
		    //     .error(function(data) {
		    //         console.log('Error: ' + data);
        	// });
		    // return deferred.promise;

				try {
					const response = await $http.get(api_url + '/tieuchi', { cache: false });
					return response.data;
				} catch (error) {
					console.error('Error1:', error);
					throw error;
				}
	    }
	    service.getDSQuan =async function(){
	    	// var deferred = $q.defer();
			// $http.get(api_url+'/quan?sort=tenquan', { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     })
		    //     .catch(function(data) {
		    //         console.log('Error: ' + data);
        	// });
		    // return deferred.promise;

			try {
				const response = await $http.get(api_url + '/quan?sort=tenquan', { cache: false });
				return response.data;
			} catch (error) {
				console.error('Error2:', error);
				throw error;
			}
	    }
	    var kiemtraDsKhuVuc = function(dsKhuVuc, tenKhuVuc){
	    	if(dsKhuVuc.length == 0) return -1;
	    	for(j=0; j<dsKhuVuc.length; j++){
	    		if(dsKhuVuc[j].tenkv == tenKhuVuc)
	    			return j;
	    	}
	    	return -1;
	    }
	    service.layTenKhuVuc = function(tenquan, dsQuan, dsKhuVuc){
	    	var tenkv;
	    	for(i=0; i<dsQuan.length; i++){
	    		if(dsQuan[i].ten == tenquan){
	    			tenkv = dsQuan[i].khuvuc;
	    			break;
	    		}
	    	}
	    	for(i=0; i<dsKhuVuc.length; i++){
	    		if(dsKhuVuc[i].tenkv == tenkv){
	    			return dsKhuVuc[i].chuoiquan;
	    		}
	    	}
	    	return '';
	    }
	    service.taoDanhSachKhuVuc = function(dsQuan){
	    	var dsKhuVuc = [];
	    	for(i=0; i<dsQuan.length; i++){
	    		var vitri = kiemtraDsKhuVuc(dsKhuVuc, dsQuan[i].khuvuc);
	    		if(dsKhuVuc.length == 0 || (vitri == -1)){
	    			dsKhuVuc.push({
	    				tenkv: dsQuan[i].khuvuc,
	    				chuoiquan: dsQuan[i].tenquan
	    			})
	    		}else{
	    			dsKhuVuc[vitri].chuoiquan += ','+dsQuan[i].tenquan;
	    		}
	    	}
	    	return dsKhuVuc;
	    }
	    
	    service.getDuLieuPage = function(){
	    	return _data;
	    }
	    service.getDSLocDaiHan = function(){
	    	return _locdaihan;
	    }
	    //-------đổi ngày sinh sang tuổi---------
	    service.tinhTuoiNgv = function(ngaysinhstr){
	    	var ngaysinh = new Date(Date.parse(ngaysinhstr));
	    	var ageDifMs = Date.now() - ngaysinh.getTime();
			var ageDate = new Date(ageDifMs);
			return Math.abs(ageDate.getUTCFullYear() - 1970);
	    }
	    //-------đổi dd/mm/yyyy sang mm/dd/yyyy-----------
	    service.doiNgaySearch = function(ngay){
	    	var ngayarr = ngay.split('/');
	    	var ngay_converted = ngayarr[2] + '-' + ngayarr[1] + '-' + ngayarr[0];
	    	return ngay_converted;
	    }
	    //-------lấy dịch vụ từ index---------------------
	    service.getDichVu = function(indexDV, tieuchis){
	    	var arr = [];
	    	var indexDVarr = JSON.parse(indexDV);
	    	if(indexDVarr.length == 0){
				for(j=0; j<tieuchis.length; j++){
						arr.push(tieuchis[j].ten);
						tieuchis[j].data = true;
				}
	    	}else{
	    		for(i=0;i<indexDVarr.length;i++){
					for(j=0; j<tieuchis.length; j++){
						if(indexDVarr[i] == tieuchis[j].ten){
							arr.push(tieuchis[j].ten);
							tieuchis[j].data = true;
						}
					}
					
		    	}
	    	}
	    	
	    	return arr;
		}
		
		service.them_filter_dichvu = function(ten_dv, isSelect, data){
	    	if(isSelect){
	    		var index = data.mang_tieuchi.indexOf(ten_dv);
				if (index !== -1) {
				    data.mang_tieuchi.splice(index, 1);
				}
	    	}
	    	else{
	    		data.mang_tieuchi.push(ten_dv);
	    	}
	    }
	    service.filter_dichvu = function(sotruongs, data){
	    	for(i=0; i<sotruongs.length; i++){
	    		var index = data.mang_tieuchi.indexOf(sotruongs[i]);
				if (index !== -1) {
				    return true;
				}
	    	}
	    	return false;
	    }
	    service.filter_kinhnghiem = function(sonamkn, data){
	    	if(sonamkn >= data.sonamkn)
	    		return true
	    	else return false;
	    }
	    service.filter_quan = function(quan, data){
	    	if(quan == data.quan)
	    		return true
	    	else return false;
	    }
	    return service;
	});
	module.factory('thanhtoanFactory', function($http, $q){
		var service = {};
		var api_url = 'http://localhost:4444/api';
		//lưu khách hàng
		service.timKhachHang = function(sdt){
			// var deferred = $q.defer();
			// var q = '?sdt=' + sdt;
			// $http.get(api_url+'/khachhang'+q, { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     })
		    //     .catch(function(data) {
		    //         console.log('Error: ' + data);
        	// });
		    // return deferred.promise;

			try {
				const response = $http.get(api_url + '/khachhang'+'?sdt='+sdt, { cache: false });
				console.log('lay khach hang = sdt: ',response);
				return response;
			} catch (error) {
				console.error('Error1:', error);
				throw error;
			}
	    }
		service.luuKhachHang = function(khachhang){
			//var deferred = $q.defer();
			var new_khachhang = JSON.stringify({
			    hoten: khachhang.hoten,
			    sdt: khachhang.sdt,
			    matkhau: "kocomatkhau",
			    diachi: khachhang.diachi,
			    email: "kocoemail",
		 	});
			// $http.post({url: api_url+'/khachhang',
	        //     method: "POST",
	        //     data: new_khachhang,
	        //     headers: {'Content-Type': 'application/json'}
	        // }).then(function (data, status, headers, config) {

	        // 	deferred.resolve(data);
	        //     }).catch(function (data, status, headers, config) {
	        //         console.log('Error: ' + data);
	        //     });
	        // return deferred.promise;

			try{
				const response=$http.post(api_url+'/khachhang',new_khachhang)
				return response;
			}
			catch(error){
				console.error('khong the luu khach hang: ',error)
			}
		}
        
		service.LayLichLvKhiLuu = async function(ngay, giobd, giokt, cmnd){
			var deferred = $q.defer();
			var q_ngv_trunglich = '?ngaylam=' + ngay +
				'&giobatdau__lte=' + giokt +
				'&gioketthuc__gte=' + giobd +
				'&cmnd=' + cmnd;
			// $http.get(api_url+'/lichlamviec'+q_ngv_trunglich, { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     })
		    //     .catch(function(data) {
		    //         console.log('Error: ' + data);
        	// });
	        // return deferred.promise;
			try {
				const response = await $http.get(api_url + '/lichlamviec'+ q_ngv_trunglich, { cache: false });
				return response.data;
			} catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.tinhSoGioNgoaiGioCtyc = function(giobd1, giokt1){
	    	var tgngoaigio_sang = 0;
	    	var tgngoaigio_toi = 0;
	    	if(giobd1 < 480)
	    		tgngoaigio_sang = 480 - giobd1;
	    	if(giokt1 > 1080)
	    		tgngoaigio_toi = giokt1 - 1080;
	    	return ((tgngoaigio_toi+tgngoaigio_sang)/60);
	    }
		service.tinhSoGioNgoaiGioYc = function(giobd1, giokt1, SoNgv){
	    	var tgngoaigio_sang = 0;
	    	var tgngoaigio_toi = 0;
	    	if(giobd1 < 480)
	    		tgngoaigio_sang = 480 - giobd1;
	    	if(giokt1 > 1080)
	    		tgngoaigio_toi = giokt1 - 1080;
	    	return ((tgngoaigio_toi+tgngoaigio_sang)/60)*SoNgv;
	    }
	    service.tinhPhiNgoaiGioCtyc = function(SoGio, phingoaigiolonnhat, phicobanlonnhat){
	    	return (phicobanlonnhat*SoGio*phingoaigiolonnhat)/100;
	    }
	    service.tinhPhiNgoaiGioYc = function(SoGio, phingoaigiolonnhat, phicobanlonnhat){
	    	return (phicobanlonnhat*SoGio*phingoaigiolonnhat)/100;
	    }
	    service.tinhGiaChuanCtyc = function(GioBd, GioKt, phicobanlonnhat){
	    	var SoGio = (GioKt - GioBd)/60;
	    	return phicobanlonnhat*SoGio;
	    }
	    service.tinhGiaChuanYc = function(GioBd, GioKt, phicobanlonnhat, SoNgv){
	    	var SoGio = (GioKt - GioBd)/60;
	    	return phicobanlonnhat*SoGio*SoNgv;
	    }
	    service.tinhChiPhiTongCtyc = function(PhiNgoaiGio, PhiChuan){
	    	return PhiNgoaiGio+PhiChuan;
	    }
	    service.tinhChiPhiTongYc = function(SoNgv, TongPhiCtyc){
	    	return SoNgv*TongPhiCtyc;
	    }
	    service.doiChuoiTienTe = function(SoTien){
	    	var giatien_str = '';
	    	var giatien_arr = SoTien.toString().split('');
	    	var dem = 1;
	    	for(i=giatien_arr.length-1; i>=0; i--){
	    		giatien_str += giatien_arr[i];
	    		if(dem%3==0 && i!=0) giatien_str += '.';
	    		dem++;
	    	}
	    	return giatien_str.split('').reverse().join('');
	    }
		service.getPhiCoBanLonNhat = function(mangtieuchi){
	    	var max = 0;
			for(i=0; i<mangtieuchi.length; i++){
	    		if(mangtieuchi[i].data == true){
	    			if(max < mangtieuchi[i].giachuan)
	    				max = mangtieuchi[i].giachuan;
	    		}
	    	}
	    	return max;
	    }
		service.getPhiNgoaiGioLonNhat = function(mangtieuchi){
	    	var max = 0;
			for(i=0; i<mangtieuchi.length; i++){
	    		if(mangtieuchi[i].data == true){
	    			if(max < mangtieuchi[i].phingoaigiokh)
	    				max = mangtieuchi[i].phingoaigiokh;
	    		}
	    	}
	    	return max;
	    }
	    service.getPhiNgoaiGioLonNhatNgv = function(mangtieuchi){
	    	var max = 0;
			for(i=0; i<mangtieuchi.length; i++){
	    		if(mangtieuchi[i].data == true){
	    			if(max < mangtieuchi[i].phingoaigiongv)
	    				max = mangtieuchi[i].phingoaigiongv;
	    		}
	    	}
	    	return max;
	    }
	    /*
		service.getPhuPhi1LonNhat = function(mangtieuchi){
			var max = 0;
			for(i=0; i<mangtieuchi.length; i++){
	    		if(mangtieuchi[i].data == true){
	    			if(max < mangtieuchi[i].phuphi1)
	    				max = mangtieuchi[i].phuphi1;
	    		}
	    	}
	    	return max;
		}*/
		service.getTrangThaiYeuCau = function(mangtieuchi){
	    	for(i=0; i<mangtieuchi.length; i++){
	    		if(mangtieuchi[i].data == true){
	    			if(mangtieuchi[i].phuphi == 'Có')
	    				return 'Chờ thỏa thuận';
	    		}
	    	}
	    	return 'Chưa tiến hành';
	    }
		return service;
	});
	module.factory('khachhangFactory', function($http, $q){
		var service = {};
		var api_url = 'http://localhost:4444/api';
		var _khachhang = {
			hoten: null,
			sdt: null,
			diachi: null
		}
		service.getKhachHang = function(){
			return _khachhang;
		}
		service.setKhachHang = function(khachhang){
			_khachhang.hoten = khachhang.hoten;
			_khachhang.sdt = khachhang.sdt;
			_khachhang.diachi = khachhang.diachi;
		}
		service.suaThongTinTK = function(id, hoten, diachi){
			var deferred = $q.defer();
			var kh = JSON.stringify({
			    hoten: hoten,
			    diachi: diachi
		 	});
			$http({url: api_url+'/khachhang/'+id,
	            method: "PUT",
	            data: kh,
	            headers: {'Content-Type': 'application/json;charset=UTF-8'}
	        }).then(function (data, status, headers, config) {
	        		deferred.resolve(data);
	            }).catch(function (data, status, headers, config) {
	                console.log('Error: ' + data);
	            });
	        return deferred.promise;
		}
		service.layDiaChiGoogleMapApi = function(lat, lng){
			var deferred = $q.defer();
			var toado = {
				lat: lat,
				lng: lng
			}
			$http.post('/layDiaChiGoogleApi', toado)
		        .then(function(data) {
	        		deferred.resolve(data);
		        }).catch(function(data) {
		            console.log('Error: ' + data);
        		});
		    return deferred.promise;
		}
		service.layMaXacNhan = function(sdtkhachhang){
			console.log('sdt khach hang: ',sdtkhachhang);
			var deferred = $q.defer();
			var tinnhan = {
				sdt: sdtkhachhang
			}
			$http.post('/layTinNhanXacNhan', tinnhan)
		        .then(function(data) {
					console.log('core post: ',data)
	        		deferred.resolve(data);
		        }).catch(function(data) {
		            console.log('Error: ' + data);
        		});
			return;
		}
		service.getYeuCauNh = async function(sdt){
			// var deferred = $q.defer();
			var q = '?sdtkhachhang=0' + sdt + '&loaiyeucau=Ngắn hạn';
			// $http.get(api_url+'/yeucau'+q, { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     })
		    //     .catch(function(data) {
		    //         console.log('Error: ' + data);
        	// });
		    // return deferred.promise;
			try {
				const response = await $http.get(api_url + '/yeucau'+q, { cache: false });
				return response.data;
			} catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.getYeuCauDh =async function(sdt){
			var deferred = $q.defer();
			var q = '?sdtkhachhang=0' + sdt + '&loaiyeucau=Dài hạn';
			// $http.get(api_url+'/yeucau'+q, { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     })
		    //     .catch(function(data) {
		    //         console.log('Error: ' + data);
        	// });
		    // return deferred.promise;
			try {
				const response = await $http.get(api_url + '/yeucau'+q, { cache: false });
				return response.data;
			} catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.getChiTietYeuCau =async function(id){
			var deferred = $q.defer();
			var q = '?idyeucau=' + id;
			// $http.get(api_url+'/chitietyeucau'+q, { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     })
		    //     .catch(function(data) {
		    //         console.log('Error: ' + data);
        	// });
		    // return deferred.promise;
			try {
				const response = await $http.get(api_url + '/chitietyeucau'+q, { cache: false });
				return response.data;
			} catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.luuNhanXet = function(ctyc, nhanxet, hudo, matdo){
			var _hudo = 'Không';
			var _matdo = 'Không';
			if(hudo == true) _hudo = 'Có';
			if(matdo == true) _matdo = 'Có';
			var deferred = $q.defer();
			var id = ctyc._id
			var nhanxet = JSON.stringify({
			    idyeucau: ctyc.idyeucau,
			    giobatdau: ctyc.giobatdau,
			    gioketthuc: ctyc.gioketthuc,
			    nguoigiupviec: ctyc.nguoigiupviec,
			    nhanxet: nhanxet,
			    trangthai: 'Hoàn thành',
			    hudo: _hudo,
			    matdo: _matdo,
			    lienlac: 'Có'
		 	});
			$http({url: api_url+'/chitietyeucau/'+id,
	            method: "PUT",
	            data: nhanxet,
	            headers: {'Content-Type': 'application/json;charset=UTF-8'}
	        }).then(function (data, status, headers, config) {
	        		deferred.resolve(data);
	            }).catch(function (data, status, headers, config) {
	                console.log('Error: ' + data);
	            });
	        return deferred.promise;
		}
		service.hoanthanhYeuCau = function(id){
			var deferred = $q.defer();
			var yc = JSON.stringify({
			    trangthai: 'Đã hoàn thành'
		 	});
			$http({url: api_url+'/yeucau/'+id,
	            method: "PUT",
	            data: yc,
	            headers: {'Content-Type': 'application/json;charset=UTF-8'}
	        }).then(function (data, status, headers, config) {
	        		deferred.resolve(data);
	            }).catch(function (data, status, headers, config) {
	                console.log('Error: ' + data);
	            });
	        return deferred.promise;
		}
		service.tienhanhYeuCau = function(id){
			var deferred = $q.defer();
			var yc = JSON.stringify({
			    trangthai: 'Đang tiến hành'
		 	});
			$http({url: api_url+'/yeucau/'+id,
	            method: "PUT",
	            data: yc,
	            headers: {'Content-Type': 'application/json;charset=UTF-8'}
	        }).then(function (data, status, headers, config) {
	        		deferred.resolve(data);
	            }).catch(function (data, status, headers, config) {
	                console.log('Error: ' + data);
	            });
	        return deferred.promise;
		}
		service.xacthucThongTin = function(sdtkhachhang, maxacnhan){
			console.log("xacthuc: ",sdtkhachhang,maxacnhan)
			//var deferred = $q.defer();
			var thongtinkh = {
				sdt: sdtkhachhang,
				maxacnhan: maxacnhan
			}
			// $http.post('http://localhost:3000/xacthuc', thongtinkh)
		    //     .then(function(data) {
			// 		console.log("core :", data);
	        // 		deferred.resolve(data);
		    //     }).catch(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;

			try{
				const response=$http.post('http://localhost:3000/xacthuc',thongtinkh)
				console.log('xac nhan tra ve: ',response)
				return response;
			}
			catch(err){
				console.error('khong the xac thuc',err);
			}
		}
		return service;

	});
	module.controller('searchnhController',
	 	function(khachhangFactory,
	 		    thanhtoanFactory,
			  	filterFactory,
			   	ngvFactory,
			    $scope,
			    $http,
			    $log,
			    $location,
			    $mdDialog,
			    $q,
			    $timeout,
			    $cookies){



		$scope.Math = window.Math;
		//thong bao ngay gio
		$scope.thongbaongay = '';
		$scope.thongbaogio = '';
		//biến ng-show detail và search
		$scope.isSearch = true;
		$scope.isDetail = false;
		$scope.isThanhToan = false;
		//
		$scope.loading = true;
		$scope.loading_yeucau = false;
		$scope.loading_dichvu = true;
		$scope.ngvs = null;

		$scope.ngv_selected_arr = [];
		$scope.ngv_arr_fit = [];

		$scope.ngv_show_detail = null;
	    $scope.ngv_sub1 = null;
		$scope.ngv_sub2 = null;

		$scope.hoanthanh_thanhtoan_nh = false;
		$scope.maxacnhan = {
	    	nguoidung: null
	    };
	    $scope.dalayMXN = false;
		$scope.khachhang = {
			sdt: null,
			hoten: '',
			diachi: '',
		};
		//function
		$scope.tinh_tuoi_ngv = filterFactory.tinhTuoiNgv;
		$scope.doi_ngaysearch = filterFactory.doiNgaySearch;
		$scope.them_filter_dichvu = filterFactory.them_filter_dichvu;
		$scope.filter_dichvu = filterFactory.filter_dichvu;
		$scope.filter_kinhnghiem = filterFactory.filter_kinhnghiem;
		$scope.filter_quan = filterFactory.filter_quan;

		$scope.ngv_isSelected = ngvFactory.ngv_isSelected;
		$scope.isSelected = ngvFactory.isSelected;
		$scope.chon_ngv = ngvFactory.chon_ngv;
		//-------------Lấy dữ liệu-----------------------------------
		$scope.kinhnghiems = filterFactory.getDSKinhNghiem();
		$scope.quans =[];
		$scope.khuvuc = [];
		$scope.data = filterFactory.getDuLieuPage();
		$scope.tieuchis = [];
		$scope.initDataFirstTime = function(){
			var q1 = filterFactory.getDSQuan().then(function(data){
				$scope.khuvuc = filterFactory.taoDanhSachKhuVuc(data);
				for(i=0; i<data.length; i++){
					$scope.quans.push({
						ten: data[i].tenquan,
						khuvuc: data[i].khuvuc,
						id: i
					});
				}
			})
			var q2 = filterFactory.getDSTieuChi().then(function(data){
				for(i=0; i<data.length; i++){
					$scope.tieuchis.push({
						ten: data[i].tentieuchi,
						id: i,
						data: false,
						giachuan: data[i].giachuan,
						phuphi: data[i].phuphi,
						phingoaigiokh: data[i].phingoaigiokh,
						phingoaigiongv: data[i].phingoaigiongv
					});
				}
				$scope.data.mang_tieuchi = filterFactory.getDichVu($location.search().dichvu,
														  $scope.tieuchis);
				$scope.loading_dichvu = false;
			});
			$q.all([q1, q2]).then(function(){
				$scope.initData();
			})
		    for(i=0; i<$scope.data.availableOptions.length; i++){
		    	if(Number($scope.data.giobd1) == $scope.data.availableOptions[i].id){
		    		$scope.data.giobd1 = $scope.data.availableOptions[i].id;
		    	}
		    	if(Number($scope.data.giokt1) == $scope.data.availableOptions[i].id){
		    		$scope.data.giokt1 = $scope.data.availableOptions[i].id;
		    	}
		    }
		}
		

	    //-------------end du lieu------------------------------------
	    //--------------khởi tạo dữ liệu từ index------------------
	    $scope.initData = function(){
			var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);
	    	var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngayarr = $scope.data.ngay.split('/');
            if(ngayarr[0] == now.getDate() 
                && ngayarr[1] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {
                	$scope.thongbaogio = 'Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) + 
                    	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).';
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$scope.thongbaogio = 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.';
                return;
            }
            if(((kt1-bd1)%60)!=0  && bd1 != 0 && kt1 != 0) {
            	$scope.thongbaogio = 'Khoảng cách thời gian phải từ 2,3,4,5.. tiếng.';
                return;
            }
            $scope.thongbaogio = '';
	    	$scope.ngv_arr_fit = [];
		  	$scope.ngv_selected_arr = [];
	    	$scope.loading = true;
	    	$scope.ngvs = null;
	    	var chuoiquan = filterFactory.layTenKhuVuc($scope.data.quan, $scope.quans, $scope.khuvuc);
			ngvFactory.layDanhSachNgv($scope.doi_ngaysearch($scope.data.ngay), 
									 $scope.data.giobd1,
									 $scope.data.giokt1,
									 chuoiquan).then(function(data){
									 	$scope.ngvs = data;
									 	getNgvPhuHop(data, $scope.data.quan);
									 	$scope.loading = false;
									 });
		}
	    //

		//--------------watch----------------------------
		$scope.$watch('khachhang.sdt', function(newVal, oldVal){
			if(newVal == null) return;
			if(newVal.toString().length < 10) {
				return;
			}
			else {
				thanhtoanFactory.timKhachHang($scope.khachhang.sdt)
				.then(function(data){
					if(data.length > 0){
						$scope.khachhang.hoten = data[0].hoten;
						$scope.khachhang.diachi = data[0].diachi
					}
				});
			}
		});
		$scope.$watch('data.quan', function(newVal, oldVal){
			for(i=0; i<$scope.ngv_selected_arr.length; i++){
    			$('#'+$scope.ngv_selected_arr[i].cmnd).removeClass('bgcheckmark');
    		}
		  	$scope.ngv_selected_arr=[];
		  	$scope.ngv_arr_fit=[];
		  	getNgvPhuHop($scope.ngvs, $scope.data.quan);
		});
		//--------------lay dia chi google map
		$scope.layDiaChi = function(){
			if(navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					khachhangFactory.layDiaChiGoogleMapApi(pos.lat, pos.lng).then(function(data){
						$scope.khachhang.diachi = data.results[0].formatted_address;
					})
					
				});
			}
			// Browser doesn't support Geolocation
			else {
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Trình duyệt không hỗ trợ chức năng này!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
			}
		}
		//--------------end watch-----------------------
	    
	    var getNgvPhuHop = function(ngvs, quan){
	    	if(ngvs ==  null) return;
	    	for(i=0; i<ngvs.length; i++){
	    		var in_arr = false;
		   		for(j=0; j<$scope.ngv_arr_fit.length; j++){
		   			if(ngvs[i].cmnd == $scope.ngv_arr_fit[j].cmnd)
		   				in_arr = true;
		   		}
		   		if(!in_arr && ngvs[i].diachi.quan == quan) $scope.ngv_arr_fit.push(ngvs[i]);
	    	}
	    }
	    $scope.filtering = function(ngv){
	    	var index = -1;
	    	for(i=0; i<$scope.ngv_selected_arr.length; i++)
	    		if(ngv.cmnd == $scope.ngv_selected_arr[i].cmnd)
	    			index = i;
	    	kiemtraDSDcChon();
	    	if(index!=-1 && $scope.filter_dichvu(ngv.sotruong, $scope.data)) return true;
	    	if($scope.filter_dichvu(ngv.sotruong, $scope.data) && 
	    	   $scope.filter_kinhnghiem(ngv.sonamkinhnghiem, $scope.data)){
	    		return true;
	    	}
	    	else return false;
	    }
	    var kiemtraDSDcChon = function(){
	    	for(j=0; j<$scope.ngv_selected_arr.length; j++){
	    		
	    		if(!($scope.filter_dichvu($scope.ngv_selected_arr[j].sotruong, $scope.data))){
	    			$scope.ngv_selected_arr.splice(j,1);
	    		}
	    	}
	    		
	    }
	    //------------end filter search---------------------------
	    
	    //-------------Xu ly detail ngv--------------------------------
	    
	    $scope.return_search = function(){
	    	$scope.isSearch = true;
			$scope.isDetail = false;
	    }
	    
	    
        
        //chon ngv trong detail
		$scope.chon_ngv_detail = function(ngv){
			$scope.isSearch = true;
			$scope.isDetail = false;
			var index = -1;
	    	for(i=0; i<$scope.ngv_selected_arr.length; i++)
	    		if(ngv.cmnd == $scope.ngv_selected_arr[i].cmnd)
	    			index = i;
			if (index !== -1) {
			    $scope.ngv_selected_arr.splice(index, 1);
			    $('#'+ngv.cmnd).removeClass('bgcheckmark');
			}
			else{
				$scope.ngv_selected_arr.push(ngv);
        		$('#'+ngv.cmnd).addClass('bgcheckmark');
        	}
        }
	    //show chi tiet ngv
	    
		$scope.show_detail = function(ngv){
			$scope.ngv_show_detail = ngv.cmnd;
			$scope.isSearch = false;
			$scope.isDetail = true;
			var arr = $scope.ngv_arr_fit.slice();
			for(i=0; i<arr.length; i++){
				if(arr[i].cmnd == ngv.cmnd)
					arr.splice(i, 1);
			}
			//console.log(ngv_arr_fit);
			if(arr.length == 1){
				$scope.ngv_sub1 = arr[0];
				return;
			}
			if(arr.length == 2){
				$scope.ngv_sub1 = arr[0];
				$scope.ngv_sub2 = arr[1];
				return;
			}
			if(arr.length > 2){
				var min = 0;
				var max = arr.length-1;
				var random = [];
				// and the formula is:
				var random1 = Math.floor(Math.random() * (max - min + 1)) + min;
				var random2; 
				while(true){
					random2 = Math.floor(Math.random() * (max - min + 1)) + min;
					if(random2 != random1) break;
				}
				$scope.ngv_sub1 = arr[random1];
				$scope.ngv_sub2 = arr[random2];
				return;
			}
		}
		$scope.checkcmnd = function(cmnd){
			if(cmnd == $scope.ngv_show_detail)
				return true;
			return false;
		}
		
		$scope.check_subngv = function(){
			return true;
		}
		var reloadDataSauHoaDon = function(){
            $scope.hoanthanh_thanhtoan_nh = true;
            $scope.loading_yeucau = false;
		}
	    $scope.hoanthanh_thanhtoan = function(i){
	    	if(i==1){
	    		var expireDate = new Date();
				expireDate.setDate(expireDate.getDate() + 1);
				$cookies.remove('khachhang');
				$cookies.put('khachhang', $scope.khachhang.sdt, {'expires': expireDate});
	    		window.location.href = "/taikhoan?tab=lsdh";
	    	}
	    	else{
	    		window.location.href = "/";
	    	}
	    }
		//-------------end Xu ly detail ngv--------------------------------
	    //---------------------luu yeu cau---------------------------------
	    var layDanhSachDichVu = function(){
	    	var result = [];
	    	for(i=0; i<$scope.tieuchis.length; i++){
	    		if($scope.tieuchis[i].data == true)
	    			result.push($scope.tieuchis[i].ten);
	    	}
	    	return result;
	    }
	
	    $scope.layMaXacNhan = function(){

			if($scope.khachhang.sdt == null)
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin nhập số điện thoại')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			else{
				$scope.dalayMXN = true;
				$timeout(function(){
					$scope.dalayMXN = false;
				}, 180000);
				khachhangFactory.layMaXacNhan($scope.khachhang.sdt);
			}
		}

	    $scope.promises = [];
	    var luu_yeucau_b2 = function(){
	    	$scope.loading_yeucau = true;
	    	var q_ngv_trunglich = '?ngaylam=' + $scope.doi_ngaysearch($scope.data.ngay) +
				'&giobatdau__lte=' + $scope.data.giokt1 +
				'&gioketthuc__gte=' + $scope.data.giobd1;
			$http.get('http://localhost:4444/api/lichlamviec'+q_ngv_trunglich, { cache: false})
		        .then(function(data) {
		        	if(data.length > 0){
			            for(i=0; i<data.length; i++){
			            	for(j=0; j<$scope.ngv_selected_arr.length; j++){
			            		if(data[i].nguoigiupviec == $scope.ngv_selected_arr[j].cmnd){
			            			$mdDialog.show(
								      $mdDialog.alert()
								        .parent(angular.element(document.querySelector('body')))
								        .clickOutsideToClose(true)
								        .title('Thông báo')
								        .content('Đã có người thuê nhân viên ' + $scope.ngv_selected_arr[j].hoten + ' xin hãy chọn nhân viên khác!')
								        .ok('Đồng ý!')
								        .targetEvent(null)
							    	);
							    	return;
			            		}
			        		}
			            }
		        	}
		            $http.get('http://localhost:4444/api/khachhang?sdt='+$scope.khachhang.sdt, { cache: false})
				        .then(function(data) {
				        	var trangthaiyc = thanhtoanFactory.getTrangThaiYeuCau($scope.tieuchis);
				        	var mangdichvu = layDanhSachDichVu();

				        	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
	    					var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);
	    					var phingoaigiolonnhatNgv = thanhtoanFactory.getPhiNgoaiGioLonNhatNgv($scope.tieuchis);

	    					var sogiongoaigioCtyc = thanhtoanFactory.tinhSoGioNgoaiGioCtyc($scope.data.giobd1,
				        															 $scope.data.giokt1);
				        	var chiphingoaigioCtyc = thanhtoanFactory.tinhPhiNgoaiGioCtyc(sogiongoaigioCtyc,
				        															phingoaigiolonnhat,
				        															phicobanlonnhat);
				        	var sogiongoaigioYc = thanhtoanFactory.tinhSoGioNgoaiGioYc($scope.data.giobd1,
				        															 $scope.data.giokt1,
				        															 $scope.ngv_selected_arr.length);
				        	var chiphingoaigioYc = thanhtoanFactory.tinhPhiNgoaiGioYc(sogiongoaigioYc,
				        															phingoaigiolonnhat,
				        															phicobanlonnhat);

				        	var dulieu_luuyeucau = {
					        		trangthaiyc: trangthaiyc,
					        		mangdichvu: mangdichvu,
					        		ngay: $scope.data.ngay,
					        		chiphi: thanhtoanFactory.tinhGiaChuanYc($scope.data.giobd1,
					        		 									    $scope.data.giokt1, 
					        		 									    phicobanlonnhat,
					        		 									    $scope.ngv_selected_arr.length),
					        		khachhang: $scope.khachhang,
					        		quan: $scope.data.quan,
					        		mang_ngv_dcchon: $scope.ngv_selected_arr,
					        		giobd1: $scope.data.giobd1,
					        		giokt1: $scope.data.giokt1,
					        		phicobanlonnhat: phicobanlonnhat,
					        		sogiongoaigioYc: sogiongoaigioYc,
					        		chiphingoaigioYc: chiphingoaigioYc,
					        		sogiongoaigioCtyc: sogiongoaigioCtyc,
					        		chiphingoaigioCtyc: chiphingoaigioCtyc,
					        		phingoaigio: phingoaigiolonnhat,
					        		phingoaigiongv: phingoaigiolonnhatNgv
					        	};
				        	if(data.length>0){
					        	$http.post('/luuyeucau_nh', dulieu_luuyeucau)
							        .then(function(data) {
							        	if(data = 'done')
							        		reloadDataSauHoaDon();
							        }).catch(function(data) {
							            console.log('Error: ' + data);
					        		});
				        	}else{
				        		//lưu khách hàng
					            thanhtoanFactory.luuKhachHang($scope.khachhang);	
					        	$http.post('/luuyeucau_nh', dulieu_luuyeucau)
							        .then(function(data) {
							        	if(data = 'done')
							        		reloadDataSauHoaDon();
							        }).catch(function(data) {
							            console.log('Error: ' + data);
					        		});
				        	}
				        })
				        .catch(function(data) {
				            console.log('Error: ' + data);
		    			});

		            
		            
		        })
		        .catch(function(data) {
		            console.log('Error: ' + data);
        	});
	    }
	    $scope.luu_yeucau = function(){
	    	khachhangFactory.xacthucThongTin(
				$scope.khachhang.sdt, $scope.maxacnhan.nguoidung).then(function(data){
					if(data == 'true'){
						luu_yeucau_b2();
					}else{
						$mdDialog.show(
					      $mdDialog.alert()
					        .parent(angular.element(document.querySelector('body')))
					        .clickOutsideToClose(true)
					        .title('Thông báo')
					        .content('Mã xác nhận chưa đúng!!')
					        .ok('Đồng ý!')
					        .targetEvent(null)
					    );
					    return;
					}
			})
	    	
	    }
	    //---------------------end-----------------------------------------
	    //----------------------tính tiền----------------------------------
	    $scope.tinhtien_nh = function(){
	    	var sogiongoaigioYc = thanhtoanFactory.tinhSoGioNgoaiGioYc($scope.data.giobd1,
        															   $scope.data.giokt1,
        															   $scope.ngv_selected_arr.length); 
	    	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
			var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);

	    	var phichuan = thanhtoanFactory.tinhGiaChuanYc($scope.data.giobd1,
	        		 									    $scope.data.giokt1, 
	        		 									    phicobanlonnhat,
	        		 									    $scope.ngv_selected_arr.length)
	    	var phingoaigio = thanhtoanFactory.tinhPhiNgoaiGioYc(sogiongoaigioYc,
    															phingoaigiolonnhat,
    															phicobanlonnhat,
    															$scope.ngv_selected_arr.length);
	    	return thanhtoanFactory.doiChuoiTienTe(phichuan + phingoaigio);
	    }
	    $scope.showTrangThaiYc = function(){
	    	var tt = thanhtoanFactory.getTrangThaiYeuCau($scope.tieuchis);
	    	if(tt == 'Chưa tiến hành')
	    		return 'Không có phụ phí';
	    	else return 'Có phụ phí';
	    }
	    $scope.showPhiNgoaiGio = function(){
	    	var sogiongoaigioYc = thanhtoanFactory.tinhSoGioNgoaiGioYc($scope.data.giobd1,
        															   $scope.data.giokt1,
        															   $scope.ngv_selected_arr.length); 
	    	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
	    	var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);
	    	var phingoaigio = thanhtoanFactory.tinhPhiNgoaiGioYc(sogiongoaigioYc,
    															phingoaigiolonnhat,
    															phicobanlonnhat,
    															$scope.ngv_selected_arr.length);
	    	return thanhtoanFactory.doiChuoiTienTe(phingoaigio);
	    }
	    $scope.showPhiCoBan = function(){
	    	var sogiongoaigioYc = thanhtoanFactory.tinhSoGioNgoaiGioYc($scope.data.giobd1,
        															   $scope.data.giokt1,
        															   $scope.ngv_selected_arr.length); 
	    	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
			var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);
	    	var phichuan = thanhtoanFactory.tinhGiaChuanYc($scope.data.giobd1,
	        		 									    $scope.data.giokt1, 
	        		 									    phicobanlonnhat,
	        		 									    $scope.ngv_selected_arr.length)
	    	return thanhtoanFactory.doiChuoiTienTe(phichuan);
	    }
	    //----------------------end tính tiền------------------------------

	    //modal yeu cau
	    $scope.show_yeucau = function(){
	    	if($scope.thongbaogio != ''){
	    		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn lại thời gian!')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			    return;
	    	}
	    	if($scope.ngv_selected_arr.length > 0){
	    		//$('#thongtinkh').modal({backdrop: 'static', keyboard: false},'show');
	    		$scope.isSearch = false;
				$scope.isThanhToan = true;
	    	}
	    	else{
	    		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Bạn phải chọn ít nhất 1 nhân viên!!.')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
	    	}
	    }
	    $scope.close_thanhtoan = function(){
	    	$scope.isSearch = true;
			$scope.isThanhToan = false;
			$scope.khachhang.sdt= null;
			$scope.khachhang.hoten= '';
			$scope.khachhang.diachi= '';
	    }

	    $scope.numberLoaded = true;
	    $scope.slickconfig = {
			lazyLoad: 'ondemand',
			dots: false,
	        infinite: true,
	        speed: 300,
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        rows: 1,
	        arrows: true
		}
	    //
	});
	module.controller('searchdhController', 
		function(khachhangFactory,
				  thanhtoanFactory,
				  filterFactory,
				  ngvFactory,
				  $scope,
				  $http,
				  $log,
				  $location,
				  $mdDialog,
				  $q,
				  $compile,
				  $mdSidenav,
				  $timeout,
				  $cookies,
				  cancelableQ){
		//session ngăn ko cho quay lại trang chủ
		
		//load and close modal
		
		$scope.firstload = {
			ngaybd: true,
			ngaykt: true,
			giobd: true,
			giokt: true
		};
		$scope.Math = window.Math;
		$scope.loading = false;
		$scope.loading_yeucau = false;
		$scope.loading_dichvu = true;
		$scope.hoanthanh_thanhtoan_dh = false;
		$scope.thongbaongay = '';
		$scope.thongbaogio = '';
		$scope.ngvs = null;
		$scope.isDetail = false;
		$scope.maxacnhan = {
	    	nguoidung: null
	    };
	    $scope.dalayMXN = false;
		$scope.khachhang = {
			sdt: null,
			hoten: '',
			diachi: '',
		};
		$scope.detailData = {
			ngaythuchien: null,
			dsNgvPhuHop: [],
			ngvDetail: null
		};
   		$scope.onEventClick = function(date, jsEvent, view){
        	$scope.isDetail = true;
        	for(i=0; i<$scope.data.lichdaihan.length; i++){
        		if($scope.data.lichdaihan[i].ngay.getTime() == date.start._d.getTime()){
        			$scope.detailData.ngaythuchien = date.start._d;
        			$scope.detailData.dsNgvPhuHop = $scope.data.lichdaihan[i].dsNgvPhuHop;
        			return;
        		}
        	}
    	};
    	$scope.xemChiTietDh = function(ngv){
    		$scope.detailData.ngvDetail = null;
    		$timeout(function(){
    			$scope.detailData.ngvDetail = ngv;
    			$scope.toggleSideNav();
    		},500);
    		
    	}
		//full calendar
		$scope.uiConfig = {
			calendar:{
			height: 600,
			editable: true,
			header:{
				left: 'month basicWeek basicDay',
				center: 'title',
				right: 'today, prev,next'
			},
				eventClick: $scope.onEventClick,
				dayClick: $scope.alertEventOnClick,
				eventDrop: $scope.alertOnDrop,
				eventResize: $scope.alertOnResize
			}
	    };
	    $scope.initLanguage = function(){
	    	$scope.uiConfig.calendar.dayNames = [
	    	"Chủ nhật",
	    	 	"Thứ 2",
	    	  	"Thứ 3",
	    	   	"Thứ 4",
	    	    "Thứ 5",
    	     	"Thứ 6",
    	      	"Thứ 7"];
	    	$scope.uiConfig.calendar.monthNames = [
	    		"Tháng 1",
	    	 	"Tháng 2",
	    	  	"Tháng 3",
	    	   	"Tháng 4",
	    	    "Tháng 5",
    	     	"Tháng 6",
    	      	"Tháng 7",
    	       	"Tháng 8",
	        	"Tháng 9",
	         	"Tháng 10",
	          	"Tháng 11",
	           	"Tháng 12"];
	        $scope.uiConfig.calendar.monthNamesShort = [
	    		"Th1",
	    	 	"Th2",
	    	  	"Th3",
	    	   	"Th4",
	    	    "Th5",
    	     	"Th6",
    	      	"Th7",
    	       	"Th8",
	        	"Th9",
	         	"Th10",
	          	"Th11",
	           	"Th12"];
        	$scope.uiConfig.calendar.dayNamesShort = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
	    }
	    
    	$scope.events=[];
    	$scope.addEvent = function(soluong, ngaythuchien, trangthai){
    		if(trangthai == 1){
	    		$scope.events.push({
	    			title: soluong+' nhân viên',
	            	start: ngaythuchien,
	            	stick: true
	    		});
	    	}
	    	else{
	    		$scope.events.push({
	    			title: soluong,
	            	start: ngaythuchien,
	            	stick: true
	    		});
	    	}
    	}
    	$scope.chonNgvSideNav = function(){
    		var soluong = 0;
    		for(i=0; i<$scope.data.lichdaihan.length; i++){
        		if($scope.data.lichdaihan[i].ngay.getTime() == $scope.detailData.ngaythuchien.getTime()){
        			for(j=0; j<$scope.data.lichdaihan[i].dsNgvPhuHop.length; j++){
        				if($scope.data.lichdaihan[i].dsNgvPhuHop[j].selected == true)
        					soluong++;
        			}
        		}
        	}
    		for(i=0; i<$scope.events.length; i++){
        		if($scope.events[i].start.getTime() == $scope.detailData.ngaythuchien.getTime()){
        			$scope.events[i].title = soluong+' nhân viên';
        			return;
        		}
        	}
    	}
    	$scope.eventSources=[$scope.events];
		//function
		$scope.tinh_tuoi_ngv = filterFactory.tinhTuoiNgv;
		$scope.doi_ngaysearch = filterFactory.doiNgaySearch;
		$scope.them_filter_dichvu = filterFactory.them_filter_dichvu;
		$scope.filter_dichvu = filterFactory.filter_dichvu;
		$scope.filter_kinhnghiem = filterFactory.filter_kinhnghiem;
		$scope.filter_quan = filterFactory.filter_quan;

		$scope.filtering = function(ngv, selected){
			if(selected) return true;
	    	if($scope.filter_dichvu(ngv.sotruong, $scope.data) && 
	    	   $scope.filter_kinhnghiem(ngv.sonamkinhnghiem, $scope.data)){
	    		return true;
	    	}
	    	else return false;
	    }
		$scope.toggleSideNav = buildToggler('left');
		function buildToggler(navID) {
	      return function() {
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            
	          });
	      }
	    }
	    function parseDate(str) {
		    var mdy = str.split('/')
		    return new Date(mdy[2], mdy[1]-1, mdy[0]);
		}

		function daydiff(first, second) {
		    return Math.round((second-first)/(1000*60*60*24));
		}
		
	    $scope.backToCalendar = function(){
	    	$scope.isDetail = false;
	    }
	    var getAvoidDay = function(initOption, ngaybatdau){
	    	var days = ['cn','t2','t3','t4','t5','t6','t7'];
	    	var hangtuan = ['cn','t2','t3','t4','t5','t6','t7'];
	    	hangtuan.splice(ngaybatdau.getDay(), 1);
			switch(Number(initOption)) {
			    case 0:
			    	return [];
			        break;
			    //các ngày trong tuần
			    case 1:
			        return ['cn','t7'];
			        break;
			    //các ngày chẵn
			    case 2:
			        return ['cn','t7','t3','t5'];
			        break;
			    //các ngày lẻ
			    case 3:
			        return ['cn','t6','t2','t4'];
			        break;
			    //hàng tuần
			    case 4:
			        return hangtuan;
			        break;
			}
	    }
	    $scope.promises = [];
		var initData = function(initOption, dichvu){
			$scope.loading = true;
			var days = ['cn','t2','t3','t4','t5','t6','t7'];
			$scope.events.splice(0,$scope.events.length);
			$scope.data.lichdaihan.splice(0,$scope.data.lichdaihan.length);
			var dayrange = daydiff(parseDate($scope.data.ngaybd),
								   parseDate($scope.data.ngaykt));
			var ngaythuchien_arr = [];
			var chuoiquan = filterFactory.layTenKhuVuc($scope.data.quan, $scope.quans, $scope.khuvuc);
			
			for(i=0; i<=dayrange; i++){
				var ngaybatdau_arr = $scope.data.ngaybd.split('/');
				var ngaythuchien = new Date(ngaybatdau_arr[2], ngaybatdau_arr[1]-1, ngaybatdau_arr[0]);
				ngaythuchien.setDate(ngaythuchien.getDate() + i);
				ngaythuchien_arr.push(ngaythuchien);
			}
			var avoidDay = getAvoidDay(initOption, ngaythuchien_arr[0]);
			for(i=0; i<=dayrange; i++){
				(function(i) {
					var promise = ngvFactory.layDanhSachNgvDaiHan(ngaythuchien_arr[i],
						 $scope.data.giobd1,
						 $scope.data.giokt1,
						 chuoiquan,
						 dichvu);
					var cancelp = cancelableQ.wrap(promise);
					cancelp.then(function(data){
						 	if(data.length>0){
						 		var _dsNgvPhuHop = [];
						 		var soluong = 1;
						 		if(avoidDay.length>0){
							 		if(avoidDay.indexOf(days[ngaythuchien_arr[i].getDay()]) == -1){
							 			soluong = 1;
							 			for(j=0; j<data.length; j++){
								 			if(j==0){
									 			_dsNgvPhuHop.push({
									 				data: data[j],
									 				selected: true
									 			});
									 		}else{
									 			_dsNgvPhuHop.push({
									 				data: data[j],
									 				selected: false
									 			});
									 		}
								 		}
							 		}else{
						 				soluong = 0;
							 			for(j=0; j<data.length; j++){
								 			if(j==0){
									 			_dsNgvPhuHop.push({
									 				data: data[j],
									 				selected: false
									 			});
									 		}else{
									 			_dsNgvPhuHop.push({
									 				data: data[j],
									 				selected: false
									 			});
									 		}
								 		}
							 		}
						 		}else{
						 			for(j=0; j<data.length; j++){
							 			if(j==0){
								 			_dsNgvPhuHop.push({
								 				data: data[j],
								 				selected: true
								 			});
								 		}else{
								 			_dsNgvPhuHop.push({
								 				data: data[j],
								 				selected: false
								 			});
								 		}
							 		}
							 	}
							 	$scope.data.lichdaihan.push({
							 		ngay: ngaythuchien_arr[i],
							 		dsNgvPhuHop: _dsNgvPhuHop
							 	});
							 	$scope.addEvent(soluong, ngaythuchien_arr[i], 1);
						 	}else{
						 		$scope.data.lichdaihan.push({
							 		ngay: ngaythuchien_arr[i],
							 		dsNgvPhuHop: []
							 	});
							 	$scope.addEvent('Chưa có nhân viên', ngaythuchien_arr[i], 0);
						 	}
						 }, function(reason){
						 	console.log('rejected with reason: ', reason);
						 });
					$scope.promises.push(cancelp);
				})(i);
			}
			$q.all($scope.promises).then(function(){
				$scope.promises = [];
				$scope.loading = false;
			});
			$scope.initLanguage();
		}
		var layMangDichVu = function(){
			var arr = [];
			for(i=0; i<$scope.tieuchis; i++){
				if($scope.tieuchis[i].data)
					arr.push($scope.tieuchis[i].ten);
			}
			return arr;
		}
		//-------------Lấy dữ liệu-----------------------------------
		$scope.kinhnghiems = filterFactory.getDSKinhNghiem();
		$scope.tieuchis = [];
		$scope.khuvuc = [];
		$scope.quans=[];
		$scope.initDataFirstTime = function(){
			var q1 = filterFactory.getDSQuan().then(function(data){
				$scope.khuvuc = filterFactory.taoDanhSachKhuVuc(data);
				for(i=0; i<data.length; i++){
					$scope.quans.push({
						ten: data[i].tenquan,
						khuvuc: data[i].khuvuc,
						id: i
					});
				}
			})
			var q2 = filterFactory.getDSTieuChi().then(function(data){
				for(i=0; i<data.length; i++){
					$scope.tieuchis.push({
						ten: data[i].tentieuchi,
						id: i,
						data: false,
						giachuan: data[i].giachuan,
						phuphi: data[i].phuphi,
						phingoaigiokh: data[i].phingoaigiokh,
						phingoaigiongv: data[i].phingoaigiongv
					});
				}
				$scope.data.mang_tieuchi = filterFactory.getDichVu($location.search().dichvu,
														  $scope.tieuchis);
				$scope.loading_dichvu = false;
			});
			$q.all([q1, q2]).then(function(){
				initData($scope.data.locdaihan, $scope.data.mang_tieuchi);
			})
		    for(i=0; i<$scope.data.availableOptions.length; i++){
		    	if(Number($scope.data.giobd1) == $scope.data.availableOptions[i].id){
		    		$scope.data.giobd1 = $scope.data.availableOptions[i].id;
		    	}
		    	if(Number($scope.data.giokt1) == $scope.data.availableOptions[i].id){
		    		$scope.data.giokt1 = $scope.data.availableOptions[i].id;
		    	}
		    }
		}
		$scope.data = filterFactory.getDuLieuPage();
		$scope.locdaihan = filterFactory.getDSLocDaiHan();
	    
	    //-------------end du lieu------------------------------------
	    //--------------khởi tạo và xử lý calendar------------------
	    
	    
	    //
	    //--------------lay dia chi google map-----------
	    $scope.layDiaChi = function(){
			if(navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					khachhangFactory.layDiaChiGoogleMapApi(pos.lat, pos.lng).then(function(data){
						$scope.khachhang.diachi = data.results[0].formatted_address;
					})
					
				});
			}
			// Browser doesn't support Geolocation
			else {
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Trình duyệt không hỗ trợ chức năng này!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
			}
		}
	    //--------------watch----------------------------
	    $scope.$watch('khachhang.sdt', function(newVal, oldVal){
			if(newVal == null) return;
			if(newVal.toString().length < 7) {
				return;
			}
			else {
				thanhtoanFactory.timKhachHang($scope.khachhang.sdt).then(function(data){
					if(data.length > 0){
						$scope.khachhang.hoten = data[0].hoten;
						$scope.khachhang.diachi = data[0].diachi
					}
				});
			}
		});
		function parseDate(str) {
		    var mdy = str.split('/')
		    return new Date(mdy[2], mdy[1]-1, mdy[0]);
		}

		function daydiff(first, second) {
		    return Math.round((second-first)/(1000*60*60*24));
		}
		$scope.changeFilter = function(){
			var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngaybdarr = $scope.data.ngaybd.split('/');
            var ngayktarr = $scope.data.ngaykt.split('/');
            var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);

            if(ngaybdarr[0] == now.getDate() 
                && ngaybdarr[1] == now.getMonth()+1 
                && ngaybdarr[2] == now.getFullYear()){
                $scope.thongbaongay = 'Ngày bắt đầu không được là ngày hiện tại!!';
            	return;
            }
            if(ngaybdarr[1] == ngayktarr[1] 
                && ngaybdarr[0] == ngayktarr[0] 
                && ngaybdarr[2] == ngayktarr[2]){
            	$scope.thongbaongay = 'Ngày bắt đầu không được trùng với ngày kết thúc.';
                return;
            }
            //kiem tra ngay bd và ngay kt
            if(daydiff(parseDate($scope.data.ngaybd), parseDate($scope.data.ngaykt)) <0){
            	$scope.thongbaongay = 'Ngày bắt đầu không được lớn hơn ngày kết thúc.';
			    return;
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$scope.thongbaogio = 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.';
                return;
            }
            if(((kt1-bd1)%60)!=0  && bd1 != 0 && kt1 != 0) {
            	$scope.thongbaogio = 'Khoảng cách thời gian phải từ 2,3,4,5.. tiếng.';
                return;
            }
            $scope.thongbaogio = '';
            $scope.thongbaongay = '';

			for(i=0; i<$scope.promises.length; i++){
				$scope.promises[i].cancel();
			}
			$scope.isDetail = false;
			$scope.promises = [];
			$timeout(function(){
				initData($scope.data.locdaihan, $scope.data.mang_tieuchi);
			},300);
			
			
		}
		
		//modal yeu cau
		$scope.isSearch = true;
		$scope.isThanhToan = false;
		
	    $scope.show_yeucau = function(){
	    	if($scope.thongbaogio != '' || $scope.thongbaongay != ''){
	    		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn lại thời gian!')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			    return;
	    	}
	    	if($scope.loading == true){
	    		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chờ 1 lát!!.')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			    return;
	    	}
	    	if(!daChonNgv()){
	    		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Bạn phải chọn ít nhất 1 nhân viên!!.')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
	    	}else{
	    		$scope.isSearch = false;
				$scope.isThanhToan = true;
	    	}
	    	
	    	/*
	    	$timeout(function(){
    			$('#thongtinkh').modal({backdrop: 'static', keyboard: false},'show');
    		},400);
    		*/
	    }
	    $scope.close_thanhtoan = function(){
	    	$scope.isSearch = true;
			$scope.isThanhToan = false;
			$scope.khachhang.sdt= null;
			$scope.khachhang.hoten= '';
			$scope.khachhang.diachi= '';
	    }
	    //tinh tien
	    var tongSoLuongNgv = function(){
	    	var soluongngv = 0;

	    	for(i=0; i<$scope.data.lichdaihan.length; i++){
    			for(j=0; j<$scope.data.lichdaihan[i].dsNgvPhuHop.length; j++){
    				if($scope.data.lichdaihan[i].dsNgvPhuHop[j].selected == true){

    					soluongngv++;
    				}
    			}
	    	}
	    	return soluongngv;
	    }
	    $scope.tinhtiendhTungNgay = function(){

	    	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
	    	var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);

	    	var sogiongoaigioCtyc = thanhtoanFactory.tinhSoGioNgoaiGioCtyc($scope.data.giobd1,
        															   $scope.data.giokt1); 

	    	var phichuan = thanhtoanFactory.tinhGiaChuanCtyc($scope.data.giobd1,
	        		 									    $scope.data.giokt1, 
	        		 									    phicobanlonnhat);

	    	var phingoaigio = thanhtoanFactory.tinhPhiNgoaiGioCtyc(sogiongoaigioCtyc,
    															phingoaigiolonnhat,
    															phicobanlonnhat);

	    	return thanhtoanFactory.doiChuoiTienTe(phichuan + phingoaigio);
	    }
	    $scope.tinhtien_dh = function(){
	    	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
	    	var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);

	    	var sogiongoaigioCtyc = thanhtoanFactory.tinhSoGioNgoaiGioCtyc($scope.data.giobd1,
        															   $scope.data.giokt1); 

	    	var phichuan = thanhtoanFactory.tinhGiaChuanCtyc($scope.data.giobd1,
	        		 									    $scope.data.giokt1, 
	        		 									    phicobanlonnhat);

	    	var phingoaigio = thanhtoanFactory.tinhPhiNgoaiGioCtyc(sogiongoaigioCtyc,
    															phingoaigiolonnhat,
    															phicobanlonnhat);

	    	return thanhtoanFactory.doiChuoiTienTe((phichuan+phingoaigio)*tongSoLuongNgv());
	    }
	    $scope.showTrangThaiYc = function(){
	    	var tt = thanhtoanFactory.getTrangThaiYeuCau($scope.tieuchis);
	    	if(tt == 'Chưa tiến hành')
	    		return 'Không có phụ phí';
	    	else return 'Có phụ phí';
	    }
	    $scope.showPhiNgoaiGio = function(){
	    	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
	    	var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);
	    	
	    	var sogiongoaigioCtyc = thanhtoanFactory.tinhSoGioNgoaiGioCtyc($scope.data.giobd1,
        															   $scope.data.giokt1); 

	    	var phichuan = thanhtoanFactory.tinhGiaChuanCtyc($scope.data.giobd1,
	        		 									    $scope.data.giokt1, 
	        		 									    phicobanlonnhat);

	    	var phingoaigio = thanhtoanFactory.tinhPhiNgoaiGioCtyc(sogiongoaigioCtyc,
    															phingoaigiolonnhat,
    															phicobanlonnhat);

	    	return thanhtoanFactory.doiChuoiTienTe(phingoaigio*tongSoLuongNgv());
	    }
	    $scope.showPhiCoBan = function(){
	    	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
	    	var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);

	    	var sogiongoaigioCtyc = thanhtoanFactory.tinhSoGioNgoaiGioCtyc($scope.data.giobd1,
        															   $scope.data.giokt1); 

	    	var phichuan = thanhtoanFactory.tinhGiaChuanCtyc($scope.data.giobd1,
	        		 									    $scope.data.giokt1, 
	        		 									    phicobanlonnhat);

	    	var phingoaigio = thanhtoanFactory.tinhPhiNgoaiGioCtyc(sogiongoaigioCtyc,
    															phingoaigiolonnhat,
    															phicobanlonnhat);

	    	return thanhtoanFactory.doiChuoiTienTe((phichuan)*tongSoLuongNgv());
	    }
	    var daChonNgv = function(){
	    	if(tongSoLuongNgv() > 0)
	    		return true;
	    	else
	    		return false;
	    }
	    //---------------------luu yeu cau---------------------------------
	    var layDanhSachDichVu = function(){
	    	var result = [];
	    	for(i=0; i<$scope.tieuchis.length; i++){
	    		if($scope.tieuchis[i].data == true)
	    			result.push($scope.tieuchis[i].ten);
	    	}
	    	return result;
	    }
	    $scope.layMaXacNhan = function(){

			if($scope.khachhang.sdt == null)
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin nhập số điện thoại')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			else{
				$scope.dalayMXN = true;
				$timeout(function(){
					$scope.dalayMXN = false;
				}, 180000);
				khachhangFactory.layMaXacNhan($scope.khachhang.sdt);
			}
		}
	    $scope.llvpromises = [];
	    $scope.ctycpromises = [];
	    var luu_yeucau_b2 = function(){
	    	$scope.loading_yeucau = true;
	    	var promises = [];
	    	for(i=0; i<$scope.data.lichdaihan; i++){
	    		(function(i) {
	    			for(j=0; j<$scope.data.lichdaihan[i].dsNgvPhuHop.length; j++){
	    				(function(j) {
	    					if($scope.data.lichdaihan[i].dsNgvPhuHop[j].selected == true)
		    				var promise = thanhtoanFactory.LayLichLvKhiLuu($scope.data.lichdaihan[i].ngay,
		    														   $scope.data.giobd1,
		    														   $scope.data.giokt1,
		    														   $scope.data.lichdaihan[i].dsNgvPhuHop[j].data.cmnd);
		    				promises.push(promise);
	    				})(j)
	    			}
	    		})(i)
	    	}
	    	$q.all(promises).then(function(data){

	    		if(data.length>0){
	    			$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('body')))
				        .clickOutsideToClose(true)
				        .title('Thông báo')
				        .content('Đã có người thuê nhân viên xin hãy chọn nhân viên khác!')
				        .ok('Đồng ý!')
				        .targetEvent(null)
			    	);
	    		}
	    		else{
	    			$http.get('http://localhost:4444/api/khachhang?sdt='+$scope.khachhang.sdt, { cache: false})
				        .then(function(data) {

				        	var trangthaiyc = thanhtoanFactory.getTrangThaiYeuCau($scope.tieuchis);
				        	var mangdichvu = layDanhSachDichVu();

				        	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
	    					var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);
	    					var phingoaigiolonnhatNgv = thanhtoanFactory.getPhiNgoaiGioLonNhatNgv($scope.tieuchis);

				        	var sogiongoaigioCtyc = thanhtoanFactory.tinhSoGioNgoaiGioCtyc($scope.data.giobd1,
				        															 $scope.data.giokt1);
				        	var chiphingoaigioCtyc = thanhtoanFactory.tinhPhiNgoaiGioCtyc(sogiongoaigioCtyc,
				        															phingoaigiolonnhat,
				        															phicobanlonnhat);
				        	var sogiongoaigioYc = thanhtoanFactory.tinhSoGioNgoaiGioYc($scope.data.giobd1,
				        															 $scope.data.giokt1,
				        															 tongSoLuongNgv());
				        	var chiphingoaigioYc = thanhtoanFactory.tinhPhiNgoaiGioYc(sogiongoaigioYc,
				        															phingoaigiolonnhat,
				        															phicobanlonnhat,
				        															tongSoLuongNgv());

					        var dulieu_luuyeucau = {
					        		trangthaiyc: trangthaiyc,
					        		mangdichvu: mangdichvu,
					        		ngaybd: $scope.data.ngaybd,
					        		ngaykt: $scope.data.ngaykt,
					        		chiphi: thanhtoanFactory.tinhGiaChuanYc($scope.data.giobd1,
					        		 									    $scope.data.giokt1, 
					        		 									    phicobanlonnhat,
					        		 									    tongSoLuongNgv()),
					        		khachhang: $scope.khachhang,
					        		quan: $scope.data.quan,
					        		giobd1: $scope.data.giobd1,
					        		giokt1: $scope.data.giokt1,
					        		lichdaihan: $scope.data.lichdaihan,
					        		phicobanlonnhat: phicobanlonnhat,
					        		sogiongoaigioYc: sogiongoaigioYc,
					        		chiphingoaigioYc: chiphingoaigioYc,
					        		sogiongoaigioCtyc: sogiongoaigioCtyc,
					        		chiphingoaigioCtyc: chiphingoaigioCtyc,
					        		phingoaigio: phingoaigiolonnhat,
					        		phingoaigiongv: phingoaigiolonnhatNgv
					        	};
				        	if(data.length>0){
				        		
					        	$http.post('/luuyeucau_dh', dulieu_luuyeucau)
							        .then(function(data) {
							        	if(data = 'done'){
							        		$scope.loading_yeucau = false;
    						   				$scope.hoanthanh_thanhtoan_dh = true;
						        		}
							        }).catch(function(data) {
							            console.log('Error: ' + data);
					        		});
				        	}else{
				        		//lưu khách hàng
					            thanhtoanFactory.luuKhachHang($scope.khachhang);

					        	$http.post('/luuyeucau_dh', dulieu_luuyeucau)
							        .then(function(data) {
							        	if(data = 'done'){
							        		$scope.loading_yeucau = false;
    						   				$scope.hoanthanh_thanhtoan_dh = true;
						        		}
							        }).catch(function(data) {
							            console.log('Error: ' + data);
					        		});
				        	}
				        })
				        .catch(function(data) {
				            console.log('Error: ' + data);
		    			});
	    		}
	    	})
	    }
	    $scope.luu_yeucau = function(){
	    	khachhangFactory.xacthucThongTin(
				$scope.khachhang.sdt, $scope.maxacnhan.nguoidung).then(function(data){
					if(data == 'true'){
						luu_yeucau_b2();
					}else{
						$mdDialog.show(
					      $mdDialog.alert()
					        .parent(angular.element(document.querySelector('body')))
					        .clickOutsideToClose(true)
					        .title('Thông báo')
					        .content('Mã xác nhận chưa đúng!!')
					        .ok('Đồng ý!')
					        .targetEvent(null)
					    );
					    return;
					}
			})
	    }
	    //---------------------end-----------------------------------------
	    $scope.hoanthanh_thanhtoan = function(i){
	    	if(i==1){
	    		var expireDate = new Date();
				expireDate.setDate(expireDate.getDate() + 1);
				$cookies.remove('khachhang');
				$cookies.put('khachhang', $scope.khachhang.sdt, {'expires': expireDate});
	    		window.location.href = "/taikhoan?tab=lsdh";
	    	}
	    	else{
	    		window.location.href = "/";
	    	}
	    }
		//--------------end watch-----------------------
		$scope.numberLoaded = true;
		$scope.slickconfig = {
			lazyLoad: 'ondemand',
			dots: false,
	        infinite: true,
	        speed: 300,
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        rows: 1,
	        arrows: true
		};
	});
	module.controller('loginController', function(khachhangFactory, thanhtoanFactory, $scope, $timeout, $cookies, $location, $cookies){
		$scope.registed = false;
		$scope.khachhang = {
			sdt: null,
			diachi: null,
			ten: null
		};
		$scope.sdtTonTai = false;
		$scope.sdtKhongTonTai = false;
		$scope.dangkyThanhCong = false;
		$scope.loadingDangKy = false;
		$scope.loadingDangNhap = false;
		$scope.maxacnhan = {
	    	nguoidung: null
	    };
		$scope.solanxacnhan = 0;
		$scope.thongbaomaxacnhan = '';
		$scope.daxacnhansdt = {
			dangky: false,
			dangnhap: false
		};
		$scope.thongbaosdt = {
			dangky: null,
			dangnhap: null
		};
		$scope.tamdungxacnhan = null;
		$scope.dalayMXNDK = false;
		$scope.dalayMXNDN = false;
		$scope.dongySuDung = true;
		$scope.landau = 0;
		//check cookies
		$scope.checkCookies = function(){
			if($cookies.get('khachhang') != null && $scope.landau == 0){
				$scope.registed = true;
				$scope.khachhang.sdt = $cookies.get('khachhang');
				$scope.landau++;
				DangNhapb2(0);
			}
		}
		//
		$scope.showDangKy = function(){
			$('#DangNhapForm').modal('hide');
			$('#DangKyForm').modal({backdrop: 'static', keyboard: false},'show');
			$scope.khachhang = {
				sdt: null,
				diachi: null,
				ten: null
			};
			$scope.daxacnhansdt = {
				dangky: false,
				dangnhap: false
			};
			$scope.thongbaosdt = {
				dangky: null,
				dangnhap: null
			};
			$scope.maxacnhan = {
		    	nguoidung: null,
		    	hethong: null
		    };
		    $scope.thongbaomaxacnhan = '';
		}
		$scope.closeDangKy = function(){
			$('#DangKyForm').modal('hide');
		}
		$scope.kiemtraFormDangKy = function(){
			if($scope.daxacnhansdt.dangky == true)
				return false;
			else
				return true;
		}
		$scope.kiemtraFormDangNhap = function(){
			if($scope.daxacnhansdt.dangnhap == true)
				return false;
			else
				return true;
		}
		$scope.$watch('khachhang.sdt', function(newVal, oldVal){
			console.log('watch sdt :', newVal.toString().length)
			if(newVal == null) return;
			if(newVal.toString().length < 10) {
				$scope.thongbaosdt.dangky = 'Số điện thoại phải từ 10 số';
				$scope.thongbaosdt.dangnhap = 'Số điện thoại phải từ 10 số';
				$scope.daxacnhansdt.dangky = false;
				$scope.daxacnhansdt.dangnhap = false;
			}
			else {
				console.log($scope.khachhang.sdt)
				thanhtoanFactory.timKhachHang($scope.khachhang.sdt)
				.then(function(data){
					data=data.data;
					console.log("tai khoan tim duoc voi sdt:",data)
					if(data.length > 0){
						$scope.thongbaosdt.dangky = 'số này đã được đăng ký!!';
						$scope.thongbaosdt.dangnhap = '';
						$scope.daxacnhansdt.dangky = false;
						$scope.daxacnhansdt.dangnhap = true;
					}else{
						$scope.thongbaosdt.dangky = 'Có thế sử dụng số này';
						$scope.thongbaosdt.dangnhap = 'Số này chưa được đăng ký!!';
						$scope.daxacnhansdt.dangky = true;
						$scope.daxacnhansdt.dangnhap = false;
					}
				});
			}
		});
		$scope.DangKy = function(){
			khachhangFactory.xacthucThongTin(
				$scope.khachhang.sdt, $scope.maxacnhan.nguoidung).then(function(data){
					console.log('thong tin xac thuc :' , data)
					if(data.data == 'true'){
						$scope.thongbaomaxacnhan = '';
						$scope.loadingDangKy = true;
						thanhtoanFactory.timKhachHang($scope.khachhang.sdt).then(function(data){
							if(!data.length > 0){
								thanhtoanFactory.luuKhachHang($scope.khachhang)
								.then(function(data){
									console.log('khach hang dc luu: ',data);
									$scope.loadingDangKy = false;
									$scope.dangkyThanhCong = true;
									$timeout(function(){
										$scope.dangkyThanhCong = false;
									},5000)
									DangNhapb2(1);
								});
							}else{
								$scope.loadingDangKy = false;
								$scope.sdtTonTai = true;
								$timeout(function(){
									$scope.sdtTonTai = false;
								},5000)
							}
						});
					}else{
						$scope.thongbaomaxacnhan = 'Mã xác nhận không đúng';
						return;
					}
			})
			
		}
		$scope.layMaXacNhan = function(i){
			if($scope.daxacnhansdt.dangky == false && $scope.daxacnhansdt.dangnhap == false){
				$scope.thongbaomaxacnhan = 'Số điện thoại không phù hợp';
				return;
			}
			if($scope.khachhang.sdt == null)
				$scope.thongbaomaxacnhan = 'Xin nhập số điện thoại';
			else{
				khachhangFactory.layMaXacNhan($scope.khachhang.sdt);
				if(i=0){
					$scope.dalayMXNDK = true;
					$timeout(function(){
						$scope.dalayMXNDK = false;
					},180000)
				}else{
					$scope.dalayMXNDN = true;
					$timeout(function(){
						$scope.dalayMXNDN = false;
					},180000)
				}
				
			}
		}
		$scope.layDiaChi = function(){
			if(navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					khachhangFactory.layDiaChiGoogleMapApi(pos.lat, pos.lng).then(function(data){
						$scope.khachhang.diachi = data.results[0].formatted_address;
					})
					
				});
			}
			// Browser doesn't support Geolocation
			else {
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Trình duyệt không hỗ trợ chức năng này!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
			}
		}
		$scope.showDangNhap = function(){
			$('#DangNhapForm').modal({backdrop: 'static', keyboard: false},'show');
			$scope.khachhang = {
				sdt: null,
				diachi: null,
				ten: null
			};
			$scope.daxacnhansdt = {
				dangky: false,
				dangnhap: false
			};
			$scope.thongbaosdt = {
				dangky: null,
				dangnhap: null
			};
			$scope.maxacnhan = {
		    	nguoidung: null,
		    	hethong: null
		    };
		    $scope.thongbaomaxacnhan = '';
		}
		$scope.closeDangNhap = function(){
			$('#DangNhapForm').modal('hide');
		}
		var DangNhapb2 = function(kieudangnhap){
			thanhtoanFactory.timKhachHang($scope.khachhang.sdt)
			.then(function(data){
				console.log('dang nhap b2: ',data)
				if(data.data.length > 0){
					data=data.data
					$('#DangNhapForm').modal('hide');
					$scope.registed = true;
					$scope.khachhang.sdt = data[0].sdt;
					$scope.khachhang.diachi = data[0].diachi;
					$scope.khachhang.hoten = data[0].hoten;
					var expireDate = new Date();
  					expireDate.setDate(expireDate.getDate() + 1);
					$cookies.put('khachhang', data[0].sdt, {'expires': expireDate});
					console.log('cookies putting')
					khachhangFactory.setKhachHang($scope.khachhang);
					$scope.khachhang = khachhangFactory.getKhachHang();
					$scope.loadingDangNhap = false;
					if(kieudangnhap == 1) window.location.href = '/taikhoan?tab=tttk';

				}else{
					$scope.loadingDangNhap = false;
					$scope.sdtKhongTonTai = true;
					$timeout(function(){
						$scope.sdtKhongTonTai = false;
					},5000)
				}
			});
		}
		$scope.DangNhap = function(kieudangnhap){
			khachhangFactory.xacthucThongTin(
				$scope.khachhang.sdt, $scope.maxacnhan.nguoidung)
				.then(function(data){
					console.log('data dang nhap: ',data)
					if(data.data == 'true'){
						$scope.loadingDangNhap = true;
						DangNhapb2(kieudangnhap);
					}else{
						$scope.thongbaomaxacnhan = 'Mã xác nhận không đúng';
						return;
					}
			})
			
		}
		$scope.DangXuat = function(){
			khachhangFactory.setKhachHang($scope.khachhang);
			$cookies.remove('khachhang');
			window.location.href = '/';
			
		}
	});
	module.controller('userController', 
	function(thanhtoanFactory, ngvFactory, khachhangFactory, $scope,$http, $log, $location, $mdDialog, $q, $cookies){

		$scope.Math = window.Math;
		$scope.loading = false;
		$scope.khachhang = {};
		$scope.hudo = false;
		$scope.matdo = false;
		$scope.yeucauNh = [];
		$scope.yeucauDh = [];
		$scope.chitietyeucau = [];
		$scope.isThongTinTk = true;
		$scope.isLichSuYc = false;
		$scope.isChitietYc = false;
		$scope.dsNgvChiTiet = [];
		$scope.ngvChiTiet = {};
		$scope.ctycDangXem = {};
		$scope.ycDangXem = {};
		$scope.nhanxet = null;
		$scope.tienno = 0;
		$scope.isSuaThongTinTK = false;
		var tab = $location.search().tab;
		$scope.doitien = thanhtoanFactory.doiChuoiTienTe;
		var tinhTienNo = function(ycnh, ycdh){
			var tienno = 0;
			for(i=0; i<ycnh.length; i++){
				if(ycnh[i].trangthai != 'Hoàn thành')
					tienno+=ycnh[i].chiphi;
					tienno+=ycnh[i].chiphingoaigio;
					tienno+=ycnh[i].phithoathuan;
			}
			for(i=0; i<ycdh.length; i++){
				if(ycdh[i].trangthai != 'Hoàn thành')
					tienno+=ycdh[i].chiphi;
					tienno+=ycdh[i].chiphingoaigio;
					tienno+=ycdh[i].phithoathuan;
			}
			return thanhtoanFactory.doiChuoiTienTe(tienno);
		}
		$scope.showTTTK = function(){
			$scope.isThongTinTk = true;
			$scope.isLichSuYc = false;
			$scope.isChitietYc = false;
			
			$scope.loading = true;
			var promises = [];
			var promise_ycnganhan = khachhangFactory.getYeuCauNh(Number($cookies.get('khachhang')));
			var promise_ycdaihan = khachhangFactory.getYeuCauDh(Number($cookies.get('khachhang')));
			promises.push(promise_ycnganhan);
			promises.push(promise_ycdaihan);
			$q.all(promises).then(function(data){
				$scope.yeucauNh = data[0];
				$scope.yeucauDh = data[1];
				$scope.tienno = tinhTienNo($scope.yeucauNh, $scope.yeucauDh);
				$scope.loading = false;
			})
		}
		$scope.showLSYC = function(){
			$scope.isThongTinTk = false;
			$scope.isLichSuYc = true;
			$scope.isChitietYc = false;

			$scope.loading = true;
			var promises = [];
			var promise_ycnganhan = khachhangFactory.getYeuCauNh(Number($cookies.get('khachhang')));
			var promise_ycdaihan = khachhangFactory.getYeuCauDh(Number($cookies.get('khachhang')));
			promises.push(promise_ycnganhan);
			promises.push(promise_ycdaihan);
			$q.all(promises).then(function(data){
				$scope.yeucauNh = data[0];
				$scope.yeucauDh = data[1];
				$scope.tienno = tinhTienNo($scope.yeucauNh, $scope.yeucauDh);
				$scope.loading = false;
			})
		}
		$scope.suaThongTinTK = function(i){
			if(i == 0) $scope.isSuaThongTinTK = true;
			else{
				thanhtoanFactory.timKhachHang($scope.khachhang.sdt).then(function(datakh){
					khachhangFactory.suaThongTinTK(datakh[0]._id, $scope.khachhang.hoten, $scope.khachhang.diachi).then(function(){
						$scope.isSuaThongTinTK = false;
					})
				})
				
			}
		}
		$scope.initData = function(){
			$scope.loading = true;
			$scope.khachhang = khachhangFactory.getKhachHang();
			var promises = [];
			var promise_ycnganhan = khachhangFactory.getYeuCauNh(Number($cookies.get('khachhang')));
			var promise_ycdaihan = khachhangFactory.getYeuCauDh(Number($cookies.get('khachhang')));
			promises.push(promise_ycnganhan);
			promises.push(promise_ycdaihan);
			$q.all(promises).then(function(data){
				$scope.yeucauNh = data[0];
				$scope.yeucauDh = data[1];
				$scope.tienno = tinhTienNo($scope.yeucauNh, $scope.yeucauDh);
				$scope.loading = false;
			})
			if(tab == 'tttk'){
				$scope.showTTTK();
			}else{
				$scope.showLSYC();
			}
		}
		$scope.xemChiTietYc = function(yc){
			$scope.ycDangXem = yc;
			$scope.isThongTinTk = false;
			$scope.isLichSuYc = false;
			$scope.isChitietYc = false;
			$scope.loading = true;
			khachhangFactory.getChiTietYeuCau(yc._id).then(function(data){
				$scope.chitietyeucau = data;
				$scope.isChitietYc = true;
				$scope.loading = false;
			})
		}
		$scope.layNgvChiTiet = function(cmnd){
			ngvFactory.layNgvTheoCmnd(cmnd).then(function(data){
				$scope.dsNgvChiTiet.push(data[0]);
			})
		}
		$scope.layTenNgv = function(cmnd) {
			if(angular.isDefined( cmnd )){
				for(i=0; i<$scope.dsNgvChiTiet.length; i++){
					if(angular.isDefined( $scope.dsNgvChiTiet[i] ) && angular.isDefined( $scope.dsNgvChiTiet[i].cmnd )){
						if($scope.dsNgvChiTiet[i].cmnd == cmnd){
							return $scope.dsNgvChiTiet[i].hoten;
						}
					}
					
				}
			}else{
				return '';
			}
			
		}
		$scope.danhgiaCtyc = function(mucdg, tudong){
			if($scope.kiemtraNhanXet() && tudong==0) return;
			if(mucdg == 0){
				$scope.nhanxet = 'Rất kém';
				$('#star1').addClass('fa-star');
				$('#star2').removeClass('fa-star');
				$('#star3').removeClass('fa-star');
				$('#star4').removeClass('fa-star');
				$('#star5').removeClass('fa-star');

				$('#star1').removeClass('fa-star-o');
				$('#star2').addClass('fa-star-o');
				$('#star3').addClass('fa-star-o');
				$('#star4').addClass('fa-star-o');
				$('#star5').addClass('fa-star-o');
			}
			if(mucdg == 1){
				$scope.nhanxet = 'Kém';
				$('#star1').addClass('fa-star');
				$('#star2').addClass('fa-star');
				$('#star3').removeClass('fa-star');
				$('#star4').removeClass('fa-star');
				$('#star5').removeClass('fa-star');

				$('#star1').removeClass('fa-star-o');
				$('#star2').removeClass('fa-star-o');
				$('#star3').addClass('fa-star-o');
				$('#star4').addClass('fa-star-o');
				$('#star5').addClass('fa-star-o');
			}
			if(mucdg == 2){
				$scope.nhanxet = 'Trung bình';
				$('#star1').addClass('fa-star');
				$('#star2').addClass('fa-star');
				$('#star3').addClass('fa-star');
				$('#star4').removeClass('fa-star');
				$('#star5').removeClass('fa-star');

				$('#star1').removeClass('fa-star-o');
				$('#star2').removeClass('fa-star-o');
				$('#star3').removeClass('fa-star-o');
				$('#star4').addClass('fa-star-o');
				$('#star5').addClass('fa-star-o');
			}
			if(mucdg == 3){
				$scope.nhanxet = 'Tốt';
				$('#star1').addClass('fa-star');
				$('#star2').addClass('fa-star');
				$('#star3').addClass('fa-star');
				$('#star4').addClass('fa-star');
				$('#star5').removeClass('fa-star');

				$('#star1').removeClass('fa-star-o');
				$('#star2').removeClass('fa-star-o');
				$('#star3').removeClass('fa-star-o');
				$('#star4').removeClass('fa-star-o');
				$('#star5').addClass('fa-star-o');
			}
			if(mucdg == 4){
				$scope.nhanxet = 'Rất tốt';
				$('#star1').addClass('fa-star');
				$('#star2').addClass('fa-star');
				$('#star3').addClass('fa-star');
				$('#star4').addClass('fa-star');
				$('#star5').addClass('fa-star');

				$('#star1').removeClass('fa-star-o');
				$('#star2').removeClass('fa-star-o');
				$('#star3').removeClass('fa-star-o');
				$('#star4').removeClass('fa-star-o');
				$('#star5').removeClass('fa-star-o');
			}
		}
		var resetNhanXetCtyc = function(){
			$('#star1').removeClass('fa-star');
			$('#star2').removeClass('fa-star');
			$('#star3').removeClass('fa-star');
			$('#star4').removeClass('fa-star');
			$('#star5').removeClass('fa-star');

			$('#star1').addClass('fa-star-o');
			$('#star2').addClass('fa-star-o');
			$('#star3').addClass('fa-star-o');
			$('#star4').addClass('fa-star-o');
			$('#star5').addClass('fa-star-o');
			$scope.hudo = false;
			$scope.matdo = false;
		}
		$scope.kiemtraNhanXet = function(){
			if($scope.ctycDangXem.trangthai == 'Hoàn thành') return true;
			else return false;
		}
		$scope.showDanhgiaCtyc = function(ctyc){
			if(!angular.isDefined( ctyc )) return; 
			for(i=0; i<$scope.dsNgvChiTiet.length; i++){
				if(angular.isDefined( $scope.dsNgvChiTiet[i])){
					if($scope.dsNgvChiTiet[i].cmnd == ctyc.nguoigiupviec){
						$scope.ngvChiTiet = $scope.dsNgvChiTiet[i];
						$scope.ctycDangXem = ctyc;
						$scope.nhanxet = ctyc.nhanxet;
						
						resetNhanXetCtyc();

						if($scope.nhanxet == 'Rất kém') $scope.danhgiaCtyc(0, 1);
						if($scope.nhanxet == 'Kém') $scope.danhgiaCtyc(1, 1);
						if($scope.nhanxet == 'Trung bình') $scope.danhgiaCtyc(2, 1);
						if($scope.nhanxet == 'Tốt') $scope.danhgiaCtyc(3, 1);
						if($scope.nhanxet == 'Rất tốt') $scope.danhgiaCtyc(4, 1);
						if(ctyc.hudo == 'Có') $scope.hudo = true;
						if(ctyc.matdo == 'Có') $scope.matdo = true;
					}
				}
				
			}
			if($scope.ctycDangXem.trangthai == 'Đã giao' || $scope.ctycDangXem.trangthai == 'Chưa liên hệ')
				$('#nhanxet').modal({backdrop: 'static', keyboard: false},'show');
			else if($scope.ctycDangXem.trangthai == 'Hoàn thành'){
				$('#nhanxet').modal({backdrop: 'static', keyboard: false},'show');
			}else{
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Yêu cầu này chưa được giao việc!!')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			}
		var kiemtraYeuCauHoanThanh = function(chitietyeucau){
			for(i=0;i<chitietyeucau.length;i++){
				if(chitietyeucau[i].trangthai != 'Hoàn thành')
					return false;
			}
			return true;
		}	
		$scope.luuNhanXet = function(){
			khachhangFactory.luuNhanXet($scope.ctycDangXem, $scope.nhanxet, $scope.hudo, $scope.matdo).then(function(data){				
				khachhangFactory.getChiTietYeuCau($scope.ycDangXem._id).then(function(data){
					$scope.chitietyeucau = data;
					if(kiemtraYeuCauHoanThanh($scope.chitietyeucau)){
						khachhangFactory.hoanthanhYeuCau($scope.ycDangXem._id).then(function(){
							$('#nhanxet').modal('hide');
							$scope.xemChiTietYc($scope.ycDangXem);
						});
					}else{
						if($scope.ycDangXem.trangthai == 'Chờ thỏa thuận' || 
							$scope.ycDangXem.trangthai == 'Chưa tiến hành'){
							khachhangFactory.tienhanhYeuCau($scope.ycDangXem._id).then(function(){
								$('#nhanxet').modal('hide');
								$scope.xemChiTietYc($scope.ycDangXem);
							});
						}
					}
				})
				
				
			})
		}
	}
	});
	module.controller('indexController', function(filterFactory, ngvFactory, $scope, $http, $log, $location, $mdDialog){
		$scope.data = {
			quan: $location.search().quan,
			dichvu: [],
		    giobd1: $location.search().giobd1,
		    giokt1: $location.search().giokt1,
		    danhsachquan: [
		    ],
		    danhsachdichvu: [],
		    availableOptions: [
			      {id: 360, name: '6:00 giờ'},
			      {id: 390, name: '6:30 giờ'},
			      {id: 420, name: '7:00 giờ'},
			      {id: 450, name: '7:30 giờ'},
			      {id: 480, name: '8:00 giờ'},
			      {id: 510, name: '8:30 giờ'},
			      {id: 540, name: '9:00 giờ'},
			      {id: 570, name: '9:30 giờ'},
			      {id: 600, name: '10:00 giờ'},
			      {id: 630, name: '10:30 giờ'},
			      {id: 660, name: '11:00 giờ'},
			      {id: 690, name: '11:30 giờ'},
			      {id: 720, name: '12:00 giờ'},
			      {id: 750, name: '12:30 giờ'},
			      {id: 780, name: '13:00 giờ'},
			      {id: 810, name: '13:30 giờ'},
			      {id: 840, name: '14:00 giờ'},
			      {id: 870, name: '14:30 giờ'},
			      {id: 900, name: '15:00 giờ'},
			      {id: 930, name: '15:30 giờ'},
			      {id: 960, name: '16:00 giờ'},
			      {id: 990, name: '16:30 giờ'},
			      {id: 1020, name: '17:00 giờ'},
			      {id: 1050, name: '17:30 giờ'},
			      {id: 1080, name: '18:00 giờ'},
			      {id: 1110, name: '18:30 giờ'},
			      {id: 1140, name: '19:00 giờ'},
			      {id: 1170, name: '19:30 giờ'},
			      {id: 1200, name: '20:00 giờ'}
		    ],
	    };

		const factoryData= filterFactory.getDuLieuPage();
		$scope.data.danhsachquan=factoryData.danhsachquan;
		$scope.data.danhsachdichvu=factoryData.danhsachdichvu;


	    for(i=0; i<$scope.data.availableOptions.length; i++){
	    	if(Number($scope.data.giobd1) == $scope.data.availableOptions[i].id)
	    		$scope.data.giobd1 = $scope.data.availableOptions[i].id;
	    	if(Number($scope.data.giokt1) == $scope.data.availableOptions[i].id)
	    		$scope.data.giokt1 = $scope.data.availableOptions[i].id;
	    }
	    filterFactory.getDSTieuChi().then(function(data){
			for(i=0; i<data.length; i++){
				$scope.data.danhsachdichvu.push({
					ten:data[i].tentieuchi
				});
			}
		});
		filterFactory.getDSQuan().then(function(data){
			for(i=0; i<data.length; i++){
				$scope.data.danhsachquan.push(
					data[i].tenquan
				);
			}
		})
	    $('#formTheoNgay').submit(function(ev) {
            ev.preventDefault(); // to stop the form from submitting
            /* Validations go here */
            var bd1 = Number($("#gbdnh").val());
            var kt1 = Number($("#gktnh").val());
            var dichvu = $("#dichvunh").val();
            var quan = $("#quannh").val();
            var ngay = $("input[name=ngay]").val();
            var ngayarr = ngay.split('/');
            var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            //validate empty field
            if(quan == ''){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn quận!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            if(ngay == ''){
            	$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn ngày!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return; 
            }
            if(bd1 == 0){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn giờ bắt đầu!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            if(kt1 == 0){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn giờ kết thúc!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            //end validate empty field

            //validate date time
            if(ngayarr[0] == now.getDate() 
                && ngayarr[1] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {
                	$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('body')))
				        .clickOutsideToClose(true)
				        .title('Thông báo')
				        .content('Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) +
                     	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).')
				        .ok('Đồng ý!')
				        .targetEvent(ev)
				    );
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('body')))
				        .clickOutsideToClose(true)
				        .title('Thông báo')
				        .content('Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.')
				        .ok('Đồng ý!')
				        .targetEvent(ev)
				    );
                return;
            }
            if(((kt1-bd1)%60)!=0 && kt1 && bd1 != 0 && kt1 != 0) {
            	$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('body')))
				        .clickOutsideToClose(true)
				        .title('Thông báo')
				        .content('Khoảng cách thời gian phải là 2,3,4,5... tiếng.')
				        .ok('Đồng ý!')
				        .targetEvent(ev)
				    );
                return;
            }
            this.submit();
        });
        $('#formDaiHan').submit(function(ev) {
            ev.preventDefault(); // to stop the form from submitting
            /* Validations go here */
            var bd1 = Number($("#gbddh").val());
            var kt1 = Number($("#gktdh").val());
            var quan = $("#quandh").val();
            var dichvu = $("#dichvudh").val();
            var ngaybd = $("input[name=ngaybd]").val();
            var ngaykt = $("input[name=ngaykt]").val();
            var ngaybdarr = ngaybd.split('/');
            var ngayktarr = ngaykt.split('/');
            var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            //validate empty field
            if(quan == ''){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn quận!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            if(ngaybd == ''){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn ngày bắt đầu!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return; 
            }
            if(ngaykt == ''){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn ngày kết thúc!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return; 
            }
            if(bd1 == 0){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn giờ bắt đầu!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            if(kt1 == 0){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn giờ kết thúc!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            //end validate empty field
            //validate date time
            if(ngaybdarr[0] == now.getDate() 
                && ngaybdarr[1] == now.getMonth()+1 
                && ngaybdarr[2] == now.getFullYear()){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Ngày bắt đầu không được là ngày hiện tại!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            if(ngaybdarr[1] == ngayktarr[1] 
                && ngaybdarr[0] == ngayktarr[0] 
                && ngaybdarr[2] == ngayktarr[2]){
            	$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Ngày bắt đầu không được trùng với ngày kết thúc.')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            function parseDate(str) {
			    var mdy = str.split('/')
			    return new Date(mdy[2], mdy[1]-1, mdy[0]);
			}

			function daydiff(first, second) {
			    return Math.round((second-first)/(1000*60*60*24));
			}

            //kiem tra ngay bd và ngay kt
            if(daydiff(parseDate(ngaybd), parseDate(ngaykt)) <0){
            	$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Ngày bắt đầu không được lớn hơn ngày kết thúc.')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
			    return;
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            if(((kt1-bd1)%60)!=0 && kt1 && bd1 != 0 && kt1 != 0) {
            	$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('body')))
				        .clickOutsideToClose(true)
				        .title('Thông báo')
				        .content('Khoảng cách thời gian phải là 2,3,4,5... tiếng.')
				        .ok('Đồng ý!')
				        .targetEvent(ev)
				    );
                return;
            }
            this.submit();
        });
	});
	module.controller('slickController', function(ngvFactory, filterFactory, $scope, $http, $log, $location, $mdDialog, $timeout){
		$scope.dsNgv = [];
		$scope.loadingSlick = true;
		$scope.slickconfig = {
			dots: false,
	        infinite: false,
	        speed: 300,
	        slidesToShow: 4,
	        slidesToScroll: 4,
	        rows: 2,
	        arrows: true,
	        responsive: [
	            {
	              breakpoint: 1024,
	              settings: {
	                slidesToShow: 3,
	                slidesToScroll: 3,
	              }
	            },
	            {
	              breakpoint: 600,
	              settings: {
	                slidesToShow: 2,
	                slidesToScroll: 2,
	                arrows: false
	              }
	            },
	            {
	              breakpoint: 480,
	              settings: {
	                slidesToShow: 1,
	                slidesToScroll: 1,
	                arrows: false
	              }
	            }
        	]
		}
		ngvFactory.layDanhSachNgvAll()
		.then(function(data){
			console.log('slick lay ngv: ',data)
			$scope.dsNgv = data;
			$scope.loadingSlick = false;
		})
		$scope.idngv = '';
		$scope.tinhTuoiNgv = filterFactory.tinhTuoiNgv;
		$scope.xemChiTietNgv = function(id){
			$scope.idngv = id;
			$timeout(function(){
				$('#xemchitietngvform').submit();
			},300);
		}
	});
	module.controller('chitietController', function(khachhangFactory, thanhtoanFactory, filterFactory, ngvFactory, $scope, $http, $log, $location, $mdDialog, $q, $timeout, $cookies){
		$scope.ngvDcChon = null;
		$scope.loading = true;
		$scope.isThanhToan = false;
		$scope.ngv_sub1 = null;
		$scope.ngv_sub2 = null;
		$scope.loading_yeucau = false;
		$scope.tieuchis = [];
		$scope.mang_tieuchi = [];
		$scope.hoanthanh_thanhtoan_ct = false;
		$scope.dalayMXN = false;
		var idngv = $('#idngv').val();
		$scope.data = {
			soluongdv: 0,
			isReverse: false,
			ngay: null,
			quan: null,
		    giobd1: null,
		    giokt1: null,
		    thongbaongaygio: 'Xin chọn ngày giờ giúp việc!!',
		    thongbaodichvu: '',
		    availableOptions: [
			      {id: 360, name: '6:00 giờ'},
			      {id: 390, name: '6:30 giờ'},
			      {id: 420, name: '7:00 giờ'},
			      {id: 450, name: '7:30 giờ'},
			      {id: 480, name: '8:00 giờ'},
			      {id: 510, name: '8:30 giờ'},
			      {id: 540, name: '9:00 giờ'},
			      {id: 570, name: '9:30 giờ'},
			      {id: 600, name: '10:00 giờ'},
			      {id: 630, name: '10:30 giờ'},
			      {id: 660, name: '11:00 giờ'},
			      {id: 690, name: '11:30 giờ'},
			      {id: 720, name: '12:00 giờ'},
			      {id: 750, name: '12:30 giờ'},
			      {id: 780, name: '13:00 giờ'},
			      {id: 810, name: '13:30 giờ'},
			      {id: 840, name: '14:00 giờ'},
			      {id: 870, name: '14:30 giờ'},
			      {id: 900, name: '15:00 giờ'},
			      {id: 930, name: '15:30 giờ'},
			      {id: 960, name: '16:00 giờ'},
			      {id: 990, name: '16:30 giờ'},
			      {id: 1020, name: '17:00 giờ'},
			      {id: 1050, name: '17:30 giờ'},
			      {id: 1080, name: '18:00 giờ'},
			      {id: 1110, name: '18:30 giờ'},
			      {id: 1140, name: '19:00 giờ'},
			      {id: 1170, name: '19:30 giờ'},
			      {id: 1200, name: '20:00 giờ'}
		    ],
	    };
	    $scope.maxacnhan = {
	    	nguoidung: null
	    };
		
	    $scope.khachhang = {
	    	sdt: null,
	    	hoten: null,
	    	diachi: null,
	    };
	    $scope.$watch('khachhang.sdt', function(newVal, oldVal){
			if(newVal == null) return;
			if(newVal.toString().length < 10) {
				return;
			}
			else {
				thanhtoanFactory.timKhachHang($scope.khachhang.sdt).then(function(data){
					if(data.length > 0){
						$scope.khachhang.hoten = data[0].hoten;
						$scope.khachhang.diachi = data[0].diachi
					}
				});
			}
		});
		$scope.tinhTuoiNgv = filterFactory.tinhTuoiNgv;
		$scope.chuyenNgv = function(id){
			$timeout(function(){
				$scope.loadingSlick = false;
				var promise1 = ngvFactory.layNgvTheoId(id).then(function(data){
					$scope.ngvDcChon = data[0];
				})
				var promise2 = ngvFactory.layDanhSachNgvSub(id).then(function(data){
					if(data.length == 1){
						$scope.ngv_sub1 = data[0];
					}
					if(data.length == 2){
						$scope.ngv_sub1 = data[0];
						$scope.ngv_sub2 = data[1];
					}
					if(data.length > 2){
						var min = 0;
						var max = data.length-1;
						var random = [];
						var random1 = Math.floor(Math.random() * (max - min + 1)) + min;
						var random2; 
						while(true){
							random2 = Math.floor(Math.random() * (max - min + 1)) + min;
							if(random2 != random1) break;
						}
						$scope.ngv_sub1 = data[random1];
						$scope.ngv_sub2 = data[random2];
					}
				})
				var promise3 = filterFactory.getDSTieuChi().then(function(data){
					$scope.tieuchis = [];
					for(i=0; i<data.length; i++){
						$scope.tieuchis.push({
							ten: data[i].tentieuchi,
							id: i,
							data: false,
							giachuan: data[i].giachuan,
							phuphi: data[i].phuphi,
							phingoaigiongv: data[i].phingoaigiongv,
							phingoaigiokh: data[i].phingoaigiokh,
						});
					}
				});
				$q.all([promise1, promise2, promise3]).then(function(){
					$scope.data.quan = $scope.ngvDcChon.diachi.quan;
					$scope.loading = false;
					$scope.loadingSlick = true;
				})
			},500)
			
		}
		$scope.checkDichVuNgvDcChon = function(dichvu){
			for(i=0; i<$scope.ngvDcChon.sotruong.length; i++){
				if(dichvu == $scope.ngvDcChon.sotruong[i]) return false;
			}
			return true;
		}
		$scope.layDiaChi = function(){
			if(navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					khachhangFactory.layDiaChiGoogleMapApi(pos.lat, pos.lng).then(function(data){
						$scope.khachhang.diachi = data.results[0].formatted_address;
					})
					
				});
			}
			// Browser doesn't support Geolocation
			else {
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Trình duyệt không hỗ trợ chức năng này!!')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			}
		}
		$scope.layMaXacNhan = function(){
			if($scope.khachhang.sdt == null)
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin nhập số điện thoại')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			else{
				$scope.dalayMXN = true;
				$timeout(function(){
					$scope.dalayMXN = false;
				},180000)
				khachhangFactory.layMaXacNhan($scope.khachhang.sdt);
			}
		}
		$scope.close_thanhtoan = function(){
			$scope.isThanhToan = false;
		}
		$scope.initData = function(){
			var promise1 = ngvFactory.layNgvTheoId(idngv).then(function(data){
				$scope.ngvDcChon = data[0];
			})
			var promise2 = ngvFactory.layDanhSachNgvSub(idngv).then(function(data){
				if(data.length == 1){
					$scope.ngv_sub1 = data[0];
				}
				if(data.length == 2){
					$scope.ngv_sub1 = data[0];
					$scope.ngv_sub2 = data[1];
				}
				if(data.length > 2){
					var min = 0;
					var max = data.length-1;
					var random = [];
					var random1 = Math.floor(Math.random() * (max - min + 1)) + min;
					var random2; 
					while(true){
						random2 = Math.floor(Math.random() * (max - min + 1)) + min;
						if(random2 != random1) break;
					}
					$scope.ngv_sub1 = data[random1];
					$scope.ngv_sub2 = data[random2];
				}
			})
			var promise3 = filterFactory.getDSTieuChi().then(function(data){
				for(i=0; i<data.length; i++){
					$scope.tieuchis.push({
						ten: data[i].tentieuchi,
						id: i,
						data: false,
						giachuan: data[i].giachuan,
						phuphi: data[i].phuphi,
						phingoaigiongv: data[i].phingoaigiongv,
						phingoaigiokh: data[i].phingoaigiokh,
					});
				}
			});
			$q.all([promise1, promise2, promise3]).then(function(){
				$scope.data.quan = $scope.ngvDcChon.diachi.quan;
				$scope.loading = false;
			})
		}
		$scope.show_yeucau = function(){
			$scope.isThanhToan = true;
		}
		$scope.hoanthanh_thanhtoan = function(i){
			if(i==1){
	    		var expireDate = new Date();
				expireDate.setDate(expireDate.getDate() + 1);
				$cookies.remove('khachhang');
				$cookies.put('khachhang', $scope.khachhang.sdt, {'expires': expireDate});
	    		window.location.href = "/taikhoan?tab=lsdh";
	    	}
	    	else{
	    		window.location.href = "/";
	    	}
		}
		$scope.checkThanhToan = function(){
			if($scope.data.thongbaongaygio == '' && 
				$scope.data.ngay != null &&
				$scope.data.giobd1 != null &&
				$scope.data.giokt1 != null){
				return true;
			}else{
				return false;
			}
		}
		$scope.checkDichVu = function(){
			if($scope.data.soluongdv >0) return true;
			else return false;
		}
		//gia tri preselect la gia tri true/false của dịch vụ trước khi chọn select
		$scope.them_dichvu = function(preSelect){
			if(preSelect == false) {
				$scope.data.soluongdv++;
			}else {
				$scope.data.soluongdv--;
			}
		}
		//--------------------tinh tien--------------------------
		
	    $scope.tinhtien_ct = function(){
	    	if($scope.loading == true || 
	    		$scope.data.giokt1 == null || 
	    		$scope.data.giobd1 == null || 
	    		$scope.data.ngay == null) return;
	    	
	    	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
	    	var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);

	    	var sogiongoaigioCtyc = thanhtoanFactory.tinhSoGioNgoaiGioCtyc($scope.data.giobd1,
        															   $scope.data.giokt1); 

	    	var phichuan = thanhtoanFactory.tinhGiaChuanCtyc($scope.data.giobd1,
	        		 									    $scope.data.giokt1, 
	        		 									    phicobanlonnhat);

	    	var phingoaigio = thanhtoanFactory.tinhPhiNgoaiGioCtyc(sogiongoaigioCtyc,
    															phingoaigiolonnhat,
    															phicobanlonnhat);

	    	return thanhtoanFactory.doiChuoiTienTe(phichuan + phingoaigio);
	    }
	    $scope.showTrangThaiYc = function(){
	    	var tt = thanhtoanFactory.getTrangThaiYeuCau($scope.tieuchis);
	    	if(tt == 'Chưa tiến hành')
	    		return 'Không có phụ phí';
	    	else return 'Có phụ phí';
	    }
	    $scope.showPhiNgoaiGio = function(){
	    	if($scope.loading == true || 
	    		$scope.data.giokt1 == null || 
	    		$scope.data.giobd1 == null || 
	    		$scope.data.ngay == null) return;
	    	
	    	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
	    	var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);

	    	var sogiongoaigioCtyc = thanhtoanFactory.tinhSoGioNgoaiGioCtyc($scope.data.giobd1,
        															   $scope.data.giokt1); 

	    	var phichuan = thanhtoanFactory.tinhGiaChuanCtyc($scope.data.giobd1,
	        		 									    $scope.data.giokt1, 
	        		 									    phicobanlonnhat);

	    	var phingoaigio = thanhtoanFactory.tinhPhiNgoaiGioCtyc(sogiongoaigioCtyc,
    															phingoaigiolonnhat,
    															phicobanlonnhat);

	    	return thanhtoanFactory.doiChuoiTienTe(phingoaigio);
	    }
	    $scope.showPhiCoBan = function(){
	    	if($scope.loading == true || 
	    		$scope.data.giokt1 == null || 
	    		$scope.data.giobd1 == null || 
	    		$scope.data.ngay == null) return;
	    	
	    	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
	    	var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);

	    	var sogiongoaigioCtyc = thanhtoanFactory.tinhSoGioNgoaiGioCtyc($scope.data.giobd1,
        															   $scope.data.giokt1); 

	    	var phichuan = thanhtoanFactory.tinhGiaChuanCtyc($scope.data.giobd1,
	        		 									    $scope.data.giokt1, 
	        		 									    phicobanlonnhat);

	    	var phingoaigio = thanhtoanFactory.tinhPhiNgoaiGioCtyc(sogiongoaigioCtyc,
    															phingoaigiolonnhat,
    															phicobanlonnhat);

	    	return thanhtoanFactory.doiChuoiTienTe(phichuan);
	    }
	    //-------------------------------------------------------
	    //--------------------luu yeu cau------------------------
	    var layDanhSachDichVu = function(){
	    	var result = [];
	    	for(i=0; i<$scope.tieuchis.length; i++){
	    		if($scope.tieuchis[i].data == true)
	    			result.push($scope.tieuchis[i].ten);
	    	}
	    	return result;
	    }
	    var luu_yeucau_b2 = function(){
	    	$scope.loading_yeucau = true;
            $http.get('http://localhost:4444/api/khachhang?sdt='+$scope.khachhang.sdt, { cache: false})
		        .then(function(data) {
		        	var trangthaiyc = thanhtoanFactory.getTrangThaiYeuCau($scope.tieuchis);
		        	var mangdichvu = layDanhSachDichVu();

		        	var phicobanlonnhat = thanhtoanFactory.getPhiCoBanLonNhat($scope.tieuchis);
					var phingoaigiolonnhat = thanhtoanFactory.getPhiNgoaiGioLonNhat($scope.tieuchis);
					var phingoaigiolonnhatNgv = thanhtoanFactory.getPhiNgoaiGioLonNhatNgv($scope.tieuchis);

		        	var sogiongoaigioCtyc = thanhtoanFactory.tinhSoGioNgoaiGioCtyc($scope.data.giobd1,
				        															 $scope.data.giokt1);
		        	var chiphingoaigioCtyc = thanhtoanFactory.tinhPhiNgoaiGioCtyc(sogiongoaigioCtyc,
		        															phingoaigiolonnhat,
		        															phicobanlonnhat);
		        	var dulieu_luuyeucau = {
			        		trangthaiyc: trangthaiyc,
			        		mangdichvu: mangdichvu,
			        		ngay: $scope.data.ngay,
			        		chiphi: thanhtoanFactory.tinhGiaChuanCtyc($scope.data.giobd1,
			        		 									    $scope.data.giokt1, 
			        		 									    phicobanlonnhat),
			        		khachhang: $scope.khachhang,
			        		quan: $scope.data.quan,
			        		ngv_dc_chon: $scope.ngvDcChon.cmnd,
			        		giobd1: $scope.data.giobd1,
			        		giokt1: $scope.data.giokt1,
			        		phicobanlonnhat: phicobanlonnhat,
			        		sogiongoaigioCtyc: sogiongoaigioCtyc,
			        		chiphingoaigioCtyc: chiphingoaigioCtyc,
			        		phingoaigio: phingoaigiolonnhat,
			        		phingoaigiongv: phingoaigiolonnhatNgv
			        	};
		        	if(data.length>0){
		        		
			        	$http.post('/luuyeucau_tt', dulieu_luuyeucau)
					        .then(function(data) {
					        	if(data = 'done'){
					        		$scope.hoanthanh_thanhtoan_ct = true;
									$scope.loading_yeucau = false;
					        	}
					        }).catch(function(data) {
					            console.log('Error: ' + data);
			        		});
		        	}else{
		        		//lưu khách hàng
			            thanhtoanFactory.luuKhachHang($scope.khachhang);					            
			            //Lưu yêu cầu
			        	$http.post('/luuyeucau_tt', dulieu_luuyeucau)
					        .then(function(data) {
					        	if(data = 'done'){
					        		$scope.hoanthanh_thanhtoan_ct = true;
									$scope.loading_yeucau = false;
					        	}
					        }).catch(function(data) {
					            console.log('Error: ' + data);
			        		});
		        	}
		        })
		        .catch(function(data) {
		            console.log('Error: ' + data);
    			});
	    }
	    $scope.luu_yeucau = function(){
	    	khachhangFactory.xacthucThongTin(
				$scope.khachhang.sdt, $scope.maxacnhan.nguoidung).then(function(data){
					if(data == 'true'){
						luu_yeucau_b2();
					}else{
						$mdDialog.show(
					      $mdDialog.alert()
					        .parent(angular.element(document.querySelector('body')))
					        .clickOutsideToClose(true)
					        .title('Thông báo')
					        .content('Mã xác nhận chưa đúng!!')
					        .ok('Đồng ý!')
					        .targetEvent(null)
					    );
					    return;
					}
			})
	    	
	    }
	    //-------------------------------------------------------
		//--------------------watch------------------------------

		$scope.$watch('data.soluongdv', function(newVal, oldVal){
			if(newVal==0) {
				$scope.data.thongbaodichvu = 'Cần chọn ít nhất 1 dịch vụ!!';
			}
			else {
				$scope.data.thongbaodichvu = '';
			}
		});
		$scope.$watch('data.ngay', function(newVal, oldVal){
			if($scope.data.ngay == null || 
			   $scope.data.giobd1 == null || 
			   $scope.data.giokt1 == null) return;
			var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);
	    	var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngayarr = $scope.data.ngay.split('/');
	    	if(ngayarr[0] == now.getDate() 
                && ngayarr[1] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {

                	$scope.data.thongbaongaygio = 'Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) + 
                    	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).';
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$scope.data.thongbaongaygio = 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.';
            	
                return;
            }
            if(((kt1-bd1)%60)!=0  && bd1 != 0 && kt1 != 0) {
            	$scope.data.thongbaongaygio = 'Khoảng cách thời gian phải từ 2,3,4,5.. tiếng.';
                return;
            }
            $scope.data.thongbaongaygio = 'Đang kiểm tra lịch làm việc.....';
            ngvFactory.kiemtraLlv($scope.ngvDcChon.cmnd, 
            	filterFactory.doiNgaySearch($scope.data.ngay),
            	$scope.data.giobd1,
            	$scope.data.giokt1).then(function(data){
            		if(data.length >0) {
            			$scope.data.thongbaongaygio = 'Nhân viên đã có lịch làm việc ở khung giờ này!!';
            			
            		}else{
            			$scope.data.thongbaongaygio = 'Đang kiểm tra lịch nghỉ';
            			ngvFactory.kiemtraLichBan($scope.ngvDcChon.cmnd, 
				            	filterFactory.doiNgaySearch($scope.data.ngay),
				            	$scope.data.giobd1,
				            	$scope.data.giokt1).then(function(data){
				            		if(data.length >0) {
				            			$scope.data.thongbaongaygio = 'Nhân viên đã có lịch nghỉ ở khung giờ này!!';
				            		}else{
				            			$scope.data.thongbaongaygio = '';
				            		}
				            	})
            		}
            	})
            
		});
		$scope.$watch('data.giobd1', function(newVal, oldVal){
			if($scope.data.ngay == null || 
			   $scope.data.giobd1 == null || 
			   $scope.data.giokt1 == null) return;
			var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);
	    	var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngayarr = $scope.data.ngay.split('/');
	    	if(ngayarr[0] == now.getDate() 
                && ngayarr[1] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {
                	$scope.data.thongbaongaygio = 'Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) + 
                    	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).';
                    
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$scope.data.thongbaongaygio = 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.';
            	
                return;
            }
            if(((kt1-bd1)%60)!=0  && bd1 != 0 && kt1 != 0) {
            	$scope.data.thongbaongaygio = 'Khoảng cách thời gian phải từ 2,3,4,5.. tiếng.';
                return;
            }
            $scope.data.thongbaongaygio = 'Đang kiểm tra lịch làm việc.....';
            ngvFactory.kiemtraLlv($scope.ngvDcChon.cmnd, 
            	filterFactory.doiNgaySearch($scope.data.ngay),
            	$scope.data.giobd1,
            	$scope.data.giokt1).then(function(data){
            		if(data.length >0) {
            			$scope.data.thongbaongaygio = 'Nhân viên đã có lịch làm việc ở khung giờ này!!';
            			
            		}else{
            			$scope.data.thongbaongaygio = 'Đang kiểm tra lịch nghỉ';
            			ngvFactory.kiemtraLichBan($scope.ngvDcChon.cmnd, 
				            	filterFactory.doiNgaySearch($scope.data.ngay),
				            	$scope.data.giobd1,
				            	$scope.data.giokt1).then(function(data){
				            		if(data.length >0) {
				            			$scope.data.thongbaongaygio = 'Nhân viên đã có lịch nghỉ ở khung giờ này!!';
				            		}else{
				            			$scope.data.thongbaongaygio = '';
				            		}
				            	})
            		}
            	})
           	
            
		});
		$scope.$watch('data.giokt1', function(newVal, oldVal){
			if($scope.data.ngay == null || 
			   $scope.data.giobd1 == null || 
			   $scope.data.giokt1 == null) return;
			var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);
	    	var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngayarr = $scope.data.ngay.split('/');
	    	if(ngayarr[0] == now.getDate() 
                && ngayarr[1] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {
                	$scope.data.thongbaongaygio = 'Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) + 
                    	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).';
                   	
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$scope.data.thongbaongaygio = 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.';
            	
                return;
            }
            if(((kt1-bd1)%60)!=0  && bd1 != 0 && kt1 != 0) {
            	$scope.data.thongbaongaygio = 'Khoảng cách thời gian phải từ 2,3,4,5.. tiếng.';
                return;
            }
            $scope.data.thongbaongaygio = 'Đang kiểm tra lịch làm việc.....';
            ngvFactory.kiemtraLlv($scope.ngvDcChon.cmnd, 
            	filterFactory.doiNgaySearch($scope.data.ngay),
            	$scope.data.giobd1,
            	$scope.data.giokt1).then(function(data){
            		if(data.length >0) {
            			$scope.data.thongbaongaygio = 'Nhân viên đã có lịch làm việc ở khung giờ này!!';
            			
            		}else{
            			$scope.data.thongbaongaygio = 'Đang kiểm tra lịch nghỉ';
            			ngvFactory.kiemtraLichBan($scope.ngvDcChon.cmnd, 
				            	filterFactory.doiNgaySearch($scope.data.ngay),
				            	$scope.data.giobd1,
				            	$scope.data.giokt1).then(function(data){
				            		if(data.length >0) {
				            			$scope.data.thongbaongaygio = 'Nhân viên đã có lịch nghỉ ở khung giờ này!!';
				            		}else{
				            			$scope.data.thongbaongaygio = '';
				            		}
				            	})
            		}
            	})
            
		});
		//--------------end watch-----------------------
		$scope.loadingSlick = true;
		$scope.slickconfig = {
			lazyLoad: 'ondemand',
			dots: false,
	        infinite: true,
	        speed: 300,
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        rows: 1,
	        arrows: true
		}
	});
	module.controller('contactController', function(doitacFactory, $scope, $http, $mdDialog){
		$scope.contact = {
			ten: null,
			sdt: null,
			email: null,
			noidung: null
		}
		$scope.doitac = [];
		var getDoitac = function(){
			doitacFactory.layDoiTac().then(function(data){
				$scope.doitac = data;
			})
		}
		getDoitac();
		$scope.loadingSlick = true;
		$scope.slickconfig = {
			lazyLoad: 'ondemand',
			dots: false,
	        infinite: true,
	        speed: 300,
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        rows: 1,
	        arrows: true
		}
		$scope.guiEmail = function(){
			var data = {ten:$scope.contact.ten,
					    sdt:$scope.contact.sdt,
					    email:$scope.contact.email,
					    noidung:$scope.contact.noidung};
			$http.post('/sendmail',data)
		        .then(function(data) {
		        	$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('body')))
				        .clickOutsideToClose(true)
				        .title('Thông báo')
				        .content('Mail đã được gửi, chúng tôi sẽ trả lời sớm nhất có thể!')
				        .ok('Đồng ý!')
				        .targetEvent(null)
				    );
		        }).catch(function(data) {
		            console.log('Error: ' + data);
        		});
		}

	});
	module.controller('doitacController', function(doitacFactory, $scope, $http, $mdDialog){
		
		$scope.doitac = [];
		var getDoitac = function(){
			doitacFactory.layDoiTac().then(function(data){
				$scope.doitac = data;

			})
		}
		getDoitac();
		$scope.loadingSlick = true;
		$scope.slickconfig = {
			centerMode: true,
			lazyLoad: 'ondemand',
			dots: false,
	        infinite: true,
	        speed: 300,
	        slidesToShow: 5,
	        slidesToScroll: 1,
	        rows: 1,
	        arrows: true,
	        responsive: [
	            {
	              breakpoint: 1024,
	              settings: {
	                slidesToShow: 3,
	                slidesToScroll: 3,
	              }
	            },
	            {
	              breakpoint: 600,
	              settings: {
	                slidesToShow: 2,
	                slidesToScroll: 2,
	                arrows: false
	              }
	            },
	            {
	              breakpoint: 480,
	              settings: {
	                slidesToShow: 1,
	                slidesToScroll: 1,
	                arrows: false
	              }
	            }
        	]
		}

	});
	module.controller('banggiaController', function(filterFactory, $scope, $http){
		$scope.tieuchi = [];
		filterFactory.getDSTieuChi()
		.then(function(data){
			$scope.tieuchi = data;
		})
	});
})();