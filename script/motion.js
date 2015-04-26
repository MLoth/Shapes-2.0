document.addEventListener("DOMContentLoaded", function(){ init(); });

var radius = 1, ctx, width = window.innerWidth, height = window.innerHeight, lines = [];

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

    ctx.beginPath();
	ctx.arc(width/2,height/2,radius,0,2*Math.PI);
    ctx.fillStyle = "#333333";
	ctx.fill();

	radius *= 1.15;

	var screenDiagonal = (width * width) + (height * height);
    if ((radius * radius) >= screenDiagonal) {
    	clearInterval(tmr);

    	tmr = setInterval(function() { shrinkBack() }, 20);
    };
}

function shrinkBack() {
	console.log(lines);

	// add positions to array for redrawing
	lines.push(radius);

	drawOutlineCircle(radius, "#9A0DFF", 1);

	radius /= 1.30;

	if (radius <= 100) {
		clearInterval(tmr);
		highlight();
	};
}

// Draw a circle with only a outer line.
function drawOutlineCircle(r, c, w) {
	ctx.beginPath();
	ctx.arc(width/2,height/2,r,0,2*Math.PI);
	ctx.lineWidth = w;
    ctx.strokeStyle = c;
	ctx.stroke();
}

function highlight() {
	// make ovals, not yet ok
	// ctx.translate(width / 2, height / 2);
	// ctx.scale(2, 1);
	// ctx.restore;

	for (var i = 0, j = lines.length; i <= j; i++) {
		if (i != lines[i]) {
			drawOutlineCircle(lines[i], "#E80CB2", 3);
		};
	};
	clearTimeout(tmr);

	// if (true) {};
	// for (var i = lines.length - 1; i >= 0; i--) {
	// 	drawOutline(lines[i], "#FFFFFF", 1);
	// };
}