var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.post('/',function(req,res){
  let postQuery = [];
  let postBody = [];
  for (key in req.query) {
    postQuery.push({"key": key, "value": req.query[key]});
  }

  for (key in req.body) {
    postBody.push({"key": key, "value": req.body[key]});
  }

  var context = {};
  context.query = postQuery;
  context.pbody = postBody;
  res.render('post.handlebars', context);
});

app.get('/',function(req,res){
  let getBody = [];
  for (key in req.query) {
    getBody.push({key: key, value: req.query[key]});
  }
  let context = {};
  context.vals = getBody;
  res.render('get.handlebars', context);
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
