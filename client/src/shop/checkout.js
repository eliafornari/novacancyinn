'use strict'

var Checkout = angular.module('myApp');

Checkout.controller('checkoutCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost){


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

  $rootScope.shipmentToPayment = (event) =>{
    if($scope.checkoutForm.$valid){
      $http.post('/cartToOrder', $rootScope.checkout)
      .then(function(response) {
        $rootScope.Order=response.data;
        // $rootScope.payment.id = response.data.id;
        $location.path('/shop/payment', true);
        // mailchimp.register($rootScope.checkout);
      }, function(response) {
        $rootScope.error = {value: true, text:response.data};
        // event.preventDefault();
        setTimeout(function(){
          $rootScope.error = {value: false, text:''};
          $rootScope.$apply();
        }, 2000);
          console.error("error in posting");
      });


    }else{
      $rootScope.error = {value: true, text:'fill in the form correctly'};
      // event.preventDefault();
      setTimeout(function(){
        $rootScope.error = {value: false, text:''};
        $rootScope.$apply();
      }, 2000);
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



});
