var express = require('express');
var stormpath = require('express-stormpath');
var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.use(stormpath.init(app, {
//   website: true 
// }));

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

app.listen(app.get('port'), function() {
	console.log('new config');
  console.log('Node app is running on port', app.get('port'));
});


