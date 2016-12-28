var Reach = require('../config/models/recharge');
var Data = require('../config/models/data').Data;
module.exports = function (stat) {
  
    stat.get('/nod',function(req, res){
      
    Data.find({}, function(err, datas) {
    if(err){
      throw err;
    }

     if(datas){
     var lod = datas.length;
         res.send(lod.toString());
         
     }
        else{
            
            res.send('No Users!');
            
        }

    });

      });
    
    
    stat.get('/nor', function(req,res){
    
    Reach.find({}, function(err, reaches) {
    if(err){
      throw err;
    }
       // res.send(users.reduce(function(userMap, item) {
       //     userMap[item.id] = item;
       //     return userMap;
       // }, {}));
     var tnor = reaches.length;
      
       var com =0;
       var ovr =0;
    
        var s = reaches.length;
        for(var i=0; i<s; i++){
           com =  parseInt(reaches[i].value);
           ovr = ovr + com;
        
    }
    
       res.send(tnor+','+ovr);
    


    });
    });
    
    
    };
        
    
