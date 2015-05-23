function Start(){

	Game.moves=0;
	Game.win=false;

	var gameCanvas = document.getElementById("gameCanvas");

	document.getElementById("StartText").style.visibility = "hidden";
	document.getElementById("StartText2").style.visibility = "hidden";

	document.getElementById("gameCanvas").addEventListener("click",click);

	makeBoard();
	mixBoard();

	if(typeof game_loop != "undefined") clearInterval(game_loop);

		game_loop = setInterval(Game, 60);

}
function mixBoard(){

	for (var i=0;i<50;++i){

		flip(Math.floor((Math.random()*9)),Math.floor((Math.random()*9)));

	}

}
function makeBoard(){

	Game.Board = new Array();
	for (var i=0;i<10;++i){
		Game.Board.push(new Array());
		for (var j=0;j<10;++j){
			Game.Board[i].push(true);
		}
	}
}
function click(e){
	Game.moves++;
	flip(Math.floor(e.offsetX/60),Math.floor(e.offsetY/60));
	Game.win=check();
}
function check(){

	for (var i=0;i<10;++i){
		for (var j=0;j<10;++j){

			if (Game.Board[j][i]==false)return false;

		}
	}
	return true;

}
function flip(x,y){

	if (x>0)Game.Board[x-1][y]=!Game.Board[x-1][y];
	if (x<9)Game.Board[x+1][y]=!Game.Board[x+1][y];
	if (y>0)Game.Board[x][y-1]=!Game.Board[x][y-1];
	if (y<9)Game.Board[x][y+1]=!Game.Board[x][y+1];

}
function Game(){
	Draw();
}
function Draw(){

	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext('2d');

	ctx.fillStyle = 'rgb(0,0,0)';

	ctx.fillRect(0,0,600,600);

	ctx.font="50px Verdana";
    
    ctx.fillStyle = 'rgb(0,255,0)';
	for (var i=0;i<10;++i){
		for (var j=0;j<10;++j){
			if (Game.Board[j][i]==true){
				ctx.fillRect((60*j)+1,(60*i)+1,58,58);
			}
		}
	}
	ctx.fillStyle = 'rgb(255,0,0)';
	for (var i=0;i<10;++i){
		for (var j=0;j<10;++j){
			if (Game.Board[j][i]==false){
				ctx.fillRect((60*j)+1,(60*i)+1,58,58);
			}
		}
	}
	ctx.fillStyle = 'rgb(255,255,255)';
	if (Game.win){
		ctx.fillText("Victory in "+Game.moves+" moves!",50,300);
	}

}
