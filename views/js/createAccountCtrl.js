function createAccountCtrl($scope, $http) {


$scope.create = function(){
var user = $scope.username;
var amount = $scope.amount;
var route = '/createaccount/'+user+'/'+amount;
$http.get(route).success(function(data){
     
 console.log(data);
 $scope.username= "";
 $scope.amount="";
	
	});

}

};



