'use strict'

import 'angular'
import 'angular-route'
import 'angular-animate'
import 'angular-resource'
import Prismic from 'prismic.io'
import jQuery from "jquery"

angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'infinite-scroll'
])


.run(['$anchorScroll', '$route', '$rootScope', '$location', '$routeParams','$templateCache', function($anchorScroll, $route, $rootScope, $location, $routeParams, $templateCache) {

$rootScope.pageLoading = true;
$rootScope.pageLoading = true;

  var original = $location.path;
  $location.path = function (path, reload) {
      if (reload === false) {
          var lastRoute = $route.current;
          var un = $rootScope.$on('$locationChangeSuccess', function () {
              $route.current = lastRoute;
              un();
          });
      }
      else if (reload === true){

        var currentPageTemplate = $route.current.templateUrl;
          $templateCache.remove(currentPageTemplate);

      var un = $rootScope.$on('$locationChangeSuccess', function () {
            // $route.current = 'worldoftheblonds/'+$routeParams.category+'/'+$routeParams.event;
            un();
            $route.reload();
        });
      }
      return original.apply($location, [path]);
  };





  }])

  .filter('trustUrl', function ($sce) {
      return function(url) {

        newurl = url+"?rel=0&amp;controls=0&amp;showinfo=0"
        // if (url){
          var trusted = $sce.trustAsResourceUrl(newurl);
          return trusted;
        // }
      };
    })




.config(['$routeProvider', '$locationProvider' ,'$sceProvider', function($routeProvider, $locationProvider, $sceProvider) {

$sceProvider.enabled(false);

  // use the HTML5 History API
  $locationProvider.html5Mode(true);

  $routeProvider


  // $locationChangeStart

    .when('/shop/product/:detail', {
      templateUrl: 'views/shop.html',
      // controller: 'detailCtrl',
      reloadOnSearch: false
    })

    .when('/shop', {
      templateUrl: 'views/shop.html',
      controller: 'shopCtrl',
      reloadOnSearch: false
    })

    .when('/radio', {
      templateUrl: 'views/radio.html',
      controller: 'radioCtrl'
    })

    .when('/archive', {
      templateUrl: 'views/archive.html'
    })


    .when('/about', {
      templateUrl: 'views/about.html'
    })

    .when('/contact', {
      templateUrl: 'views/contact.html'
    })

    .when('/event', {
      templateUrl: 'views/event.html',
      controller: 'eventCtrl'
    })



    .when('/privacy', {
      templateUrl: 'privacy/privacy.html',
      controller: 'privacyCtrl'
    })


    .when('/client/assets/images/profile.jpg', {

    }

)

    /*............................. Take-all routing ........................*/


    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'appCtrl'

    })


    // put your least specific route at the bottom
    .otherwise({redirectTo: '/'})






}])

.controller('appCtrl', function($scope, $location, $rootScope, $routeParams, $timeout, $interval, $window, $http, transformRequestAsFormPost){

$rootScope.location = $location.path();
$rootScope.firstLoading = true;
$rootScope.pageClass = "page-home";
$rootScope.Home;






  // $rootScope.Auth;
  //   $rootScope.authentication = function(){
  //
  //         // Simple GET request example:
  //         $http({
  //           method: 'GET',
  //           url: '/authenticate'
  //         }).then(function successCallback(response) {
  //
  //           if(response.data.access_token){
  //               console.log("auth");
  //               console.log(response);
  //               // this callback will be called asynchronously
  //               // when the response is available
  //               $rootScope.Auth = response.data;
  //               var expires = response.data.expires;
  //               var identifier = response.data.identifier;
  //               var expires_in = response.data.expires_in;
  //               var access_token = response.data.access_token;
  //               var type = response.data.token_type;
  //           }
  //
  //
  //           }, function errorCallback(response) {
  //             // called asynchronously if an error occurs
  //             // or server returns response with an error status.
  //           });
  //
  //   }//addToCart

    $rootScope.getProductsFN=function(){
      $http({method: 'GET', url: '/getProducts'}).then(function(response){
        console.log("product: ");
        console.log(response);
        $rootScope.Product = response.data;
        console.log(response.data);
        $rootScope.pageLoading = false;
      }).then(function(){
        console.log("an error occurred");
      })
    }
    $rootScope.getProductsFN();




  // setTimeout(function(){
  //   $rootScope.authentication();
  // }, 600);








  // font-family: 'Roboto Mono', monospace;
  // font-family: 'Roboto', sans-serif;



  $rootScope.desaturate = true;
  $rootScope.elia = false;
  // $rootScope.font = 'Roboto Mono';


  document.addEventListener("keydown", function(event) {
    console.log(event.which);
    var key = event.which

    // if(key == 66){
    //   $rootScope.desaturate = false;
    // }else if(key == 87){
    //   $rootScope.desaturate = true;
    // }
    if(key == 66){
      $rootScope.font = 'brush';
    }else if(key == 83){
      $rootScope.font = 'sabon';
    }



    if(key == 69){
      $rootScope.elia = true;
      setTimeout(function() {
        $rootScope.elia = false;
        console.log($rootScope.elia);
        $rootScope.$apply();
      }, 3000);
    }
    $rootScope.$apply();
  })




















    $rootScope.windowHeight = $window.innerHeight;

    jQuery($window).resize(function(){
        $rootScope.windowHeight = $window.innerHeight;
        $rootScope.checkSize();
        $scope.landscapeFunction();
        $scope.$apply();
    });



    //..............................................................................mobile
    //....this is the function that checks the header of the browser and sees what device it is
    $rootScope.isMobile, $rootScope.isDevice, $rootScope.isMobileDevice;
    $rootScope.checkSize = function(){
        $rootScope.checkDevice = {
              Android: function() {
                  return navigator.userAgent.match(/Android/i);
              },
              BlackBerry: function() {
                  return navigator.userAgent.match(/BlackBerry/i);
              },
              iOS: function() {
                  return navigator.userAgent.match(/iPhone|iPad|iPod/i);
              },
              Opera: function() {
                  return navigator.userAgent.match(/Opera Mini/i);
              },
              Windows: function() {
                  return navigator.userAgent.match(/IEMobile/i);
              },
              any: function() {
                  return ($rootScope.checkDevice.Android() || $rootScope.checkDevice.BlackBerry() || $rootScope.checkDevice.iOS() || $rootScope.checkDevice.Opera() || $rootScope.checkDevice.Windows());
              }
          };

        //........checks the width
          $scope.mobileQuery=window.matchMedia( "(max-width: 767px)" );
          $rootScope.isMobile=$scope.mobileQuery.matches;

        //.........returning true if device
          if ($scope.checkDevice.any()){
            $rootScope.isDevice= true;
          }else{
              $rootScope.isDevice=false;
          }

          if (($rootScope.isDevice==true)&&($scope.isMobile==true)){
            $rootScope.isMobileDevice= true;
          }else{
              $rootScope.isMobileDevice=false;
          }




            if ($rootScope.isDevice){
                $rootScope.mobileLocation = function(url){
                  $location.path(url).search();
                }
                $rootScope.mobileExternalLocation = function(url){
                  $window.open(url, '_blank');
                }
            } else if (!$rootScope.isDevice){
                $rootScope.mobileLocation = function(url){
                  return false;
                }
                $rootScope.mobileExternalLocation = function(url){
                  return false;
                }
            }

      }//checkSize
      $rootScope.checkSize();
      $rootScope.landscapeView = false;

     //function removing website if landscape

      $scope.landscapeFunction = function(){

        if ($rootScope.isMobile==true){
            if(window.innerHeight < window.innerWidth){
              $rootScope.landscapeView = true;
              $(".landscape-view-wrapper").css({
                "width":"100vw",
                "height": "100vh",
                "display": "block"
            });
            }else{
              $rootScope.landscapeView = false;
            }
        }
      }

    $scope.landscapeFunction();














$rootScope.Event = [];
$rootScope.Radio = [];
var eventRan = false;
var homeRan = false;
var radioRan = false;

    $rootScope.getContentType = function(type, orderField){

          Prismic.Api('https://novacancyinn.cdn.prismic.io/api', function (err, Api) {
              Api.form('everything')
                  .ref(Api.master())

                  .query(Prismic.Predicates.at("document.type", type))
                  .orderings('['+orderField+']')
                  .pageSize(100)
                  .submit(function (err, response) {

                      var Data = response;

                      // setTimeout(function(){
                      //   $rootScope.firstLoading = false;
                      //   $scope.$apply();
                      // }, 3000);


                      if (type =='event'){
                        $rootScope.Event = response.results;
                        console.log("event");
                        console.log(response.results);
                        if(eventRan == false){
                          console.log("eventReady");
                          eventRan = true;
                          setTimeout(function(){
                            $rootScope.$broadcast('eventReady');

                          }, 900);

                        }else{ return false; }

                      }else if(type =='home'){
                        $rootScope.Home = response.results;
                        console.log("home");
                        console.log(response.results);
                        if(homeRan == false){
                          console.log("homeReady");
                          homeRan = true;
                          $rootScope.$broadcast('homeReady');

                        }else{ return false; }

                      }else if(type =='radio'){
                        $rootScope.Radio = response.results;
                        console.log(response.results);
                        if(radioRan == false){
                          console.log("radioReady");
                          radioRan = true;
                          $rootScope.$broadcast('radioReady');

                        }else{ return false; }
                      }

                      // The documents object contains a Response object with all documents of type "product".
                      var page = response.page; // The current page number, the first one being 1
                      var results = response.results; // An array containing the results of the current page;
                      // you may need to retrieve more pages to get all results
                      var prev_page = response.prev_page; // the URL of the previous page (may be null)
                      var next_page = response.next_page; // the URL of the next page (may be null)
                      var results_per_page = response.results_per_page; // max number of results per page
                      var results_size = response.results_size; // the size of the current page
                      var total_pages = response.total_pages; // the number of pages
                      var total_results_size = response.total_results_size; // the total size of results across all pages
                        return results;
                  });
            });


    };


  $scope.hideNav = true;

    //MOBILE
    $scope.openMenu_m=()=>{
    $scope.hideNav = !$scope.hideNav;
    }
    $scope.closeNav_m=()=>{
    if($rootScope.isMobile){
      $scope.hideNav = true;
    }
  }




// The scroll event cannot be canceled. But you can do it by canceling these interaction events:
// Mouse & Touch scroll and Buttons associated with scrolling.

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
e = e || window.event;
if (e.preventDefault)
    e.preventDefault();
e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
  }
}

$rootScope.disableScroll =()=>{
if (window.addEventListener) // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false);
window.onwheel = preventDefault; // modern standard
window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
window.ontouchmove  = preventDefault; // mobile
document.onkeydown  = preventDefaultForScrollKeys;
}



$rootScope.enableScroll =()=>{
  if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.onmousewheel = document.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}






});//......end of the route controller




var jquerymousewheel = require('./vendor/jquery.mousewheel.js')($);
var infiniteScroll = require("./vendor/infiniteScroll.js");
var jqueryUI = require('./vendor/jquery-ui.min.js');
var home = require("./home.js");
var about = require("./about.js");
var events = require("./event.js");
var radio = require("./radio.js");
var nav = require("./nav.js");
var service = require("./services.js");
var cart = require("./shop/cart.js");
var shop = require("./shop/shop.js");
var shop = require("./shop/checkout.js");
