



function MapCtrl($scope, $http,  $interval) {
var lt = 48.857;
var lg = 2.295;
var route = '/clientapp/getmap/rest';
	var mapObj = new GMaps({
		el: '#map',
		lat: 0.0,
		lng: 0.0
	});
var m = mapObj.addMarker({
lat: 0.0,
lng: 0.0,
title: 'Phone',
infoWindow: {
	content: '<h4>Phone Location</h4><div>HERE</div>',
	maxWidth: 100
}
});

$interval(function() {
console.log("me");
}, 25000);









}

