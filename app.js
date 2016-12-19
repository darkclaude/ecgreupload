

var express = require('express');
var app = express();
var configDB = require('./config/database.js');
var Data = require('./config/models/data').Data;
var Reach = require('./config/models/recharge');
var MapData = require('./config/models/map');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');
var flash = require('connect-flash');

require('./config/passport')(passport);
//var port = 2500;
var port  = process.env.OPENSHIFT_NODEJS_PORT;
var connection_string = ' ';
// if OPENSHIFT env variables are present, use the available connection info:
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":"+process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +process.env.OPENSHIFT_APP_NAME;
//mongoose.connect("mongodb://"+connection_string+"/ecg");
mongoose.connect(configDB.url2);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true })); 
app.use(session({secret: 'sha256512', saveUninitialized:true, resave: true, store: new MongoStore({  url:"mongodb://"+connection_string+"/sessions"})}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/auth',express.static(__dirname + '/views'));
app.use('/auth/login',express.static(__dirname + '/views'));
app.use('/auth/signup',express.static(__dirname + '/views'));
app.use('/portal',express.static(__dirname + '/views'));
app.use('/map', express.static(__dirname+ '/views'));
app.use('/dashboard', express.static(__dirname + '/views'));
app.use('/dash', express.static(__dirname + '/views'));
app.use('/', express.static(__dirname + 'views'));
//app.use('/*',express.static(__dirname + '/views'));
//mongoose.connect(configDB.url);
//datadb = mongoose.createConnection("mongodb://127.0.0.1:27017/data");

//mongoose.connect("mongodb://"+connection_string+"/ecg");
datadb = mongoose.createConnection("mongodb://"+connection_string+"/data");

/*
reachdb = mongoose.createConnection("mongodb://"+connection_string+"/recharges");
mapdb = mongoose.createConnection("mongodb://"+connection_string+"/map");
*/
var client = express.Router();
var device = express.Router();
var stat = express.Router();
//pp.use(favicon(__dirname + '/views/favicon.ico'));

var secure = express.Router();
var auth= express.Router();
require('./routes/auth.js')(auth, passport,app);

app.use('/auth',auth);
require('./routes/secure.js')(secure,app, passport);
app.set('view engine','ejs');
app.use('/stat',stat);
app.use('/device',device);
app.use('/clientapp',client);

require('./routes/stat')(stat);
//require('./routes/routes.js')(app,passport);
require('./routes/client')(client);
require('./routes/device')(device);


app.get('/portal', function(req, res){

res.render('portal.ejs');

});


app.get('/*',function(req, res){
   res.redirect('/auth'); 
    
    
});

    
    
        
 

//app.listen(port);
console.log("started");
app.listen(port, process.env.OPENSHIFT_NODEJS_IP);

