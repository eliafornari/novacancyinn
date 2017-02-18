angular.module('myApp')
.controller('orderCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, exportData, $window){

  $scope.orderLoading=false;
  $rootScope.Order={result:[]};
  $scope.downloadReady =false;

  $scope.setStatus=(status)=>{
    $location.search('status', status);
  }

  // $scope.searchOrderPage=(page)=>{
  //   $location.search('page', page);
  // }

  $scope.setPage=(number)=>{
    $location.search('offset', number);
  };

  $scope.saveFilter=()=>{
    $rootScope.Order.result=[];
    $rootScope.Order.pagination=[];
    $scope.setPage(0);
    $rootScope.listOrders(0);
  }


  $scope.setStatus('paid');
  $scope.setPage(0);







  $rootScope.listOrders=(offset)=>{
    console.log("offset: "+offset);
    $scope.downloadReady=false;
    $scope.orderLoading=true;
    if(!$routeParams.status){$routeParams.status='paid'};
    $http({method: 'GET', url: '/order/list?status='+$routeParams.status+'&offset='+offset})
      .then(function(response){

        console.log("list orders");
        console.log(response);
        $rootScope.Order.result = $rootScope.Order.result.concat(response.data.result);
        $rootScope.Order.pagination = response.data.pagination;
        $rootScope.Order.pagination.total_pages = $rootScope.Order.pagination.offsets.last/10;
        $scope.orderLoading=false;
        // $scope.createPages($rootScope.Order.pagination.total_pages);
        $rootScope.pageLoading = false;
        $scope.attachOrderItems($rootScope.Order.result);


      },function(){
        console.log("an error occurred");
      });
  };



  $rootScope.listOrders(0);




  setTimeout(function(){
    angular.element($window).bind("scroll", function() {
        var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        var body = document.body, html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        var windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight) {
            // alert('bottom reached');
            if(($rootScope.Order.pagination.offsets.next) && (!$scope.orderLoading)){
              $rootScope.listOrders($rootScope.Order.pagination.offsets.next);
            }

        }
    });
  }, 600);













$scope.loaded;

$scope.attachOrderItems = (data)=>{
  console.log(data);
  var x = 0;
  var loopArray = function(arr) {
     $scope.httpCall(arr[x], x, function(){
       // set x to next item
       x++;
       // any more items in array? continue loop
       if(x < arr.length) {
           loopArray(arr);
       }else{
         console.log("done");
         $scope.downloadReady=true;
       }
     });
 }



 $scope.httpCall = (content, number, callback) => {
   var orderID = content.id;
   $http({
     url: '/order/'+orderID+'/items',
     method: 'GET'
   }).then( function(response){

     $rootScope.Order.result[number].items = response.data.result;
     callback();

   }, function(error){
     console.log(error);
     $rootScope.error = {value: true, text:true};
   })
 }

 loopArray(data);

}



$rootScope.getOrderItems = (id, callback)=>{

  var orderID = id;
  $http({
    url: '/order/'+orderID+'/items',
    method: 'GET'
  }).then( function(response){
    $scope.loaded++
    if($scope.loaded>=10){
      $scope.downloadReady=true;
    }
    callback(response.data);

  }, function(error){
    console.log(error);
    $rootScope.error = {value: true, text:true};
  })

}









// $scope.createPages=(number)=>{
//   $rootScope.Order.pagination.pages = new Array();//create an empty array with length 45
//
//   for(var i=0; i< $rootScope.Order.pagination.total_pages; i++){
//     var obj = {
//       number: i
//     }
//     $rootScope.Order.pagination.pages.push(obj);
//     // $rootScope.Order.pagination.pages[i]['number'] = i;
//   }
// }







$scope.removeTime = (d)=>{
  d = d.split(' ')[0];
  return d;
}






$scope.processData = (data)=>{

  var obj;
  var arr=[];
  var order;



  for (var i in data){
    order={};
    order = data[i];
    let item;
    for (var o in order.items){
    obj ={};
    // $rootScope.getOrderItems();

    obj = {
      order_no: order.id,
      order_shipcost:order.totals.raw.shipping_price,
      order_tax:order.totals.raw.tax,
      customerid:order.customer.data.id,
      order_date:$scope.removeTime(order.created_at),
      order_transactionid:order.payment_number,
      ship_class:order.shipping.data.title,
      ship_carrier:order.shipping.data.company,
      order_subtotal:order.totals.raw.subtotal,
      order_total:order.totals.raw.total,
      order_declaredvalue:order.totals.raw.subtotal,
      ship_first:order.ship_to.data.first_name,
      ship_last:order.ship_to.data.last_name,
      ship_address1:order.ship_to.data.address_1,
      ship_address2:$scope.blankAddress(order.ship_to.data.address_2),
      ship_city:order.ship_to.data.city,
      ship_state:order.ship_to.data.county,
      ship_zip:order.ship_to.data.postcode,
      ship_phone:order.ship_to.data.phone,
      ship_country_code:order.ship_to.data.country.data.code,
      ship_country_name:order.ship_to.data.country.data.name,
      ship_email:order.ship_to.data.customer.data.email,
      bill_first:order.bill_to.data.first_name,
      bill_last:order.bill_to.data.last_name,
      bill_address1:order.bill_to.data.address_1,
      bill_address2:order.bill_to.data.address_2,
      bill_city:order.bill_to.data.city,
      bill_state:order.bill_to.data.county,
      bill_zip:order.bill_to.data.postcode,
      bill_country_code:order.bill_to.data.country.data.code,
      bill_country_name:order.bill_to.data.country.data.name,
      order_content:'100% Cotton t-shirt(s)',
      item_childsku:'',
      item_quantity:'',
      item_weight:'',
      item_unitprice:'',
      item_title:''
    }

    // arr = arr.concat(obj);
    var x=0;

      // console.log(x);
      // var key = "item"+x+"_childsku";
      obj.item_childsku=order.items[o].sku;
      obj.item_quantity=order.items[o].quantity;
      obj.item_weight=$scope.poundsToOunces(order.items[o].product.data.weight);
      obj.item_unitprice=order.items[o].price.data.raw.without_tax;
      obj.item_title=order.items[o].title;
      // console.log(obj);
      arr = arr.concat(obj);
    }

  }

  console.log(arr);

  return arr;

}



$scope.poundsToOunces =(pounds)=>{
  var ounces = pounds*16;
  return ounces
}


$scope.blankAddress = (string)=>{
  if(string=='undefined'){
    return ''
  }else{
    return string;
  }
}



$scope.convertJson = (data)=>{

  var data = $rootScope.Order.result;
  // $(document).ready(function(){
    // $('#csv-button').click(function(){
        // var data = $('#txt').val();
        if(data == '')
            return;

            var processed=$scope.processData(data);

        exportData.csv(processed, "", true);
    // });
// });

}






});
