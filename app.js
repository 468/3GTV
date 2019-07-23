var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app).listen(0)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/assets'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res){
  res.render('index.ejs');
});