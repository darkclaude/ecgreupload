function AccountCtrl($scope, $http, $sce, $interval) {
//showdialog
var doreal= false;
var atype = "Prepaid";
    $scope.type = atype;
    $scope.ct="red";
$scope.realvalue=false;
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
$http.post(route).success(function(data){
$scope.v = true;
 if(isNaN(data.balance)==false){
 $scope.infoalert = $sce.trustAsHtml('<div class="alert alert-success"> <strong>Success!</strong> Account Info Operation Succesfull!</div>');

 $scope.balance1= data.balance;
$scope.power1 = data.power;
     $scope.tempc1= data.tempc;
     $scope.atype = data.atype;
}
else{
 $scope.infoalert = $sce.trustAsHtml('<div class="alert alert-danger"> <strong>Error!&nbsp</strong>'+data+'</div>');
 $scope.v=false;

 $scope.balance1="";
$scope.power1 = "";
    $scope.tempc1="";
    $scope.atype ="";
}

});
}
else{

}

    }, 200);



//Clear ALL by change

$scope.clear= function(){

$scope.createalert ="";
$scope.creditalert="";
$scope.transferalert="";
$scope.infoalert="";
$scope.deletealert="";
$scope.genalert="";






}


//Prepaid event
$scope.type1 = function(){
atype="Prepaid";
    $scope.ct="red";
$scope.type=atype;
//console.log("Prepaid selected");
    

}
$scope.type2 = function(){
atype="Postpaid";
    $scope.ct="blue";
    $scope.type=atype;
//console.log("Postpiad Selected");

}

//create
$scope.create = function(){
var text1 = $scope.username1;
var text2 = $scope.amount1;
var text3 = $scope.type;
// create an instance of the block cipher algorithm
var key = aesjs.util.convertStringToBytes("Example128BitKey");

// The initialization vector, which must be 16 bytes
var iv = aesjs.util.convertStringToBytes("IVMustBe16Bytes.");

var text1AsBytes = aesjs.util.convertStringToBytes(text1);
var text2AsBytes = aesjs.util.convertStringToBytes(text2);
var text3AsBytes = aesjs.util.convertStringToBytes(text3);
console.log(text1AsBytes);
console.log(text2AsBytes);
console.log(text3AsBytes);
// [65, 66, 108, 111, 99, 107, 73, 115, 49, 54, 66, 121, 116, 101, 115, 33]






// encrypt...
var aesCtr = new aesjs.ModeOfOperation.ctr(key,new aesjs.Counter(5));
var user = aesCtr.encrypt(text1AsBytes);
//var  aesCtr = new aesjs.ModeOfOperation.ofb(key, iv,8);
//var amount =aesjs.util.convertBytesToString(aesCtr.encrypt(text2AsBytes));
//var  aesCtr = new aesjs.ModeOfOperation.ofb(key, iv,8);
//var at = aesjs.util.convertBytesToString(aesOfb.encrypt(text3AsBytes));
 var  aesCtr = new aesjs.ModeOfOperation.ctr(key,new aesjs.Counter(5));
var decryptedBytes = aesCtr.decrypt(user);

// Convert our bytes back into text
var decryptedText = aesjs.util.convertBytesToString(decryptedBytes);
console.log(decryptedText);
var user1 = aesjs.util.convertBytesToString(user);

// [136, 15, 199, 174, 118, 133, 233, 177, 143, 47, 42, 211, 96, 55, 107, 109] 



var route = '/clientapp/createaccount/'+user1+'/'+"amount"+'/'+"at.toLowerCase()";
console.log(route);
    console.log(atype);
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
 //$scope.show_generated_key= data;
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
     $scope.tempc1 = data.tempc;
     $scope.atype= data.atype;
}
else{
 $scope.infoalert = $sce.trustAsHtml('<div class="alert alert-danger"> <strong>Error!&nbsp</strong>'+data+'</div>');
 $scope.v=false;

 $scope.balance1="";
$scope.power1 = "";
    $scope.tempc1 = "";
    $scope.atype="";
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