



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
var mo=  mapObj.drawOverlay({
  lat: -12.043333,
  lng: -77.028333,
  content: '<div class="overlay">Lima</div>'
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
mapObj.removeOverlay(mo);
lt=parseFloat(data.lat);
lg =parseFloat(data.lng);
 console.log(lt);
 console.log(lg);
 mo  =   mapObj.drawOverlay({
  lat: lt,
  lng: lg,
  verticalAlign: top,
  content: '<div class="overlay"><h2><font color="red">'+lt+","+lg+'</font></h2></div>'
});

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
}, 6000);






}

