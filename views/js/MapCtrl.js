function MapCtrl($scope, $http,  $interval) {
var lt = 48.857;
var lg = 2.295;
var route = '/clientapp/getmap/test';
	var mapObj = new GMaps({
		el: '#map',
		lat: 0.0,
		lng: 0.0
	});

$interval(function() {
$http.post(route).success(function(data){
mapObj.removeMarker(m);
lt=parseFloat(data.lat);
lg =parseFloat(data.lng);
 m = mapObj.addMarker({
lat: data.lat,
lng: data.lng,
title: 'Phone',
infoWindow: {
	content: '<h4>Phone Location</h4><div>HERE</div>',
	maxWidth: 100
}
});

}, 250);

});



$interval(function() {
mapObj.setCenter(lt,lg,function(){



});
}, 2000);






}
