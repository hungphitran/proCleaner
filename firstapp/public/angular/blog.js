(function(){
	//search module
	var module = angular.module('BlogModule',
	 ['ngMaterial','ngRoute']);
	
	//var chitietModule = angular.module('ChitietModule', ['ngMaterial','ngMessages','slickCarousel','ngRoute']);
	module.config(function($mdThemingProvider, $locationProvider, $routeProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('green');
		$routeProvider.
	      when('/blog', {
	        templateUrl: 'partials/blog-list.html',
	      }).
	      when('/blog/tag/:tagname', {
	        templateUrl: 'partials/blog-tag.html',
	      }).
	      when('/blog/:blogId', {
	        templateUrl: 'partials/blog-details.html',
	      }).
	      otherwise({
	        redirectTo: '/blog'
	      });
        //routing DOESN'T work without html5Mode
        $locationProvider.html5Mode({
        	enabled: true,
        	reloadOnSearch: true
        });
	});
	module.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
	module.factory('blogFactory', function($http, $q){
		var service = {};
		var api_url = 'http://localhost:4444/api';
		service.getNewestBlogs =async function(){
			// var deferred = $q.defer();
			// $http.get(api_url+'/blog?sort=-ngayviet&limit=4', { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     }).catch(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;
			try{
				await $http.get(api_url+'/blog?sort=-ngayviet&limit=4')
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.getBlogTags =async function(){
			// var deferred = $q.defer();
			// $http.get(api_url+'/blog?select=tags', { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     }).error(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;

			try{
				await $http.get(api_url+'/blog?select=tags')
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.getBlogsLength =async function(){
			// var deferred = $q.defer();
			// $http.get(api_url+'/blog?select=_id', { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data.length);
		    //     }).error(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;

			try{
				await $http.get(api_url+'/blog?select=_id')
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.getBlogsLengthByTag =async function(_tag){
			// var deferred = $q.defer();
			// $http.get(api_url+'/blog?select=_id&tags__in='+_tag, { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data.length);
		    //     }).error(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;

			try{
				await $http.get(api_url+'/blog?select=_id&tags__in'+_tag)
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.getBlogsFromPage =async function(_page){
			// var deferred = $q.defer();
			// var blogsSkip = (_page-1)*5;
			// $http.get(api_url+'/blog?sort=-ngayviet&limit=5&skip='+blogsSkip, { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     }).error(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;

			try{
				await $http.get(api_url+'/blog?sort=-ngayviet&limit=5&skip='+blogsSkip)
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.getBlogsFromPageByTag =async function(_page, _tag){
			// var deferred = $q.defer();
			// var blogsSkip = (_page-1)*5;
			// $http.get(api_url+'/blog?sort=-ngayviet&limit=5&skip='+blogsSkip+'&tags__in='+_tag, { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     }).error(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;

			try{
				await $http.get(api_url+'/blog?sort=-ngayviet&limit=5&skip='+blogsSkip+'&tags__in'+_tag)
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.getBlogByUrl =async function(_url){
			// var deferred = $q.defer();
			// $http.get(api_url+'/blog?url='+_url, { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     }).error(function(data) {
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
		service.getBlogsLengthBySearch = async function(_searchString){
			// var deferred = $q.defer();
			// $http.get(api_url+'/blog?sort=-ngayviet&noidung__regex=/'+_searchString+'/', { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data.length);
		    //     }).error(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;
			try{
				await $http.get(api_url+'/blog?sort=-ngayviet&noidung__regex=/'+_searchString+'/')
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		service.getBlogsBySearch =async function(_searchString, _page){
			// var deferred = $q.defer();
			// var blogsSkip = (_page-1)*5;
			// $http.get(api_url+'/blog?sort=-ngayviet&limit=5&skip='+blogsSkip+'&noidung__regex=/'+_searchString+'/', { cache: false})
		    //     .then(function(data) {
		    //     	deferred.resolve(data);
		    //     }).error(function(data) {
		    //         console.log('Error: ' + data);
        	// 	});
		    // return deferred.promise;
			try{
				await $http.get(api_url+'/blog?sort=-ngayviet&limit=5&skip='+blogsSkip+'&noidung__regex=/'+_searchString+'/')
				.then(datas=>datas)
			}catch (error) {
				console.error('Error1:', error);
				throw error;
			}
		}
		return service;
	})
	module.controller('blogController', function($scope, blogFactory, $routeParams, $anchorScroll, $location, $window){
		$scope.blogsLength = -1;
		$scope.pages = -1;
		$scope.PageToView = 1;
		$scope.showPrevBtn = false;
		$scope.showNextBtn = false;
		$scope.NextPageHref = '?trang=2';
		$scope.PrevPageHref = '';
		$scope.Search = $location.search().timkiem;
		$scope.SearchHref = '';
		$scope.Blogs = [];
		$scope.BlogToView = {};
		$scope.tagname = '';
		$scope.TagsInfo = {
			tags: [],
			count: []
		};
		$scope.MostUsedTag = [];
		$scope.NewestBlogs = [];
		var countTags = function(_blogData){
			for(i=0; i<_blogData.length; i++){
				for(j=0; j<_blogData[i].tags.length; j++){
					var index = $scope.TagsInfo.tags.indexOf(_blogData[i].tags[j]);
					if(index == -1){
						$scope.TagsInfo.tags.push(_blogData[i].tags[j]);
						$scope.TagsInfo.count[$scope.TagsInfo.tags.length-1] = 1;
					}else{
						$scope.TagsInfo.count[index]++;
					}
				}
			}
		}
		var makeObjMostUsedTag = function(){
			for(i=0; i<$scope.TagsInfo.tags.length; i++){
				$scope.MostUsedTag.push({
					tag: $scope.TagsInfo.tags[i],
					count: $scope.TagsInfo.count[i]
				});
			}
		}
		$scope.initTag = function(){
			blogFactory.getBlogTags().then(function(data){
				countTags(data);
				makeObjMostUsedTag();
			})
		}
		$scope.initNewestBlogs = function(){
			blogFactory.getNewestBlogs().then(function(data){
				$scope.NewestBlogs = data;
			})
		}
		$scope.$on('$routeChangeSuccess', function(event, current) {
			$scope.PageToView = 1;

			var pageParam = $location.search().trang;
	    	var searchParam = $location.search().timkiem;


			//reset search neu ko co
			$scope.Search = $location.search().timkiem;
			$scope.SearchHref = '';
			
			//reset 2 trang thai 2 nut
    		$scope.showPrevBtn = false;
			$scope.showNextBtn = false;
			/* CHI TIẾT BLOG */
			if(!angular.isUndefined($routeParams.blogId)){
				blogFactory.getBlogByUrl($routeParams.blogId).then(function(data){
					$scope.BlogToView = data[0];
					$window.scrollTo(0, 0);
				})
			/* KẾT THÚC CHI TIẾT BLOG */
			}else if(!angular.isUndefined($routeParams.tagname)){
			/* CÓ TAG */
				$scope.tagname = $routeParams.tagname;

				if(angular.isUndefined(pageParam)){
		    		blogFactory.getBlogsLengthByTag($routeParams.tagname).then(function(data){
						$scope.blogsLength = data;
						$scope.pages = initPages(data);
						$scope.showPrevBtn = checkPrevBtn($scope.pages, $scope.PageToView);
						$scope.showNextBtn = checkNextBtn($scope.pages, $scope.PageToView);
					});
		    		blogFactory.getBlogsFromPageByTag(1, $routeParams.tagname).then(function(data){
						$scope.Blogs = data;
						$window.scrollTo(0, 0);
					})
		    	}
		    	//ko tìm kiếm trang 2 trở lên
				else{
					$scope.PageToView = parseInt(pageParam);
					blogFactory.getBlogsLengthByTag($routeParams.tagname).then(function(data){
						$scope.blogsLength = data;
						$scope.pages = initPages(data);

						//kiểm tra các nút lùi và tới 
						$scope.showPrevBtn = checkPrevBtn($scope.pages, $scope.PageToView);
						$scope.showNextBtn = checkNextBtn($scope.pages, $scope.PageToView);

						//tạo liên kết nút lùi và tới
						$scope.NextPageHref = '?trang=' + ($scope.PageToView+1);
						$scope.PrevPageHref = '?trang=' + ($scope.PageToView-1);
					});
					

					blogFactory.getBlogsFromPageByTag($scope.PageToView, $routeParams.tagname).then(function(data){
						$scope.Blogs = data;
						$window.scrollTo(0, 0);
					})
					
				//tìm kiếm trang đầu
				}
			/* KẾT THÚC CÓ TAG */
			}else{
			/* KHÔNG TAG */
		    	if(angular.isUndefined(pageParam) && angular.isUndefined(searchParam)){
		    		blogFactory.getBlogsLength().then(function(data){
						$scope.blogsLength = data;
						$scope.pages = initPages(data);
						$scope.showPrevBtn = checkPrevBtn($scope.pages, $scope.PageToView);
						$scope.showNextBtn = checkNextBtn($scope.pages, $scope.PageToView);
					});
		    		blogFactory.getBlogsFromPage(1).then(function(data){
						$scope.Blogs = data;
						$window.scrollTo(0, 0);
					})
		    	}
		    	//ko tìm kiếm trang 2 trở lên
				else if(!angular.isUndefined(pageParam) && angular.isUndefined(searchParam)){
					$scope.PageToView = parseInt(pageParam);
					blogFactory.getBlogsLength().then(function(data){
						$scope.blogsLength = data;
						$scope.pages = initPages(data);

						//kiểm tra các nút lùi và tới 
						$scope.showPrevBtn = checkPrevBtn($scope.pages, $scope.PageToView);
						$scope.showNextBtn = checkNextBtn($scope.pages, $scope.PageToView);

						//tạo liên kết nút lùi và tới
						$scope.NextPageHref = '?trang=' + ($scope.PageToView+1);
						$scope.PrevPageHref = '?trang=' + ($scope.PageToView-1);
					});
					

					blogFactory.getBlogsFromPage($scope.PageToView).then(function(data){
						$scope.Blogs = data;
						$window.scrollTo(0, 0);
					})
					
				//tìm kiếm trang đầu
				}else if(angular.isUndefined(pageParam) && !angular.isUndefined(searchParam)){

					//reset page dang xem
					$scope.PageToView = 1;

					$scope.NextPageHref = '?trang=2';
					$scope.PrevPageHref = '';
					$scope.SearchHref = '&timkiem=' + $scope.Search;
					
					blogFactory.getBlogsLengthBySearch($scope.Search).then(function(length){
						$scope.blogsLength = length;
						$scope.pages = initPages(length);
						$scope.showPrevBtn = checkPrevBtn($scope.pages, $scope.PageToView);
						$scope.showNextBtn = checkNextBtn($scope.pages, $scope.PageToView);
					})
					blogFactory.getBlogsBySearch($scope.Search, $scope.PageToView).then(function(data){
						$scope.Blogs = data;
						$window.scrollTo(0, 0);
					})
				//tìm kiếm trang 2 trở lên
				}else{

					$scope.PageToView = parseInt(pageParam);
					$scope.SearchHref = '&timkiem=' + $scope.Search;

					//tạo liên kết nút lùi và tới
					$scope.NextPageHref = '?trang=' + ($scope.PageToView+1);
					$scope.PrevPageHref = '?trang=' + ($scope.PageToView-1);

					blogFactory.getBlogsLengthBySearch($scope.Search).then(function(length){
						$scope.blogsLength = length;
						$scope.pages = initPages(length);
						$scope.showPrevBtn = checkPrevBtn($scope.pages, $scope.PageToView);
						$scope.showNextBtn = checkNextBtn($scope.pages, $scope.PageToView);
					})

					blogFactory.getBlogsBySearch($scope.Search, $scope.PageToView).then(function(data){
						$scope.Blogs = data;
						$window.scrollTo(0, 0);
					})
				}
			/* KẾT THÚC KHÔNG TAG */
			}
	    });
		var initPages = function(_blogsLength){
			var pages = (_blogsLength-(_blogsLength%5))/5;
			if(_blogsLength%5 != 0) pages++;
			return pages;
		}
		var checkPrevBtn = function(_pages, _pageToView){
			if(_pages == -1) return false;
			else{
				if(_pageToView == 1) return false;
				else return true;
			}
		}
		var checkNextBtn = function(_pages, _pageToView){
			if(_pages == -1) return false;
			else{
				if(_pageToView == _pages || _pages<2) return false;
				else return true;
			}
		}
	})
})();