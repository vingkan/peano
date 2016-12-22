console.log("Peano's curve");

var Canvas = {
	drawLine: function(line){
		drawLine([line.i.x, line.i.y], [line.f.x, line.f.y], {
			stroke: line.color
		});
	},
	drawLines: function(lines){
		//
	}
}

function Line(ix, iy, fx, fy, color){
	return {
		i: {x: ix, y: iy},
		f: {x: fx, y: fy},
		color: color || 'black'
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
	// Assumes lines only exist along grid
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

function Line2(ic, fc){
	return Line(ic.x, ic.y, fc.x, fc.y);
}

function constructSquares(is, fs){
	var seg = Line2(is, fs);
	seg.color = 'red';
	Canvas.drawLine(seg);
	var size = getLength(seg);
	var vertical = isVertical(seg)
	var squares = [seg];
	if(vertical){
		var above = Line(seg.i.x + size, seg.i.y, seg.f.x + size, seg.f.y);
		var below = Line(seg.i.x - size, seg.i.y, seg.f.x - size, seg.f.y);
		var iAbove = Line(seg.i.x, seg.i.y, seg.f.x + size, seg.i.y);
		var iBelow = Line(seg.i.x, seg.i.y, seg.f.x - size, seg.i.y);
		var fAbove = Line(seg.f.x, seg.f.y, seg.f.x + size, seg.f.y);
		var fBelow = Line(seg.f.x, seg.f.y, seg.f.x - size, seg.f.y);
		squares.push(above);
		squares.push(below);
		squares.push(iAbove);
		squares.push(iBelow);
		squares.push(fAbove);
		squares.push(fBelow);
	}
	else{
		var above = Line(seg.i.x, seg.i.y + size, seg.f.x, seg.f.y + size);
		var below = Line(seg.i.x, seg.i.y - size, seg.f.x, seg.f.y - size);
		var iAbove = Line(seg.i.x, seg.i.y, seg.i.x, seg.i.y + size);
		var iBelow = Line(seg.i.x, seg.i.y, seg.i.x, seg.i.y - size);
		var fAbove = Line(seg.f.x, seg.f.y, seg.f.x, seg.f.y + size);
		var fBelow = Line(seg.f.x, seg.f.y, seg.f.x, seg.f.y - size);
		squares.push(above);
		squares.push(below);
		squares.push(iAbove);
		squares.push(iBelow);
		squares.push(fAbove);
		squares.push(fBelow);
	}
	return squares;
}

function ConstructPeano(lines){
	var newLines = [];
	console.log('given lines:', lines.length)
	lines.forEach(line => {
		newLines.push(line);
		var squareSize = getLength(line) / 3;
		var vertical = isVertical(line);
		var iSeg = {x: line.i.x, y: line.i.y};
		var fSeg = {x: line.i.x, y: line.i.y};
		if(vertical){
			var len = line.f.y - line.i.y;
			var dir = (len / Math.abs(len));
			var seg0 = line.i.y + (dir * squareSize);
			var seg1 = seg0 + (dir * squareSize);
			iSeg.y = seg0;
			fSeg.y = seg1;
		}
		else{
			var len = line.f.x - line.i.x;
			var dir = (len / Math.abs(len));
			var seg0 = line.i.x + (dir * squareSize);
			var seg1 = seg0 + (dir * squareSize);
			iSeg.x = seg0;
			fSeg.x = seg1;
		}
		var squares = constructSquares(iSeg, fSeg);
		for(var s in squares){
			newLines.push(squares[s]);
		}

	});
	return newLines;
}

function PeanoFilter(input, n){
	var lines = input;
	console.log(lines.length)
	for(var i = 0; i < n; i++){
		lines = ConstructPeano(lines);
		console.log(lines.length)
	}
	return lines;
}

function DrawPeano(lines){	
	lines.forEach(line => {
		Canvas.drawLine(line);
	});
}

var l0 = Line(0, 500, 1000, 500);
//var l0 = Line(500, 0, 500, 1000);

// Testing utility functions
/*var res = isVertical(l0);
var len = getLength(l0);
console.log(res)
console.log(len)
Canvas.drawLine(l0);*/

var lines = PeanoFilter([l0], 2);
DrawPeano(lines);

