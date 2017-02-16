var Shop = angular.module('myApp');

Shop.controller('shopCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $document, anchorSmoothScroll, $window, transformRequestAsFormPost){

$rootScope.pageClass = "page-shop";
$rootScope.isDetailOpen = false;
$rootScope.windowHeight = $window.innerHeight;
$rootScope.Detail = {};
$rootScope.selectedVariation;
$rootScope.Variations;
$scope.sizeLoading = false;

$rootScope.openDetailFN = (slug)=>{
  if($rootScope.isDetailOpen == true){
    $rootScope.detailUpdate(slug);
  }else{
    $rootScope.thisDetail();
    $rootScope.isDetailOpen = true;
    $rootScope.detailUpdate(slug);
    setTimeout(function(){
      $location.path('/shop/product/'+slug, false);
      $rootScope.$apply();
    }, 200);
  }
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


//
// $scope.wheel;
//
// $scope.startWheel_shop = ()=>{
//   $(".shop-content").bind('mousewheel', function(event, delta) {
//      // console.log(event.deltaX, event.deltaY, event.deltaFactor);
//      this.scrollLeft -= (delta * 0.4);
//      event.preventDefault();
//      $scope.wheel=true;
//   });
// }
//
// $scope.startWheel_shop();
//
//
// $scope.stopWheel_shop = ()=>{
//   $(".shop-content").unbind('mousewheel');
//   $scope.wheel=false;
// }
//


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
      // $rootScope.Cart = response;
      $rootScope.updateCart();
      $rootScope.pageLoading = false;
    });
}//addToCart




//......VARIATIONS

$rootScope.addVariation = function(){
  if($scope.maxVariation($rootScope.selectedVariation) == true){

    if($rootScope.selectedVariation){
      $http({
        url: '/addVariation',
        method: 'POST',
        data: $rootScope.selectedVariation
      }).then(function(response){
        // $rootScope.Cart = response;
        $rootScope.updateCart();
      });
    }else{
      $scope.variationErrorMessage = "select a size first"
      setTimeout(function(){
        $scope.variationErrorMessage = false;
        $rootScope.$apply();
      });
    }
  }

}//addToCart


  //variations
  $rootScope.thisImageIndex = 0;

  $rootScope.howManyVAriationsSelected = 0;
  $rootScope.detailUpdate = (slug) => {

    if($rootScope.Detail.slug!=slug){
        $location.path('/shop/product/'+slug, false);
      $rootScope.pageLoading=false;
          $rootScope.thisImageIndex = 0;

      $rootScope.selectedVariation={};
      $rootScope.howManyVAriationsSelected = 0;
      $rootScope.Detail.total_variations=0;
      for (var i in $rootScope.Product){
        if ($rootScope.Product[i].slug == slug){
          $rootScope.Detail=$rootScope.Product[i];
          $rootScope.Detail.total_variations=0;
          $rootScope.Detail.has_variation = $rootScope.has_variation;
          $rootScope.pageLoading=false;
          $scope.drag_FN(slug);
          $scope.getVariationsLevel($rootScope.Detail.id);

          var go = true;
          //has variation
          for (i in $rootScope.Detail.modifiers){
            $rootScope.Detail.modifiers[i].open = false;
            $rootScope.Detail.total_variations =$rootScope.Detail.total_variations+1;
            // if($rootScope.Detail.modifiers[i].id){$rootScope.has_variation=true;}else{$rootScope.has_variation=false;}
            $rootScope.Detail.has_variation = true;
            // $rootScope.showSelection($rootScope.Detail.modifiers[i].id);
              go = false;
          }

          if(go==true){
            //does not have variation
            $rootScope.Detail.has_variation = false;
            for (i in $rootScope.Detail.modifiers){

            }
          }
        }
      }
    }
  }




  // $rootScope.showSelection = function(modifier_id){
  //   for (var m in $rootScope.Detail.modifiers){
  //     if($rootScope.Detail.modifiers[m].id == modifier_id){
  //       $rootScope.Detail.modifiers[m].open = !$rootScope.Detail.modifiers[m].open;
  //     }
  //   }
  // }



  $rootScope.thisVariation = function(id, modifier_id, modifier_title, variation_id, variation_title){
    var i=0;
    for ( i in $rootScope.Detail.modifiers){

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






  $scope.$on('$routeChangeSuccess', function(){
    $rootScope.isDetailOpen = true;
    $rootScope.detailUpdate($routeParams.detail);
    $rootScope.updateCart();
    setTimeout(function(){
      if(!$rootScope.Detail.id){
        $rootScope.detailUpdate($routeParams.detail);
        $scope.$apply();
      }else{
        return false
      }
    },3000);

  });





$scope.sizeLoading = false;


  $scope.getVariationsLevel = (productId)=>{
    $scope.sizeLoading = true;
    $http({
      url: '/product/'+productId+'/variations/get',
      method: 'GET',
    }).then(function(response){
      $rootScope.Variations=response.data.result;
      $scope.sizeLoading = false;
      var n = 0;
      for (var m in $rootScope.Detail.modifiers){

        $scope.arrFromMyObj = Object.keys($rootScope.Detail.modifiers[m].variations).map(function(key) {
          return $rootScope.Detail.modifiers[m].variations[key];
        });
        $rootScope.Detail.modifiers[m].variations=$scope.arrFromMyObj;

        for (var v in $rootScope.Detail.modifiers[m].variations){
          for (var t in $rootScope.Variations){
            var key = Object.keys($rootScope.Variations[t].modifiers)[0];
            var title = $rootScope.Variations[t].modifiers[key].var_title;
            if(title==$rootScope.Detail.modifiers[m].variations[v].title){
              $rootScope.Detail.modifiers[m].variations[v].stock_level = $rootScope.Variations[t].stock_level;
            }
          }
        }
      }
    },function(error){
      console.log(error);
    });
  }









//not allow add variation if max stock level
$scope.maxVariation=(obj)=>{
  for (var m in obj){
    var modifierId = obj[m].modifier_id;
    var variationId = obj[m].variation_id;
    if($rootScope.Cart.contents.length==0){
      return true;
    }else {
      for(var i in $rootScope.Cart.contents){
        if($rootScope.Cart.contents[i].options[modifierId] == variationId){
          if(($rootScope.Cart.contents[i].stock_level > $rootScope.Cart.contents[i].quantity)&&($rootScope.Cart.contents[i].quantity<2)){
            return true;
          }else{
            $rootScope.error = {value: true, text:"you reached the maximum amount of this variation"};
            setTimeout(function(){
              $rootScope.error = {value: false, text:""};
              $rootScope.$apply();
            }, 2000);
            return false;
          }
        }
      }
      return true;
    }
  }
}








  // document.getElementById('target').ondragstart = function() { return false; };
  var dragging = false;
  var coord;
  var right=0;
  var left=0;

$scope.drag_FN = (slug)=>{
  $('#'+slug).mousedown(function(event) {
    dragging = true;

  }).mousemove(function( event ) {
    if(dragging){

      if(coord){
        if(coord.pageX < (event.pageX)){
          right+= 1;

          if(right>10){
            right=0;
          }
        }else if(coord.pageX > (event.pageX)){
        }
      }

      coord = {
        pageX: event.pageX,
        pageY: event.pageY
      }

    }

  }).mouseup(function(event) {
    event.preventDefault();
    dragging = false;

  });

};



$rootScope.blockScroll=false;

$rootScope.blockScrollFN=()=>{
  $rootScope.blockScroll=!$rootScope.blockScroll;
}



//image flip
$rootScope.thisImageIndex = 0;
$scope.nextImage=(slug)=>{
  if(slug == $rootScope.Detail.slug){
    var nextIndex = $rootScope.thisImageIndex + 1;
    if($rootScope.Detail.images[nextIndex]){
      $rootScope.thisImageIndex = nextIndex;
    }else{
      $rootScope.thisImageIndex=0;
    }
  }
}


$scope.isFullscreen=false;

$scope.fullscreen=()=>{
  $scope.isFullscreen=!$scope.isFullscreen;
}






});//controller

Shop.controller('detailCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $document, anchorSmoothScroll, $window, transformRequestAsFormPost){





















});





Shop.directive('detailDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/shop/detail.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});


Shop.directive('fullscreenDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/icon/fullscreen.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
