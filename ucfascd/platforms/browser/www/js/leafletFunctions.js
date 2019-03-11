// create a variable that will hold the XMLHttpRequest()
// - this must be done outside a function
var client;

var formdata;

// and a variable that will hold the layer itself
var formdatalayer;

// run the function when you click the LOAD DATA BUTTON
function loadFormdata() {
    // keep the alert message so that we know something is happening
    alert("Loading formdata");
    getFormdata();
}

// get the Fromdata data using an XMLHttpRequest
function getFormdata() {
    client = new XMLHttpRequest();
    client.open('GET', 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + '/getFormData/' + httpPortNumber);
    client.onreadystatechange = formdataResponse;
    client.send();
}

// wait for the response from the data server,
// and process the response once it is received
function formdataResponse() {
    // this function listens out for the server to say that
    // the data is ready - i.e. has state 4
    if (client.readyState == 4) {
        // once the data is ready, process the data
        var formdata_text = client.responseText;
        loadFormdatalayer(formdata_text);
    }
}

// convert the received data - which is text - to JSON format and add it to the map
function loadFormdatalayer(formdata_text) {
    // convert the text to JSON
    var formdatajson = JSON.parse(formdata_text);
    // pass the earthquake data to the global variable we created earlier
    formdata = formdatajson;
    // load the geoJSON layer -- using customer icons
    formdatalayer = L.geoJson(formdatajson).addTo(mymap);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(formdatalayer.getBounds());
}

// run the function when you click the REMOVE DATA BUTTON
function removeFormData() {
    alert("FormData will be removed");
    mymap.removeLayer(formdatalayer);
}

// function to create point, circle and line
function addPointLinePoly(){
	//adding a point
	L.marker([51.5, -0.09]).addTo(mymap);
	// add a circle
	L.circle([51.508, -0.11], 500, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
		}).addTo(mymap).bindPopup("I am a circle.");
		//adding a line aka 'polyline'
		var latlngs = [
		[51.5, -0.09],
		[51.51, -0.047]
		];
		var polyline = L.polyline(latlngs, {color: 'red'}).addTo(mymap);
}


