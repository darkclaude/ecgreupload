



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
lat: data.lat,
lng: data.lng,
title: 'Phone',
infoWindow: {
	content: '<h4>Phone Location</h4><div>HERE</div>',
	maxWidth: 100
}
});

$interval(function() {
$http.post(route).success(function(data){
	if(data!="none"){
mapObj.removeMarker(m);
lt=parseFloat(data.lat);
lg =parseFloat(data.lng);
 console.log(lt);
 console.log(lg);
  m = mapObj.addMarker({
lat: data.lat,
lng: data.lng,
title: 'Phone',
infoWindow: {
	content: '<h4>Phone Location</h4><div>HERE</div>',
	maxWidth: 100
}
});
}
else{

}

});

}, 250);




$interval(function() {

}, 2000);






}

