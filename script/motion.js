document.addEventListener("DOMContentLoaded", function(){ init(); });

var radius = 1;
var ctx;
var width = window.innerWidth;
var height = window.innerHeight;

function init() {
	ctx = setCanvas(document.getElementById("drawing_board"));
	drawSomething(ctx);
	console.log('so far so good');
}

function setCanvas(c) {
	c.setAttribute("width", width);
	c.setAttribute("height", height);
	return c.getContext("2d");
}

function drawSomething() {
	tmr = setInterval(function() { drawStart() }, 20);
}

function drawStart() {
    console.log(radius);

    ctx.beginPath();
	ctx.arc(width/2,height/2,radius,0,2*Math.PI);

    ctx.fillStyle = "#333333";
	ctx.fill();

	radius *= 1.15;

    if (radius >= width/1.5) {
    	clearInterval(tmr);

    	tmr = setInterval(function() { shrinkBack() }, 20);
    };
}

function shrinkBack() {
	console.log(radius + "shrink");
	ctx.beginPath();
	ctx.arc(width/2,height/2,radius,0,2*Math.PI);

    ctx.strokeStyle = "#9A0DFF";
	ctx.stroke();

	radius /= 1.30;

	if (radius <= 100) {
		clearInterval(tmr);
	};
}