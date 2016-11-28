angular.module('myApp')

.controller('aboutCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $document, anchorSmoothScroll, $window){

$rootScope.pageLoading = false;

$scope.aboutText = [
  {
    x:"2",
    y:"40",
    text:"No Man's Land",
    type:"folio",
    size:30,
    point: 1
  },
  {
    x:"20",
    y:"20",
    text:"No Man's Land",
    type:"sabon",
    size:40,
    point: 2
  },
  {
    x:"20",
    y:"80",
    text:"No Man's Land",
    type:"Book Antiqua",
    size:50,
    point: 3
  },
  {
    x:"50",
    y:"33",
    text:"No Man's Land",
    type:"helvetica",
    size:20,
    point: 4
  },
  {
    x:"30",
    y:"70",
    text:"No Location",
    type:"Times New Roman",
    size:35,
    point: 5
  },
  {
    x:"30",
    y:"40",
    text:"World",
    type:"Arial Black",
    size:35,
    point: 6
  },
  {
    x:"50",
    y:"30",
    text:"Heaven or Las Vegas",
    type:"Tahoma",
    size:75,
    point: 7
  },
  {
    x:"30",
    y:"20",
    text:"No Man's Land",
    type:"Geneva",
    size:75,
    point: 8
  },
  {
    x:"10",
    y:"90",
    text:"Thank You",
    type:"Courier",
    size:25,
    point: 9
  }

  // Impact
  // Tahoma
  // Geneva
  // Courier
  // Monaco
  // monospace



];






$scope.wheel_about;
$scope.scroll_about=0;
$scope.view_about=0;

$scope.startWheel_about = ()=>{
  $(".about").bind('mousewheel', function(event, delta) {
      //  console.log(event.deltaX, event.deltaY, event.deltaFactor);
      //  console.log(delta);
     this.scrollLeft += (event.deltaY * 0.4);
     $scope.scroll_about = $scope.scroll_about + (-event.deltaY * 0.4);

     $scope.view_about= parseInt($scope.scroll_about/$rootScope.windowHeight);


     event.preventDefault();
     $scope.wheel_about=true;
     $rootScope.$apply();
  });
}

$scope.startWheel_about();


$scope.stopWheel_about = ()=>{
  $(".about").unbind('mousewheel');
  $scope.wheel_about=false;
}


setTimeout(function(){
//   $scope.loadVideo();
$scope.onYouTubeIframeAPIReady();

}, 1000);



  var player;
  var state = true;

$scope.onYouTubeIframeAPIReady=()=>{
    player = new YT.Player('video', {
      height: '100%',
      width: '100%',
      playerVars: { 'autoplay': 0, 'controls': 0,  controls:0, fs:0, rel:0, showinfo:0, autohide:1, color:'white'},
      videoId: 'eYb9cbUsPxY',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });


    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {
        //  && !done
        // setTimeout(, 6000);
        state = true;
        // done = true;
      }else{
        state = false;
      }
    }




    $scope.playPause=()=>{
      console.log("clicked");
      // player.pauseVideo();
      if(state){
        player.pauseVideo();
        console.log("pause");
      }else {
      player.playVideo();
        console.log("play");
      }
    }
};





$scope.loadVideo=()=>{


  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');



  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '100%',
      width: '100%',
      playerVars: { 'autoplay': 0, 'controls': 0,  controls:0, fs:0, rel:0, showinfo:0, autohide:1, color:'white'},
      videoId: 'eYb9cbUsPxY',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }






} //load video function




});//controller
