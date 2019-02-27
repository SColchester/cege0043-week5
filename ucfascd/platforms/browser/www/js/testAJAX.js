// define the global variable to process the AJAX request
var xhr;
function callDivChange() {
	xhr = new XMLHttpRequest();
	var filename = document.getElementById("filename").value;
	xhr.open("GET", filename, true);
	xhr.onreadystatechange = processDivChange;
	xhr.send();
}
function processDivChange() {
	if (xhr.readyState < 4)
		document.getElementById('div1').innerHTML = "Loading...";
		else if (xhr.readyState === 4) {
			if (xhr.status == 200 && xhr.status < 300)
				document.getElementById('div1').innerHTML = xhr.responseText;
		}
	}