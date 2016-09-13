


var express = require('express');
var app = express();
var configDB = require('./config/database.js');
var Data = require('./config/models/data').Data;
var Reach = require('./config/models/recharge');
var mongoose = require('mongoose');
//var port = 2000;
var port  = process.env.OPENSHIFT_NODEJS_PORT;
var connection_string = '127.0.0.1:27017/nodekeyz';
// if OPENSHIFT env variables are present, use the available connection info:
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
app.use('/createpage',express.static(__dirname + '/views'));
//app.use('/*',express.static(__dirname + '/views'));
mongoose.connect("mongodb://"+connection_string+"/ecg");
datadb = mongoose.createConnection("mongodb://"+connection_string+"/data");
reachdb = mongoose.createConnection("mongodb://"+connection_string+"/recharges");
var client = express.Router();
var device = express.Router();
var stat = express.Router();
//pp.use(favicon(__dirname + '/views/favicon.ico'));
app.set('view engine','ejs');
app.use('/stat',stat);
app.use('/device',device);
app.use('/clientapp',client);

require('./routes/stat')(stat);
require('./routes/client')(client);
require('./routes/device')(device);


app.get('/portal', function(req, res){

res.render('portal.ejs');

});
app.get('/*',function(req, res){
   res.send('Route Doesnt Exist!'); 
    
    
});

    
    
        
 

//app.listen(port);
console.log("started");
app.listen(port, process.env.OPENSHIFT_NODEJS_IP);
