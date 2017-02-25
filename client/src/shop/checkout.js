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






// 1 check shipment form validity
$scope.checkShipping=()=>{
  if(!$scope.shipmentLoading){
    if($scope.termsAndServices){
      if($scope.checkoutForm.$valid){
        $scope.checkCapcha();
      }else{
        $rootScope.error = {value: true, text:'fill in the form correctly'};
        $scope.removeError();
      }
    }else{
      $rootScope.error = {value: true, text:'accept our terms and services to proceed'};
      $scope.removeError();
    }
  }
}



// 2 check Capcha form validity
  $scope.capchaRan=false;
  setTimeout(function(){
    if($scope.capchaRan){
      grecaptcha.reset();
      $scope.capchaRan=false;
    }
  }, 900);


  $scope.checkCapcha=()=>{
    $scope.capchaRan=true;
    var key = grecaptcha.getResponse();
    var url = '/capcha?key='+key
    $http.post(url)
    .then(function(response) {
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




// 3 check shipment form validity
$scope.shipmentLoading=false;

$rootScope.shipmentToPayment = () =>{
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

}









    // $scope.$watch('checkoutForm.$valid', function(newVal, oldVal){
    //   if ($scope.checkoutForm.$valid){
    //     $rootScope.shipment_forwardActive = true;
    //   }else{
    //     $rootScope.shipment_forwardActive = false;
    //   }
    // }, true);


$scope.phoneRegex = '^(\\+\\d{1,2}\s)?\\(?\\d{3}\\)?[\s.-]\\d{3}[\\s.-]\\d{4}$';
// $scope.postcodeRegex = '^\\d{5}-\\d{4}|\\d{5}|[A-Z]\\d[A-Z] \\d[A-Z]\\d$';
$scope.postcodeRegex = '[a-zA-Z0-9_.-]*$';
// (^\\d{4,5}(-\\d{4})?$)|(^[A-Z]{1,2}\\d{1,2}[A-Z]{1,2} *\\d{1}[A-Z]{1}\\d{1}$)



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


var Domestic = ['CA','MX'];
var NorthAmerica = ['CA','MX'];
var EuropeC = ['GB', 'FR', 'DE', 'IE', 'IT', 'LU', 'MC', 'NL', 'PT', 'SM', 'ES', 'BE'];
var EuropeD = ['AD', 'AT', 'BG', 'IC', 'CY', 'DK', 'EE', 'FO', 'FI', 'GI', 'GR', 'GL', 'GG', 'HU', 'IS', 'JE', 'LV', 'LI', 'LT', 'MT', 'NO', 'RO', 'SK', 'SI', 'SE', 'CH'];
var MiddleEast = ['RU', 'PL', 'CS', 'UA', 'UZ', 'TJ', 'AF', 'AL', 'AZ', 'BY', 'BA', 'HR', 'CZ', 'GE', 'IR', 'IQ', 'KZ', 'XK', 'MK', 'MD', 'CS', 'KG'];
var japankorea = ['JP', 'KR'];
var dhl_H1 = ['HK', 'SG','TW'];
var dhl_H2 = ['AU', 'BD','GU', 'IN', 'ID','MP', 'MO', 'MY', 'FM', 'NZ', 'PW', 'PH', 'LK', 'TH', 'VN'];
var dhl_I = ['WS', 'BT', 'BN', 'KH', 'CK', 'TL', 'FJ', 'KI', 'KP', 'LA', 'MV', 'MH', 'MN', 'MM', 'NR', 'NP', 'NC', 'NU', 'PG', 'WS', 'SB', 'PF', 'TO', 'TV', 'VU'];
var dhl_J = ['AI', 'AG', 'AW', 'BS', 'BB', 'BM', 'BQ', 'KY', 'CU', 'CW', 'DM', 'DO', 'GD', 'GP', 'HT', 'JM', 'MQ', 'MS', 'KN', 'BL', 'LC', 'SX', 'VC', 'TT', 'TC', 'VG', 'VI'];
var dhl_K = ['AR', 'BZ', 'BO', 'BR', 'CL', 'CO', 'CR', 'EC', 'SV', 'FK', 'GF', 'GT', 'GY', 'HN', 'NI', 'PA', 'PY', 'SR', 'UY', 'VE'];
var dhl_L = ['AM', 'BH', 'EG', 'IL', 'JO', 'KW', 'LB', 'OM', 'PK', 'QA', 'SA', 'SY', 'TR', 'AE', 'YE'];
var dhl_M = ['DZ', 'AO', 'BJ', 'BW', 'BF', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CI', 'DJ', 'ER', 'ET', 'GA', 'GM', 'GH', 'GN','GW','GQ', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'YT', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW', 'SH', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'SZ', 'TZ', 'TG', 'TN', 'UG', 'ZM', 'ZW'];
var dhl_P = ['PR'];

// ['AL','AD','AM','AT','AZ','BY','BA','BG','HR','CY','CZ','DK','EE','FI','FR','GE','DE','GR','HU','IS','IE','KZ','XK','LV','LI','LT','LU','MK','MT','MD','MC','ME','NL','NO','PL','PT','RO','RU','SM','RS','SK','SI','ES','SE','CH','TR','UA','GB'];

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
    $rootScope.checkout.shipment_method='1336838094099317449'; //USPS
  }else if($rootScope.checkout.shipment.country==('CA')){
    $rootScope.checkout.shipment_method='1457498623771148962'; //DHL A
  }else if($rootScope.checkout.shipment.country==('MX')){
    $rootScope.checkout.shipment_method='1457523720934392484'; //DHL B MEXICO
  }else if (EuropeC.indexOf($rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1457545045329576802'; //DHL C EUROPE
  }else if (EuropeD.indexOf($rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1457546135060087465'; //DHL D EUROPE
  }else if ( MiddleEast.indexOf($rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1457546885295243946'; //DHL E MIDDLE EAST
  }else if ( japankorea.indexOf($rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1457547418676495019'; //DHL F JAPAN KOREA
  }else if($rootScope.checkout.shipment.country==('CN')){
    $rootScope.checkout.shipment_method='1457547745110786732'; //DHL G CHINA
  }else if ( dhl_H1.indexOf($rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1457548417466106541'; //DHL H1 HONG KONG Taiwan KOREA
  }else if ( dhl_H2.indexOf($rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1457549598078796643'; //DHL H2
  }else if ( dhl_I.indexOf($rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1457550263857447599'; //DHL I oceania / islands
  }else if ( dhl_J.indexOf($rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1457550822379356848'; // DHL PACIFIC ISLANDS
  }else if ( dhl_K.indexOf($rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1457553864625488562'; // DHL SOUTH AMERICA
  }else if ( dhl_L.indexOf($rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1457555137353482931'; // DHL
  }else if ( dhl_M.indexOf($rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1457555622743507636'; // DHL
  }else if ( dhl_P.indexOf($rootScope.checkout.shipment.country ) != -1){
    $rootScope.checkout.shipment_method='1457556467988038325'; // DHL PUERTO RICO
  }else{
    $rootScope.checkout.shipment_method='1336838640038314698'; // DHL INT ELSE NOT FOUND
  }



  if($rootScope.Cart.totaWeight==0){$rootScope.calculateCart()}

  if($rootScope.checkout.shipment.country!=('US')){
    if($rootScope.Cart.totaWeight>=2.5){
      $rootScope.checkout.shipment_method='1457669602610774831';
    }else if($rootScope.Cart.totaWeight>=3){
      $rootScope.checkout.shipment_method='1457684099945726769';
    }
  }


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













$scope.removeError = ()=>{
  setTimeout(function(){
    $rootScope.error = {value: false, text:''};
    $rootScope.$apply();
  }, 2000);
}



}]);
