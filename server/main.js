"use strict"


let https = require("https");
let http = require("http");
let fs = require('fs');
let express = require("express");
let bodyParser = require('body-parser');
let routes  = require('./routes');
let path = require('path');
var util = require('util');
let ejs = require('ejs');
let sessions = require('client-sessions');
let request = require('request');
let crypto = require('crypto');
let app = express();


let moltin = require('moltin')({
  publicId: 'A2Stjda1dCV4GhYRsbUO7jdXJZ3jsYNA1NZQ934ukI',
  secretKey: '1jHUHixgRJgTAq8fpocmXdbf1rbwdIYVYSeKzTgLCF'
});


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
  secret:'jfadjhwnbsjdhmaevnbdkshnbeahsdh', // should be a large unguessable string
  duration: 3600 * 1000, // how long the session will stay valid in ms
  activeDuration: 3600 * 1000 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

function generateCrypto(){
  var crypto_token;
 crypto.randomBytes(18, function(err, buffer) {
  crypto_token = buffer.toString('hex');

 });

return crypto_token;
}

app.use(function(req, res, next) {

    if(!req.mySession.cartID){
      // var token = generateCrypto();
      crypto.randomBytes(18, function(err, buffer) {
        req.mySession.cartID = buffer.toString('hex');
      });
      moltin.Cart.Identifier(true, req.mySession.cartID);
    }else{
      moltin.Cart.Identifier(true, req.mySession.cartID);
    }

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


function authMoltin(req, res, next){
  moltin.Authenticate(function(data) {
    if(data){
      if(req.mySession.access_token && (req.mySession.access_token==data.access_token)){
        data.cart=req.mySession.cartID;
        //     console.log(data);
        // res.status(200).json(data);

      }else if(data.token){
        // console.log(data);
        req.mySession.access_token = data.token;
        data.cart=req.mySession.cartID;
        // res.status(200).json(data);
      }else{
        req.mySession.access_token = data.access_token;
        // console.log(req.mySession.access_token);
        data.cart=req.mySession.cartID;
        // res.status(200).json(data);
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


app.get('/profile', function(req, res){
   var img = fs.readFileSync('./client/assets/images/profile.jpg');
   res.writeHead(200, {'Content-Type': 'image/jpeg' });
   res.end(img, 'binary');
});

app.post('/addProduct', function(req, res){
  var id = req.body.id;
  var token = req.body.access_token;
  res.setHeader("Authorization", "Bearer "+token);
  moltin.Cart.Insert(id, 1, null, function(items){
    res.json(items);
  });

});


app.post('/addVariation', function(req, res){
  // console.log('request =' + JSON.stringify(req.body))
  var variationArray = req.body;
  for (var i in variationArray){
    var id = variationArray[i].id;
    var modifier = variationArray[i].modifier_id;
    var variation = variationArray[i].variation_id;
    var obj={};
    var objArray = [];
    obj[modifier] = variation
    objArray.push(obj);
  }


  moltin.Cart.Insert(id, 1, obj, function(cart) {
    // console.log(cart);
    res.json(cart);
  }, function(error, response, c) {
    console.log(error);
    console.log(c);
    res.json(error);
      // Something went wrong...
  });

});




  app.post('/removeProduct', function(req, res){

    var id = req.body.id;
    moltin.Cart.Remove(id, function(items) {
        // Everything is awesome...
        res.status(200);
        res.json(items);
    }, function(error, response, c) {
        // Something went wrong...
        console.log(response.body);
        console.log(error);
    });
  })

app.get('/product/list', function(req, res){
  getProduct(req, res);
});

app.get('/getCart', function(req, res){
  getCart(req, res);
});

app.post('/cartToOrder', function(req, res){
  var data = req.body;
  cartToOrder(req, res, data);
});

app.get('/order/:order/items', function(req, res){
   getOrderItems(req, res);
 });

app.get('/order/:order/get', function(req, res){
 getOrderByID(req, res);
});


app.post('/order/:order/put', function(req, res){
 putOrder(req, res);
});

app.post('/order/payment', function(req, res){
  var order = req.body;
  orderToPayment(req, res, order);
});

app.post('/cart/erase', function(req, res){
  emptyCart(req, res);
});

app.get('/product/:id/variations/get', function(req, res){
  getVariationsLevel(req, res);
});

app.post('/product/update_stock', function(req, res){
  updateProductStock(req, res);
});

app.post('/capcha', function(req, res){
  checkCapcha(req, res);
});


function checkCapcha(req, res){

  var key = req.query.key;
  var url = 'https://www.google.com/recaptcha/api/siteverify?secret=6LfYxBUUAAAAAIVyiXkuW0oDXqqwg9ZPQ1lhop0P&response='+key;

  request({
    url: url
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.status(response.statusCode).json(info);
    }else{
      var info = JSON.parse(body);
      res.status(response.statusCode).json(info);
    }
  });

}



//functions


function emptyCart(req, res){
  moltin.Cart.Delete(function(data) {
    // Everything is awesome...
    res.status(200).json(data);
  }, function(error, response, c) {
    console.log("payment failed!");
    console.log("response: "+response);
    console.log("c: "+c);
    console.log("error: "+error);
    res.status(c).json(response);
    // Something went wrong...
  });

}









function getCart(req, res){
  moltin.Cart.Contents(function(items) {
    res.json(items);
  }, function(error){
    console.log(error);
  });
}















var Product=[];

function getProduct(req, res){
  var url;
  var page = req.params.page;
  var offset = req.query.offset;

  if(page==1){
    url = 'https://api.molt.in/v1/products/search?status=1&limit=5';
  }else{
    url = 'https://api.molt.in/v1/products/search?status=1&limit=5&offset='+offset;
  }

  var access_token = req.mySession.access_token;

  request({
    url: url,
    headers: {
      'Authorization': 'Bearer '+access_token
    }
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.status(response.statusCode).json(info);
    }else{
      var info = JSON.parse(body);
            console.log(body);
      res.status(response.statusCode).json(info);
    }
  });

}











  var California = ['California', 'CALIFORNIA', 'CA','ca','Ca', 'california', 'Cali', 'cali'];


    function cartToOrder(req, res, data){
      console.log("wait for the order");
      console.log(data);

      var customer = data.customer;
      console.log('customer:',customer);
      var ship_to = data.shipment;
      var bill_to = data.billing;
      var shipment_method = data.shipment_method;

        moltin.Cart.Complete({
          gateway: 'stripe',
          customer: {
            first_name: customer.first_name,
            last_name:  customer.last_name,
            email: customer.email
          },
          shipping: shipment_method,
          bill_to: {
            first_name: bill_to.first_name,
            last_name:  bill_to.last_name,
            address_1:  bill_to.address_1,
            address_2:  bill_to.address_2,
            city:       bill_to.city,
            county:     bill_to.county,
            country:    bill_to.country,
            postcode:   bill_to.postcode,
            phone:      bill_to.phone,
          },
          ship_to: {
            first_name: ship_to.first_name,
            last_name:  ship_to.last_name,
            address_1:  ship_to.address_1,
            address_2:  ship_to.address_2,
            city:       ship_to.city,
            county:     ship_to.county,
            country:    ship_to.country,
            postcode:   ship_to.postcode,
            phone:      ship_to.phone,
          }
        }, function(order) {

          console.log(order);

          if (California.indexOf( order.ship_to.data.county ) != -1){
               var tax_value = (order.totals.subtotal.raw * 0.0725);
               var total_value = (order.totals.shipping_price.raw  + tax_value + order.totals.subtotal.raw);
               var tax = {};
               var total = {};
               var totals = {};

               tax['raw']=parseInt();
               tax ={
                 'formatted': '$'+tax_value.toFixed(2),
                 'rounded': Math.round(tax_value),
                 'raw':tax_value.toFixed(2)
               }
               total=total_value.toFixed(2);
               totals['tax']=tax;
               totals['total']=total;

               var id=order.id;
               addTax(req, res, totals, id);

             } else {
               res.json(order);
             }


        }, function(error, response, c) {
          console.log(response);
          res.json(error);
          // Something went wrong...
        });
    }



//add tax if shipment state is the same as our company
  function addTax(req, res, obj, id){
     moltin.Order.Update(id, obj, function(order) {
       res.status(200).json(order);
     }, function(error, response, c) {
         res.status(400).json(error);
         console.log(error);
         // Something went wrong...
     });

   };







    function orderToPayment(req, res, order){
      if(order.gateway == 'paypal-express'){
        console.log("order id",order.id);
        var obj={};
        obj={
            data: {
              key: 'value'
            },
              return_url: 'https://novacancyinn.com/shop/processed/'+order.id+'/paypal-express',
              cancel_url: 'https://novacancyinn.com/shop/processed/'+order.id+'/paypal-express/canceled'
            }

        moltin.Checkout.Payment('purchase', order.id, obj, function(payment, error, status) {
            console.log("payment successful");
            console.log(payment);
            res.status(200).json(payment);

        }, function(error, response, c) {
          console.log("payment failed!");
          console.log("c: "+c);
          console.log("error: "+error);
          res.status(c).json(response);

        });


      }else if(order.gateway == 'stripe'){
        console.log(order.gateway);
        var card_number = order.number.toString();
        var expiry_month = order.expiry_month;
        var expiry_year = order.expiry_year;
        var cvv = order.cvv;
        console.log("order.id: "+order.id);
        var obj={};
        obj = {
                  data: {
                    first_name: order.first_name,
                    last_name: order.last_name,
                    number: card_number,
                    expiry_month: expiry_month,
                    expiry_year: expiry_year,
                    cvv: cvv
                }
              }

            moltin.Checkout.Payment('purchase', order.id, obj, function(payment, error, status) {

                console.log("payment successful");
                console.log(payment);
                console.log(error);
                console.log(status);
                res.status(200).json(payment);

            }, function(error, response, c) {
              console.log("payment failed!");
              console.log("c: "+c);
              console.log("error: "+error);
              console.log(response.body);

                res.status(c).json(response);

              // Something went wrong...
            });

      }//if stripe

    }














    //update stock when buy a variation
    function updateProductStock(req, res){
      var contents = req.body;
      var x = 0;
      var loopArray = function(arr) {
          httpCall(arr[x],function(){
            // set x to next item
            x++;
            // any more items in array? continue loop
            if(x < arr.length) {
                loopArray(arr);
            }else{
              console.log("done updating products level");
              req.mySession.updated_stock = true;
              res.status(200).json(arr);
            }
          });
      }

      function httpCall(content,callback) {
          // code to show your custom alert
          if(content.product.data.modifiers.length!=0){
            var key = Object.keys(content.product.data.modifiers)[0];
            var thisProduct = content.product.data.modifiers[key].data.product;
            var quantity = content.quantity;
            updateStockMoltin(thisProduct, quantity, callback);
          }else{
            callback();
          }
      }


      function updateStockMoltin(id, quantity, callback){
        var new_stock_level;
        moltin.Product.Get(id, function(product) {
          new_stock_level = product.stock_level-quantity;
          moltin.Product.Update(id, {
              stock_level:  new_stock_level
          }, function(product) {
              callback();
          }, function(error, response, c) {
            console.log("stock level update failed!");
            console.log("c: "+c);
            console.log("error: "+error);
            res.status(c).json(response);
              // Something went wrong...
          });

        }, function(error, response, c) {
          res.status(c).json(error);
        });
      }
      loopArray(contents);

    }






  function eraseAllOrders(){
    moltin.Order.List(null, function(order) {
        console.log(order);
        for (var i in order){
          var id = order[i].id;
          id = id.toString();
          moltin.Order.Delete(id, function(data) {
            console.log(data);
          }, function(error, response, c) {
            console.log(c);
            console.log(error);
              // Something went wrong...
          });
        }
    }, function(error) {
        // Something went wrong...
    });
  }



















function getVariationsLevel(req, res){
  var id = req.params.id.toString();
  var url = 'https://api.molt.in/v1/products/'+id+'/variations';
  var access_token = req.mySession.access_token;
  var options = {
    url: url,
    headers: {
      'Authorization': 'Bearer '+access_token
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.status(response.statusCode).json(info);
    }else{
      var info = JSON.parse(body);
      res.status(response.statusCode).json(info);
    }
  }
  request(options, callback);
}













function getOrderByID(req, res){
  var orderID = req.params.order;
  moltin.Order.Get(orderID, function(order) {
      res.status(200).json(order);
  }, function(error) {
    res.status(400).json(error);
      // Something went wrong...
  });
};




function putOrder (req, res){
  var orderID = req.params.order;
  var obj = req.body;
  moltin.Order.Update(orderID, obj, function(order) {
    res.status(200).json(order);
  }, function(error, response, c) {
      res.status(400).json(error);
      console.log(error);
      // Something went wrong...
  });
}



function getOrderItems(req, res){
  var id = req.params.order;
  var url = 'https://api.molt.in/v1/orders/'+id+'/items';
  var access_token = req.mySession.access_token;
  var options = {
    url: url,
    headers: {
      'Authorization': 'Bearer '+access_token
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.status(response.statusCode).json(info);
    }else{
      var info = JSON.parse(body);
      res.status(response.statusCode).json(info);
    }
  }
  request(options, callback);
}



//get support data
    app.get('/data/countries', function(req, res){
      // Get content from file
      var countries = fs.readFileSync("./server/data/countries.json");
      var states = fs.readFileSync("./server/data/states.json");
      countries = JSON.parse(countries);
      states = JSON.parse(states);
      var joined = {
        countries, countries,
        states: states
      }
      res.json(joined);
    });





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
