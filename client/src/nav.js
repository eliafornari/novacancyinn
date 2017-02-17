angular.module('myApp')


.controller('navCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$timeout', '$http', function($scope, $location, $rootScope, $routeParams, $timeout, $http){

  $rootScope.isNavOpen = false;

  $scope.openNav = function(){
    $rootScope.isNavOpen = !$rootScope.isNavOpen;
  }

  $scope.closeNav = function(){
    $rootScope.isNavOpen = false;
  }

  $rootScope.isLocation= (location)=>{
    if ($location.path()==location){
      return true;
    }else{return false;}
  }

  $rootScope.isShopDetail = ()=>{
    if($location.path()=='/shop/'+$routeParams.detail){
      return true;
    }else{return false;}

  }

  $scope.$on('$routeChangeStart', function(){
    if(($location.path()=='/shop') || ($location.path()=='/shop/product/'+$routeParams.detail)){
      $rootScope.pageLoading = false;
    }else{
      // $rootScope.pageLoading = true;
    }

  })

  $scope.$on('$routeChangeSuccess', function(){

    if($location.path() != '/'){
      $rootScope.backgroundColor = '#FFFFFF';
      $rootScope.pageLoading = false;
    }

    setTimeout(function(){
      $rootScope.pageLoading = false;
      $rootScope.$apply();
    }, 1000);
  })




  $scope.isCheckout=()=>{
    var second = $scope.getSecondPath();
    if(['cart','shipment','payment', 'processed'].indexOf(second)> -1){
      return true;
    }else{return false;}
  };



  $scope.getFirstPath=()=>{
    var first = $location.path();
    first.indexOf(1);
    first.toLowerCase();
    first = first.split("/")[1];
    return first;
  }

  $scope.getSecondPath=()=>{
    var first = $location.path();
    first.indexOf(1);
    first.toLowerCase();

    first = first.split("/")[2];
    return first;
  }



  $scope.getThirdPath=()=>{
    var first = $location.path();
    first.indexOf(1);
    first.toLowerCase();

    first = first.split("/")[3];
    return first;
  }


}])


.directive('logoDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/icon/logo.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('logoBlackDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/icon/logo-black.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('exDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/icon/ex.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})



.directive('mailDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/icon/mail-icon.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})




.directive('menuIconDirective',[ '$rootScope', '$location', '$window', '$routeParams', '$timeout',  function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/icon/menu-icon.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
}])

.directive('navmobileDirective',[ '$rootScope', '$location', '$window', '$routeParams', '$timeout', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/nav-mobile.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
}])


.directive('navDirective',[ '$rootScope', '$location', '$window', '$routeParams', '$timeout',  function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/nav.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
}]);
