
var Detail = angular.module('myApp');
Detail.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, title, uploadUrl){
        var fd = new FormData();
        file.name = title;
        console.log(file.name);

        fd.append('file', file, title);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}])

Detail.controller('detailCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $document, anchorSmoothScroll, $window, transformRequestAsFormPost, fileUpload){

$scope.myFile;




  $scope.$on('$routeChangeSuccess', function(){

    // $rootScope.openDetailFN();
    $rootScope.isDetailOpen = true;
    $rootScope.detailUpdate($routeParams.detail);

    setTimeout(function(){
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


  $rootScope.detailUpdate = (slug) => {
    for (var i in $rootScope.Product){
      if ($rootScope.Product[i].slug == slug){
        $rootScope.Detail=$rootScope.Product[i];
        $scope.getVariations($rootScope.Detail.id);
      }
    }
  }


$rootScope.Variations = []


$scope.getVariations = (id)=>{

    $http({
      url: '/getVariations',
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: transformRequestAsFormPost,
      data: {'id': id}
    }).then(function(response){
      if(response.status == 200){
      $rootScope.Variations = response.data.result;
        console.log($rootScope.Variations);
      }

    });
  // console.log("variation");
  //   for (var m in $rootScope.Detail.modifiers){
  //     for (var v in $rootScope.Detail.modifiers[m].variations){
  //       var variation = $rootScope.Detail.modifiers[m].variations[v]
  //       console.log(variation);
  //     }
  //   }
}














  $rootScope.updateProduct = function(){

      $http({
        url: '/updateProduct',
        method: 'PUT',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: transformRequestAsFormPost,
        data: $rootScope.Detail
      }).then(function(response){
        $rootScope.pageLoading = false;
        console.log(response);
      });
}//updateProduct









$scope.checkImage = (file)=>{
  if (file.type.match('image.*') && (file.type.match('image/jpeg') || fileInput.type.match('image/png'))) {
    console.log("is an image");
    console.log('good');
    var type = file.type.substring(6);
    if(type=='jpeg'){type='jpg'}
    return type;
  }else{
    return false;
  }
}



$rootScope.imageSelected = {'value': false, 'text':''};

$scope.uploadFile = function(){
  var file = $scope.myFile;
  var uploadUrl = '/upload';
  var extension;
  var title = $scope.myFile.name;

  if($scope.checkImage(file) == false){
    return false;
  }else{
    title = title;
  }
  Object.defineProperties(file, {
    name: {value: title,writable: true}
  });
  fileUpload.uploadFileToUrl(file, title, uploadUrl);
};




})//controller

Detail.directive('fileModel', ['$parse','$rootScope', function ($parse, $rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(changeEvent){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                    console.log(element[0]);
                    console.log(element[0].files[0]);
                    console.log(scope.myFile);
                    if (element[0].files[0]){
                      $rootScope.imageSelected = {'value': true, 'text':element[0].files[0].name};
                    }else{
                      $rootScope.imageSelected = {'value': false, 'text':''};
                    }
                });



                //reading the file locally to display it
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);


            });
        }
    };
}]);
