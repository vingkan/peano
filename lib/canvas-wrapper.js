var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function getDataURI(){
	var dataURI = canvas.toDataURL();
	return dataURI;
}

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawRect({
		x: 0,
		y: 0,
		width: canvas.width,
		height: canvas.height,
	}, BASE_COLOR);
}

function drawRect(r, fill){
	ctx.beginPath();
	ctx.rect(r.x, r.y, r.width, r.height);
	//ctx.stroke();
	if(fill){
		ctx.fillStyle = fill;
		ctx.fill();
	}
	ctx.closePath();
}

function drawCircle(c, opt){
	var s = {
		fill: opt.fill || false,
		stroke: opt.stroke || false,
		dashes: opt.dashes || [0, 0]
	}
	ctx.beginPath();
	ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI, false);
	if(s.fill){
		ctx.fillStyle = s.fill;
		ctx.fill();
	}
	if(s.stroke){
		ctx.setLineDash(s.dashes);
		ctx.strokeStyle = s.stroke;
		ctx.stroke();
	}
	ctx.closePath();
	ctx.setLineDash([0, 0]);
}

function drawLine(i, f, optx){
	var opt = optx || {};
	var s = {
		stroke: opt.stroke || 'black',
		offset: opt.offset || 0
	}
	ctx.beginPath();
	ctx.moveTo(i[0] + s.offset, i[1] + s.offset);
	ctx.lineTo(f[0] + s.offset, f[1] + s.offset);
	if(s.stroke){
		ctx.strokeStyle = s.stroke;
	}
	ctx.lineWidth = 5;
	ctx.stroke();
	ctx.closePath();
}

function drawText(text, i, opt){
	var s = {
		size: opt.size || 20,
		font: opt.font || 'Consolas',
		fill: opt.fill || 'white'
	}
	ctx.beginPath();
	ctx.font = s.size + 'px ' + s.font;
	if(s.fill){
		ctx.fillStyle = s.fill;
	}
	ctx.fillText(text, i[0] - (s.size * 0.25), i[1] + (s.size * 0.30));
	ctx.closePath();
}

var NODE_POS = [
	{x: 250, y: 200, node: 'EMPTY'},
	{x: 250, y: 400, node: 'EMPTY'},
	{x: 250, y: 600, node: 'EMPTY'},
	//{x: 250, y: 800, node: 'EMPTY'},
	{x: 750, y: 200, node: 'EMPTY'},
	//{x: 750, y: 400, node: 'EMPTY'},
	{x: 750, y: 600, node: 'EMPTY'},
	//{x: 750, y: 800, node: 'EMPTY'}
];

var LETTER_POS = ['a', 'b', 'c', 'd', 'e'];

var BASE_COLOR = '#20221f';
var CIRCUIT_GREEN = '#0cdc56';
var LED_COLOR = {
	red: '#eb5c1f',
	blue: '#0bebe5',
	green: '#0cdc56',
	yellow: '#d3eb37'
}
