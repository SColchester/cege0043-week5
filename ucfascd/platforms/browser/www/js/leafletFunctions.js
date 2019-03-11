// create a variable that will hold the XMLHttpRequest()
// - this must be done outside a function so that
// all the functions can use the same variable
var client;

var GeoJSON;

// and a variable that will hold the layer itself
// we need to do this outside the function so that we
// can use it to remove the layer later on
var GeoJSONlayer;

var london_poi = 'london_poi'
var london_highway = 'london_highway'


// run the function when you click the corresponding button from index.html
function load_london_poi() {
    // keep the alert message so that we know something is happening
    alert("Loading london_poi");
    getGeoJSON(london_poi);
}

function load_london_highway() {
    alert("Loading london_highway");
    getGeoJSON(london_highway);
}


// get the data using an XMLHttpRequest
function getGeoJSON(x) {
    client = new XMLHttpRequest();
    client.open('GET', 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + '/getGeoJSON/' + x + '/geom');
    client.onreadystatechange = GeoJSONResponse;
    // note don't use earthquakeResponse() with brackets as that doesn't work
    client.send();
}


// wait for the response from the data server,
// and process the response once it is received
function GeoJSONResponse() {
    // this function listens out for the server to say that
    // the data is ready - i.e. has state 4
    if (client.readyState == 4) {
        // once the data is ready, process the data
        var GeoJSON_text = client.responseText;
        loadGeoJSONlayer(GeoJSON_text);
    }
}

// convert the received data - which is text - to JSON format and add it to the map
function loadGeoJSONlayer(GeoJSON_text) {
    // convert the text to JSON
    var GeoJSON_json = JSON.parse(GeoJSON_text);
    // pass the earthquake data to the global variable we created earlier
    GeoJSON = GeoJSON_json;
    // load the geoJSON layer -- using customer icons
    GeoJSONlayer = L.geoJson(GeoJSON_json).addTo(mymap);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(GeoJSONlayer.getBounds());
}

// run the function when you click the corresponding button from index.html
function removeFormData() {
    alert("FormData  will be removed");
    mymap.removeLayer(GeoJSONlayer);
}