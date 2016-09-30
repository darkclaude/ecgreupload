var Reach = require('../config/models/recharge');
var Data = require('../config/models/data').Data;
var MapData = require('../config/models/map');
var randomString = require('random-string');
var aesjs = require('aes-js');
module.exports = function (client) {
         
client.get('/createaccount/:user/:id/:atype', function(req, res){   // For Creating User
    
var key = aesjs.util.convertStringToBytes("Example128BitKey");

// The initialization vector, which must be 16 bytes
var iv = aesjs.util.convertStringToBytes("IVMustBe16Bytes.");

var d1 = aesjs.util.convertStringToBytes(req.params.user);
var d2 =  aesjs.util.convertStringToBytes(req.params.id);
var d3 = aesjs.util.convertStringToBytes(req.params.atype);
  var aesOfb = new aesjs.ModeOfOperation.ofb(key, iv);
var decryptedBytes1 = aesOfb.decrypt(d1);
aesOfb = new aesjs.ModeOfOperation.ofb(key, iv);
var decryptedBytes2 = aesOfb.decrypt(d2);
aesOfb = new aesjs.ModeOfOperation.ofb(key, iv);
var decryptedBytes3 = aesOfb.decrypt(d3);

var user = aesjs.util.convertBytesToString(decryptedBytes1);
var id = aesjs.util.convertBytesToString(decryptedBytes2);
var atype = aesjs.util.convertBytesToString(decryptedBytes3);

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
    newuser.tempc=id;
    newuser.atype = atype;
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
    
    
    
    
 client.get('/generatekey/:value', function(req, res){
  
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
        
    
