var express = require('express');
var bodyparser = require('body-parser');
var routes = require('./routes');

var app = express();

//makes it so we can read the POST requests properly
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

routes.configure(app);

var server = app.listen(8080, function() {
	console.log('Server listening on port ' + server.address().port);
});