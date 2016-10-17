

var express = require('express');
var app = express();
var configDB = require('./config/database.js');
var Data = require('./config/models/data').Data;
var Reach = require('./config/models/recharge');
var MapData = require('./config/models/map');
var mongoose = require('mongoose');
//var port = 2000;
var port  = process.env.OPENSHIFT_NODEJS_PORT;
var connection_string = ' ';
// if OPENSHIFT env variables are present, use the available connection info:
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":"+process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +process.env.OPENSHIFT_APP_NAME;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
})); 
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use('/portal',express.static(__dirname + '/views'));
app.use('/map', express.static(__dirname+ '/views'));
//app.use('/*',express.static(__dirname + '/views'));
mongoose.connect("mongodb://"+connection_string+"/ecg");
datadb = mongoose.createConnection("mongodb://"+connection_string+"/data");
reachdb = mongoose.createConnection("mongodb://"+connection_string+"/recharges");
mapdb = mongoose.createConnection("mongodb://"+connection_string+"/map");
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
app.get('/map', function(req,res){
res.render('map.ejs');
});

app.get('/testjson', function(req,res){
var t = {
  "__v": 0,
  "_id": "57cec96a39f9ed6dcc526871",
  "balance": "37043",
  "power": "0",
  "tempc": "0",
  "username": "peter"
};
res.json(t);
});
app.get('/*',function(req, res){
   res.send('Route Doesnt Exist!'); 
    
    
});

    
    
        
 

//app.listen(port);
console.log("started");
app.listen(port, process.env.OPENSHIFT_NODEJS_IP);

