(function(){
	//search module
	var module = angular.module('BlogAdminModule',
	 ['ngMaterial','ngRoute','ngTable','textAngular','angularFileUpload']);
	
	//var chitietModule = angular.module('ChitietModule', ['ngMaterial','ngMessages','slickCarousel','ngRoute']);
	module.config(function($mdThemingProvider, $locationProvider, $routeProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('green');
        //routing DOESN'T work without html5Mode
        $locationProvider.html5Mode({
        	enabled: true,
        	reloadOnSearch: true
        });
        $routeProvider.
	      when('/blog_admin', {
	        templateUrl: 'partials/blog-table.html',
	      }).
	      when('/blog_admin/newblog', {
	        templateUrl: 'partials/blog-new.html',
	      }).
	      when('/blog_admin/img', {
	        templateUrl: 'partials/blog-img.html',
	      }).
	      when('/blog_admin/doitac', {
	        templateUrl: 'partials/blog-partner.html',
	      }).
	      when('/blog_admin/img/newimg', {
	        templateUrl: 'partials/blog-img-new.html',
	      }).
	      when('/blog_admin/:blogId', {
	        templateUrl: 'partials/blog-edit.html',
	      }).
	      otherwise({
	        redirectTo: '/blog_admin'
	      });
        //routing DOESN'T work without html5Mode
        $locationProvider.html5Mode({
        	enabled: true,
        	reloadOnSearch: true
        });
	});
	module.factory('blogFactory', function($http, $q){
		var service = {};
		var api_url = 'http://localhost:4444/api';
		service.getBlogs = async function(){
			// var deferred = $q.defer();
			// $http.get(api_url+'/blog', { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     }).catch(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;
			try{
				await $http.get(api_url+'/blog')
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.getBlogById =async function(_id){
			// var deferred = $q.defer();
			// $http.get(api_url+'/blog?_id='+_id, { cache: false})
		    //     .success(function(data) {
		    //     	deferred.resolve(data);
		    //     }).catch(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;
			try{
				await $http.get(api_url+'/blog?_id='+_id)
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.checkBlogUrl =async function(_url){
			// var deferred = $q.defer();
			// $http.get(api_url+'/blog?url='+_url, { cache: false})
		    //     .success(function(data) {
		    //     	deferred.resolve(data);
		    //     }).catch(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;

			try{
				await $http.get(api_url+'/blog?url='+_url)
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.checkBlogUrlEdit =async function(_url, _id){
			// var deferred = $q.defer();
			// $http.get(api_url+'/blog?url='+_url+'&_id__nin='+_id, { cache: false})
		    //     .success(function(data) {
		    //     	deferred.resolve(data);
		    //     }).catch(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;
			try{
				await $http.get(api_url+'/blog?url='+_url+'&_id__nin='+_id)
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.addNewBlog = function(_blog){
			var deferred = $q.defer();
			$http.post(api_url+'/blog', _blog)
		        .success(function(data) {
		        	deferred.resolve(data);
		        }).catch(function(data) {
		            console.log('Error: ' + data);
        		});
		    return deferred.promise;
		}
		service.removeBlog = function(_id){
			var deferred = $q.defer();
			$http.delete(api_url+'/blog/'+_id)
		        .success(function(data) {
		        	deferred.resolve(data);
		        }).catch(function(data) {
		            console.log('Error: ' + data);
        		});
		    return deferred.promise;
		}
		service.editBlogTags = function(_id, _tags){
			var deferred = $q.defer();
			var data = {
				tags: _tags
			}
			$http.put(api_url+'/blog/'+_id, data)
		        .success(function(data) {
		        	deferred.resolve(data);
		        }).catch(function(data) {
		            console.log('Error: ' + data);
        		});
		    return deferred.promise;
		}
		service.editBlogTen = function(_id, _ten){
			var deferred = $q.defer();
			var data = {
				ten: _ten
			}
			$http.put(api_url+'/blog/'+_id, data)
		        .success(function(data) {
		        	deferred.resolve(data);
		        }).catch(function(data) {
		            console.log('Error: ' + data);
        		});
		    return deferred.promise;
		}
		service.editBlogUrl = function(_id, _url){
			var deferred = $q.defer();
			var data = {
				url: _url
			}
			$http.put(api_url+'/blog/'+_id, data)
		        .success(function(data) {
		        	deferred.resolve(data);
		        }).catch(function(data) {
		            console.log('Error: ' + data);
        		});
		    return deferred.promise;
		}
		service.editBlogNoidung = function(_id, _noidung){
			var deferred = $q.defer();
			var data = {
				noidung: _noidung
			}
			$http.put(api_url+'/blog/'+_id, data)
		        .success(function(data) {
		        	deferred.resolve(data);
		        }).catch(function(data) {
		            console.log('Error: ' + data);
        		});
		    return deferred.promise;
		}
		service.editBlogNoidungdaidien = function(_id, _noidungdaidien){
			var deferred = $q.defer();
			var data = {
				noidungdaidien: _noidungdaidien
			}
			$http.put(api_url+'/blog/'+_id, data)
		        .success(function(data) {
		        	deferred.resolve(data);
		        }).catch(function(data) {
		            console.log('Error: ' + data);
        		});
		    return deferred.promise;
		}
		return service;
	})
	module.factory('blogImgFactory', function($http, $q){
		var service = {};
		var api_url = 'http://localhost:4444/api';
		service.getBlogImgs = async function(){
			// var deferred = $q.defer();
			// $http.get(api_url+'/blogimg', { cache: false})
		    //     .success(function(data) {
		    //     	data.reverse();
		    //     	deferred.resolve(data);
		    //     }).catch(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;

			try{
				await $http.get(api_url+'/blogimg')
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.getBlogImgById = async function(_id){
			// var deferred = $q.defer();
			// $http.get(api_url+'/blogimg?_id='+_id, { cache: false})
		    //     .success(function(data) {
		    //     	deferred.resolve(data);
		    //     }).catch(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;
			try{
				await $http.get(api_url+'/blogimg?_id='+_id)
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.removeBlogImg = function(_imgObj){
			var deferred = $q.defer();
	    	$http.post('/removeimg', _imgObj)
		        .success(function(data) {
		        	if(data = 'done'){
		        		deferred.resolve('done');
	        		}
		        }).catch(function(data) {
		            deferred.resolve('failed');
	    		});
		    return deferred.promise;
		}
		return service;
	})
	module.factory('partnerFactory', function($http, $q){
		var service = {};
		var api_url = 'http://localhost:4444/api';
		service.getPartners =async function(){
			// var deferred = $q.defer();
			// $http.get(api_url+'/doitac', { cache: false})
		    //     .success(function(data) {
		    //     	data.reverse();
		    //     	deferred.resolve(data);
		    //     }).catch(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;

			try{
				await $http.get(api_url+'/doitac')
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.addPartner = function(_partner){
			var deferred = $q.defer();
			$http.post(api_url+'/doitac', _partner)
		        .success(function(data) {
		        	deferred.resolve(data);
		        }).catch(function(data) {
		            console.log('Error: ' + data);
        		});
		    return deferred.promise;
		}
		service.removePartner = function(_id){
			var deferred = $q.defer();
			$http.delete(api_url+'/doitac/'+_id, { cache: false})
		        .success(function(data) {
		        	deferred.resolve('done');
		        }).catch(function(data) {
		            console.log('Error: ' + data);
        		});
		    return deferred.promise;
		}
		return service;
	})
	module.controller('adminController_table', function(blogFactory, $scope, NgTableParams, $mdDialog){		
		blogFactory.getBlogs().then(function(data){
			$scope.tableParams = new NgTableParams({}, { dataset: data});
		})
		$scope.confirmRemoveBlog = function(_blog){
			var confirm = $mdDialog.confirm()
		          .title('Xóa blog '+_blog.ten)
		          .textContent('Xác nhận xóa blog '+_blog.ten)
		          .ariaLabel('Xóa blog')
		          .targetEvent()
		          .ok('Xóa')
		          .cancel('Hủy');
		    $mdDialog.show(confirm).then(function() {
		      	$scope.removeBlog(_blog._id);
		    }, function() {
		      
		    });
		}
		$scope.removeBlog = function(_id){
			blogFactory.removeBlog(_id).then(function(data){
				if(!angular.isUndefined(data)){
					blogFactory.getBlogs().then(function(data){
						$scope.tableParams = new NgTableParams({}, { dataset: data});
					})
				}
			});
		}
	})
	module.controller('adminController_edit', function(blogFactory, $scope, NgTableParams, $routeParams){
		$scope.Blog = {
			ten: '',
			ngayviet: '',
			tags: [],
			url: '',
			noidung: '',
			noidungdaidien: ''
		};
		blogFactory.getBlogById($routeParams.blogId).then(function(data){
			$scope.Blog = data[0];
		})
		$scope.NewTag = '';
		$scope.TagIndex;
		$scope.thongbao = {
			ten: '',
			tags: '',
			url: '',
			noidung: '',
			noidungdaidien: '',
			newtag: ''
		};
		$scope.addNewTag = function(){
			var lowerCaseTag = $scope.NewTag.toLowerCase();
			$scope.Blog.tags.push(lowerCaseTag);
			blogFactory.editBlogTags($scope.Blog._id, $scope.Blog.tags);
		}
		$scope.removeTag = function(){
			if($scope.TagIndex != ''){
				var i = $scope.Blog.tags.indexOf($scope.TagIndex);
				if(i==-1) return;
				else {
					$scope.Blog.tags.splice(i,1);
					blogFactory.editBlogTags($scope.Blog._id, $scope.Blog.tags);
				}
			}
		}
		$scope.editBlogTen = function(){
			blogFactory.editBlogTen($scope.Blog._id, $scope.Blog.ten).then(function(data){
				if(!angular.isUndefined(data)){
					alert('Sửa thành công');
				}else{
					alert('Có lỗi xảy ra');
				}
			})
		}
		$scope.editBlogUrl = function(){
			var lowerCaseUrl = $scope.Blog.url.toLowerCase();
			blogFactory.editBlogUrl($scope.Blog._id, lowerCaseUrl).then(function(data){
				if(!angular.isUndefined(data)){
					alert('Sửa thành công');
				}else{
					alert('Có lỗi xảy ra');
				}
			})
		}
		$scope.editBlogNoidung = function(){
			blogFactory.editBlogNoidung($scope.Blog._id, $scope.Blog.noidung).then(function(data){
				if(!angular.isUndefined(data)){
					alert('Sửa thành công');
				}else{
					alert('Có lỗi xảy ra');
				}
			})
		}
		$scope.editBlogNoidungdaidien = function(){
			blogFactory.editBlogNoidungdaidien($scope.Blog._id, $scope.Blog.noidungdaidien).then(function(data){
				if(!angular.isUndefined(data)){
					alert('Sửa thành công');
				}else{
					alert('Có lỗi xảy ra');
				}
			})
		}
		/* ------------------------------------------------------------
		   ------------------------WATCH FUNCTION----------------------
		 ------------------------------------------------------------*/
		
		var checkSpecialChar = function(string){
			var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`=";
			for(i = 0; i < specialChars.length;i++){
				if(string.indexOf(specialChars[i]) > -1){
					return true
				}
			}
			return false;
		}
		$scope.$watch('NewTag', function(oldVal, newVal){
			if($scope.NewTag != ''){
				if(checkSpecialChar($scope.NewTag)){
					$scope.thongbao.newtag = 'Tag không được có ký tự đặc biệt';
				}else{
					var lowerCaseTag = $scope.NewTag.toLowerCase();
					var exists = $scope.Blog.tags.indexOf(lowerCaseTag);
					if(exists == -1){
						$scope.thongbao.newtag = '';
					}
					else
						$scope.thongbao.newtag = 'tag đã tồn tại';
				}
			}
			else
				$scope.thongbao.newtag = 'Bạn chưa nhập tag';
		})
		$scope.$watch('Blog.url', function(oldVal, newVal){
			if($scope.Blog.url != ''){
				$scope.Blog.url = $scope.Blog.url.toLowerCase();
				if($scope.Blog.url.indexOf(' ')>0){
					$scope.thongbao.url = 'Url không được có khoảng trống, vd: how-to-learn-english';
				}else if(checkSpecialChar($scope.Blog.url)){
					$scope.thongbao.url = 'Url không được có kí tự đặc biệt, vd: how-to-learn-english';
				}else{
					blogFactory.checkBlogUrlEdit($scope.Blog.url, $scope.Blog._id).then(function(data){
						if(data.length > 0){
							$scope.thongbao.url = 'url bị trùng';
						}else{
							$scope.thongbao.url = '';
						}
					})
				}
			}
			else{
				$scope.thongbao.url = 'Xin nhập url, vd: how-to-learn-english';
			}
		})
		$scope.$watch('Blog.tags.length', function(oldVal, newVal){
			if($scope.Blog.tags.length ==  0)
				$scope.thongbao.tags = 'Xin nhập ít nhất 1 tag';
			else{
				$scope.thongbao.tags = '';
			}
		})
		$scope.$watch('Blog.ten', function(oldVal, newVal){
			if($scope.Blog.ten ==  '')
				$scope.thongbao.ten = 'Xin nhập tên blog';
			else{
				$scope.thongbao.ten = '';
			}
		})
		$scope.$watch('Blog.noidung', function(oldVal, newVal){
			if($scope.Blog.noidung ==  '')
				$scope.thongbao.noidung = 'Xin nhập nội dung blog';
			else{
				$scope.thongbao.noidung = '';
			}
		})
		$scope.$watch('Blog.noidungdaidien', function(oldVal, newVal){
			if($scope.Blog.noidungdaidien ==  '')
				$scope.thongbao.noidungdaidien = 'Xin nhập nội dung đại diện cho blog';
			else{
				$scope.thongbao.noidungdaidien = '';
			}
		})
		/* ------------------------------------------------------------
		   --------------------END WATCH FUNCTION----------------------
		 ------------------------------------------------------------*/
	})
	
	module.controller('adminController_new', function(blogFactory, $scope, NgTableParams, $routeParams, $location){
		$scope.Blog = {
			ten: '',
			ngayviet: new Date(),
			tags: [],
			url: '',
			noidung: '',
			noidungdaidien: ''
		};
		$scope.thongbao = {
			ten: 'Xin nhập tên blog',
			tags: 'Xin nhập ít nhất 1 tag',
			url: 'Xin nhập url, vd: how-to-learn-english',
			noidung: 'Xin nhập nội dung blog',
			noidungdaidien: 'Xin nhập nội dung đại diện cho blog',
			newtag: ''
		};
		$scope.NewTag = '';
		$scope.TagIndex;
		$scope.addNewTag = function(){
			var lowerCaseTag = $scope.NewTag.toLowerCase();
			$scope.Blog.tags.push(lowerCaseTag);
		}
		$scope.removeTag = function(){
			if($scope.TagIndex != ''){
				var i = $scope.Blog.tags.indexOf($scope.TagIndex);
				if(i==-1) return;
				else $scope.Blog.tags.splice(i,1);
			}
		}
		$scope.checkError = function(){
			if( $scope.thongbao.ten != '' || 
				$scope.thongbao.tags != '' ||
				$scope.thongbao.url != '' ||
				$scope.thongbao.noidung != '' ||
				$scope.thongbao.noidungdaidien != '')
				return true;
			else return false;
		}
		var checkSpecialChar = function(string){
			var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`=";
			for(i = 0; i < specialChars.length;i++){
				if(string.indexOf(specialChars[i]) > -1){
					return true
				}
			}
			return false;
		}
		$scope.$watch('NewTag', function(oldVal, newVal){
			if($scope.NewTag != ''){
				if(checkSpecialChar($scope.NewTag)){
					$scope.thongbao.newtag = 'Tag không được có ký tự đặc biệt';
				}else{
					var lowerCaseTag = $scope.NewTag.toLowerCase();
					var exists = $scope.Blog.tags.indexOf(lowerCaseTag);
					if(exists == -1){
						$scope.thongbao.newtag = '';
					}
					else
						$scope.thongbao.newtag = 'tag đã tồn tại';
				}
			}
			else
				$scope.thongbao.newtag = 'Bạn chưa nhập tag';
		})
		$scope.$watch('Blog.url', function(oldVal, newVal){
			if($scope.Blog.url != ''){
				$scope.Blog.url = $scope.Blog.url.toLowerCase();
				if($scope.Blog.url.indexOf(' ')>0){
					$scope.thongbao.url = 'Url không được có khoảng trống, vd: how-to-learn-english';
				}else if(checkSpecialChar($scope.Blog.url)){
					$scope.thongbao.url = 'Url không được có kí tự đặc biệt, vd: how-to-learn-english';
				}else{
					blogFactory.checkBlogUrl($scope.Blog.url).then(function(data){
						if(data.length > 0){
							$scope.thongbao.url = 'url bị trùng';
						}else{
							$scope.thongbao.url = '';
						}
					})
				}
			}
			else{
				$scope.thongbao.url = 'Xin nhập url, vd: how-to-learn-english';
			}
		})
		$scope.$watch('Blog.tags.length', function(oldVal, newVal){
			console.log($scope.Blog.tags.length);
			if($scope.Blog.tags.length ==  0)
				$scope.thongbao.tags = 'Xin nhập ít nhất 1 tag';
			else{
				$scope.thongbao.tags = '';
			}
		})
		$scope.$watch('Blog.ten', function(oldVal, newVal){
			if($scope.Blog.ten ==  '')
				$scope.thongbao.ten = 'Xin nhập tên blog';
			else{
				$scope.thongbao.ten = '';
			}
		})
		$scope.$watch('Blog.noidung', function(oldVal, newVal){
			if($scope.Blog.noidung ==  '')
				$scope.thongbao.noidung = 'Xin nhập nội dung blog';
			else{
				$scope.thongbao.noidung = '';
			}
		})
		$scope.$watch('Blog.noidungdaidien', function(oldVal, newVal){
			if($scope.Blog.noidungdaidien ==  '')
				$scope.thongbao.noidungdaidien = 'Xin nhập nội dung đại diện cho blog';
			else{
				$scope.thongbao.noidungdaidien = '';
			}
		})
		$scope.addNewBlog = function(){
			$scope.Blog.ngayviet = new Date();
			blogFactory.addNewBlog($scope.Blog).then(function(data){
				if(!angular.isUndefined(data)){
					$location.path('/blog_admin');
				}
			})
		}

	})
	module.controller('adminController_img', function(blogImgFactory, $scope, NgTableParams, $routeParams){
		blogImgFactory.getBlogImgs().then(function(data){
			$scope.tableParams = new NgTableParams({}, { dataset: data});
		})
		$scope.removeBlogImg = function(_imgObj){
			blogImgFactory.removeBlogImg(_imgObj).then(function(data){
				if(data=='done'){
					blogImgFactory.getBlogImgs().then(function(data){
						$scope.tableParams = new NgTableParams({}, { dataset: data});
					})
				}
			})
		}
	})
	module.controller('adminController_doitac', function(partnerFactory, $scope, NgTableParams, $routeParams){
		$scope.NewPartner = {
			ten: '',
			url: ''
		}
		partnerFactory.getPartners().then(function(data){
			$scope.tableParams = new NgTableParams({}, { dataset: data});
		})
		$scope.addPartner = function(){
			partnerFactory.addPartner($scope.NewPartner).then(function(data){
				if(!angular.isUndefined(data)){
					alert('Thêm thành công');
					partnerFactory.getPartners().then(function(data){
						$scope.tableParams = new NgTableParams({}, { dataset: data});
					})
				}
			})
		}
		$scope.removePartner = function(_partnerObj){
			partnerFactory.removePartner(_partnerObj).then(function(data){
				if(data=='done'){
					partnerFactory.getPartners().then(function(data){
						$scope.tableParams = new NgTableParams({}, { dataset: data});
					})
				}
			})
		}
	})

	module.controller('adminController_img_new', function(blogFactory, FileUploader, $scope, NgTableParams, $routeParams){
		$scope.thongbao = '';

		var uploader = $scope.uploader = new FileUploader({
            url: '/uploadimg'
        });
		// FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            alert('File không hợp lệ!');
        };
        uploader.onAfterAddingFile = function(fileItem) {
            $scope.thongbao = '';
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            if(response == 'exists'){
            	$scope.thongbao += ' '+ fileItem.file.name + ' đã tồn tại -----';
            }
        };
	})
	module.directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);
})();