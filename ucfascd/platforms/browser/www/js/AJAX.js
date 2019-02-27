var xhrNode;

//AJAX request function
function callDivNodeJSChange() {
	xhrNode = new XMLHttpRequest();
	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber; //gets URL with non-hardcoded port number
	xhrNode.open("GET", url, true); //send to server
	xhrNode.onreadystatechange = processDivNodeJSChange;
	try {
		xhrNode.setRequestHeader("Content-Type", "application/x-www-formurlencoded");
		}
		catch (e) { //only works in Internet Explorer
		}
		xhrNode.send();
	}
//AJAX response function
function processDivNodeJSChange() {
	if (xhrNode.readyState < 4)
		document.getElementById('ajaxtext').innerHTML = "Loading...";
	else if (xhrNode.readyState === 4) {
		if (xhrNode.status == 200 && xhrNode.status < 300)
			document.getElementById('ajaxtext').innerHTML = xhrNode.responseText;
	}
}

