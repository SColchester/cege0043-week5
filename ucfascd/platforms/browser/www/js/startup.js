function loadW3HTML() {
    w3.includeHTML();
}

// functions run as the page is loaded, the two commented below are not active

function trackAndCircle(){
	loadW3HTML()
	getPort()
	trackLocation()
	//addPointLinePoly()
	//getEarthquakes()
}

// add Point/Line/Circle data and track location automatically - useful for setting up different startup functions - links to index.html entry before </body> 
function startup(){
	document.addEventListener('DOMContentLoaded', function() {
		trackAndCircle();
		}, false);
	}

