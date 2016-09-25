
angular.module('myApp')


.controller('navCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){

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


  $scope.$on('$routeChangeSuccess', function(){
    if($location.path() != '/'){
      console.log('not home');
      $rootScope.backgroundColor = '#FFFFFF';
    }
  })


})


.directive('logoDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/icon/logo.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('logoBlackDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/icon/logo-black.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('exDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/icon/ex.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})



.directive('mailDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/icon/mail-icon.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})




.directive('menuIconDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/icon/menu-icon.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})




.directive('navDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/nav.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
