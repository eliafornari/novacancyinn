angular.module('myApp')

.controller('aboutCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$timeout',	'$http', '$sce', '$document', 'anchorSmoothScroll', '$window', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $document, anchorSmoothScroll, $window){

$rootScope.pageLoading = false;

$scope.aboutText = [

  {
    x:"30",
    y:"40",
    text:"Disco Please",
    type:"Helvetica",
    size:30,
    point: 1
  },
  {
    x:"50",
    y:"40",
    text:"There is some life left in New York after all…",
    type:"folio",
    size:30,
    point: 1
  },
  {
    x:"2",
    y:"40",
    text:"It’s all about @younglord new tattoo & @prettyvacantcyde New boots…",
    type:"sabon",
    size:30,
    point: 1
  },
  {
    x:"20",
    y:"80",
    text:"LADIES NIGHT TM…The Dress Code is ‘PIA’",
    type:"Book Antiqua",
    size:30,
    point: 1
  },
  {
    x:"50",
    y:"33",
    text:"THE LINE UP IS NUUUUTTTTSSSSS",
    type:"Times New Roman",
    size:30,
    point: 1
  },
  {
    x:"60",
    y:"40",
    text:"PRAY FOR US IF THE ADDY LEAKS",
    type:"Arial Black",
    size:30,
    point: 1
  },
  {
    x:"54",
    y:"50",
    text:"No Vacancy Inn + Know Wave = #COMMUNIVERSITY",
    type:"Courier",
    size:30,
    point: 1
  },
  {
    x:"50",
    y:"50",
    text:"Heron was smart he wore sunglasses",
    type:"Monaco",
    size:30,
    point: 1
  },
  {
    x:"10",
    y:"20",
    text:"How a three man group chat turned in a made in Italy capsule collection",
    type:"monospace",
    size:30,
    point: 1
  },
  {
    x:"20",
    y:"40",
    text:"A celebration of taking it from tee shirts to shearling coats…",
    type:"Impact",
    size:30,
    point: 1
  },
  {
    x:"2",
    y:"40",
    text:"OFF-WHITE™ c/o A®T DAD LLC",
    type:"Tahoma",
    size:30,
    point: 1
  },
  {
    x:"40",
    y:"10",
    text:"Late nights early mornings",
    type:"Geneva",
    size:30,
    point: 1
  },
  {
    x:"80",
    y:"30",
    text:"Just trying to leave behind more than we got from this thing called life #OnlyJobTitleIveEverCaredFor",
    type:"Arial",
    size:30,
    point: 1
  },



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
    size:20,
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
    point: 4,
    stretchX:true,
    stretchY:false
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
    size:55,
    point: 7
  },
  {
    x:"30",
    y:"20",
    text:"CULTURE KIDS' KICKING IT AROUND WORLD LIKE IT'S FIFA",
    type:"Geneva",
    size:45,
    point: 8
  },
  {
    x:"10",
    y:"90",
    text:"ON A SUNNNY DAY IN SILVERLAKE",
    type:"Times New Roman",
    size:35,
    point: 9
  },

  {
    x:"40",
    y:"10",
    text:"THIS PARTY IS IN 'CARE' OF SOMETHING…STAY TUNED",
    type:"Impact",
    size:15,
    point: 10
  },

  {
    x:"80",
    y:"30",
    text:"CATCHING FLIGHTS LIKE UBERS",
    type:"Sabon",
    size:25,
    point:11
  },

  {
    x:"20",
    y:"50",
    text:"RAN UP NORTH TING TONIGHT",
    type:"Helvetica",
    size:35,
    point: 12
  },

  {
    x:"84",
    y:"50",
    text:"TOMSACHS GAVE US ANOTHER KEY",
    type:"monospace",
    size:25,
    point: 13
  },

  {
    x:"50",
    y:"50",
    text:"THE DRESS CODE IS 'ACYDE'",
    type:"Tahoma",
    size:25,
    point: 14
  },

  {
    x:"10",
    y:"30",
    text:"PLAYING ROCK, PAPER, SCISSORS FOR WHO GETS TO WEAR THE 'SHIRT'",
    type:"Courier",
    size:25,
    point: 15
  },

  {
    x:"20",
    y:"60",
    text:"RICHARD LONG SOUND SYSTEM, SAY NO MORE...",
    type:"Arial",
    size:15,
    point: 16
  },

  {
    x:"5",
    y:"30",
    text:"JUST DROPPED @NOVACANCYINN TEE'S @DOVERSTREETMARKET GINZA IN JAPAN, IT'S SATURDAY THERE…I'M STILL IN LA THO COUNTING PALM TREES ON A FRIDAY EVENING…'MOMENTUM IS AN ART' -JIM JOE'",
    type:"Monaco",
    size:25,
    point: 17,
    stretchX:false,
    stretchY:true
  },

  {
    x:"10",
    y:"90",
    text:"IN THE '74 BRONCO BUMPING 'THAT PART'",
    type:"monospace",
    size:25,
    point: 18
  },

  {
    x:"40",
    y:"60",
    text:"TURNED OUR FRIENDSHIPS INTO A LIFESTYLE",
    type:"Impact",
    size:35,
    point: 19
  },

  {
    x:"10",
    y:"70",
    text:"FACEMASK, DREADS, BUCKET HATS, RIPPED DENIM, NAUTICA & SNAKESKIN BOOTS",
    type:"folio",
    size:25,
    point: 20
  },

  {
    x:"70",
    y:"33",
    text:"A CHILL ONE TONIGHT…I THINK",
    type:"Sabon",
    size:25,
    point: 21
  },
  {
    x:"25",
    y:"80",
    text:"'RESTORING' THE FEELING WITH MY BROTHERS",
    type:"Helvetica",
    size:25,
    point: 22
  },
  {
    x:"80",
    y:"20",
    text:"OUR NEW YORK CULTURAL RESTORATION PROJECT CONTINUES",
    type:"Courier",
    size:25,
    point: 23
  },
  {
    x:"4",
    y:"70",
    text:"AND FOR MY LAST MAGIC TRICK, TO THE 'HILLS'",
    type:"Monaco",
    size:25,
    point: 24
  },
  {
    x:"50",
    y:"50",
    text:"WHITE GUCCI LOAFTERS 'POOLCYDE'",
    type:"Times New Roman",
    size:25,
    point: 25
  },
  {
    x:"20",
    y:"90",
    text:"#ADANCEFLOORFULLOFTEARS",
    type:"monospace",
    size:25,
    point: 26
  },
  {
    x:"10",
    y:"70",
    text:"EDDIE BAUER EDITION",
    type:"Courier",
    size:25,
    point: 27
  },
  {
    x:"30",
    y:"30",
    text:"A CHILL ONE TONIGHT…I THINK",
    type:"Book Antiqua",
    size:25,
    point: 28
  },
  {
    x:"40",
    y:"40",
    text:"SCOTCH IN THE DESERT'DE'",
    type:"Folio",
    size:25,
    point: 29
  },
  {
    x:"86",
    y:"43",
    text:"BACK IN THE BUILDING BEFORE WE TEAR IT DOWN",
    type:"Courier",
    size:25,
    point: 30
  },
  {
    x:"50",
    y:"90",
    text:"PULLING BACK THE DRAPES STARTING TOMORROW",
    type:"Monaco",
    size:25,
    point: 31
  },
  {
    x:"30",
    y:"70",
    text:"CHARGE THE INCIDENTALS TO THE GAME",
    type:"Tahoma",
    size:25,
    point: 32
  },
  {
    x:"40",
    y:"60",
    text:"POPPIN MALARIA PILLS LIKE XANS",
    type:"Courier",
    size:25,
    point: 33
  },
  {
    x:"55",
    y:"20",
    text:"RIGHT NOW IN THE HILLS",
    type:"Impact",
    size:25,
    point: 34
  },
  {
    x:"10",
    y:"40",
    text:"IF YOU KNOW, YOU KNOW",
    type:"Monaco",
    size:25,
    point: 35
  },
  {
    x:"10",
    y:"80",
    text:"AT THE DOLLA-NOL MEAN THE DELANO, I MEAN….PHARRELL'LL KNOW'",
    type:"Helvetica",
    size:25
  },
  {
    x:"80",
    y:"30",
    text:"YOU KNOW PROGRAM HIT ME OFF THE GRID FOR THE ADDY OR HOLLA AT YOUR PLUG",
    type:"Geneva",
    size:25
  },
  {
    x:"20",
    y:"90",
    text:"EXIT '00' OFF THE LOST HIGHWAY",
    type:"Courier",
    size:25
  },
  {
    x:"70",
    y:"70",
    text:"YOU DO WHAT YOU WANT WHEN YOU POPPIN",
    type:"Sabon",
    size:25
  },
  {
    x:"60",
    y:"90",
    text:"SHANGHAI SMASH",
    type:"Impact",
    size:25
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
$scope.stretchX=false;
$scope.stretchY=false;
$scope.delta=0;

$scope.startWheel_about = ()=>{
  $(".about").bind('mousewheel', function(event, delta) {
      //  console.log(event.deltaX, event.deltaY, event.deltaFactor);
      //  console.log(delta);
    //  this.scrollLeft += (event.deltaY * 0.3);


     $scope.scroll_about = $scope.scroll_about + (-event.deltaY * 0.3);


     var int = parseInt($scope.scroll_about/$rootScope.windowHeight);
     $scope.view_about = int;

         $scope.delta= (($scope.scroll_about/$rootScope.windowHeight)-int)*100;


     if($scope.view_about==41){
       $scope.scroll_about=0;
     }


    //  var objectIndex= $scope.view_about-1;
     //
    //  $scope.stretchX=$scope.aboutText[objectIndex].stretchX;
    //  $scope.stretchY=$scope.aboutText[objectIndex].stretchY;;


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
      videoId: 'q33Rzus2ILI',
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
      // player.pauseVideo();
      if(state){
        player.pauseVideo();
      }else {
      player.playVideo();
      }
    }
};





// $scope.loadVideo=()=>{

//   // 2. This code loads the IFrame Player API code asynchronously.
//   var tag = document.createElement('script');
//
//   tag.src = "https://www.youtube.com/iframe_api";
//   var firstScriptTag = document.getElementsByTagName('script')[0];
//   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//
//   // 3. This function creates an <iframe> (and YouTube player)
//   //    after the API code downloads.
//   var player;
//   function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//       height: '100%',
//       width: '100%',
//       playerVars: { 'autoplay': 0, 'controls': 0,  controls:0, fs:0, rel:0, showinfo:0, autohide:1, color:'white'},
//       videoId: 'eYb9cbUsPxY',
//       events: {
//         'onReady': onPlayerReady,
//         'onStateChange': onPlayerStateChange
//       }
//     });
//   }
//
//
// } //load video function




}]);//controller
