
var Dashboard = angular.module('myApp');
// var d3 = require("./vendor/d3.js");

Dashboard.controller('dashboardCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $document, anchorSmoothScroll, $window){

$rootScope.windowHeight = $window.innerHeight;
$rootScope.pageClass = "page-dashboard";
$scope.client;
$rootScope.Dashboard={};
$rootScope.Auth;
$rootScope.filter = {
  start_date: "",
  end_date:"",
  status:""
}



// curl -X POST https://api.molt.in/v1/files \
// 	-H "Authorization: Bearer XXXX" \
// 	-H "Content-Type: multipart/form-data" \
// 	-F "file=@C:\Users\Admin\Pictures\moltin_logo.png" \
// 	-d "assign_to=1019656230785778497"



$scope.login = ()=>{
  $rootScope.authentication();
}



$rootScope.filterDashboard = (filter)=>{
  $rootScope.listOrders_dashboard(filter);
}



//list orders

    $rootScope.listOrders_dashboard=function(filter){
      $http({method: 'GET', url: '/order/list?start_date='+filter.start_date+'&end_date='+filter.end_date})
        .then(function(response){
          console.log("orders: ");
          console.log(response);
          $rootScope.Dashboard.orders = response.data.result;
          $rootScope.pageLoading = false;
          $rootScope.filterOrders(filter);

        },function(){
          console.log("an error occurred");
        });
    }




    $rootScope.filterOrders = (filter)=>{
      var orders =[];
      var parsed ={};

      parsed.start_date = Date.parse(filter.start_date);
      parsed.end_date = Date.parse(filter.end_date);


      for(var i in $rootScope.Dashboard.orders){

        var created_at = Date.parse($rootScope.Dashboard.orders[i].created_at);
        // console.log("created_at: "+created_at);

        if((created_at>=parsed.start_date) && (created_at<=parsed.end_date)){
          orders.push($rootScope.Dashboard.orders[i]);

        }

      }
      console.log(orders);



      $rootScope.calcRevenue(orders);
      // $scope.runChart(orders);

    }





$rootScope.Total;


$rootScope.calcRevenue=(orders)=>{
  $rootScope.Total={
    subtotal: 0,
    shipping: 0,
    tax:0
  };


  for(var i in orders){
    $rootScope.Total.subtotal = $rootScope.Total.subtotal + orders[i].totals.raw.subtotal;
    $rootScope.Total.shipping = $rootScope.Total.shipping + orders[i].totals.raw.shipping_price;
    $rootScope.Total.tax = $rootScope.Total.tax + orders[i].totals.raw.tax;
    $rootScope.calcCountries(orders[i]);
  }
}






function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}



$rootScope.Dashboard.countries =[
  {
    code: "GB",
    name: "United Kingdom",
    orders: 0
  }
];




$rootScope.calcCountries = (order)=>{

  var countryIndex = arrayObjectIndexOf($rootScope.Dashboard.countries, order.ship_to.data.country.data.code, "code");

  if(countryIndex != -1){
    $rootScope.Dashboard.countries[countryIndex].orders = $rootScope.Dashboard.countries[countryIndex].orders+1;
  }else{
    //there is no country let's create it
    var newcountry = {
      code: order.ship_to.data.country.data.code,
      name: order.ship_to.data.country.data.name,
      orders: 1
    };
    $rootScope.Dashboard.countries.push(newcountry);
  }


};












  //chart
//
// $scope.runChart=(orders)=>{
//
//
//   var margin = {top: 20, right: 30, bottom: 30, left: 40},
//       width = 960 - margin.left - margin.right,
//       height = 500 - margin.top - margin.bottom;
//
//
// var barWidth = width / orders.length;
// //
// // var y = d3.scaleLinear()
// //   .range([height, 0])
// //   .domain([0, d3.max(orders, function(d) { return d.totals.raw.subtotal; })]);
//
//
//
//
//
//
//   var chart = d3.select(".chart")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//
//       var x = d3.scaleOrdinal()
//           .range([0, width]);
//
//       var y = d3.scaleLinear()
//           .range([height, 0]);
//
//
//
//       x.domain(orders.map(function(d) { return d.created_at; }));
//     y.domain([0, d3.max(orders, function(d) { return d.totals.raw.subtotal; })]);
//
//
//
//       var xAxis = d3.axisBottom()
//           .scale(x);
//
//       var yAxis = d3.axisLeft()
//           .scale(y);
//
//
//   // var bar = chart.selectAll("g")
//   //     .data(orders)
//   //   .enter().append("g")
//   //     .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });
//
//
//
//     chart.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis);
//
//     chart.append("g")
//         .attr("class", "y axis")
//         .call(yAxis);
//
//     chart.selectAll(".bar")
//         .data(orders)
//       .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function(d) { return x(d.created_at); })
//         .attr("y", function(d) { return y(d.totals.raw.subtotal); })
//         .attr("height", function(d) { return height - y(d.totals.raw.subtotal); })
//         .attr("width", x.range());
//
//
//
//
// }
//
//
//
//
// function type(d) {
//   d.totals.raw.subtotal = +d.totals.raw.subtotal; // coerce to number
//   return d;
// }


});//controller
