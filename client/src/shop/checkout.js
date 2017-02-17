'use strict'

var Checkout = angular.module('myApp');

Checkout.controller('checkoutCtrl', ['$scope', '$location', '$rootScope', '$timeout',	'$http', 'transformRequestAsFormPost', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost){


$rootScope.Order;
$rootScope.shipment_forwardActive=false;

$rootScope.checkout = {
          customer:{
              first_name: '',
              last_name: '',
              email:''
          },
          gateway:'stripe',
          shipment_method: '1336838094099317449',
          shipment:
                   { first_name: '',
                     last_name: '',
                     address_1: '',
                     city: '',
                     county: '',
                     country: '',
                     postcode: '',
                     phone: ''
                   },
          billing:
                  {
                     first_name: '',
                     last_name: '',
                     address_1: '',
                     city: '',
                     county: '',
                     country: '',
                     postcode: '',
                     phone: ''
                   }
   };




//shipment

$scope.shipmentLoading=false;

  $rootScope.shipmentToPayment = () =>{

    if(!$scope.shipmentLoading){
      if($scope.checkoutForm.$valid){
        $scope.shipmentLoading=true;
        $http.post('/cartToOrder', $rootScope.checkout)
        .then(function(response) {
          $rootScope.Order=response.data;
          $scope.shipmentLoading=false;
          // $rootScope.payment.id = response.data.id;
          $location.path('/shop/payment', true);
          // mailchimp.register($rootScope.checkout);
        }, function(response) {
          $rootScope.error = {value: true, text:response.data};

          setTimeout(function(){
            $rootScope.error = {value: false, text:''};
            $rootScope.$apply();
            $location.path('/shop', true);
          }, 2000);
            console.error("error in posting");
        });


      }else{
        $rootScope.error = {value: true, text:'fill in the form correctly'};
        setTimeout(function(){
          $rootScope.error = {value: false, text:''};
          $rootScope.$apply();
        }, 2000);
      }
    }


  }


  // $scope.$watch('checkoutForm.$valid', function(newVal, oldVal){
  //   if ($scope.checkoutForm.$valid){
  //     $rootScope.shipment_forwardActive = true;
  //   }else{
  //     $rootScope.shipment_forwardActive = false;
  //   }
  // }, true);







$scope.phoneRegex = '^(\\+\\d{1,2}\s)?\\(?\\d{3}\\)?[\s.-]\\d{3}[\\s.-]\\d{4}$';
$scope.postcodeRegex = '^\\d{5}-\\d{4}|\\d{5}|[A-Z]\\d[A-Z] \\d[A-Z]\\d$';



$scope.$watch('isBillingDifferent', function(value){
  if(!$scope.isBillingDifferent){
      $rootScope.checkout.billing.first_name = $rootScope.checkout.shipment.first_name;
      $rootScope.checkout.billing.last_name = $rootScope.checkout.shipment.last_name;
      $rootScope.checkout.billing.address_1 = $rootScope.checkout.shipment.address_1;
      $rootScope.checkout.billing.city = $rootScope.checkout.shipment.city;
      $rootScope.checkout.billing.county = $rootScope.checkout.shipment.county;
      $rootScope.checkout.billing.country = $rootScope.checkout.shipment.country;
      $rootScope.checkout.billing.postcode = $rootScope.checkout.shipment.postcode;
      $rootScope.checkout.billing.phone = $rootScope.checkout.shipment.phone;
  }

});

var Europe = ['AL','AD','AM','AT','AZ','BY','BA','BG','HR','CY','CZ','DK','EE','FI','FR','GE','DE','GR','HU','IS','IE','KZ','XK','LV','LI','LT','LU','MK','MT','MD','MC','ME','NL','NO','PL','PT','RO','RU','SM','RS','SK','SI','ES','SE','CH','TR','UA','GB'];
var NorthAmerica = ['US','CA','MX'];
$scope.$watch('checkout', function(value){
  // $rootScope.checkout.customer.first_name = $rootScope.checkout.shipment.first_name;
  // $rootScope.checkout.customer.last_name = $rootScope.checkout.shipment.last_name;
  if(!$scope.isBillingDifferent){
      $rootScope.checkout.billing.first_name = $rootScope.checkout.shipment.first_name;
      $rootScope.checkout.billing.last_name = $rootScope.checkout.shipment.last_name;
      $rootScope.checkout.billing.address_1 = $rootScope.checkout.shipment.address_1;
      $rootScope.checkout.billing.city = $rootScope.checkout.shipment.city;
      $rootScope.checkout.billing.county = $rootScope.checkout.shipment.county;
      $rootScope.checkout.billing.country = $rootScope.checkout.shipment.country;
      $rootScope.checkout.billing.postcode = $rootScope.checkout.shipment.postcode;
      $rootScope.checkout.billing.phone = $rootScope.checkout.shipment.phone;
  }

  if($rootScope.checkout.shipment.country==('US')){
    $rootScope.checkout.shipment_method='1336838094099317449';
  }else{
    $rootScope.checkout.shipment_method='1336838640038314698';
  }

  // 1450446744415371484	DHL International	Live	DHL International	$30.00
  // 1336838640038314698	USPS International	Live	USPS International	$40.00
  // 1336838094099317449	USPS Domestic


  // if(NorthAmerica.indexOf( $rootScope.checkout.shipment.country ) != -1){
  //   $rootScope.checkout.shipment_method='1336838094099317449';
  // }else if ($rootScope.checkout.shipment.country=='IT'){
  //   $rootScope.checkout.shipment_method='1336838640038314698'
  // }else if (Europe.indexOf( $rootScope.checkout.shipment.country ) != -1){
  //   $rootScope.checkout.shipment_method='1336838640038314698'
  // }else if ($rootScope.checkout.shipment.country==('RU')){
  //   $rootScope.checkout.shipment_method='1336838640038314698'
  // }else{
  //   $rootScope.checkout.shipment_method='1336838640038314698';
  // }


}, true)



$scope.clearCounty=(country)=>{
  if(country=='US'){
    $rootScope.checkout.shipment.county='';
  }
}

$scope.clearCounty_billing=(country)=>{
  if(country=='US'){
    $rootScope.checkout.shipment.county='';
  }
}



$scope.capchaRan=false;
setTimeout(function(){
  console.log('setTimeout');
  if($scope.capchaRan){
    console.log('setTimeout capcha ran');
    grecaptcha.reset();
    $scope.capchaRan=false;
  }
}, 900);


// $scope.$on('$routeChangeSuccess', function(){
//   console.log('routeChangeSuccess');
//   setTimeout(function(){
//     grecaptcha.reset();
//   }, 900);
//   // if($scope.capchaRan){
//   //   grecaptcha.reset();
//   // }
// });


$scope.checkCapcha=()=>{
  $scope.capchaRan=true;
  var key = grecaptcha.getResponse();
  console.log(key);
  var url = '/capcha?key='+key

  $http.post(url)
  .then(function(response) {
    console.log(response);
    if(response.data.success==true){
      $rootScope.shipmentToPayment();

    }else{
      grecaptcha.reset();
      $rootScope.error = {value: true, text:'please veryfy that you are a human'};
      $scope.removeError();

    }
  }, function(response) {
    $rootScope.error = {value: true, text:response.data};
    $scope.removeError();

  });

}




$scope.removeError = ()=>{
  setTimeout(function(){
    $rootScope.error = {value: false, text:''};
    $rootScope.$apply();
  }, 2000);
}



}]);
