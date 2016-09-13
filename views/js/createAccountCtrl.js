function createAccountCtrl($scope, $http) {

//create
$scope.create = function(){
var user = $scope.username;
var amount = $scope.amount;
var route = '/clientapp/createaccount/'+user+'/'+amount;
console.log(route);
$http.get(route).success(function(data){

 console.log(data);
 alert(data);
 $scope.username= "";
 $scope.amount="";

	});

}

//buy credit
$scope.buyCredit = function(){
var user = $scope.username;
var amount = $scope.amount;
var credit = $scope.credit;
var route = '/clientapp/creditaccount/'+user+'/'+amount;
$http.get(route).success(function(data){

 console.log(data);
 alert(data);
 $scope.username= "";
 $scope.amount="";
$scope.credit = "";
	});
}


//show generatedkey
$scope.show_generated_key = function(){
var show_generated = $scope.show_generated;
var amount = $scope.amount;
var route = '/clientapp/generatekey/'+amount;
$http.get(route).success(function(data){


 if(isNaN(data)==false){
 $scope.show_generated_key= data;
 }
 else{
  console.log(data);
   alert(data);
 }



	});
}

//user profile
//scope.show = true;
$scope.get_info = function(){

var user = $scope.username;
 var user = $scope.show_username;
 var balance = $scope.show_balance;
 var power = $scope.show_power;
var route = '/clientapp/getinfo2/'+user;
$http.get(route).success(function(data){
$scope.v = true;
 if(isNaN(data.balance)==false){
 $scope.show_username= data.username;
 $scope.balance= data.balance;
$scope.power = data.power;
}
else{
alert(data);
 $scope.show_username= "";
 $scope.balance="";
$scope.power = "";
}

}


}

//delete account
$scope.delete_account = function(){
	var user = $scope.username;
var route = '/clientapp/deleteaccount/'+user;

$http.get(route).success(function(data){

 console.log(data);
 alert(data);
 $scope.username= "";

}
}
//transfer account

$scope.transfer = function(){
	var sender = 	$scope.s_username;
	var receipient = $scope.r_username;
		var amount = $scope.amount;
var route = '/clientapp/user1/user2/amount';
$http.get(route).success(function(data){
console.log(data);
 alert(data);

$scope.s_username  = "";
$scope.r_username = "";
$scope.amount = "";
}

}


}