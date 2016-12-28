
var Data = require('../config/models/data').Data;
var moment = require('moment');
var nodemodel = {
         tfulldate: '',
         plot: {y:0, x: new Date()   },
         
         tdate: '',
         ttime: '',
         watt: ''
};
module.exports = function(device){
    
    
    function getFormattedDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return month + '/' + day + '/' + year;
}
  

    device.all('/getbalance/:user',function(req,res){
        
       
        var user = req.params.user;
          Data.findOne({'username': user}, function(err,account){
           
           if(account){
               
               
                
                   //varaccount.dbalance);
                 
               res.send(account.dbalance);
                   
                     account.dbalance=0;
                  account.lastduc = new Date();
                   //account.dbalance = total.toString();
                   account.save(function(err){
                       if(err) throw err;
                       
                   });
               }
               
                   
                     
               
           });
    });
    
   device.all('/update/:user/:ubalance/:power',function(req, res){
       var power = req.params.power;
       var user = req.params.user;
       var ubalance =req.params.ubalance;
       
       Data.findOne({'username': user}, function(err,account){
           
           if(account){
                res.send('ok');
               account.balance = ubalance;
                var now = new Date();
                  nodemodel.tfulldate =  now;
                  account.lastduc = new Date();
                  nodemodel.ttime =  moment(now).format('hh:mm a');
                  nodemodel.tdate = getFormattedDate(now);
               nodemodel.watt = power;
              nodemodel.plot.y = parseInt(ubalance);
               nodemodel.plot.x = now;
               account.power.push(nodemodel);
               account.save(function(err){
                   if(err) throw err;
                   
               });

              
            
               }
               
                   
                     
               
           });
             
           
           
       });
   
   
    
  
};