
var Data = require('../config/models/data').Data;

module.exports = function(device){
    
    
    device.get('/getbalance/:user',function(req,res){
        
        var user = req.params.user;
          Data.findOne({'username': user}, function(err,account){
           
           if(account){
               
               
                
                   var total = parseInt(account.tempc)+parseInt(account.balance);
                   account.tempc=0;
                   account.save(function(err){
                       if(err) throw err;
                   });
                   
                   account.balance = total.toString();
                   account.save(function(err){
                       if(err) throw err;
                       
                   });
               res.send(account.balance);
                   
                   
               }
               
                   
                     
               
           });
      
        
    });
    
   device.get('/update/:user/:ubalance/:power',function(req, res){
       var power = req.params.power;
       var user = req.params.user;
       var ubalance =req.params.ubalance;
       
       Data.findOne({'username': user}, function(err,account){
           
           if(account){
               account.balance = ubalance;
               account.save(function(err){
                   if(err) throw err;
                   
               });
               res.send('ok');
            
               }
               
                   
                     
               
           });
             
           
           
       });
   

   
   
    
  
};