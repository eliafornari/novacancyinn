let request = require('request');

let moltin = require('moltin')({
  publicId: 'aRfWbMWHHHluwvHks6WJdcvqAnpSUqoejRoepXPaL9',
  secretKey: 'xurGyrYMpKCgMIzNs4ZeCugHfMfOeJEDxXeBuxTs2K'
});


exports.list = function (req, res) {

  var start_date = req.query.start_date;
  var end_date = req.query.end_date;
  var url = 'https://api.molt.in/v1/orders/?status='+req.query.status;

  console.log("page: "+req.query.offset);


  if(req.query.offset){
    var offset = 1 * (req.query.offset);
    console.log('offset:', offset);
    url = url + '&limit=10&offset='+offset;
    console.log("url: "+url);
  }



  request({
       url: url, //URL to hit
       method: 'GET',
       headers: {
         'Authorization': 'Bearer '+req.mySession.access_token
       }
       }, function(error, response, body){

         if(error) {
             console.log("PUT entry error");
             console.log(error);
             res.status(response.statusCode).json(body);
         } else {

             var data = JSON.parse(body);
             console.log(data);
             res.status(response.statusCode).json(data);
         }
   });

}




exports.get = function (req, res) {
  var orderID = req.params.order;
  moltin.Order.Get(orderID, function(order) {
      res.status(200).json(order);
  }, function(error) {
    res.status(400).json(error);
      // Something went wrong...
  });
}




exports.items = function (req, res) {
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
