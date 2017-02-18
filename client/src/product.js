
var Product = angular.module('myApp');


Product.controller('productCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $document, anchorSmoothScroll, $window){







    $rootScope.getProductsFN=function(){
      $http({method: 'GET', url: '/getProducts'})
        .then(function(response){
          console.log("product: ");
          console.log(response);
          $rootScope.Product = response.data;
          console.log(response.data);
          $rootScope.pageLoading = false;
        },function(){
          console.log("an error occurred");
        });
    }




    $rootScope.getProductsFN();






});//controller
