document.addEventListener("DOMContentLoaded", function(){ init(); });

var radius = 1, count = 0, ctx, width = window.innerWidth, height = window.innerHeight, lines = [], triangles = [], colors = ["#F25EA3", "#5DF489", "#39A8D9", "#F1F892", "#FB6E46"];

function init() {
	ctx = setCanvas(document.getElementById("drawing_board"));
	drawSomething(ctx);
	console.log('So far so good.');
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
		drawTriangles();
	};
}

// Draw a circle with only a outer line.
function drawOutlineCircle(r, c, w) {
	ctx.beginPath();
	ctx.arc( width / 2, height / 2, r, 0, 2 * Math.PI);
	ctx.lineWidth = w;
    ctx.strokeStyle = c;
	ctx.stroke();
}

function drawTriangles() {
	var a = width / 30;
	var b = height / 20;

	var i, j;
	for (i = 0; i <= width - a; i += a) {
		for (j = 0; j <= height - b; j += b) {
			var t = new triangle( i, j, i + a, j + b, i + a, j, colors[Math.floor(Math.random() * 5)]);
			triangles.push(t);
		};
	};
	timer = setInterval( function() { drawAnother(); }, 5);
}

function drawAnother() {
	triangles[count].drawTriangle();

	count++;
	console.log(count);
	if (count >= triangles.length) {
		clearInterval(timer);
	};

}

function triangle(x1, y1, x2, y2, x3, y3, color) {
	// Properties
	// var X1, X2, X3, Y1, Y2, Y3, Color;
	this.X1 = x1;
	this.Y1 = y1;
	this.X2 = x2;
	this.Y2 = y2;
	this.X3 = x3;
	this.Y3 = y3;
	this.Color = color;

	this.drawTriangle = function draw() {
		ctx.fillStyle = this.Color;
		ctx.beginPath();
	
		ctx.moveTo(this.X1, this.Y1);
		ctx.lineTo(this.X2, this.Y2);
		ctx.lineTo(this.X3, this.Y3);
	
		ctx.closePath();
		ctx.fill();
	}

	this.fallDown = function fallDown() {
		console.log(this);
		timer = setInterval( function() { drop(this) }, 40);
	}
}

function drop(triangle) {
	// if (triangle != undefined) {
	// 	triangle.Color = "#000000";
	// 	triangle.drawTriangle();
	// };

	// if (true) {
	// 	clearInterval(timer);
	// };
}