var Reach = require('../config/models/recharge');
var Data = require('../config/models/data').Data;
var randomString = require('random-string');
module.exports = function (client) {
         
client.get('/createaccount/:user/:id', function(req, res){   // For Creating User

var user = req.params.user;
var id = req.params.id;
Data.findOne({ 'username' :  user}, function(err, account) {
    if(err){
      throw err;  
    }
 else if(account){
        
        res.send('3');
    }
    else{
        var newuser = new Data();
    newuser.username = user;
    newuser.balance = id;
    newuser.power ="0";
    newuser.tempc="0";
    newuser.save(function(err){
        if(err){
            res.send('0');
            throw err;
        }
        else{
     res.send('1');
        }
        });
        
    }
   
});
});
    
    
client.get('/getinfo/:user',function(req, res){  // Route for Getting User info

  var user = req.params.user;

  Data.findOne({'username' : user}, function(err,account){
      if(err){
          
          throw err;
      }
else if(account){
        
     res.send(account.username+','+account.balance+','+account.power);
        
    }
      else{
          
          res.send('4');
      }
      
      
  });   
    
});
    
client.get('/creditaccount/:user/:amount', function(req, res){       //Route  to Credit User Account
    
   var user = req.params.user;
   var amount = 0;
   amount = parseInt(req.params.amount);
   
    Data.findOne({'username': user}, function(err,account){
        if(err){
         throw err;   
            
        }
        if(account){
            
          //  var total = parseInt(account.balance) + amount;
            account.tempc = parseInt(account.tempc)+amount;
             
            account.save(function(err){
                
             if(err){
                 res.send('0');
                 throw err;
                 
             }
                res.send('1');
                
            });
                        }
                else{
                   
                    res.send('3');
                    
                }
                
            
       
                });
        
        
    });
    
    client.get('/deleteaccount/:user', function(req, res){     //Route to Delete User
        
        var user = req.params.user;
        
       Data.findOne({ 'username':user }).remove().exec();
            
        res.send('6');
        
            
        });
    
    
    client.get('/transfer/:user1/:user2/:amount',function(req,res){
        var amount = parseInt(req.params.amount);
        var user1 = req.params.user1;
        var user2 = req.params.user2;
        var checkpass = false;
        
        Data.findOne({'username':user1}, function(err,account1){
            
            if(err) throw err;
            if(account1){
                
                
                Data.findOne({'username':user2}, function(err, account2){
                    
                    if(err) throw err;
                    if(account2){
                        
                         if(account1.balance>=amount){
                             
                             account1.balance = account1.balance-amount;
                             account2.balance = parseInt(account2.balance)+amount;
                             account1.save(function(err){   
                             });
                             account2.save(function(err){
                             });
                             res.send('Transfer Successful!');
                             
                             
                         }
                        else{
                            res.send('Insufficient Balance');
                            
                        }
                        
                    }
                    
                    else{
                        
                        
                     res.send('Oftadne');
                        
                        
                    }
                    
                    
                });
           
                
            }
            else{

            res.send('Oftadne');
                
            }
          
        });
        
        
    });
    
    
    
    
    client.get('/generatekey/:value', function(req, res){
        
        
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
        
        
        
    });
    
    
    
    client.get('/redeem/:user/:code', function(req, res){
    
        var code = req.params.code;
        var user = req.params.user;
        
        Reach.findOne({'key': code}, function(err,card){
        
           if(err) throw err; 
            
        if(card){
            
            if(card.used){
                if(card.usedby!=user && card.usedby!="nobody"){
               res.send('Card Already Used By Someone!');
                    
                }
                        else if(card.usedby==user){
                            
                            res.send('Card Already Used By You!');
                        }
                        else{
                            //DO NOTHING......
                        }
                
            }
            
            
            else {
                
              Data.findOne({'username': user}, function(err, account){
            
                  if(err) throw err;
              
              if (account){
                 account.tempc = parseInt(account.tempc)+parseInt(card.value);
                  account.save(function(err){});
                  card.used = true;
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
        
         
        
    };
        
    
