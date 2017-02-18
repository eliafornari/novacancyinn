'use strict'

import 'angular'
import 'angular-route'
import 'angular-animate'
import 'angular-resource'
import Prismic from 'prismic.io'
import jQuery from "jquery"
// import * as d3 from "d3";
// import jsdom from "jsdom"

angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'infinite-scroll'
])


.run(['$anchorScroll', '$route', '$rootScope', '$location', '$routeParams','$templateCache', function($anchorScroll, $route, $rootScope, $location, $routeParams, $templateCache) {

$rootScope.pageLoading = true;

//a change of path should not reload the page


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
                  $route.current = '/';
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


    .when('/privacy', {
      templateUrl: 'privacy/privacy.html',
      controller: 'privacyCtrl'
    })

    .when('/product/:detail', {
      templateUrl: 'views/detail.html',
      controller: 'detailCtrl',
    })

    .when('/product', {
      templateUrl: 'views/product.html',
      controller: 'productCtrl',
    })
    .when('/order', {
      templateUrl: 'views/order.html',
      controller: 'orderCtrl',
      reloadOnSearch: false
    })

    /*............................. Take-all routing ........................*/



    .when('/', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardCtrl',
    })


    // put your least specific route at the bottom
    .otherwise({redirectTo: '/'})






}])

.controller('appCtrl', function($scope, $location, $rootScope, $routeParams, $timeout, $interval, $window, $http, transformRequestAsFormPost){

$rootScope.location = $location.path();
$rootScope.firstLoading = true;
$rootScope.pageClass = "page-home";
$rootScope.Home;


















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
              $rootScope.pageLoading = true;
              $(".landscape-view-wrapper").css({
                "width":"100vw",
                "height": "100vh",
                "display": "block"
            });
            }else{
              $rootScope.landscapeView = false;
              $rootScope.pageLoading = false;
            }
        }
      }

    $scope.landscapeFunction();










});//......end of the route controller




var jquerymousewheel = require('./vendor/jquery.mousewheel.js')($);
var json2 = require("./vendor/json2.js");
var infiniteScroll = require("./vendor/infiniteScroll.js");
var jqueryUI = require('./vendor/jquery-ui.min.js');
var dashboard = require("./dashboard.js");
var product = require("./product.js");
var detail = require("./detail.js");
var order = require("./order.js");
var nav = require("./nav.js");
var service = require("./services.js");
