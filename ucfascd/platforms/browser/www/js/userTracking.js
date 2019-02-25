var userMarker ;

function trackLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition);
	} else {
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
}
}

function showPosition(position) {
	if (userMarker){
		mymap.removeLayer(userMarker);
	}
	userMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup("<b>You were here</b>");
	mymap.setView([position.coords.latitude, position.coords.longitude], 13);
	getDistance();
}

function getDistance(){
	navigator.geolocation.getCurrentPosition(getDistanceFromMultiplePoints);
}

function getDistanceFromPoint(position){
	//ETSI Madrid coords
	var lat = 40.441836;
	var lng = -3.699667;
	var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat, lng, 'K');
	if (distance<0.1){
		alert("You are within 100m of the point!");
	}
}

//adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit){
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
	subAngle = subAngle * 180/Math.PI;
	dist = (subAngle/360) * 2 * Math.PI * 3956;
	if (unit=="K") { dist = dist * 1.609344 ;}
	if (unit=="N") { dist = dist * 0.8684 ;}
	return dist;
}

function getDistanceFromMultiplePoints(position) {
	var minDistance = 100000000000;
	var closestQuake = "";
	for(var i = 0; i < earthquakes.features.length; i++) {
		var obj = earthquakes.features[i];
		var distance = calculateDistance(position.coords.latitude,position.coords.longitude,obj.geometry.coordinates[0], obj.geometry.coordinates[1],'K');
		if (distance < minDistance){
			minDistance = distance;
			closestQuake = obj.properties.place;
		}
	}
	alert("Earthquake: " + closestQuake + " is distance " + minDistance + "away");
}

