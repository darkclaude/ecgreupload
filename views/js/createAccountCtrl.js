//accountCtrl

var app = angular.module('ecgApp', ['ngRoute']);
var accounts=[];
app.controller('createAccountCtrl', ['$scope','$http', function($scope, $http){
	


	

$scope.create = function(){
var user = $scope.username;
var amount = $scope.amount;
$http.get('ecg-ninjax.rhcloud.com/createaccount/'+user+'/'+amount).success(function(data){
     
 alert(data);
 $scope.username= "";
 $scope.amount="";
	
	});


});
	
	
