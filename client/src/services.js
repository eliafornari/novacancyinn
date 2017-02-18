

/* Services */
var Service = angular.module('myApp');

Service.factory(
    "transformRequestAsFormPost",
    function() {
        // I prepare the request data for the form post.
        function transformRequest( data, getHeaders ) {
            var headers = getHeaders();
            headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
            return( serializeData( data ) );
        }
        // Return the factory value.
        return( transformRequest );
        // ---
        // PRVIATE METHODS.
        // ---
        // I serialize the given Object into a key-value pair string. This
        // method expects an object and will default to the toString() method.
        // --
        // NOTE: This is an atered version of the jQuery.param() method which
        // will serialize a data collection for Form posting.
        // --
        // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
        function serializeData( data ) {
            // If this is not an object, defer to native stringification.
            if ( ! angular.isObject( data ) ) {
                return( ( data == null ) ? "" : data.toString() );
            }
            var buffer = [];
            // Serialize each key in the object.
            for ( var name in data ) {
                if ( ! data.hasOwnProperty( name ) ) {
                    continue;
                }
                var value = data[ name ];
                buffer.push(
                    encodeURIComponent( name ) +
                    "=" +
                    encodeURIComponent( ( value == null ) ? "" : value )
                );
            }
            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                .join( "&" )
                .replace( /%20/g, "+" )
            ;
            return( source );
        }
    }
);




//.................................................google SEO


Service.service('PageTitle', function() {
      var title = 'Angel Sanchez';
      return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; }
      };
    });



Service.service('MetaInformation', function() {
      var metaDescription = '';
      var metaKeywords = '';
      return {
        metaDescription: function() { return metaDescription; },
        metaKeywords: function() { return metaKeywords; },
        reset: function() {
          metaDescription = '';
          metaKeywords = '';
        },
        setMetaDescription: function(newMetaDescription) {
          metaDescription = newMetaDescription;
        },
        appendMetaKeywords: function(newKeywords) {
          for (var key in newKeywords) {
            if (metaKeywords === '') {
              metaKeywords += newKeywords[key].name;
            } else {
              metaKeywords += ', ' + newKeywords[key].name;
            }
          }
        }
      };
    });




    Service.service('exportData', function(){

      return {

         csv: function(JSONData, ReportTitle, ShowLabel) {
            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

            var CSV = '';
            //Set Report title in first row or line

            // CSV += ReportTitle + '\r\n\n';

            //This condition will generate the Label/Header
            if (ShowLabel) {
                var row = "";

                //This loop will extract the label from 1st index of on array
                for (var index in arrData[0]) {

                    //Now convert each value to string and comma-seprated
                    row += index + ',';
                }

                row = row.slice(0, -1);

                //append Label row with line break
                CSV += row + '\r\n';
            }

            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                var row = "";

                //2nd loop will extract each column and convert it in string comma-seprated
                for (var index in arrData[i]) {
                    row += '"' + arrData[i][index] + '",';
                }

                row.slice(0, row.length - 1);


                //add a line break after each row
                CSV += row + '\r\n';

            }

            if (CSV == '') {
              alert("Invalid data");
              return;
            }

            //Generate a file name
            var fileName = "MyReport_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g,"_");

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

      }




 });


    Service.service('anchorSmoothScroll', function(){

         this.scrollTo = function(eID) {

             // This scrolling function
             // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

             var startY = currentYPosition();
             var stopY = elmYPosition(eID);
             var distance = stopY > startY ? stopY - startY : startY - stopY;
             if (distance < 100) {
                 scrollTo(0, stopY); return;
             }
             var speed = Math.round(distance / 100);
             if (speed >= 20) speed = 20;
             var step = Math.round(distance / 25);
             var leapY = stopY > startY ? startY + step : startY - step;
             var timer = 0;
             if (stopY > startY) {
                 for ( var i=startY; i<stopY; i+=step ) {
                     setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                     leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                 } return;
             }
             for ( var i=startY; i>stopY; i-=step ) {
                 setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                 leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
             }

             function currentYPosition() {
                 // Firefox, Chrome, Opera, Safari
                 if (self.pageYOffset) return self.pageYOffset;
                 // Internet Explorer 6 - standards mode
                 if (document.documentElement && document.documentElement.scrollTop)
                     return document.documentElement.scrollTop;
                 // Internet Explorer 6, 7 and 8
                 if (document.body.scrollTop) return document.body.scrollTop;
                 return 0;
             }

             function elmYPosition(eID) {
                 var elm = document.getElementById(eID);
                 var y = elm.offsetTop;
                 var node = elm;
                 while (node.offsetParent && node.offsetParent != document.body) {
                     node = node.offsetParent;
                     y += node.offsetTop;
                 } return y;
             }

         };

     });
