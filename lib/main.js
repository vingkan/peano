console.log("Peano's curve");

var Canvas = {
	drawLine: function(line, opt){
		drawLine([line.i.x, line.i.y], [line.f.x, line.f.y], opt);
	},
	drawLines: function(lines){
		//
	}
}

function Line(ix, iy, fx, fy){
	return {
		i: {x: ix, y: iy},
		f: {x: fx, y: fy}
	}
}

function isVertical(line){
	if(line.i.x === line.f.x){
		return true
	}
	else{
		return false;
	}
}

function getLength(line){
	//Assumes lines only exist along grid
	var res = 0;
	var vertical = isVertical(line);
	if(vertical){
		res = Math.abs(line.f.y - line.i.y);
	}
	else{
		res = Math.abs(line.f.x - line.i.x);
	}
	return res;
}



function PeanoFilter(lines, n){
	var newLines = [];
	lines.map(line => {
		console.log(line);
		var squareSize = getLength(line) / 3;
		var vertical = isVertical(line);
		if(vertical){

		}
		else{
			newLines.push(Line(
				ix,
				iy,
				fx,
				fy
			));
		}

	});
}


var l0 = Line(0, 500, 1000, 500);

var res = isVertical(l0);
var len = getLength(l0);
console.log(res)
console.log(len)

Canvas.drawLine(l0);

PeanoFilter([l0], 2);



