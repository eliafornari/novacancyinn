var Shop = angular.module('myApp');

Shop.controller('shopCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $document, anchorSmoothScroll, $window, transformRequestAsFormPost){

$rootScope.pageClass = "page-shop";
$rootScope.isDetailOpen = false;
$rootScope.windowHeight = $window.innerHeight;
$rootScope.Detail = {};
$rootScope.openDetailFN = ()=>{
  $rootScope.isDetailOpen = true;
}



$rootScope.showCart = false;
$rootScope.template={};
$rootScope.templates = [
                          { name: 'cart', url: 'views/cart.html'},
                          { name: 'shipment', url: 'views/shipment.html'},
                          { name: 'payment', url: 'views/payment.html'},
                          { name: 'processed', url: 'views/processed.html'}
                        ];
$rootScope.template = $rootScope.templates[0];



$scope.wheel;

$scope.startWheel_shop = ()=>{
  $(".shop-content").bind('mousewheel', function(event, delta) {
     // console.log(event.deltaX, event.deltaY, event.deltaFactor);
     this.scrollLeft -= (delta * 0.4);
     event.preventDefault();
     $scope.wheel=true;
  });
}

$scope.startWheel_shop();


$scope.stopWheel_shop = ()=>{
  $(".shop-content").unbind('mousewheel');
  $scope.wheel=false;
}









});//controller

Shop.controller('detailCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $document, anchorSmoothScroll, $window){

console.log("detailCtrl");

  $scope.$on('$routeChangeSuccess', function(){
    // $routeParams.product


    $rootScope.openDetailFN();

    $rootScope.detailUpdate($routeParams.detail);

    setTimeout(function(){
          console.log('$routeParams.detail:'+$routeParams.detail);
      if(!$rootScope.Detail.id){
        $rootScope.detailUpdate($routeParams.detail);
        $scope.$apply();
        console.log("I loaded it again");
        console.log($rootScope.Detail);
      }else{
        console.log("detail loaded correctly");
        console.log($rootScope.Detail);
        return false
      }
    },2000);


  });


      $rootScope.addToCart = function(id){

          $http({
            url: '/addProduct',
            method: 'POST',
            headers: {
              // 'Content-Type': 'application/json'
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: transformRequestAsFormPost,
            data: {
                    id: id,
                    access_token:"helloooo"
                  }
          }).then(function(response){
            $rootScope.Cart = response;
            $rootScope.updateCart();
            $rootScope.pageLoading = false;
            console.log(response);
          });
    }//addToCart




    //......VARIATIONS

      $rootScope.addVariation = function(){

        if($rootScope.selectedVariation){
          $http({
            url: '/addVariation',
            method: 'POST',
            headers: {
              // 'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              // 'Content-Type': 'application/x-www-form-urlencoded'
            },
            // transformRequest: transformRequestAsFormPost,
            data: $rootScope.selectedVariation
          }).then(function(response){
            // $rootScope.Cart = response;
            $rootScope.updateCart();
            console.log(response);
          });
        }else{
          $scope.variationErrorMessage = "select a size first"
          setTimeout(function(){
            $scope.variationErrorMessage = false;
            $rootScope.$apply();
          });
        }


      }//addToCart














  //variations

  $rootScope.selectedVariation = {};
  $rootScope.howManyVAriationsSelected = 0;
  $rootScope.detailUpdate = (slug) => {

    $rootScope.selectedVariation={};
    $rootScope.howManyVAriationsSelected = 0;
    $rootScope.Detail.total_variations=0;

    for (var i in $rootScope.Product){
      console.log($rootScope.Product[i].slug);
      if ($rootScope.Product[i].slug == slug){
        console.log('slug: '+slug);
        $rootScope.Detail=$rootScope.Product[i];
        $rootScope.Detail.total_variations=0;
        console.log("detail:", $rootScope.Detail);
        $rootScope.Detail.has_variation = $rootScope.has_variation;

        var go = true;
        //has variation
        for (i in $rootScope.Detail.modifiers){
          $rootScope.Detail.total_variations =$rootScope.Detail.total_variations+1;
          console.log($rootScope.Detail.total_variations);
          // if($rootScope.Detail.modifiers[i].id){$rootScope.has_variation=true;}else{$rootScope.has_variation=false;}
          $rootScope.Detail.has_variation = true;
            go = false;
        }

        if(go==true){
          //does not have variation
          $rootScope.Detail.has_variation = false;
        }

      }
    }
  }




  $rootScope.showSelection = function(modifier_id){
    for (var m in $rootScope.Detail.modifiers){
      if($rootScope.Detail.modifiers[m].id == modifier_id){
        $rootScope.Detail.modifiers[m].open= !$rootScope.Detail.modifiers[m].open
      }
    }
  }



  $rootScope.thisVariation = function(id, modifier_id, modifier_title, variation_id, variation_title){
    var i=0;
    for ( i in $rootScope.Detail.modifiers){
      $rootScope.Detail.modifiers.open =false;
      if($rootScope.Detail.modifiers[i].id==modifier_id){
        $rootScope.selectedVariation[i] =
          {
            id: id,
            modifier_id: modifier_id,
            modifier_title: modifier_title,
            variation_id: variation_id,
            variation_title: variation_title
          }
          if($rootScope.howManyVAriationsSelected<$rootScope.Detail.total_variations){
            $rootScope.howManyVAriationsSelected = $rootScope.howManyVAriationsSelected+1;
          }
      }

    }
  }


});





Shop.directive('detailDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/detail.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
