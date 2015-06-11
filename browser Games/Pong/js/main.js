function Start(){

	var gameCanvas = document.getElementById("gameCanvas");

	document.getElementById("StartText").style.visibility = "hidden";

	Game.Paddle1=new Paddle();
	Game.Paddle2=new Paddle();
	Game.Balls=new Array();

	SpawnBall();

	window.onkeydown = function(e) {
		
		if (e.which==38) Game.Paddle2.goUp=true;
		if (e.which==40) Game.Paddle2.goDown=true;

		if (e.which==87) Game.Paddle1.goUp=true;
		if (e.which==83) Game.Paddle1.goDown=true;

	};
	window.onkeyup = function(e) {
		
		if (e.which==38) Game.Paddle2.goUp=false;
		if (e.which==40) Game.Paddle2.goDown=false;

		if (e.which==87) Game.Paddle1.goUp=false;
		if (e.which==83) Game.Paddle1.goDown=false;
	};

	if(typeof game_loop != "undefined") clearInterval(game_loop);

		game_loop = setInterval(Game, 60);

}
function SpawnBall(){

	Game.Balls.push(new Ball());

}
function Ball(){

	this.x=Math.floor(Math.random()*100)+250;
	this.y=Math.floor(Math.random()*100)+250;

	this.xVel=-5;
	this.yVel=-5;

}
function Paddle(){

	this.y=0;
	this.goDown=false;
	this.goUp=false;
	this.score=0;

}
function Lock(num){

	if (num<=0) return 0;
	if (num>=500) return 500;
	return num;

}
function Game(){

	if (Game.Paddle1.goUp==true) Game.Paddle1.y=Game.Paddle1.y-20;
	if (Game.Paddle1.goDown==true) Game.Paddle1.y=Game.Paddle1.y+20;

	if (Game.Paddle2.goUp==true) Game.Paddle2.y=Game.Paddle2.y-20;
	if (Game.Paddle2.goDown==true) Game.Paddle2.y=Game.Paddle2.y+20;

	Game.Paddle1.y=Lock(Game.Paddle1.y);
	Game.Paddle2.y=Lock(Game.Paddle2.y);

	for (var i=0;i<Game.Balls.length;++i){

		Game.Balls[i].x=Game.Balls[i].x+Game.Balls[i].xVel;
		Game.Balls[i].y=Game.Balls[i].y+Game.Balls[i].yVel;

	}

	Draw();
}
function Draw(){

	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext('2d');
	ctx.font="50px Verdana";

	ctx.fillStyle = 'rgb(0,0,0)';

	ctx.fillRect(0,0,600,600);

	ctx.fillStyle = 'rgb(255,255,255)';

	ctx.fillRect(0,Game.Paddle1.y,25,100);
	ctx.fillRect(575,Game.Paddle2.y,25,100);

	ctx.fillText(Game.Paddle1.score,190,125);
	ctx.fillText(Game.Paddle2.score,400,125);

	ctx.fillRect(299,0,2,600);

	for (var i=0;i<Game.Balls.length;++i){

		ctx.fillRect(Game.Balls[i].x,Game.Balls[i].y,20,20);

	}

}
