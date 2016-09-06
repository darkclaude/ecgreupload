


var express = require('express');
var app = express();
var configDB = require('./config/database.js');
var Data = require('./config/models/data').Data;
var Reach = require('./config/models/recharge');
var mongoose = require('mongoose');
//var port = 2000;
var port  = process.env.OPENSHIFT_NODEJS_PORT;
mongoose.connect(configDB.url2+'/data');
reachdb = mongoose.createConnection(url2+'/recharges');
var client = express.Router();
var device = express.Router();
var stat = express.Router();

app.use('/stat',stat);
app.use('/device',device);
app.use('/clientapp',client);

require('./routes/stat')(stat);
require('./routes/client')(client);
require('./routes/device')(device);

app.get('/*',function(req, res){
   res.send('Route Doesnt Exist!'); 
    
    
});

    
    
        
 

//app.listen(port);
app.listen(port, process.env.OPENSHIFT_NODEJS_IP);
console.log("Server Started!");