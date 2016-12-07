angular.module('myApp')

.controller('aboutCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $document, anchorSmoothScroll, $window){

$rootScope.pageLoading = false;

$scope.aboutText = [
  {
    x:"2",
    y:"40",
    text:"THE AFTER/AFTER PARTY AKA THENITESHOW",
    type:"folio",
    size:30,
    point: 1
  },
  {
    x:"20",
    y:"20",
    text:"CALL UP THE UBER XL. NEED TO TAKE US BACK TO LIKE '79'",
    type:"sabon",
    size:40,
    point: 2
  },
  {
    x:"20",
    y:"80",
    text:"#NYFW",
    type:"Book Antiqua",
    size:50,
    point: 3
  },
  {
    x:"50",
    y:"33",
    text:"FOR US BY US'",
    type:"helvetica",
    size:20,
    point: 4
  },
  {
    x:"30",
    y:"70",
    text:"I NEED OBAMA TO SHOW UP TONIGHT IN THAT TRACK SUIT…THAT'S MY RYDER",
    type:"Times New Roman",
    size:35,
    point: 5
  },
  {
    x:"30",
    y:"40",
    text:"TOO MANY BRANDS NO ENOUGH LIMITED LIABILITY LAWYERS",
    type:"Arial Black",
    size:35,
    point: 6
  },
  {
    x:"50",
    y:"30",
    text:"LIVE FROM TOKYO",
    type:"Tahoma",
    size:75,
    point: 7
  },
  {
    x:"30",
    y:"20",
    text:"CULTURE KIDS' KICKING IT AROUND WORLD LIKE IT'S FIFA",
    type:"Geneva",
    size:75,
    point: 8
  },
  {
    x:"10",
    y:"90",
    text:"ON A SUNNNY DAY IN SILVERLAKE",
    type:"Courier",
    size:25,
    point: 9
  }
  // 
  // THIS PARTY IS IN 'CARE' OF SOMETHING…STAY TUNED
  // CATCHING FLIGHTS LIKE UBERS
  // RAN UP NORTH TING TONIGHT
  // @TOMSACHS GAVE US ANOTHER KEY
  // THE DRESS CODE IS 'ACYDE'
  // PLAYING ROCK, PAPER, SCISSORS FOR WHO GETS TO WEAR THE 'SHIRT'
  // RICHARD LONG SOUND SYSTEM, SAY NO MORE...
  // JUST DROPPED @NOVACANCYINN TEE'S @DOVERSTREETMARKET GINZA IN JAPAN, IT'S SATURDAY THERE…I'M STILL IN LA THO COUNTING PALM TREES ON A FRIDAY EVENING…"MOMENTUM IS AN ART" -JIM JOE'
  // TURN DOWN SERVICE TOMORROW WITH SOME LA LEGENDS'
  // IN THE '74 BRONCO BUMPING 'THAT PART'
  // TURNED OUR FRIENDSHIPS INTO A LIFESTYLE
  // FACEMASK, DREADS, BUCKET HATS, RIPPED DENIM, NAUTICA & SNAKESKIN BOOTS
  // A CHILL ONE TONIGHT…I THINK
  // 'RESTORING' THE FEELING WITH MY BROTHERS
  // ART DADS™ LLC NIGHT OUT
  // OUR NEW YORK CULTURAL RESTORATION PROJECT CONTINUES
  // AND FOR MY LAST MAGIC TRICK, TO THE 'HILLS'
  // WHITE GUCCI LOAFTERS 'POOLCYDE'
  // #ADANCEFLOORFULLOFTEARS
  // EDDIE BAUER EDITION
  // SCOTCH IN THE DESERT'DE'
  // BACK IN THE BUILDING BEFORE WE TEAR IT DOWN
  // PULLING BACK THE DRAPES STARTING TOMORROW
  // 2016 WORLD TOUR STARTS HERE
  // CHARGE THE INCIDENTALS TO THE GAME
  // POPPIN MALARIA PILLS LIKE XANS
  // RIGHT NOW IN THE HILLS
  // IF YOU KNOW, YOU KNOW
  // AT THE DOLLA-NOL MEAN THE DELANO, I MEAN….PHARRELL'LL KNOW'
  // WE ON AT 1AM
  // YOU KNOW PROGRAM HIT ME OFF THE GRID FOR THE ADDY OR HOLLA AT YOUR PLUG
  // EXIT '00' OFF THE LOST HIGHWAY
  // YOU DO WHAT YOU WANT WHEN YOU POPPIN
  // SHANGHAI SMASH

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
