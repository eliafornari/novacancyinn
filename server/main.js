"use strict"


let https = require("https");
let http = require("http");
let fs = require('fs');
let express = require("express");
let bodyParser = require('body-parser');
let routes  = require('./routes');
let path = require('path');
let formidable = require('formidable');
var util = require('util');
let ejs = require('ejs');
let sessions = require('client-sessions');
let request = require('request');
let crypto = require('crypto');
let fsextra  = require('fs-extra');
let order  = require('./order/order.js');
let app = express();

let moltin = require('moltin')({
  publicId: 'A2Stjda1dCV4GhYRsbUO7jdXJZ3jsYNA1NZQ934ukI',
  secretKey: '1jHUHixgRJgTAq8fpocmXdbf1rbwdIYVYSeKzTgLCF'
});


//NOVACANCYINN
// A2Stjda1dCV4GhYRsbUO7jdXJZ3jsYNA1NZQ934ukI
// 1jHUHixgRJgTAq8fpocmXdbf1rbwdIYVYSeKzTgLCF

//ALYX
// publicId: 'aRfWbMWHHHluwvHks6WJdcvqAnpSUqoejRoepXPaL9',
// secretKey: 'xurGyrYMpKCgMIzNs4ZeCugHfMfOeJEDxXeBuxTs2K'



app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
// app.use(function(req, res, next) {
//     if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
//         res.redirect('https://' + req.get('Host') + req.url);
//     }
//     else
//         next();
// });
app.use( express.static(__dirname + "/../client/assets/images") );
app.use(express.static('/../node_modules/jquery/dist/jquery.min.js'));
app.set('views', __dirname + '/../client');
app.use( express.static(__dirname + "/../client") );
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies












app.use(sessions({
  cookieName: 'mySession', // cookie name dictates the key name added to the request object
  secret:'A2Stjda1dCV4GhYRsbUO7jdXJZ3jsYNA1NZQ934ukI', // should be a large unguessable string
  duration: 3600 * 1000, // how long the session will stay valid in ms
  activeDuration: 3600 * 1000 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));


function generateCrypto(){
  var crypto_token;
 crypto.randomBytes(18, function(err, buffer) {
  crypto_token = buffer.toString('hex');
  //  console.log("crypto_token: "+crypto_token);

 });

return crypto_token;
}



app.use(function(req, res, next) {

    if (!req.mySession.access_token || !req.mySession.expires) {
      res.setHeader('X-Seen-You', 'false');
      authMoltin(req, res, next);

    }else{
      var timeLeft = setToHappen(req.mySession.expires);

      if(timeLeft<1000){
        authMoltin(req, res, next);
      }else{
        // authMoltin(req, res, next);
        moltin.Authenticate(function(data) {
        });
        next();
      }

    }

});






// app.get('/authenticate', function(req, res){
//   authMoltin();
// });


function authMoltin(req, res, next){
  moltin.Authenticate(function(data) {

    if(data){

      if(req.mySession.access_token && (req.mySession.access_token==data.access_token)){
        console.log("1 runs");

      }else if(data.token){
        console.log("2 runs");
        // console.log(data);
        req.mySession.access_token = data.token;
        // res.status(200).json(data);
      }else{
        console.log("3 runs");
        req.mySession.access_token = data.access_token;
      }

      req.mySession.expires = data.expires;
      next();



    }else{
      res.status(500);
    }

  });
}




function setToHappen(d){
    var t = d - (new Date()).getTime();
    return t;
}



















app.get('/getProducts', function(req, res){
  getProduct(req, res);
});


function getProduct(req, res){
    moltin.Product.List(null, function(product) {
      // console.log(product);
        res.json(product);
    }, function(error) {
        // Something went wrong...
        console.log("Something went wrong in getting the products..");
    });
}







// ..... UPDATE PRODUCT

app.put('/updateProduct', function(req, res){
  updateProduct(req, res);
});

function updateProduct(req, res){
  var body = req.body;
  moltin.Product.Update(body.id, {
      title:  body.title,
      slug:   body.slug,
      stock_level: body.stock_level
  }, function(product) {
      console.log(product);
      res.status(200).json(product);
  }, function(error) {
    console.log(error);
      // Something went wrong...
  });
}













// ..... VARIATIONS

app.post('/getVariations', function(req, res){
  getVariations(req, res);
});


function getVariations(req, res){
  var id = req.body.id;
  console.log("getVariations");
  console.log(req.body);

    request({
          url: 'https://api.molt.in/v1/products/'+id+'/variations/', //URL to hit
          method: 'GET',
          headers: {
            'Authorization': 'Bearer '+req.mySession.access_token,
          }
        }, function(error, response, body){
          if(error) {
              console.log(error);
              res.status(response.statusCode).json(response.result);
          } else {
              var body = JSON.parse(body);
              console.log(response.statusCode, body);
              res.status(response.statusCode).json(body);
          }
    });
}












// ..... UPLOAD IMAGE


  app.post('/upload', function (req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });

    form.on('end', function(fields, files) {
      /* Temporary location of our uploaded file */
      // console.log(name);
      var temp_path = this.openedFiles[0].path;
      /* The file name of the uploaded file */
      var file_name = this.openedFiles[0].name;
      var type = this.openedFiles[0].type;
      /* Location where we want to copy the uploaded file */
      var new_location = './uploads/';


      fsextra.copy(temp_path, new_location + file_name, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log("success!");
          var thelocation = new_location + file_name
          createAsset(file_name, thelocation, type);
        }
      });
    });
  });



  function createAsset(file_name, thelocation, type){

    console.log('file_name', file_name);
    console.log('thelocation', thelocation);
    console.log('type', type);
    file_name = file_name.toString();
    thelocation = thelocation.toString();
    type = type.toString();
    // var complete_location = "http://localhost:8081/uploads/"+file_name;
    // var thelocation = './uploads/'+file_name;
    //
    // request({
    //   url: 'https://api.molt.in/v1/files',
    //   method: 'POST',
    //   headers: {
    //     'Authorization': 'Bearer '+token,
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   body: {
    //     'assign_to':'1345974636134793235'
    //   }
    // }, function (error, response, body, sys) {
    //   // console.log('Status:', response.statusCode);
    //   console.log('Response:', body);
    //   console.log(error);
    //   console.log(response);
    //   // var obj = JSON.parse(body);
    // });




  console.log(__dirname);

    var thispath = path.dirname(thelocation);
  console.log(thispath);

    var formData = {

      // Pass a simple key-value pair
      // my_field: 'my_value',
      // Pass data via Buffers
      my_buffer: new Buffer([1, 2, 3]),
      // Pass data via Streams
      file: fs.createReadStream(thispath+'/'+file_name),
      assign_to:'1346897568679854286'
      // Pass multiple values /w an Array
      // attachments: [
      //   fs.createReadStream(__dirname + '/uploads'+file_name)
      // ]
      // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
      // Use case: for some types of streams, you'll need to provide "file"-related information manually.
      // See the `form-data` README for more information about options: https://github.com/form-data/form-data
      // custom_file: {
      //   value:  fs.createReadStream('/dev/urandom'),
      //   options: {
      //     filename: 'topsecret.jpg',
      //     contentType: 'image/jpg'
      //   }
      // }
    };
    request.post({
      url:'https://api.molt.in/v1/files',
      headers: {
        'Authorization': 'Bearer '+req.mySession.access_token,
        'Content-Type': 'multipart/form-data'
      },
      formData: formData
    }, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Upload successful!  Server responded with:', body);
    });

  }






//orders

  app.get('/order/list', function(req, res){
    order.list(req, res);
  });

  app.get('/order/:order/get', function(req, res){
    order.get(req, res);
  });

  app.get('/order/:order/items', function(req, res){
    order.items(req, res);
  });






//functions


    app.post('/updatestock', function(req, res){
      updateOverallStockFN(req, res);
    });


    function updateOverallStockFN(req, res){
      var contents = req.body.data.result;
      console.log("updateOverallStockFN");
      console.log(contents);

        for (var i in contents){
          var id = contents[i].product.data.id;
          console.log("id: "+contents[i].product.data.id);
          var newStock = contents[i].product.data.stock_level - 1;
          console.log("contents[i].stock_level: "+contents[i].product.data.stock_level);
          console.log("newStock: "+newStock);

          moltin.Product.Update(id, {
              stock_level:  newStock
          }, function(product) {

              console.log(product);
              console.log("overall stock update successful");
              res.status(200).json(product);

          }, function(error, response, c) {
            console.log("payment failed!");
            console.log("response: "+response);
            console.log("c: "+c);
            console.log("error: "+error);
            res.status(c).json(response);
              // Something went wrong...
          });

        }//for loop

    }





    function eraseAllOrders(){

      moltin.Order.List(null, function(order) {
          // console.log(order);
          for (var i in order){

            var id = order[i].id;
            id = id.toString();

            console.log(id);

            moltin.Order.Delete(id, function(data) {

              console.log(data);
                // Success
            }, function(error) {
                // Something went wrong...
            });

          }
      }, function(error) {
          // Something went wrong...
      });

    }





    app.get('/robots.txt', routes.robots);

    app.get('*', routes.index);
    app.listen(8081, () => console.log("listening on 8081"));

    // https.createServer(options, app).listen(80);
    // http.createServer(app).listen(9000);




    // // set up plain http server
    // var http = express.createServer();
    //
    // // set up a route to redirect http to https
    // http.get('*',function(req,res){
    //     res.redirect('https://mydomain.com'+req.url)
    // })
    //
    // // have it listen on 8080
    // http.listen(8080);
