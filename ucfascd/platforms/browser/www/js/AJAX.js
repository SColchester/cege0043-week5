var xhrNode;
function callDivNodeJSChange() {
	var url = "http://developer.cege.ucl.ac.uk:"+httpPortNumber;
	xhrNode.open("GET", url, true);
	xhrNode.onreadystatechange = processDivNodeJSChange;
	try {
		xhrNode.setRequestHeader("Content-Type", "application/x-www-formurlencoded");
		}
		catch (e) {
		}
		xhrNode.send();
	}
function processDivNodeJSChange() {
	if (xhrNode.readyState < 4)
		document.getElementById('ajaxtext').innerHTML = "Loading...";
	else if (xhrNode.readyState === 4) {
		if (xhrNode.status == 200 && xhrNode.status < 300)
			document.getElementById('ajaxtext').innerHTML = xhrNode.responseText;
	}
}


