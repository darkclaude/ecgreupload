function createAccountCtrl($scope, $http) {


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

};



