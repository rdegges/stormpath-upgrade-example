'use strict';

var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(stormpath.init(app, {
  web: {
    register: {
      enabled: false
    },
    login: {
      enabled: true
    },
    logout: {
      enabled: true
    }
  }
}));

app.get('/', stormpath.loginRequired, function(request, response) {
  response.render('pages/index');
});

app.on('stormpath.ready', function() {
  app.listen(app.get('port'));
  console.log('Node app is running on port:', app.get('port'));
});
