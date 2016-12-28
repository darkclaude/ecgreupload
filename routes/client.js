var Reach = require('../config/models/recharge');
var Data = require('../config/models/data').Data;
var MapData = require('../config/models/map');
var randomString = require('random-string');
var Client = require('node-rest-client').Client;
var moment = require('moment');
//var Transaction = ('../config/models/transactions');
var utmodel = {
         tfulldate: '',
         tdate: '',
         ttime: '',
         ttype: '',
         tamount: '',
};
var CryptoJS = require("crypto-js"); 
 var utmodel = {
         tfulldate: '',
         tdate: '',
         ttime: '',
         ttype: '',
         tamount: '',
};
module.exports = function (client,Transaction) {
  
    /*

    client.get('/createaccount/:user/:id/:atype', function(req, res){   // For Creating User
var  user = req.params.user;
//var bytes  = CryptoJS.AES.decrypt(ent, 'secret key 123');
//var user = bytes.toString(CryptoJS.enc.Utf8);
 
if(isNaN(id)==false){
Data.findOne({ 'username' :  user}, function(err, account) {
    if(err){
        res.send("Database Error!");
      throw err;  
    }
 else if(account){
        
        res.send('Account Already Exists!');
    }
    else{
        var newuser = new Data();
    newuser.username = user;
    newuser.balance = "0";
    newuser.power ="0";
    newuser.tempc=req.params.id;
    newuser.atype = req.params.atype;
    newuser.save(function(err){
        if(err){
            res.send('Databsae Error!');
            throw err;
        }
        else{
     res.send('Account Created Successfully!');
        }
        });
        
    }
   
});
}
else{
  res.send("Invalid Amount!");
}
});
*/
    

client.post('/createaccount', function(req, res){   // For Creating User
    
    //res.send(req.body.atype);

var key = 'secret key 123';
var bytes  = CryptoJS.AES.decrypt(req.body.username, key);
var user = bytes.toString(CryptoJS.enc.Utf8);
var idb = CryptoJS.AES.decrypt(req.body.id,key);
var id = idb.toString(CryptoJS.enc.Utf8);
var atb = CryptoJS.AES.decrypt(req.body.atype,key);
var atype =atb.toString(CryptoJS.enc.Utf8);
 //res.send(user+','+id+','+atype);
 
    
if(isNaN(id)==false){
Data.findOne({ 'username' :  user}, function(err, account) {
    if(err){
        var em = "Database Error!";
        res.send(CryptoJS.AES.encrypt(em, key).toString());
      throw err;  
    }
 else if(account){
        var em2 = 'Account Already Exists!';
        res.send(CryptoJS.AES.encrypt(em2, key).toString());
    }
    else{
        var newuser = new Data();
    newuser.username = user;
    newuser.balance = "0";
    newuser.power ="0";
    newuser.tempc=id;
    newuser.atype =atype;
    newuser.save(function(err){
        if(err){
            var em3 = 'Database Error!';
            res.send(CryptoJS.AES.encrypt(em3, key).toString());
            throw err;
        }
        else{
      var em4 = 'Account Created Successfully!';
     res.send(CryptoJS.AES.encrypt(em4, key).toString());
        }
        });
        
    }
   
});
}
else{
    var em5 = 'Invalid Amount!';
  res.send(CryptoJS.AES.encrypt(em5, key).toString());
}

});
    
   
client.post('/createaccount2', function(req, res){   // For Creating User
    
    //res.send(req.body.atype);
/*
var key = 'secret key 123';
var bytes  = CryptoJS.AES.decrypt(req.body.username, key);
var user = bytes.toString(CryptoJS.enc.Utf8);
var idb = CryptoJS.AES.decrypt(req.body.id,key);
var id = idb.toString(CryptoJS.enc.Utf8);
var atb = CryptoJS.AES.decrypt(req.body.atype,key);
var atype =atb.toString(CryptoJS.enc.Utf8);
 //res.send(user+','+id+','+atype);
 
    */
    
    var  user = req.body.username;
    var email  = req.body.email;
    var password = req.body.password;
    var phonenumber = req.body.phonenumber;
    var fullname = req.body.fullname;
    
    var  id = 90;
   // var  atype = req.body.atype;
//    id=90;
if(isNaN(id)==false){
Data.findOne({ 'username' :  user}, function(err, account) {
    if(err){
        var em = "Database Error!";
      //  res.send(CryptoJS.AES.encrypt(em, key).toString());
        res.send(em);
      throw err;  
    }
 else if(account){
        var em2 = 'Account Already Exists!';
      //  res.send(CryptoJS.AES.encrypt(em2, key).toString());
     res.send(em2);
    }
    else{
        var newuser = new Data();
    newuser.username = user;
    newuser.balance = "0";
   // newuser.power ="0";
    newuser.tempc="0.0";
  //  newuser.atype =atype;
    newuser.phonenumber = phonenumber;
        newuser.email = email;
        newuser.fullname = fullname;
        newuser.password = newuser.generateHash(password);
        newuser.transactions.push(utmodel);
    newuser.save(function(err){
        if(err){
            var em3 = 'Database Error!';
        //    res.send(CryptoJS.AES.encrypt(em3, key).toString());
            res.send(em3);
            throw err;
        }
        else{
      var em4 = 'Account Created Successfully!';
   //  res.send(CryptoJS.AES.encrypt(em4, key).toString());
            res.send(em4);
        }
        });
        
    }
   
});
}
else{
  res.send("Invalid Amount!");
}

});
    
    
client.all("/allusertransactions/:id",function(req, res){
  //var k10 = [{}];
Data.find({'_id': req.params.id}, function(err, user) {
 
     res.json( user);
   });
});
       
client.all("/alluserpowers/:id",function(req, res){
  //var k10 = [{}];
Data.find({'_id': req.params.id}, function(err, user) {
 
     res.json(user[0].power);
   });
});
 

client.get('/createaccount/:username/:id/:atype', function(req, res){   // For Creating User
    
    //res.send(req.body.atype);

//var key = 'secret key 123';
var user  = req.params.username;
var id = req.params.id;

//var atb = req.body.a;
//var atype =atb;
 //res.send(user+','+id+','+atype);
 
    
if(isNaN(id)==false){
Data.findOne({ 'username' :  user}, function(err, account) {
    if(err){
        var em = "Database Error!";
        res.send(em);
      throw err;  
    }
 else if(account){
        var em2 = 'Account Already Exists!';
        res.send(em2);
    }
    else{
        var newuser = new Data();
    newuser.username = user;
    newuser.balance = "0";
    newuser.power ="0";
    newuser.tempc=id;
    newuser.atype =req.params.atype;
    newuser.save(function(err){
        if(err){
            var em3 = 'Database Error!';
            res.send(em3);
            throw err;
        }
        else{
      var em4 = 'Account Created Successfully!';
     res.send(em4);
        }
        });
        
    }
   
});
}
else{
  res.send("Invalid Amount!");
}

});
   
      
 client.post('/testjson', function(req,res){
var name = req.body.name;
res.send("Hello "+name);
});

client.post('/mpowerCheckout',function(req,res){
         
        var args = {
    data: {"invoice": {"total_amount": req.body.amount, "description": "Smart ECG E-Credits"},"store": {"name": "Smart ECG GH"},"actions": {
  "return_url": "http://ecg-ninjax.rhcloud.com/dashboard"}
},
headers: { "Content-Type": "application/json","MP-Master-Key":"fb6e9a18-cad9-44a5-889c-293b44fac12c","MP-Private-Key": "live_private_fVFxmJNaYaFj9-K8v_3Adp9mns4","MP-Token": "68eb51998ffc04b47acd" }
};
 var client = new Client();
 

client.post("https://app.mpowerpayments.com/api/v1/checkout-invoice/create", args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
     var newTransaction = new Transaction();
    newTransaction.username = req.body.user;
  //  newTransaction.phonenumber = account.phonenumber;
    newTransaction.type = "direct";
    newTransaction.amount = req.body.amount;
    newTransaction.dateCreated = new Date();
    newTransaction.status = "pending";
    newTransaction.token = data.token;
    newTransaction.iso = "true";
    newTransaction.save(function(err){
    if(err){
        throw err;
    }
    });
    res.send(data.response_text);

});
});
client.post('/getinfo',function(req, res){  // Route for Getting User info

  var user = req.body.username;

  Data.findOne({'username' : user}, function(err,account){
      if(err){
          res.send("Database Error");
          throw err;
      }
    if(account){
        
    // res.send(account.username+","+account.balance+","+account.power);
    var result= {};
        result.username = account.username;
        result.balance= account.balance;
        result.power = account.power;
        result.tempc = account.tempc;
        result.atype = account.atype;
        result.format = "json";
       // result["format"] = "json";
        res.json(account); 
    }
      else{
          var f = {};
          f["format"]="Account Not Found!";
          res.json(f);
      }
      
      
  });   
    
});
    
    
client.get('/getinfo/:user',function(req, res){  // Route for Getting User info

  var user = req.params.user;

  Data.findOne({'username' : user}, function(err,account){
      if(err){
          res.send("Database Error");
          throw err;
      }
else if(account){
        
     res.send(account.username+","+account.balance+","+account.power);
        
    }
      else{
          
          res.send("Account Not Found!");
      }
      
      
  });   
    
});

client.get('/getuserbyid/:id',function(req,res){
    
     Data.findOne({'_id': req.params.id}, function(err, user) {
             res.json(user);
      });
    
});

client.post('/getinfo2/:user',function(req, res){  // Route for Getting User info

  var user = req.params.user;

  Data.findOne({'username' : user}, function(err,account){
      if(err){
          res.send("Database Error");
          throw err;
      }
else if(account){
        
     res.json(account);
        
    }
      else{
          
          res.send("Account Not Found!");
      }
      
      
  });   
    
});
    
client.get('/creditaccount/:user/:amount', function(req, res){       //Route  to Credit User Account
    
   var user = req.params.user;
   var amount = 0;
  
   if(isNaN(req.params.amount)==false){
     amount = parseInt(req.params.amount);
  
    Data.findOne({'username': user}, function(err,account){
        if(err){
        res.send("Database Error!");
         throw err;   
            
        }
        if(account){
            
          //  var total = parseInt(account.balance) + amount;
            if(account.atype=="postpaid"){
            res.send("Cannot Credit A Postpaid!");
            }
            else{
            account.tempc = parseInt(account.tempc)+amount;
             
            account.save(function(err){
                
             if(err){
                 res.send('Database Error');
                 throw err;
                 
             }
                res.send('Account Credited Successfully!');
            
                
            });
                        }
                        }
                else{
                   
                    res.send('Account Not Found!');
                    
                }
                
            
       
                });
  }
  else{

    res.send("Invalid Amount!");
  }
        
        
    });
    
    
        
client.post('/creditaccount', function(req, res){       //Route  to Credit User Account
    
   var user = req.body.username;
   var amount = 0;
  
   if(isNaN(req.body.amount)==false){
     amount = parseInt(req.body.amount);
  
    Data.findOne({'username': user}, function(err,account){
        if(err){
        res.send("Database Error!");
         throw err;   
            
        }
        if(account){
            
          //  var total = parseInt(account.balance) + amount;
            if(account.atype=="postpaid"){
            res.send("Cannot Credit A Postpaid!");
            }
            else{
            account.tempc = parseInt(account.tempc)+amount;
             
            account.save(function(err){
                
             if(err){
                 res.send('Database Error');
                 throw err;
                 
             }
                res.send('Account Credited Successfully!');
            
                
            });
                        }
                        }
                else{
                   
                    res.send('Account Not Found!');
                    
                }
                
            
       
                });
  }
  else{

    res.send("Invalid Amount!");
  }
        
        
    });
    client.get('/deleteaccount/:user', function(req, res){     //Route to Delete User
        
        var user = req.params.user;
         Data.findOne({ 'username':user }, function(err,r){
                          
                   if(err){
                       res.send("Database Error!");
                       throw err;
                       
                   }
                if(r){

                  
                  Data.findOne({ 'username':user }).remove().exec();
                   res.send("Account Deleted Successfully!");
       

                }
                else{

                  res.send("Account not Found!");
                }

            
            
       
            
        });
        
           
       
            
        });
    
    
     client.post('/deleteaccount', function(req, res){     //Route to Delete User
        
        var user = req.body.username;
         Data.findOne({ 'username':user }, function(err,r){
                          
                   if(err){
                       res.send("Database Error!");
                       throw err;
                       
                   }
                if(r){

                  
                  Data.findOne({ 'username':user }).remove().exec();
                   res.send("Account Deleted Successfully!");
       

                }
                else{

                  res.send("Account not Found!");
                }

            
            
       
            
        });
        
           
       
            
        });
    
    client.post('/borrow', function(req,res){
    
                Data.findOne({'username': req.body.user},function(err,person){
                      if(err) throw err;
                       
                       if(parseFloat(person.borrowedbalance)<0){
                          
                            //  top.Message= 'Sorry Please Pay Off Previous Debt!';
   // top.ClientState = 'transfer'
      
      res.send('e1');
                          }
                             else{
                             
                             person.borrowedbalance = "-50";
                             person.tempc = (parseFloat(person.tempc) + 50.00).toString();
                             person.save(function(err){
                             if(err) throw err;
                             });
         
                        res.send('kkk');
                             }
                
                });
    
    
    });
      client.post('/uploadtometer', function(req,res){
    
                Data.findOne({'username': req.body.user},function(err,person){
                      if(err) throw err;
                       if(isNaN(req.body.amount)==false){
                       if(parseFloat(person.tempc)<parseFloat(req.body.amount)){
                          
                            //  top.Message= 'Sorry Please Pay Off Previous Debt!';
   // top.ClientState = 'transfer'
      
      res.send('e1');
                          }
                             else{
                             
                             
                             person.tempc = (parseFloat(person.tempc)-parseFloat(req.body.amount)).toString();
                                 person.dbalance = (parseFloat(req.body.amount)).toString();
                             person.save(function(err){
                             if(err) throw err;
                             });
         
                        res.send('kkk');
                             }
                       }
                    else{
                     res.send("e2");   
                    }
                
                });
    
    
    });
    
    
    
    client.post('/transfer',function(req,res){
       
        var user1 = req.body.user1;
        var user2 = req.body.user2;
        var checkpass = false;
        if(isNaN(req.body.amount)==false){
           var amount = parseInt(req.body.amount);
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
                               
                           
                          res.send('Transferred Successfully!');
   
    //  res.json(top); 
                             
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
                               
                     
                           
                                res.send("t1ll");
    //  res.json(top); 
                                
                            }
                            else{
                                
                                
                               res.send('inb');  
                                
                            }
                           
                            
                        }
                        
                    }
                    
                    else{
                        
                        
                     res.send('dne');
                        
                        
                    }
                    
                    
                });
           
                
            }
            else{

            res.send('One or Both Accounts Doesnt Exist!');
                
            }
          
        });
        
        }
        else{

          res.send("inv");
        }
    });
    
    
    
    
    
    client.get('/transfer/:user1/:user2/:amount',function(req,res){
       
        var user1 = req.params.user1;
        var user2 = req.params.user2;
        var checkpass = false;
        if(isNaN(req.params.amount)==false){
           var amount = parseInt(req.params.amount);
        Data.findOne({'username':user1}, function(err,account1){
            
            if(err){throw err};
            if(account1){
                
                
                Data.findOne({'username':user2}, function(err, account2){
                    
                    if(err){throw err}
                    if(account2){
                        
                         if(parseInt(account1.balance)>=amount){
                             
                             account1.balance = (parseInt(account1.balance)-amount).toString();
                             account2.tempc = (parseInt(account2.tempc)+amount).toString();
                             account1.save(function(err){  
                             });
                             account2.save(function(err){
                             });
                           res.send('Transfer Successfully!');
                            
                             
                         }
                        else{
                            res.send('Insufficient Balance');
                            
                        }
                        
                    }
                    
                    else{
                        
                        
                     res.send('One or Both Accounts Doesnt Exist!');
                        
                        
                    }
                    
                    
                });
           
                
            }
            else{

            res.send('One or Both Accounts Doesnt Exist!');
                
            }
          
        });
        
        }
        else{

          res.send("Invalid Amount!");
        }
    });
    
    
       
 client.post('/generatekey', function(req, res){
  
  if(isNaN(req.body.amount)==false){     
        
var x = randomString({
  length: 10,
  numeric: true,
  letters: false,
  special: false
});
    
        var newcard = new Reach();
        newcard.key = x;
        newcard.value = req.body.amount;
        newcard.used = false;
        newcard.usedby= "nobody";
        newcard.save(function(err){if(err) throw err;});
        res.send(x);
        
        }
        else{

          res.send("Invalid Amount!");
        }
        
    });
    
    
 client.get('/generatekey/:value', function(req, res){
  
     ///MTN MOBILE MOBILE API HERE IS SUCCESFUL USER GETS RECHARGE CODE FOR ECCG UNITS VIA SMS OR CAN CREDIT DIRECTLY INTO HIS ACCOUNT .
  if(isNaN(req.params.value)==false){     
        
var x = randomString({
  length: 10,
  numeric: true,
  letters: false,
  special: false
});
    
        var newcard = new Reach();
        newcard.key = x;
        newcard.value = req.params.value;
        newcard.used = false;
        newcard.usedby= "nobody";
        newcard.save(function(err){});
        res.send(x);
        
        }
        else{

          res.send("Invalid Amount!");
        }
        
    });
    
    
    
    client.get('/redeem/:user/:code', function(req, res){
    
        var code = req.params.code;
        var user = req.params.user;
        
        Reach.findOne({'key': code}, function(err,card){
        
           if(err) throw err; 
            
        if(card){
            
            if(card.used==true){
                if(card.usedby!=user && card.usedby!="nobody"){
               res.send('Card Already Used By Someone!');
                    
                }
                         if(card.usedby==user){
                            
                            res.send('Card Already Used By You!');
                        }
                                  
            }
            
            
            else {
                
              Data.findOne({'username': user}, function(err, account){
            
                  if(err) throw err;
              
              if (account){
                 account.tempc = parseInt(account.tempc)+parseInt(card.value);
                  account.save(function(err){});
                  card.used = true;
                  card.usedby = user;
                  card.save(function(err){});
                  res.send('Account Successfully Credited With '+card.value);
                  
                  
              }
                  
                  else{
                      
                     res.send('User Not Found!'); 
                      
                  }
              
        
              });
                
                     
                
            }
            
            
           
        }
            else{
                
               res.send('Card Number Doesnt Exist!'); 
                
                
            }
        
        
        
        });
    
    
    
    
    
    });
    
    
    function getFormattedDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return month + '/' + day + '/' + year;
}
    client.post('/redeem', function(req, res){
    
        var code = req.body.code;
        var user = req.body.user;
        
        Reach.findOne({'key': code}, function(err,card){
        
           if(err) throw err; 
            
        if(card){
            
            if(card.used==true){
                if(card.usedby!=user && card.usedby!="nobody"){
               res.send('x1');//Card used by someone;
                    
                }
                         if(card.usedby==user){
                            
                            res.send('x2');//Card already used by you!
                        }
                                  
            }
            
            
            else {
                
              Data.findOne({'username': user}, function(err, account){
            
                  if(err) throw err;
              
              if (account){
                  var now = new Date();
                  utmodel.tfulldate =  now;
                  utmodel.ttime =  moment(now).format('hh:mm a');
                  utmodel.tdate = getFormattedDate(now);
                  utmodel.tamount=card.value;
                  utmodel.ttype = 'Load Voucher';
                  account.transactions.push(utmodel);
                   if(1){
                    var newval = (parseInt(card.value)+parseInt(account.borrowedbalance)).toString();
                      if(parseInt(newval)>=0){
                            account.tempc = parseInt(account.tempc)+parseInt(newval);
                       account.borrowedbalance = "0";   
                      }
                      else{
                          account.borrowedbalance = newval;
                      }
                 //account.tempc = parseInt(account.tempc)+parseInt(card.value);
                  account.save(function(err){});
                  card.used = true;
                  card.usedby = user;
                  card.save(function(err){});
                  res.send(card.value);
                  
                   }
              }
                  
                  else{
                      
                     res.send('x3');//user not found 
                      
                  }
              
        
              });
                
                     
                
            }
            
            
           
        }
            else{
                
               res.send('x4'); // Card Number does not exist!
                
                
            }
        
        
        
        });
    
    
    
    
    
    });


    client.get('/createmap/:username', function(req, res){

     var newmap = new MapData();
     newmap.username=req.params.username;
     newmap.lat="0.00000001";
     newmap.lng="0.00000001";
     newmap.save(function(err){

      if(err) throw err;
     });
     res.send("Created ");
     

    });

    client.get('/updatemap/:username/:lat/:lng', function(req, res){

         MapData.findOne({'username': req.params.username} ,function(err,user){
          if(err)  throw err;
            
            if(user){

              var lat=""
              var lng="";
              lat = req.params.lat;
              lng = req.params.lng;
              user.lat = lat;
              user.lng = lng;
              user.save(function(err){

               if(err) throw err;
              });
              res.send("done");

            }
            else{

              res.send("not found");
            }


         });



    });


      client.post('/getmap/:username', function(req, res){

         MapData.findOne({'username': req.params.username},function(err,user){
          if (err) throw err;
            
            if(user){

            res.json(user);

          }
          else{
            res.send("none");
          }


         });



    });


        
         
        
    };
        
    
