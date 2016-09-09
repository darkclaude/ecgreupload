function createAccountCtrl($scope, $http) {


$scope.create = function(){
var user = $scope.username;
var amount = $scope.amount;
$http.get('/createaccount/'+user+'/'+amount).success(function(data){
     
 console.log(data);
 $scope.username= "";
 $scope.amount="";
	
	});

}

};



