
var randomString = require('random-string');
var express = require('express');
var app = express();
var configDB = require('./config/database.js');
var Person = require('./config/models/personSchema').Data;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var sendgrid  = require('sendgrid')('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');
var DateDiff = require('date-diff');
var rest = require('restler');
var port  = process.env.OPENSHIFT_NODEJS_PORT;
//var port = 2000;
var connection_string = ' ';
var moment = require('moment-timezone');
// if OPENSHIFT env variables are present, use the available connection info:
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":"+process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +process.env.OPENSHIFT_APP_NAME;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true }));
 app.use('/full',express.static(__dirname + '/views'));
app.use('/portal',express.static(__dirname + '/views'));
app.use('/iportal',express.static(__dirname + '/views'));
app.use('/broadcast',express.static(__dirname + '/views'));
//mongoose.connect("mongodb://"+connection_string+"/person");
mongoose.connect(configDB.url2);
//persondb = mongoose.createConnection("mongodb://localhost:27017/persons");
persondb = mongoose.createConnection("mongodb://"+connection_string+"/persons");
var personroute = express.Router();

//pp.use(favicon(__dirname + '/views/favicon.ico'));
app.set('view engine','ejs');
var pt = '/';
var pt2 = false;
//app.use('/clientapp',client);
//require('./routes/client')(client);
app.get(pt, function(req,res) {
  if(pt2==false){
  res.redirect('/portal');
}
else{
  res.redirect('/full');
}

});
app.get('/full', function(req,res){
  res.render('fullpage.ejs');
});
app.get('/change', function(req,res) {
  pt2 = !pt2;
  res.send(pt2);
});
app.get('/portal', function(req, res){
if(pt2==false){
res.render('portal.ejs');
}
else{
  res.redirect('full');
}
});
app.get('/iportal',function(req, res){
	res.render('iportal.ejs');
});

app.get('/broadcast', function(req,res){
   res.render('broadcast.ejs');
});

app.all('/ussd', function(req,res){
 var haze = "No";
 var raze1 = "No";
 var plan = "Basic";
 var raze2 = "No";
   res.header("Access-Control-Allow-Origin", "http://apps.smsgh.com");
  res.header("Access-Control-Allow-Headers",  req.get("Access-Control-Request-Headers"));
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  var top = {};
  top.Type="Response";
  //top.Message="Welcome!";
   var userfone = req.body.Mobile;
   var msg = req.body.Message;
   if(req.body.Type=="Initiation"){
    top.Message="Welcome to Freebiez-GH:\n 1. Check Activation Status\n2. Redeem Activation Key\n3. Check No of Prizes Won\nEnter Your Option Number";
    res.json(top);
   }
   else{
   Person.findOne({'phonenumber':userfone}, function(err, account){
if(err){
  throw err;
}
if(account){

            if(account.activated==true){
                    haze = "Yes";
                  }

                  if(account.premium==true){
                    plan = "Premium";
                  }
                  /*
                  if(account.renewedb==true){
                    raze2= "Yes";
                  }
                  */
                  if(req.body.Sequence==2){
         if(msg=="1"){
      top.Message="Hello "+account.name+"\n"+"Account  Activated: "+haze+"\n"+"Plan: "+plan+"\nUnique ID: "+account.uniqueid;
      top.Type="Release";
      res.json(top);
    }
    else if(msg =="2"){
      var infojson = {};

      if(account.activated==false){
      top.Message= "Hello "+account.name+"\n"+"Enter the Activation Key ";
      top.Type="Response";
      res.json(top);
    }
    else{
      top.Message="Sorry Your Account Is Already Activated Have fun.....";
      top.Type="Release";
      res.json(top);
    }

    }
    else if(msg=="3"){
      top.Message="Hello "+account.name+"\n"+"Total Prizes Won: "+account.won+"\nAccount  Activated: "+haze+"\n"+"Premium: "+raze1+"\nUnique ID: "+account.uniqueid;
      top.Type="Release";
      res.json(top);
    }
    else{
    //top.Message="Welcome to PersonNoTIF-GH:\n;
      top.Message="Sorry Invalid Option!\n1. Check Activation Status\n2. Redeem Activation Key\nEnter Your Option Number";
      top.Type="Release";
      res.json(top);
    }
}
else if(req.body.Sequence==3){

//if(account.activated==)
if(account.activated==true){
  top.Message="Sorry Account Already Activated!";
  top.Type="Release";
  res.json(top);
}
else{
if(account.token==msg){
  var idp ='';
  top.Message="Congratulations Account Activated!\nYou will receive an Activation Bonus shortly.The fun now beings....";
  top.Type="Release";
  account.activated = true;
  account.save(function(err){
    if(err) throw err;
  });
  res.json(top);
  var mapperN = ["AIRTEL",'VODAFONE','MTN','TIGO'];
  var mapperID = ["62006","62002","62001","62003"];
  for(var i =0; i<=3; i++){
    if(account.provider.toUpperCase()==mapperN[i]){
      idp = mapperID[i];
      break;
    }
  }
var data = {
      network: idp,
      amount: 1,
      phone: account.phonenumber,
      token: "58523f16-c68a-45c8-aba4-f48ec050192b"

  };
    rest.postJson('https://api.smsgh.com/usp/airtime',  data, {headers : { Authorization:"Basic amJia3J4Yms6aW5iZHFweW8=" }}).on('complete', function(result) {
      if (result instanceof Error) {
        console.log('Error:', result.message);
        this.retry(100); // try again after 5 sec
      } else {
           console.log(result);

      }
    });

}
else{
  top.Message="Sorry Activation Key Invalid!";
  account.activated = false;
  account.save(function(err){
    if(err) throw err;
  });
  top.Type="Release";
  res.json(top);
}
}

}

}
else{
  top.Message="Sorry This Number is Not Registered On FreeBies-GH!";
  top.Type="Release";
  res.json(top);
}

   });
  }
});

var x = false;
/*
setInterval(function(){
if(x==false){
	   Person.find({},'', function(err, persons) {
       // res.send(users.reduce(function(userMap, item) {
       //     userMap[item.id] = item;
       //     return userMap;
       // }, {}));

        var s = persons.length;
        if(s>0){//if any users
        for(var i=0; i<s; i++){
              if(persons[i].rm1==false){
                   today = moment.tz(new Date(), "Africa/Accra");
                                // var diff = new DateDiff(persons[i].renewa, new Date(k1.format()));
                                 renew1= moment.tz(persons[i].renewa, "Africa/Accra");
                                 renew2 = moment.tz(persons[i].renewb, "Africa/Accra");
                                  exp = moment.tz(persons[i].expiry, "Africa/Accra");


                                 var diff = new DateDiff(renew1, today);
                                 console.log("Difference is "+diff.minutes());
                                 if(diff.minutes()<=0){

                                     sendmsgr1(persons[i],persons[i].email,persons[i].name,persons[i].idn,exp.toString(),renew1.toString(),renew2.toString());
                                 }
              }

              if(persons[i].rm2==false){
                       today = moment.tz(new Date(), "Africa/Accra");
                     renew1= moment.tz(persons[i].renewa, "Africa/Accra");
                                 renew2 = moment.tz(persons[i].renewb, "Africa/Accra");
                                  exp = moment.tz(persons[i].expiry, "Africa/Accra")
                                 var diff = new DateDiff(renew2, today);
                                 console.log("Difference is "+diff.minutes());
                                 if(diff.minutes()<=0){

                                     sendmsgr2(persons[i],persons[i].email,persons[i].name,persons[i].idn,exp.toString(),renew1.toString(),renew2.toString());
                                 }
              }

        	if(persons[i].expired == false){
             if(persons[i].emailb==false){
                                  today = moment.tz(new Date(), "Africa/Accra");

                                  exp = moment.tz(persons[i].expiry, "Africa/Accra");

                                 var diff = new DateDiff(exp, today);
                                 console.log("Difference is "+diff.minutes());
                                 if(diff.minutes()>=3&& diff.minutes() <=4){

                              sendmsgb(persons[i],persons[i].email,persons[i].name,persons[i].idn,exp.toString());
                                 }
                         }
                         else{
        		var statusemail = false;
        	//	console.log(persons[i].name)
		    today = moment.tz(new Date(), "Africa/Accra");

                                  exp = moment.tz(persons[i].expiry, "Africa/Accra")
                                // var diff = new DateDiff(new Date(renew2.format()), new Date(today.format()));
                 if(today>=exp){

                 persons[i].expired = true;
                var returned = true;
                 sendmsgc(persons[i],persons[i].email,persons[i].name,persons[i].idn,exp.toString());
             //   console.log("REturned: "+x.outer);


                 }

               }
             }
               else{
               	//var emailas = false;
             //  	console.log(persons[i].name);
             //  	console.log(persons[i].emailc);
	    now = moment.tz(new Date(), "Africa/Accra");

                                  exp = moment.tz(persons[i].expiry, "Africa/Accra")
                              //   var diff = new DateDiff(new Date(renew2.format()), new Date(today.format()));

             //  var diff = new DateDiff(persons[i].expiry, td);

                         if(persons[i].emailb==false){

                                 var diff = new DateDiff(exp, now);
                                 if(diff.minutes()>=3&& diff.minutes() <=4){
                                    sendmsgb(persons[i],persons[i].email,persons[i].name,persons[i].idn,exp.toString());
                                 }
                         }
                         else{
               	if(persons[i].emailc == false){

               		sendmsgc(persons[i],persons[i].email,persons[i].name,persons[i].idn,exp.toString());
               		//persons[i].save(function(err){ if(err) throw err;});
               	}
               	else{
               		console.log('Expired But Email Already sent!');
               	}


               }
           }

    }

    }


    });
	}
},10000);
*/
app.get('/testcredit', function (req,res) {
var mapperN = ["AIRTEL",'VODAFONE','MTN','TIGO'];
var mapperID = ["62006","62002","62001","62003"];
var data={
    network: "62003",
    amount: 1,
    phone: "0270413417",
    token: "58523f16-c68a-45c8-aba4-f48ec050192b"

};
  rest.postJson('https://api.smsgh.com/usp/airtime',  data, {headers : { Authorization:"Basic amJia3J4Yms6aW5iZHFweW8=" }}).on('complete', function(result) {
    if (result instanceof Error) {
      console.log('Error:', result.message);
      this.retry(100); // try again after 5 sec
    } else {
         console.log(result);

    }
  });
  res.send("ok");
});

app.post('/newaccount',function(req, res){
	Person.findOne({'phonenumber': req.body.pnumber}, function(err,pers){
	 if(err) throw err;

		if(pers){
			res.send("already");
		}
		else{
			var person = new Person();
 person.name=req.body.name;
 person.email = req.body.email;
 person.phonenumber = req.body.pnumber;
 person.address = req.body.address;
 person.provider = req.body.provider;
 person.premium = false;
 person.activated = false;
 person.firstimebonus=false;
 person.token="none";
 person.won = "0";

var x = randomString({
length: 6,
numeric: true,
letters: true,
special: false
});
person.uniqueid = x;
person.save(function(err) {
  if(err) throw err;
});
res.send(person.uniqueid);
rest.get("https://api.smsgh.com/v3/messages/send?From=FREEBIEZ-GH&To="+person.phonenumber+"&Content="+"Hello! " +person.name+",\n Welcome to Freebiez-Ghana Enjoying Free Stuff Simplified!\n Your Unique ID  is "+person.uniqueid+"\nGet Free Signup Bonus Airtime after you Activate your Account!"+"&ClientId=jbbkrxbk&ClientSecret=inbdqpyo&RegisteredDelivery=false").on('complete', function(result) {
  if (result instanceof Error) {
    console.log('Error:', result.message);
    this.retry(100); // try again after 5 sec
  } else {
  if(result.toString().indexOf("1400@") !== -1){
    console.log(result);
    success=true;
    if(success==true){
//    person.emaila=true;
  }

  }

  }
});
if(person.email != "none@none"){
 sendgrid.send({
                  to:       person.email,
                  from:     'Admin@FreebieZ-GH',
                  subject:  'Freebiez-GH Signup',
                  text:   "Hello! " +person.name+",\n Welcome to Freebiez-Ghana! Prepare Yourself to Enjoy loads of free stuff!\n Your Unique ID  is "+person.uniqueid+"\nGet Free Signup Bonus  Worth 1 Cedi of Airtime after you Activate your Account! "
                }, function(err, json) {
                  if (err) {

                   return console.error(err);

                    }
                  console.log(json);
                  if(json.message=='success'){

  }


                  else{
                  //	console.log("Didnt end well");

                  }

                });
 	}


		}


    });



});

app.post('/activate', function(req, res){

var id = req.body.idn;
var type = req.body.type;
var account = {};
 Person.findOne({'uniqueid' : id}, function(err,person){
     if(err) throw err;
     if(person){
      account=person;
          if(person.activated==true){
           res.send("already");
         }
         else{
          // var x;
            var activekey ="";
           for(var i=0; i<=2; i++){

        var x = randomString({
           length: 4,
           numeric: true,
           letters: true,
           special: false
           });
           if(i<2){
           activekey = activekey+ x + "-";
         }
         else{
           activekey=activekey+x;
           person.token=activekey;
           person.save(function(err){
             if(err) throw err;
           });
         }
       }
           if(type=="Yes"){
             person.premium=true;
             person.save(function(err){
               if(err) throw err;
             });

            // res.send(activekey);
            //  sendactivecode(person,activekey);
           }
           else{

                person.premium=false;
             person.save(function(err){
               if(err) throw err;
             });
            // res.send(activekey);
            //  sendactivecode(person,activekey);
           }





              res.send(activekey);
              sendactivecode(account,activekey);
         }


     }
     else{
res.send('notfound');
     }



 });


});
var sendm = function(person,msg){
  rest.get("https://api.smsgh.com/v3/messages/send?From=FREEBIEZ-GH&To="+person.phonenumber+"&Content="+"Hello! " +person.name+",\n Welcome to Freebiez-Ghana Enjoying Free Stuff Simplified!\n "+msg+"&ClientId=jbbkrxbk&ClientSecret=inbdqpyo&RegisteredDelivery=false").on('complete', function(result) {
    if (result instanceof Error) {
      console.log('Error:', result.message);
      this.retry(100); // try again after 5 sec
    }
  });
}
app.post('/broadcast', function(req, res){

var msg = req.body.msg;
var infojson = {};

 Person.find({},'',function(err,person){
     if(err) throw err;
    var total = person.length;
    var failed = 0;
    var passed = 0;

     var success = false;
     for(var i =0; i<total; i++){
       sendm(person[i],msg);

  }
  res.send("")
  //if(success==true){
   // person.emaila=true;

 // }









 });


});









var sendmsgr1 = function(persons,email,name,idn,expiry,renewa,renewb){
var success = false;
  rest.get('http://api.smsonlinegh.com/sendsms.php?user=nkid299@gmail.com&password=ninjax12&message='+  "Hello " +name+"\n Your Driving license number  "+idn+"\n Is due for First(1st) Renewal on "+ renewa+" .Please contact Fleet Manager to assist you to renew it. Treat as Urgent. Thank you"+'&type=0&sender=AdWIN-GH&destination='+persons.phonenumber).on('complete', function(result) {
  if (result instanceof Error) {
    console.log('Error:', result.message);
    this.retry(100); // try again after 5 sec
  } else {

    console.log(result);
    if(result.toString().indexOf("1400@") !== -1){
      success=true;
      persons.rm1=true;
         persons.save(function(err){if (err) throw err; });
    }

  }
});
  if(email!="none@none"){

    sendgrid.send({
                  to:       email,
                  from:     'Admin@PersonIDNotification',
                  subject:  'Renewal Notification',
                  text:   " Hello " +name+"\n Your Driving license number  "+idn+"\n Is due for First(1st) Renewal On "+renewa+" .Please contact Fleet Manager to assist you to renew it. Treat as Urgent. Thank you"
                }, function(err, json) {
                  if (err) {
                     //   setx(false);
                      //     persons.emailb =   false;
                    //d//rivers.save(function(err){if (err) throw err; });
                     }
                  console.log(json);
                  if(json.message=='success'){
                    success=true;
                                //setx(true);
                                   persons.rm1=true;
         persons.save(function(err){if (err) throw err; });

                                      }
                  else{
                    // setx(false);
                     //   persons.emailb =   false;
                   // persons.save(function(err){if (err) throw err; });
                  }

                });
  }
      //if(success==true){

      //}



}


var sendmsgr2 = function(persons,email,name,idn,expiry,renewa,renewb){
var success = false;
  rest.get('http://api.smsonlinegh.com/sendsms.php?user=nkid299@gmail.com&password=ninjax12&message='+  "Hello " +name+"\n Your Driving license number  "+idn+"\n Is due for Second(2nd) Renewal on "+ renewb+" .Please contact Fleet Manager to assist you to renew it. Treat as Urgent. Thank you"+'&type=0&sender=AdWIN-GH&destination='+persons.phonenumber).on('complete', function(result) {
  if (result instanceof Error) {
    console.log('Error:', result.message);
    this.retry(100); // try again after 5 sec
  } else {

    console.log(result);
    if(result.toString().indexOf("1400@") !== -1){
      success=true;
      persons.rm2=true;
         persons.save(function(err){if (err) throw err; });
    }

  }
});
  if(email!="none@none"){

    sendgrid.send({
                  to:       email,
                  from:     'Admin@PersonIDNotification',
                  subject:  'Renewal Notification',
                  text:   " Hello " +name+"\n Your Driving license number  "+idn+"\n Is due for Second(2nd) Renewal On "+renewb+" .Please contact Fleet Manager to assist you to renew it. Treat as Urgent. Thank you"
                }, function(err, json) {
                  if (err) {
                      //  setx(false);
                      //  //   persons.emailb =   false;
                    //persons.save(function(err){if (err) throw err; });
                     }
                  console.log(json);
                  if(json.message=='success'){
                    success=true;
                                //setx(true);

                   persons.rm2=true;
         persons.save(function(err){if (err) throw err; });
                                      }
                  else{
                    // setx(false);
                     //   persons.emailb =   false;
                   // persons.save(function(err){if (err) throw err; });
                  }

                });
  }
}


var sendactivecode = function(person,activekey){
var success = false;
console.log(person);
var ptype="";
if(person.premium=true){
  ptype = "Premium";
}
else{
  ptype = "Basic";
}
var   code = "*714*100007-HASH";
var rt2 = 'http://api.smsonlinegh.com/sendsms.php?user=nkid299@gmail.com&password=ninjax12&message='+"Hello! " +person.name + "\n Your Unique ID  is "+person.uniqueid+"\n Your Activation Code is : "+person.token+"\nActivation code Type: "+ptype+"\nDial "+code+" to Reedem Activation code on your account"+'&type=0&sender=FREEBIEZ-GH&destination='+person.phonenumber;

var  rt = "http://api.smsgh.com/v3/messages/send?From=FREEBIES-GH&To="+person.phonenumber+"&Content="+"Hello! " +person.name + "\n Your Unique ID  is "+person.uniqueid+"\n Your Activation Code is : "+person.token+"\nActivation code Type: "+ptype+"\nDial "+code+" to Reedem Activation code on your account"+"&ClientId=jbbkrxbk&ClientSecret=inbdqpyo&RegisteredDelivery=false"
console.log(rt2);
  rest.get(rt2).on('complete', function(result) {
  if (result instanceof Error) {
    console.log('Error:', result.message);
    this.retry(100); // try again after 5 sec
  } else {

    console.log(result);
    if(result.toString().indexOf("1400@") !== -1){
      success=true;

    }

  }
});
  if(person.email!="none@none"){

    sendgrid.send({
                  to:       person.email,
                  from:     'Admin@Freebiez-Ghana',
                  subject:  'Your Generated Activation Code',
                  text:  "Hello! " +person.name+",\n Welcome to Freebiez-Ghana!. Please Activate your Account with the Key: "+activekey+"\nDial *714*100007# to get Started!"
                }, function(err, json) {
                  if (err) {
                      //  setx(false);
                      //  //   persons.emailb =   false;
                    //persons.save(function(err){if (err) throw err; });
                     }
                  console.log(json);
                  if(json.message=='success'){
                    success=true;
                                //setx(true);
}
                  else{
                    // setx(false);
                     //   persons.emailb =   false;
                   // persons.save(function(err){if (err) throw err; });
                  }

                });
  }
}




app.get('/*',function(req, res){
   res.redirect('/');


});











//app.listen(port);
console.log("started");
app.listen(port, process.env.OPENSHIFT_NODEJS_IP);
