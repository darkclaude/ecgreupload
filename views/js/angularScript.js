 var app = angular.module('ECG', [])


app.controller('mainController', ['$scope' ,'$sce','$http', '$interval','$timeout', '$window', function ($scope, $sce,$http, $interval,$timeout, $window) {
	

   $scope.topup = function(){

var route = "/redeem";
 var parameter = JSON.stringify({user: $scope.user, code: $scope.code});
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
           else{
           	  swal("Success!", "Recharge Succesfull! You have been Credited with "+response+' Unit(s)', "success");
           }
      }).
      error(function(data, status, headers, config) {
 swal("Error!", "Server/Connection Problem Try Again!", "error");
      });



   }

	$scope.doSomething = function(){
		console.log('you have clicked on this button');
	}
}])