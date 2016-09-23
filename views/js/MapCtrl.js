function MapCtrl($scope, $http, $sce, $interval) {
var lt = 48.857;
var lg = 2.295;
	var mapObj = new GMaps({
		el: '#map',
		lat: 48.857,
		lng: 2.295
	});
	var m = mapObj.addMarker({
  lat: 48.8583701,
  lng: 2.2944813,
  title: 'Eiffel Tower',
  infoWindow: {
    content: '<h4>Eiffel Tower</h4><div>Paris, France</div>',
    maxWidth: 100
  }
});
$interval(function() {
lt =lt  + 0.01;
lg = lg+0.01;
mapObj.removeMarker(m);
 m = mapObj.addMarker({
lat: lt,
lng: lg,
title: 'Eiffel Tower',
infoWindow: {
	content: '<h4>Eiffel Tower</h4><div>Paris, France</div>',
	maxWidth: 100
}
});

}, 200);



}