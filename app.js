

var express = require('express');
var express2 = require('express');
var app = express();
var app2 = express2();
var configDB = require('./config/database.js');
var Data = require('./config/models/data').Data;
var Reach = require('./config/models/recharge');
var Transaction = require('./config/models/transactions');
var MapData = require('./config/models/map');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var rest = require('restler');
var Client = require('node-rest-client').Client;
var moment = require('moment');
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
app.use('/borrow', express.static(__dirname + '/views'));
app.use('/transfer', express.static(__dirname + '/views'));
app.use('/transactions',express.static(__dirname + '/views'));
app.use('/testmpower', express.static(__dirname + '/views'));
app.use('/testinv', express.static(__dirname + '/views'));
app.use('/device', express.static(__dirname + '/views'));
app.use('/', express.static(__dirname + 'views'));

app.use(cookieParser());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true })); 

 var utmodel = {
         tfulldate: '',
         tdate: '',
         ttime: '',
         ttype: '',
         tamount: '',
};
//connection_string= '127.0.0.1:27017';
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
transactionsdb = mongoose.createConnection("mongodb://"+connection_string+"/transactions");
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
app.use('/device',app2);
app2.use('/',device);
app.use('/clientapp',client);

require('./routes/stat')(stat);
//require('./routes/routes.js')(app,passport);
require('./routes/client')(client,Transaction);
require('./routes/device')(device);





 function getFormattedDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return month + '/' + day + '/' + year;
}
app.all('/transget', function(req,res){
    Transaction.find({}, function(err, trans) {
 
     res.json( trans);
   });
});
app.all('/transupdate', function(req,res){
    
});

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
    top.Message="Welcome to SmartECG-GH: \n1. Check Balance \n2. Top-up E-Credit Via Mobile Wallet \n3. Top-Up With E-Credit Code\n4. Transfer E-Credit\n 5.Borrow E-Credit \n6. Buy E-Credit Code via Mobile Wallet\n7. Load EC to Meter";
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
      top.Message= "Hello "+account.username+"\n Working Balance : "+account.balance+'\n Temp Balance : '+account.tempc+'\n Total Balance : '+(parseFloat(account.balance)+parseFloat(account.tempc)).toString();
      top.Type="Release";
      res.json(top);
    }
    
    else if(msg=='2'){
    if(req.body.Operator.toLowerCase() == 'mtn' || req.body.Operator.toLowerCase() == 'airtel'){
      top.Message= 'Enter Amount Below';
      top.Type="Response";
        top.ClientState="d1";
      res.json(top);
    }
        
   
        
        else{
              top.Message= 'Sorry Only MTN and AIRTEL Wallets are Supported!';
      top.Type="Release";
      res.json(top);
        }
    }
         else if(msg=='6'){
    if(req.body.Operator.toLowerCase() == 'mtn' || req.body.Operator.toLowerCase() == 'airtel'){
      top.Message= 'Enter Amount Below';
      top.Type="Response";
        top.ClientState="d2";
      res.json(top);
    }
        
   
        
        else{
              top.Message= 'Sorry Only MTN and AIRTEL Wallets are Supported!';
      top.Type="Release";
      res.json(top);
        }
    }
      
         else if(msg=='3'){
  
      top.Message= 'Enter Voucher Code';
      top.Type="Response";
      res.json(top);
    }
           else if(msg=='4'){
  
      top.Message= 'Enter Recipient Username';
    top.ClientState = 'transfer';
      top.Type="Response";
      res.json(top);
    }
        else if(msg=='7'){
            top.Message = 'Enter Amount to Load';
            top.ClientState= 'loadm';
            top.Type="Response";
            res.json(top);
        }
           else if(msg=='5'){
  
                Data.findOne({'username': account.username},function(err,person){
                      if(err) throw err;
                       
                       if(parseFloat(person.borrowedbalance)<0){
                          
                              top.Message= 'Sorry Please Pay Off Previous Debt!';
   // top.ClientState = 'transfer'
      top.Type="Release";
      res.json(top);
                          }
                             else{
                             
                             person.borrowedbalance = "-50";
                             person.tempc = (parseFloat(person.tempc) + 50.00).toString();
                             person.save(function(err){
                             if(err) throw err;
                             });
                                 
                              top.Message= 'You have Been Credited With 50 E-Credits!\n The Amount Will be Deducted On Your  Next TopUp.';
   // top.ClientState = 'transfer'
      top.Type="Release";
      res.json(top);
                             }
                
                });
  
    }
    }
    else if(req.body.Sequence==3){
        if(req.body.ClientState=="loadm"){
            
           if(isNaN(msg)==false){
                       if(parseFloat(account.tempc)<parseFloat(msg)){
                          
                            //  top.Message= 'Sorry Please Pay Off Previous Debt!';
   // top.ClientState = 'transfer'
      
                                         top.Message= 'Insufficient E-Credit in Main Balance!';
   // top.ClientState = 'transfer'
      top.Type="Release";
      res.json(top);
                          }
                             else{
                             
                             
                             account.tempc = (parseFloat(account.tempc)-parseFloat(msg)).toString();
                                 account.dbalance = (parseFloat(msg)).toString();
                             account.save(function(err){
                             if(err) throw err;
                             });
                                       top.Message= 'Succesfully Loaded '+msg+' E-credits To Meter!';
   // top.ClientState = 'transfer'
      top.Type="Release";
      res.json(top);
                        //res.send('kkk');
                             }
                       }
                    else{
                                                           top.Message= 'Invalid Amount!';
   // top.ClientState = 'transfer'
      top.Type="Release";
      res.json(top);
                     //res.send("e2");   
                    }   
            
        }
     else   if(req.body.ClientState=='transfer'){
            
            var user1 = account.username;
            var trex = req.body.ClientState;
            
              if(trex=='transfer'){
               var   user2 = msg;
           //var amount = parseInt(req.body.amount);
        Data.findOne({'username':user1}, function(err,account1){
            
            if(err){throw err};
            if(account1){
                
                
                Data.findOne({'username':user2}, function(err, account2){
                    
                    if(err){throw err}
                    if(account2){
                        if(account2.fullname){
                      top.Message= 'Enter E-Credit Amount To Transfer to:\n '+account2.fullname;
                        }
                        else{
                            top.Message= 'Enter E-Credit Amount';
                        }
    top.ClientState = "$"+account2.username;
      top.Type="Response";
      res.json(top);
                        
                    }
                    
                    else{
                          top.Message= 'User Not Found Try Again!';
    
      top.Type="Release";
      res.json(top);
                        
                   //  res.send('One or Both Accounts Doesnt Exist!');
                        
                        
                    }
                    
                    
                });
           
                
            }
            else{

          //  res.send('One or Both Accounts Doesnt Exist!');
                
            }
          
        });
        
        }
        else{

          
            
        }
        }
       
        
       else if(msg.length==10){
           Reach.findOne({'key': msg}, function(err,card){
        
           if(err) throw err; 
            
        if(card){
            
            if(card.used==true){
                if(card.usedby!=account.username && card.usedby!="nobody"){
            top.Message= 'Voucher Already Used By Someone!';
      top.Type="Release";
      res.json(top);
             //  res.send('Card Already Used By Someone!');
                    
                }
                         if(card.usedby==account.username){
                                   top.Message= 'Voucher Already Used by You!';
      top.Type="Release";
      res.json(top);
                          //  res.send('Card Already Used By You!');
                        }
                                  
            }
            
            
            else {
                
              Data.findOne({'username': account.username}, function(err, user){
            
                  if(err) throw err;
              
              if (user){
             var nownow = new Date();
                     utmodel.tfulldate = nownow;
                  utmodel.tdate = getFormattedDate(nownow);
                  utmodel.ttime =   moment(nownow).format('hh:mm a');
                  utmodel.tamount = card.value;
                  utmodel.ttype= 'Load Voucher'; 
                  user.transactions.push(utmodel);
                  if(user.borrowedbalance<0){
                    var newval = (parseInt(card.value)+parseInt(user.borrowedbalance)).toString();
                      if(parseInt(newval)>=0){
                            user.tempc = parseInt(user.tempc)+parseInt(newval);
                       user.borrowedbalance = "0";   
                      }
                      else{
                          user.borrowedbalance = newval;
                      }
               
                  user.save(function(err){});
                  }
                  card.used = true;
                  card.usedby = account.username;
                  card.save(function(err){});
                         top.Message= 'Your Account Was Succesfully Credited With '+card.value+' Units';
      top.Type="Release";
      res.json(top);
               //   res.send(' Successfully Credited With '+card.value);
                  
                  
              }
                  
                  else{
                      console.log("not used here ");
                      
                    // res.send('User Not Found!'); 
                      
                  }
              
        
              });
                
                     
                
            }
            
            
           
        }
            else{
                       top.Message= 'Voucher Code is Incorrect or Does not Exist!';
      top.Type="Release";
      res.json(top);
             //  res.send('Card Number Doesnt Exist!'); 
                
                
            }
        
        
        
        });
    
       
            
        }
        
        
          else  if(isNaN(msg) == false && parseInt(msg)>=0 && req.body.ClientState=="d1"){
        top.Message='Transaction in Progress please Wait for prompt!.....';
            top.Type="Release";
            res.json(top);
        var mfone = '0';
               for(var i=3; i<userfone.length; i++){
                   mfone = mfone + userfone.charAt(i);
               }
        
              
        var args = {
    data: {  "customer_name" : account.username,"customer_phone" : mfone, "customer_email" : account.email, "wallet_provider" : req.body.Operator.toUpperCase(), "merchant_name" : "Smart ECg Ent.", "amount" : msg },
headers: { "Content-Type": "application/json","MP-Master-Key":"fb6e9a18-cad9-44a5-889c-293b44fac12c","MP-Private-Key": "live_private_fVFxmJNaYaFj9-K8v_3Adp9mns4","MP-Token": "68eb51998ffc04b47acd" }
};
 var client = new Client();
 

client.post("https://app.mpowerpayments.com/api/v1/direct-mobile/charge", args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
     var newTransaction = new Transaction();
    newTransaction.username = account.username;
    newTransaction.phonenumber = account.phonenumber;
    newTransaction.type = "direct";
    newTransaction.amount = msg;
    newTransaction.dateCreated = new Date();
    newTransaction.status = "pending";
    newTransaction.iso = "false";
    newTransaction.token = data.token;
    newTransaction.save(function(err){
    if(err){
        throw err;
    }
    });
    // raw response 
   // console.log(response);
});
}
           else  if(isNaN(msg) == false && parseInt(msg)>=0 && req.body.ClientState=="d2"){
        top.Message='Transaction in Progress please Wait for prompt!.....';
            top.Type="Release";
            res.json(top);
        var mfone = '0';
               for(var i=3; i<userfone.length; i++){
                   mfone = mfone + userfone.charAt(i);
               }
        
              
        var args = {
    data: {  "customer_name" : account.username,"customer_phone" : mfone, "customer_email" : account.email, "wallet_provider" : req.body.Operator.toUpperCase(), "merchant_name" : "Smart ECg Ent.", "amount" : msg },
headers: { "Content-Type": "application/json","MP-Master-Key":"fb6e9a18-cad9-44a5-889c-293b44fac12c","MP-Private-Key": "live_private_fVFxmJNaYaFj9-K8v_3Adp9mns4","MP-Token": "68eb51998ffc04b47acd" }
};
 var client = new Client();
 

client.post("https://app.mpowerpayments.com/api/v1/direct-mobile/charge", args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
     var newTransaction = new Transaction();
    newTransaction.username = account.username;
    newTransaction.phonenumber = account.phonenumber;
    newTransaction.type = "code";
    newTransaction.amount = msg;
    newTransaction.dateCreated = new Date();
    newTransaction.status = "pending";
    newTransaction.iso = "false";
    newTransaction.token = data.token;
    newTransaction.save(function(err){
    if(err){
        throw err;
    }
    });
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
    else if(req.body.Sequence == 4){
        
         
        
         if(true){
         var user1 = account.username;
          var user2='';
             for(var i=1; i<req.body.ClientState.length; i++){
                 
              user2 = user2 + req.body.ClientState.charAt(i);   
             }
              if(isNaN(msg)==false && msg[0] != '-'){
           var amount = parseFloat(msg);
        Data.findOne({'username':user1}, function(err,account1){
            
            if(err){throw err};
            if(account1){
                
                
                Data.findOne({'username':user2}, function(err, account2){
                    
                    if(err){throw err}
                    if(account2){
                        user2='';
                        var now = new Date();
                         if(parseInt(account1.tempc)>=amount){
                                utmodel.tfulldate =  now;
                  utmodel.ttime =  moment(now).format('hh:mm a');
                  utmodel.tdate = getFormattedDate(now);
                  utmodel.tamount=amount.toString();
               //   utmodel.ttype = 'Transfer Out';
                               account1.tempc = (parseFloat(account1.tempc)-amount).toString();
                             account2.tempc = (parseInt(account2.tempc)+amount).toString();
                                utmodel.ttype = 'Transfer In';
                  account2.transactions.push(utmodel);
                             account2.save(function(err){
                                 if(err) throw err;
                                      account1.transactions.push(utmodel);
                                      account1.transactions[account1.transactions.length-1].ttype = 'Transfer Out'; 
                                    account1.save(function(err){
                                 if(err) throw err;
                                 
                             });
                             });
                               
                           
                         //  res.send('Transferred Successfully!');
                                   top.Message= 'Transaction Succesfull!\nAmount of '+amount.toString()+' Units Was Succesfully Transferred!';
    
      top.Type="Release";
      res.json(top); 
                             
                         }
                        else{
                            if(parseInt(account1.balance)>=amount){
                                      utmodel.tfulldate =  now;
                  utmodel.ttime =  moment(now).format('hh:mm a');
                  utmodel.tdate = getFormattedDate(now);
                  utmodel.tamount=amount.toString();
                 
                               account1.balance = (parseFloat(account1.balance)-amount).toString();
                             account2.tempc = (parseInt(account2.tempc)+amount).toString();
      
                                 
                //// var tp = utmodel;
                     //        tp.ttype = 'Transfer In'; 
                 // utmodel.ttype = 'Transfer In';
                                 utmodel.ttype = 'Transfer In';
                  account2.transactions.push(utmodel);
                             account2.save(function(err){
                                 if(err) throw err;
                                      account1.transactions.push(utmodel);
                                      account1.transactions[account1.transactions.length-1].ttype = 'Transfer Out'; 
                                    account1.save(function(err){
                                 if(err) throw err;
                                 
                             });
                             });
                               
                     
                           
                               // res.send('Transferred Successfully!');
                                    top.Message= 'Transaction Succesfull!\nAmount of '+amount.toString()+' Units Was Succesfully Transferred!';
    
      top.Type="Release";
      res.json(top); 
                                
                            }
                            else{
                                
                                    top.Message= 'Transaction Failed!\n Reason: Insufficient Balance!';
    
      top.Type="Release";
      res.json(top); 
                              // res.send('Insufficient Balance');  
                                
                            }
                           
                            
                        }
                        
                    }
                    
                  
                    
                    
                });
           
                
            }
        
          
        });
        
        }
        else{

             top.Message= 'Transaction Failed!\n Reason: Invalid Amount Entered \n Must be >1 Units only!';
    
      top.Type="Release";
      res.json(top);  // res.send("Invalid Amount!");
        }
                
        
        }
    }
    else{}
   



}

  else{
  top.Message="Sorry This Number is Not Registered for Smart ECG-GH";
  top.Type="Release";
  res.json(top);
}
   });
  }
  
});


app.get('/portal', function(req, res){

res.render('portal.ejs');

});
app.get('/testinv',function(req,res){
       var args = {
    data: {  "token" : "e5f9599f57a8694d2078dce9"},
headers: { "Content-Type": "application/json","MP-Master-Key":"fb6e9a18-cad9-44a5-889c-293b44fac12c","MP-Private-Key": "live_private_fVFxmJNaYaFj9-K8v_3Adp9mns4","MP-Token": "68eb51998ffc04b47acd" }
};
 var client = new Client();
 

client.post("https://app.mpowerpayments.com/api/v1/direct-mobile/status", args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
   res.json(data);
  

    });
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

var passtocheck = function(transaction){
    if(transaction.iso=="false"){
        var args = {
    data: {  "token" : transaction.token},
headers: { "Content-Type": "application/json","MP-Master-Key":"fb6e9a18-cad9-44a5-889c-293b44fac12c","MP-Private-Key": "live_private_fVFxmJNaYaFj9-K8v_3Adp9mns4","MP-Token": "68eb51998ffc04b47acd" }
};
 var client = new Client();
 client.post("https://app.mpowerpayments.com/api/v1/direct-mobile/status", args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
    console.log(transaction);
    if(data.tx_status == "complete"){
       
         // account.tempc = parseInt(account.tempc)+amount;
       // console.log("un : "+transactions);
        Data.findOne({'username': transaction.username}, function(err,user){// CRedting user Database
             var nownow2 = new Date();
                     utmodel.tfulldate = nownow2;
                  utmodel.tdate = getFormattedDate(nownow2);
                  utmodel.ttime =   moment(nownow2).format('hh:mm a');
                  utmodel.tamount = transaction.amount;
                  utmodel.type= 'Mobile Money Topup'; 
                  user.transactions.push(utmodel);
            user.transactions[user.transactions.length-1].ttype = 'Mobile Money Topup';
            if(1){
                    var newval = ((parseFloat(transaction.amount)*100.00)+parseInt(user.borrowedbalance)).toString();
                      if(parseInt(newval)>=0){
                            user.tempc = parseInt(user.tempc)+parseInt(newval);
                       user.borrowedbalance = "0";   
                      }
                      else{
                          user.borrowedbalance = newval;
                      }
            }
             //user.tempc = parseInt(user.tempc)+ parseFloat(transaction.amount)*100.00;
                user.save(function(err){
                if(err) throw err;
                });
        
        });
        transaction.status = "completed";
        transaction.save(function(err){
        if(err) throw err;
        });
     
        
        
    }
 

    });   
    }
    else{
          var args = {
   
headers: { "Content-Type": "application/json","MP-Master-Key":"fb6e9a18-cad9-44a5-889c-293b44fac12c","MP-Private-Key": "live_private_fVFxmJNaYaFj9-K8v_3Adp9mns4","MP-Token": "68eb51998ffc04b47acd" }
};
 var client = new Client();
 client.get("https://app.mpowerpayments.com/api/v1/checkout-invoice/confirm/"+transaction.token, args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
    console.log(transaction);
    if(data.status == "completed"){
       
         // account.tempc = parseInt(account.tempc)+amount;
       // console.log("un : "+transactions);
        Data.findOne({'username': transaction.username}, function(err,user){// CRedting user Database
             var nownow2 = new Date();
                     utmodel.tfulldate = nownow2;
                  utmodel.tdate = getFormattedDate(nownow2);
                  utmodel.ttime =   moment(nownow2).format('hh:mm a');
                  utmodel.tamount = transaction.amount;
                  utmodel.type= 'Mobile Money Topup'; 
                  user.transactions.push(utmodel);
            user.transactions[user.transactions.length-1].ttype = 'Online Topup';
             //user.tempc = parseFloat(user.tempc)+ parseFloat(transaction.amount)*100.00;
               if(1){
                    var newval = ((parseFloat(transaction.amount)*100.00)+parseInt(user.borrowedbalance)).toString();
                      if(parseInt(newval)>=0){
                            user.tempc = parseInt(user.tempc)+parseInt(newval);
                       user.borrowedbalance = "0";   
                      }
                      else{
                          user.borrowedbalance = newval;
                      }
            }
                user.save(function(err){
                if(err) throw err;
                });
        
        });
        transaction.status = "completed";
        transaction.save(function(err){
        if(err) throw err;
        });  
        
    }
 });
    }
}

   



        
 

//app.listen(2500);
console.log("started");
app.listen(port, process.env.OPENSHIFT_NODEJS_IP);

