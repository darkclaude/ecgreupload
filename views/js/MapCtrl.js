



function MapCtrl($scope, $http,  $interval) {
var lt = 48.857;
var lg = 2.295;
var pr=lt;
var pl = lg;
var route = '/clientapp/getmap/rest';
	var mapObj = new GMaps({
		el: '#map',
		lat: 0.0,
		lng: 0.0
	});
var m = mapObj.addMarker({
lat: lt,
lng: lg,
title: 'Phone',
infoWindow: {
	content: '<h4>Phone Location</h4><div>HERE</div>',
	maxWidth: 100
}
});

$interval(function() {
$http.post(route).success(function(data){
	if(data!="none"){
		if(pr==parseFloat(data.lat) && pl == parseFloat(data.lng)){
            
		}
		else{
			pr=parseFloat(data.lat);
			pl=parseFloat(data.lng);
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
}
else{

}

});

}, 500);




$interval(function() {
mapObj.setCenter(lt,lg,function(){});
}, 3000);






}

