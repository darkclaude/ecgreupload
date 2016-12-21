

var express = require('express');
var app = express();
var configDB = require('./config/database.js');
var Data = require('./config/models/data').Data;
var Reach = require('./config/models/recharge');
var MapData = require('./config/models/map');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var restler = require('restler');
var Client = require('node-rest-client').Client;
 
require('./config/passport')(passport);
//var port = 2500;
var port  = process.env.OPENSHIFT_NODEJS_PORT;
var connection_string = ' ';
// if OPENSHIFT env variables are present, use the available connection info:
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":"+process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +process.env.OPENSHIFT_APP_NAME;
//mongoose.connect("mongodb://"+connection_string+"/ecg");
mongoose.connect(configDB.url2);
app.use('/auth',express.static(__dirname + '/views'));
app.use('/auth/login',express.static(__dirname + '/views'));
app.use('/auth/signup',express.static(__dirname + '/views'));
app.use('/favicon',express.static(__dirname + '/views'));
app.use('/portal',express.static(__dirname + '/views'));
app.use('/map', express.static(__dirname+ '/views'));
app.use('/dashboard', express.static(__dirname + '/views'));
app.use('/topup', express.static(__dirname + '/views'));
app.use('/topupr', express.static(__dirname + '/views'));
app.use('/dash', express.static(__dirname + '/views'));
app.use('/testmpower', express.static(__dirname + '/views'));
app.use('/', express.static(__dirname + 'views'));

app.use(cookieParser());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true })); 



app.use(session({secret: 'debussy', saveUninitialized:true, resave: true,  cookie : { secure : false, maxAge : (7*24 * 60 * 60 * 1000) },store: new MongoStore({  url:"mongodb://"+connection_string+"/sessions"})}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//app.use('/*',express.static(__dirname + '/views'));
//mongoose.connect(configDB.url);
//datadb = mongoose.createConnection("mongodb://127.0.0.1:27017/data");

//mongoose.connect("mongodb://"+connection_string+"/ecg");
datadb = mongoose.createConnection("mongodb://"+connection_string+"/data");
reachdb = mongoose.createConnection("mongodb://"+connection_string+"/recharges");
//reachdb = mongoose.createConnection("mongodb://"+'127.0.0.1:27017'+"/recharges");
//mapdb = mongoose.createConnection("mongodb://"+connection_string+"/map");

var client = express.Router();
var device = express.Router();
var stat = express.Router();

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



app.all('/ussd2', function(req,res){
 var haze = "No";
 var raze1 = "No";
 var raze2 = "No";
   res.header("Access-Control-Allow-Origin", "http://apps.smsgh.com");
  res.header("Access-Control-Allow-Headers",  req.get("Access-Control-Request-Headers"));
  res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  var top = {};
  top.Type="Response";
  //top.Message="Welcome!";
   
   var userfone = req.body.Mobile;
   var msg = req.body.Message;
   if(req.body.Type=="Initiation"){
    top.Message="Welcome to SmartECG-GH: \n1. Check Balance \n2. Buy Credit MM";
    //top.Type="Release";
    res.json(top);
       
   }
    
   else{
      
   Data.findOne({'phonenumber':userfone}, function(err, account){
if(err){
  throw err;
}
if(account){
    if(req.body.Sequence==2){

         if(msg=="1"){
             /*
      top.Message="Hello "+account.name+"\n"+"License Expired: "+haze+"\n"+"1st Renewal Done: "+raze1+"\n2nd Renewal Done: "+raze2;
      top.Type="Release";
      res.json(top);
    }
    else if(msg =="2"){
      var infojson = {};
       today = moment.tz(new Date(), "Africa/Accra");
      // var  td = new Date(k1.format());
       exp= moment.tz(account.expiry, "Africa/Accra");
     //  var  td2 = new Date(k2.format());
         if(today<exp){
     var diff = new DateDiff(exp, today);
       var minutes = Math.floor(diff.seconds()/ 60); 
var seconds = diff.seconds() % 60; 

        infojson.leftm = minutes.toString();
           var tom  =   seconds.toFixed(0);
           var toms = tom;
           if(toms.length<2){
            toms="0"+toms;
           }
           infojson.lefts=toms;
         
        
                  */
      top.Message= "Hello "+account.username+"\n Working Balance : "+account.balance+'\n Temp Balance : '+account.tempc+'\n Total Balance : '+parseFloat(account.balance)+parseFloat(account.tempc);
      top.Type="Release";
      res.json(top);
    }
    
    else if(msg=='2'){
                       
      top.Message= 'Enter Amount Below';
      top.Type="Response";
      res.json(top);
    }
      
    }
    else if(req.body.Sequence==3){
        
            if(isNaN(msg) == false && parseInt(msg)>=0){
        top.Message='Transaction in Progress please Wait.....';
            top.Type="Release";
            res.json(top);
        var mfone = '0';
               for(var i=3; i<userfone.length; i++){
                   mfone = mfone + userfone.charAt(i);
               }
        
              
        var args = {
    data: {  "customer_name" : account.username,"customer_phone" : mfone, "customer_email" : account.email, "wallet_provider" : "MTN", "merchant_name" : "Smart ECg Ent.", "amount" : msg },
headers: { "Content-Type": "application/json","MP-Master-Key":"fb6e9a18-cad9-44a5-889c-293b44fac12c","MP-Private-Key": "live_private_fVFxmJNaYaFj9-K8v_3Adp9mns4","MP-Token": "68eb51998ffc04b47acd" }
};
 var client = new Client();
 

client.post("https://app.mpowerpayments.com/api/v1/direct-mobile/charge", args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
   // console.log(response);
});
}
         else{
    //top.Message="Welcome to DriverNoTIF-GH:\n;
      top.Message="Sorry Invalid Option! Try Again";
      top.Type="Release";
      res.json(top);
    }
    }
    else{}
   



}

  else{
  top.Message="Sorry This Number is Not Registered for Smart Ecg-GH";
  top.Type="Release";
  res.json(top);
}
   });
  }
  
});


app.get('/portal', function(req, res){

res.render('portal.ejs');

});
app.get('/testmpower', function(req, res){

// set content-typeheader and data as json in args parameter 
var args = {
    data: {  "customer_name" : "Frimpong tachie evans", "customer_phone" : "0543892565", "customer_email" : "littletheprogrammer@gmail.com", "wallet_provider" : "MTN", "merchant_name" : "Smart ECg Ent.", "amount" : "0.1" },
    
    headers: { "Content-Type": "application/json","MP-Master-Key":"fb6e9a18-cad9-44a5-889c-293b44fac12c","MP-Private-Key": "live_private_fVFxmJNaYaFj9-K8v_3Adp9mns4","MP-Token": "68eb51998ffc04b47acd" }
};
 var client = new Client();
 

client.post("https://app.mpowerpayments.com/api/v1/direct-mobile/charge", args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
   // console.log(response);
});

res.send('done');
});

app.use('/',secure);

app.get('/*',function(req, res){
   res.redirect('/auth'); 
    
    
});

    
    
        
 

//app.listen(port);
console.log("started");
app.listen(port, process.env.OPENSHIFT_NODEJS_IP);

