function AppCtrl($scope, $http, $interval,$timeout, $window) {


scope.create = function(){
var user = $scope.username;
var amount = $scope.amount;
$http.get('ecg-ninjax.rhcloud.com/createaccount/'+user+'/'+amount).success(function(data){
     
 alert(data);
 $scope.username= "";
 $scope.amount="";
	
	});

};



