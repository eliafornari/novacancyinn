'use strict'

var Processed = angular.module('myApp');

Processed.controller('processedCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, anchorSmoothScroll, $routeParams){



//retrieve order data
  $rootScope.retrieveOrder = ()=>{
    var orderID = $routeParams.order;
    $http({
      url: '/order/'+orderID+'/get',
      method: 'GET'
    }).then( function(response){
      if(response.data.status.data.key =='unpaid'){
        $rootScope.completePayment_Paypal();
      }else{
        $rootScope.Processed = {value: true, error:false, data:response.data};
      }
    }, function(error){
      console.log(error);
      $rootScope.Processed = {value: false, error:true, data:error.data};
    })
  }



//first process
setTimeout(function(){
  if($routeParams.method == 'paypal-express'){
    $rootScope.retrieveOrder();
    // $rootScope.Processed = {value: false, error:false, data:response.data};
    // $rootScope.changeOrderStatus(response.data);

  }else if($routeParams.method == 'stripe'){
    $rootScope.changeOrderStatus($rootScope.Transaction);
  }
},600);






//paypal complete purchase function
$rootScope.completePayment_Paypal = ()=>{
  var orderID = $routeParams.order;
  var obj = {token: $routeParams.token, PayerID: $routeParams.PayerID};

  $http.post('/checkout/payment/complete_purchase/'+orderID, obj)
  .then( function(response){
    $rootScope.Processed = {value: true, error:false, data:response.data};
    if(response.data.result.order.status.data.key =='paid'){
      $rootScope.pageLoading = false;
      $rootScope.Transaction={"empty":""};
      $rootScope.changeOrderStatus($rootScope.Transaction);
    }


  }, function(error){
    console.log(error);
    $rootScope.pageLoading = false;
    $rootScope.Processed = {value: true, error:true, data:error.data};
  })

}





$rootScope.changeOrderStatus =(data)=>{
  var orderID = $routeParams.order;
  var obj = {};

  if($routeParams.method == 'paypal-express'){
    obj = {payment_number: $routeParams.token};
    // $scope.eraseCart();
  }else if($routeParams.method == 'stripe'){
    obj = {payment_number:data.id};
  }


  $http.post('/order/'+orderID+'/put', obj)
  .then( function(response){
    $rootScope.Processed = {value: true, error:false, data:response.data};
    if(response.data.status.data.key !='paid'){
      $rootScope.pageLoading = false;
    }else if(response.data.status.data.key =='paid'){
      $rootScope.getOrderItems();
    }

  }, function(error){
    console.log(error);
    $rootScope.pageLoading = false;
    $rootScope.Processed = {value: true, error:true, data:error.data};
  })

}







$rootScope.getOrderItems = ()=>{
  var orderID = $routeParams.order;
  $http({
    url: '/order/'+orderID+'/items',
    method: 'GET'
  }).then( function(response){
    $rootScope.Processed.data.items= response.data;
    if($routeParams.method == 'paypal-express'){
      if($rootScope.Product){
        $scope.updateStockLevel(response.data.result);
      }else{
        $rootScope.$on('productArrived', function(){
          $scope.updateStockLevel(response.data.result);
        });
      }
    }else {
      $scope.updateStockLevel(response.data.result);
    }
    $scope.eraseCart();

  }, function(error){
    console.log(error);
    $rootScope.Processed = {value: false, error:true, data:error.data};

  })
}





// update global stock level of the product
$scope.updateStockLevel =(data)=>{
  $http.post('/product/update_stock', data)
  .then(function(response){
  }, function(error){
  })
}



// erase shopping cart
$scope.eraseCart =()=>{
  $http.post('/cart/erase')
  .then( function(response){
  }, function(error){
    console.log(error);

  })
}











});
