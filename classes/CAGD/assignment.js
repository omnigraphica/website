/*globals alert, document, d3, console*/
// These keep JSHint quiet if you're using it (highly recommended!)

// D3 = Data Driven Documents

var curves;



function update(error, data) {
    if (error !== null) {
        alert("Couldn't load the dataset!");
        return;
    }
	
	console.log(data)	
}

function DrawCurve (curve) {

	console.log(min_val_x)
	console.log(max_val_x)

	console.log(min_val_y)
	console.log(max_val_y)


	var plot = d3.select('#plot');


	

}

function DrawCurves () {
	console.log(curves);

	var nCurves = curves.length;

	if (nCurves == 0) {
		return;
	}

	//console.log(curves.length)

	var min_val, max_val, x, y;

	var curve = curves[0];
	min_val_x = d3.min(curve, function(d){ return d.x });
	max_val_x = d3.max(curve, function(d){ return d.x });
	min_val_y = d3.min(curve, function(d){ return d.y });
	max_val_y = d3.max(curve, function(d){ return d.y });

	for (i=1; i<nCurves; i++) {
		curve = curves[i];
		x = d3.min(curve, function(d){ return d.x });
		y = d3.min(curve, function(d){ return d.y });

		if (x < min_val_x) {
			x = min_val_x;
		}
		if (y < min_val_y) {
			y = min_val_y;
		}

		x = d3.max(curve, function(d){ return d.x });
		y = d3.max(curve, function(d){ return d.y });

		if (x > max_val_x) {
			x = max_val_x;
		}
		if (y > max_val_y) {
			y = max_val_y;
		}
	}

	

	for (i=1; i<nCurves; i++) {
		curve = curves[i];
		
		DrawCurve(curve);
	}

}

function FinishedLoadingFile (data) {
    // data is a string of the file contents.

    rawData = data;
    //console.log(rawData)

    var lines = [];
    var line;

	data.split('\n').forEach(function(d,i,self){
		line = d.trim();

		//console.log(line.length)

		if (line.length > 0) {
			if (line.charAt(0) != '#') {
				lines.push(line);
			}
		}
	})

   	console.log(lines)
   	var nCurves = parseInt(lines[0]);

   	var nLines = lines.length;

	console.log("Number of curves in the files:")
   	console.log(nLines)

   	curves = [];

	var t, i, j, x, y, lineElements;
	var curveNumber;
	var lineNumber = 1;
   	for (curveNumber = 1; curveNumber <= nCurves; curveNumber++) {
   		//console.log("Parsing curve " + curveNumber)
   		// Read in curve header.

   		var curve = [];
		
		line = lines[lineNumber];
		lineElements = line.split(',');
		//console.log(lineElements)

		var specialChar = lineElements[0].trim();
		//console.log(specialChar)

		var nPoints = parseInt(lineElements[1].trim());
		//console.log("Number of points in this curve:")
		//console.log(nPoints)

		lineNumber++;

		for (i=0; i<nPoints; i++) {
			line = lines[lineNumber];
			lineElements = line.split(',');
			x = parseFloat(lineElements[0]);
			y = parseFloat(lineElements[1]);

			//console.log(x)
			//console.log(y)
			lineNumber++;

			curve.push({x, y});
		}

		//console.log(curve)

		curves.push(curve);
   	
   	}

   	DrawCurves();

   	//console.log(curves)

}


function changeData() {// callback
    // Load the file indicated by the select menu
	
    var dataFile = document.getElementById('datafiles').value;

    console.log("fn: changeData " + dataFile);

	var filePath = 'bezierdatafiles/' + dataFile;


    jQuery.get(filePath, FinishedLoadingFile);
}

function init() {
	changeData();
}

document.addEventListener('DOMContentLoaded', function() {
   init();
}, false);