var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 42391);

app.get('/',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.workoutRows = rows;
//    context.results = JSON.stringify(rows);
    res.render('home', context);
  });
});

app.post('/insert', function(req, res, next) {
  var context = {};
  res.header("Access-Control-Allow-Origin", "*");
  mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", [req.body.name || null, req.body.reps || null, req.body.weight || null, req.body.date || null, req.body.lbs|| null], function(err, result){
    if(err){
      next(err);
      return;
    }
    var newId = result.insertId;
    mysql.pool.query("SELECT * FROM workouts WHERE ID=?", [newId], function (newErr, newResult) {
      if(newErr){
        next(newErr);
        return;
      }
      res.send(newResult);
    })
  });
});

app.post('/delete',function(req,res,next){
  var context = {};
  res.header("Access-Control-Allow-Origin", "*");
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
  });
  res.end("Successfully deleted");
});

app.post('/update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        [req.body.name || curVals.name, req.body.reps || curVals.reps, req.body.weight || curVals.weight, req.body.date || curVals.date, req.body.lbs || curVals.lbs, req.body.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        mysql.pool.query("SELECT * FROM workouts WHERE ID=?", [req.body.id], function (newErr, newResult) {
          if(newErr){
            next(newErr);
            return;
          }
          res.send(newResult);
        })
      });
    }
  });
//  res.end("Successfully updated");
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
//      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
