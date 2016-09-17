angular.module('myApp')


.controller('radioCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $document, anchorSmoothScroll, $window){

$rootScope.windowHeight = $window.innerHeight;
$rootScope.pageClass = "page-radio";
$rootScope.selectedRadio = {};


//..........................................................GET


  $rootScope.getContentType('radio', 'my.radio.index');

  $rootScope.$on('radioReady', function(){

      $scope.$apply();

  });



  $scope.thisRadio = (e)=>{
    $rootScope.selectedRadio = e;
  }

});//controller
