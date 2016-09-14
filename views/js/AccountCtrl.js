function AccountCtrl($scope, $http, $sce, $interval) {
//showdialog
var doreal= false;

$scope.showmain = function(){
$scope.t= true;
console.log("button clicked!");



}




//Realtime for Info
$scope.realtime= function(){
console.log($scope.realvalue);
if($scope.realvalue==false){

	doreal = true;
}
else{
	doreal=false;
}

}

  $interval(function() {
 if(doreal){
var user = $scope.username3;
var route = '/clientapp/getinfo2/'+user;
$http.get(route).success(function(data){
$scope.v = true;
 if(isNaN(data.balance)==false){
 $scope.infoalert = $sce.trustAsHtml('<div class="alert alert-success"> <strong>Success!</strong> Account Info Operation Succesfull!</div>');

 $scope.balance1= data.balance;
$scope.power1 = data.power;
}
else{
 $scope.infoalert = $sce.trustAsHtml('<div class="alert alert-danger"> <strong>Error!&nbsp</strong>'+data+'</div>');
 $scope.v=false;

 $scope.balance1="";
$scope.power1 = "";
}

});
}
else{

}

    }, 300);



//Clear ALL by change

$scope.clear= function(){

$scope.createalert ="";
$scope.creditalert="";
$scope.transferalert="";
$scope.infoalert="";
$scope.deletealert="";
$scope.genalert="";






}


//create
$scope.create = function(){
var user = $scope.username1;
var amount = $scope.amount1;
var route = '/clientapp/createaccount/'+user+'/'+amount;
console.log(route);
$http.get(route).success(function(data){
	if(data.indexOf("Successfully!")!=-1){
 $scope.createalert = $sce.trustAsHtml('<div class="alert alert-success"> <strong>Success!</strong> '+data+'</div>');
 console.log(data);
  $scope.username1= "";
 $scope.amount1="";
}
else{

	 $scope.createalert = $sce.trustAsHtml('<div class="alert alert-danger"> <strong>Error!</strong> '+data+'</div>');
}

	});

}

//buy credit
$scope.addCredit = function(){
var user = $scope.username2;
var amount = $scope.amount2;
var route = '/clientapp/creditaccount/'+user+'/'+amount;
$http.get(route).success(function(data){
if(data.indexOf("Successfully!")!=-1){
 console.log(data);
  $scope.creditalert = $sce.trustAsHtml('<div class="alert alert-success"> <strong>Success!</strong> '+data+'</div>');
 $scope.username= "";
 $scope.amount="";
}
else{


 $scope.creditalert = $sce.trustAsHtml('<div class="alert alert-danger"> <strong>Error!</strong> '+data+'</div>');
	}

	});
}



//show generatedkey
$scope.generatekey= function(){
var amount = $scope.amount3;
var route = '/clientapp/generatekey/'+amount;
$http.get(route).success(function(data){


 if(isNaN(data)==false){
 	 $scope.genalert = $sce.trustAsHtml('<div class="alert alert-success"> <strong>Success!</strong> '+data+'</div>');
 $scope.show_generated_key= data;
 $scope.amount3 = "";
 }
 else{
 	 $scope.genalert = $sce.trustAsHtml('<div class="alert alert-danger"> <strong>Error!</strong> '+data+'</div>');
  console.log(data);
 }



	});
}

//user profile
//scope.show = true;
$scope.get_info = function(){

var user = $scope.username3;
var route = '/clientapp/getinfo2/'+user;
$http.post(route).success(function(data){
$scope.v = true;
 if(isNaN(data.balance)==false){
 $scope.infoalert = $sce.trustAsHtml('<div class="alert alert-success"> <strong>Success!</strong> Account Info Operation Succesfull!</div>');

 $scope.balance1= data.balance;
$scope.power1 = data.power;
}
else{
 $scope.infoalert = $sce.trustAsHtml('<div class="alert alert-danger"> <strong>Error!&nbsp</strong>'+data+'</div>');
 $scope.v=false;

 $scope.balance1="";
$scope.power1 = "";
}

});


}


//delete account
$scope.delete_account = function(){
	var user = $scope.username5;
var route = '/clientapp/deleteaccount/'+user;

$http.get(route).success(function(data){
if(data.indexOf("Successfully!")!=-1){
 console.log(data);
  $scope.deletealert = $sce.trustAsHtml('<div class="alert alert-success"> <strong>Success!</strong> '+data+'</div>');
 $scope.username5= "";
}
else{

	 $scope.deletealert = $sce.trustAsHtml('<div class="alert alert-danger"> <strong>Error!</strong> '+data+'</div>');
}

});
}



//transfer account

$scope.transfer = function(){
	var sender = 	$scope.s_username;
	var receipient = $scope.r_username;
	var amount = $scope.amount4;
var route = '/clientapp/transfer/'+sender+'/'+receipient+'/'+amount;
$http.get(route).success(function(data){
	if(data.indexOf("Successfully!")!=-1){
console.log(data);
 $scope.transferalert = $sce.trustAsHtml('<div class="alert alert-success"> <strong>Success!</strong> '+data+'</div>');
$scope.s_username  = "";
$scope.r_username = "";
$scope.amount4 = "";
}
else{

 $scope.transferalert = $sce.trustAsHtml('<div class="alert alert-danger"> <strong>Error!</strong> '+data+'</div>');

}

});


}


}