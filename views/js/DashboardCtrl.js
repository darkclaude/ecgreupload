 var app = angular.module('ECG', [])
    //var chart;

app.controller('mainController', ['$scope' ,'$sce','$http', '$interval','$timeout', '$window', function ($scope, $sce,$http, $interval,$timeout, $window) {
    var userid;
    var userobj;
    
 var chart;
    var onload = function(){
$http.get('/anggetuser').success(function(response){//Loads ALL DATA when page is first loaded and once
    userid = response;    
       // console.log(response);
        $http.get('/clientapp/getuserbyid/'+userid).success(function(response2){
    userobj = response2;
            //console.log(response2);
        $scope.displayname = userobj.username;
        $scope.tempC= userobj.tempc;
            $scope.wbalance = userobj.balance;
            $scope.borrowed = userobj.borrowedbalance;
            $scope.totalAccounts = ((parseFloat(userobj.tempc)+parseFloat(userobj.balance))-parseFloat(userobj.borrowedbalance)).toFixed(2);
    });
  
	$http.post('/clientapp/allusertransactions/'+userid).success(function(response){
	//	$scope.v = "!a";
		//$scope.expired=false;
	
		$scope.transactionname="";
		$scope.transactionid="";
		    console.log("GOT IT BIT");
        var t    = new Array;
        t = response[0].transactions;
      //  console.log(response.transactions[0]);
           console.log(response[0].transactions);
		    console.log(response.transactions);
    $scope.transactionlist = t.reverse();
    $scope.activeBtn=0;

    $scope.transaction="";

	});
         chart = new CanvasJS.Chart("chartContainer",
    {
            
      title:{
        text: "Live Power Usage Chart"
    },
    axisX:{
       
   intervalType: "second",
        title: "Time",
        gridThickness: 0
    },
    axisY: {
        title: "Power(Watt) ",
         gridThickness: 0
    },
    data: [
    {        
        type: "line",
        dataPoints: [//array
      

        ]
    }
    ]
});
//chart.options.data[0].dataPoints.push( { x: new Date(2012, 01, 28), y: 100});
    chart.render();
   
	});
}
                            onload();// CALLING ONLOAD TO START /EXEC
            $interval(function () {// Global Data Update . INT 3 Seconds
                $scope.lastduc = new Date(userobj.lastduc).toString();
                  $http.get('/clientapp/getuserbyid/'+userid).success(function(response2){
    userobj = response2;
            console.log(response2);
        $scope.displayname = userobj.username;
        $scope.tempC= userobj.tempc;
            $scope.wbalance = userobj.balance;
            $scope.borrowed = userobj.borrowedbalance;
            $scope.totalAccounts = (parseFloat(userobj.tempc)+parseFloat(userobj.balance))-parseFloat(userobj.borrowedbalance);
    });
                
	$http.post('/clientapp/allusertransactions/'+userid).success(function(response){
	//	$scope.v = "!a";
		//$scope.expired=false;
	
		$scope.transactionname="";
		$scope.transactionid="";
		    console.log("GOT IT BIT");
        var t    = new Array;
        t = response[0].transactions;
      //  console.log(response.transactions[0]);
           console.log(response[0].transactions);
		    console.log(response.transactions);
    $scope.transactionlist = t.reverse();
    $scope.activeBtn=0;

    $scope.transaction="";

	});
                 $http.post('/clientapp/alluserpowers/'+userid).success(function(response){
	//	$scope.v = "!a";
		//$scope.expired=false;
	            
		 console.log("powers:");
                      console.log(response);
                     /*
                   var      chart = new CanvasJS.Chart("chartContainer",
    { zoomEnabled: true,   
      title:{
        text: "Watt vs Time"
    },
    axisX:{
        title: "Timeline",
        gridThickness: 2,
         intervalType: "minute", 
    },
    axisY: {
        title: "Power(Watts)"
    },
    data: [
    {        
        type: "area",
        dataPoints: response.plot
    }
    ]
});
 chart.options.data[0].dataPoints.push(response[0].plot);
    chart.render();
    
    
   */         ///  chart.options.data[0].dataPoints= response[0].plot[0];
                     
                 //             chart.render();
                     console.log("testng 123");
                     var plots=[];
                     var len=0;
                     if(response.length<=100){
                         len = response.length;   
                          for(var i =0; i<len; i++){
                      plots.push({x: new Date(response[i].plot.x), y: response[i].plot.y});   
                     }
                     }
                     else {
                       for(var i =response.length-100; i<response.length; i++){
                      plots.push({x: new Date(response[i].plot.x), y: response[i].plot.y});   
                     }  
                     }
                    
                     console.log(plots);
                          chart.options.data[0].dataPoints= plots;
                     chart.render();
                     /*var be4 = 0;
                     response = response.reverse();
                     for(var i =0; i<response.length; i++){
                         if(be4!=response[i].plot.y){
                         be4 = response[i].plot.y;
                         
       chart.options.data[0].dataPoints.push({x:new  Date(response[i].plot.x), y:response[i].plot.y});
                          //  chart.options.data[0].dataPoints.push(response[1].plot);
          chart.render();             
                         }                     }*/
                                             
    });
      
    }, 3000);
                           
   $scope.topup = function(){

var route = "/clientapp/redeem";
 var parameter = JSON.stringify({user: userobj.username, code: $scope.code});
 console.log("it verks");
    $http.post(route, parameter).
    success(function(response, status, headers, config) {
            if(response=="x1"){//Used by someone
               swal("Error!", "Card Used by Someone!", "error");
            }
                else if(response=='x2'){//Card used by yourself
                swal("Error!", "Card Used By You!", "error");
           }
           else if(response=='x3'){
           	 swal("Error!", "User not Found!", "error");
           }
           else if(response=='x4'){
           	 swal("Error!", "Recharge Code Invalid!", "error");
           }
           else{
           	  swal("Success!", "Recharge Succesfull! You have been Credited with "+response+' Unit(s)', "success");
           }
      }).
      error(function(data, status, headers, config) {
 swal("Error!", "Server/Connection Problem Try Again!", "error");
      });



   }
   
     $scope.transfer = function(){

var route = "/clientapp/transfer";
 var parameter = JSON.stringify({user1: userobj.username, user2: $scope.rname, amount: $scope.amount});
 console.log("it verks");
    $http.post(route, parameter).
    success(function(response, status, headers, config) {
            if(response=="dne"){//Used by someone
               swal("Error!", "Recepient Does Not Exist Try Again!", "error");
            }
                else if(response=='inb'){//Card used by yourself
                swal("Error!", "Insufficient Balance!", "error");
           }
        else if(response=='inv'){
                            swal("Error!", "Invalid Amount!", "error");
        }
        
           else{
           	  swal("Success!", "Transfer Succesfull! "+$scope.rname+" has been Credited with "+$scope.amount+' Unit(s)', "success");
           }
      }).
      error(function(data, status, headers, config) {
 swal("Error!", "Server/Connection Problem Try Again!", "error");
      });



   }
     
     	$scope.uploadtometer = function(){
     var route = "/clientapp/uploadtometer";
 var parameter = JSON.stringify({amount: $scope.mtom, user: userobj.username});
 console.log("it verks");
    $http.post(route, parameter).
    success(function(response, status, headers, config) {
            if(response=="e1"){//cannot borrow
               swal("Error!", "Insufficient Balance!", "error");
            }
            else if(response =="e2"){
                  swal("Error!", "Invalid Balance!", "error");
            }
           else{
           	  swal("Success!", "Succesfully Uploaded "+$scope.mtom+" E-Credits to Smart Meter TOP UP Acount", "success");
           }
      }).
      error(function(data, status, headers, config) {
 swal("Error!", "Server/Connection Problem Try Again!", "error");
      });
	}


	$scope.borrow = function(){
     var route = "/clientapp/borrow";
 var parameter = JSON.stringify({user: userobj.username});
 console.log("it verks");
    $http.post(route, parameter).
    success(function(response, status, headers, config) {
            if(response=="e1"){//cannot borrow
               swal("Error!", "Please Pay Off Previous Debt!", "error");
            }
               
           else{
           	  swal("Success!", "Borrow Succesfull! You have been Credited with 50  Unit(s)", "success");
           }
      }).
      error(function(data, status, headers, config) {
 swal("Error!", "Server/Connection Problem Try Again!", "error");
      });
	}

  $scope.mpowerCheck = function(){
      var route = "/clientapp/mpowerCheckout";
 var parameter = JSON.stringify({user: userobj.username,amount: $scope.amount});
 console.log("it verks");
    $http.post(route, parameter).
    success(function(response, status, headers, config) {
           window.location= response;
      }).
      error(function(data, status, headers, config) {
 swal("Error!", "Server/Connection Problem Try Again!", "error");
      });
  }
}])