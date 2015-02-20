(function() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	canvas.width = 500;
	canvas.height = 650;
	document.getElementById("table").width = canvas.width;
	
	var paddle;
	var ball;
	var score;
	var playing = false;
	
	function init() {
		
		paddle = {
			width: 125,
			height: 10,
			speed: 10
		}
		paddle.x = (canvas.width - paddle.width) / 2;
		paddle.y = canvas.height - paddle.height;
		
		ball = {
			radius: 15,
			dx: 2.7,
			dy: -10,
			accel: 0.2,
			xBounce: 0.9,
			yBounce: 1.001,
			maxSpeed: 2
		};
		ball.x = canvas.width / 2;
		ball.y = canvas.height - paddle.height - ball.radius * 2;
		
		score = 0;
		
		playing = true;
	}
	
	var keys = {
		left: {
			left: "Q".charCodeAt(0),
			right: "W".charCodeAt(0)
		},
		right: {
			left: "O".charCodeAt(0),
			right: "P".charCodeAt(0)
		},
		switched: false
	};
	window.onkeydown = function(event) {
		var key = (event || window.event).keyCode;
		keys[key] = true;
		if(!playing && key == 32) init();
	};
	window.onkeyup = function(event) {
		var key = (event || window.event).keyCode;
		keys[key] = false;
	};
	
	function physics() {
		if(keys[(keys.switched ? keys.right : keys.left).left]) paddle.x -= paddle.speed;
		if(keys[(keys.switched ? keys.right : keys.left).right]) paddle.x += paddle.speed;
		if(paddle.x < 0) paddle.x = 0;
		if(paddle.x > canvas.width - paddle.width) paddle.x = canvas.width - paddle.width;
		
		if(keys[(keys.switched ? keys.left : keys.right).left]) ball.dx -= ball.accel;
		if(keys[(keys.switched ? keys.left : keys.right).right]) ball.dx += ball.accel;
		if(ball.dx > ball.maxSpeed) ball.dx = ball.maxSpeed;
		if(ball.dx < -ball.maxSpeed) ball.dx = -ball.maxSpeed;
		ball.x += ball.dx;
		if(ball.x < ball.radius) {
			ball.x = ball.radius;
			ball.dx *= -ball.xBounce;
		}
		if(ball.x > canvas.width - ball.radius) {
			ball.x = canvas.width - ball.radius;
			ball.dx *= -ball.xBounce;
		}
		
		ball.y += ball.dy;
		if(ball.y < ball.radius) {
			ball.y = ball.radius;
			ball.dy *= -ball.yBounce;
		}
		if(ball.y > canvas.height - ball.radius - paddle.height) {
			if(ball.x >= paddle.x && ball.x <= paddle.x + paddle.width) {
				ball.y = canvas.height - ball.radius - paddle.height;
				ball.dy *= -ball.yBounce;
				score++;
			}
			else {
				playing = false;
			}
		}
	}
	
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillRect(0,40,100,40);
		ctx.fillRect(100,0,100,40);
		ctx.fillRect(200,40,100,40);
		ctx.fillRect(300,0,100,40);
		ctx.fillRect(400,40,100,40);
		ctx.fillRect(100,80,100,40);
		ctx.fillRect(300,80,100,40);
		ctx.fillRect(200,120,100,40);
		ctx.fillRect(0,120,100,40);
		ctx.fillRect(400,120,100,40);
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
		ctx.fillStyle = "orange";
		ctx.fill();
		ctx.fillStyle = "black";
		ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
	}
	
	init();
	
	playing = false;
	
	setInterval(function() {
		if(playing) physics();
		draw();
	}, 10);
})();