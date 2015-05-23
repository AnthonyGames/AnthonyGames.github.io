function Start(){

	var gameCanvas = document.getElementById("gameCanvas");

	Game.TheSnake = new Snake();
	Game.ThsFood = new Food();
	SpawnFood();

	document.getElementById("StartText").style.visibility = "hidden";

	window.onkeydown = function(e) {
		
		if (e.which==37&&Game.TheSnake.der!="Right") Game.TheSnake.der="Left";
		if (e.which==38&&Game.TheSnake.der!="Down") Game.TheSnake.der="Up";
		if (e.which==39&&Game.TheSnake.der!="Left") Game.TheSnake.der="Right";
		if (e.which==40&&Game.TheSnake.der!="Up") Game.TheSnake.der="Down";

	};

	if(typeof game_loop != "undefined") clearInterval(game_loop);

		game_loop = setInterval(Game, 60);

}
function Move(){

	var der=Game.TheSnake.der;

	if (Game.TheSnake.toAdd<=0)
		Game.TheSnake.parts.splice(0,1);
	else
		--Game.TheSnake.toAdd;

	if (der=="Right"){

		Game.TheSnake.parts.push([Game.TheSnake.headx+1,Game.TheSnake.heady]);
		++Game.TheSnake.headx;
	}
	if (der=="Left"){
		
		Game.TheSnake.parts.push([Game.TheSnake.headx-1,Game.TheSnake.heady]);
		--Game.TheSnake.headx;
	}
	if (der=="Up"){
		
		Game.TheSnake.parts.push([Game.TheSnake.headx,Game.TheSnake.heady-1]);
		--Game.TheSnake.heady;
	}
	if (der=="Down"){
		
		Game.TheSnake.parts.push([Game.TheSnake.headx,Game.TheSnake.heady+1]);
		++Game.TheSnake.heady;
	}

	for (var i=0;i<Game.TheSnake.parts.length;++i){

		if (Game.TheSnake.parts[i][0]<0) Game.TheSnake=new Snake();
		if (Game.TheSnake.parts[i][0]>59) Game.TheSnake=new Snake();
		if (Game.TheSnake.parts[i][1]<0) Game.TheSnake=new Snake();
		if (Game.TheSnake.parts[i][1]>59) Game.TheSnake=new Snake();

	}

}
function SpawnFood(){

	Game.ThsFood.locations.push([Math.floor(Math.random()*60),Math.floor(Math.random()*60)]);

}
function Food (){

	this.timer = 0;
	this.locations=new Array();
	
}
function MakeParts(){

	var array = new Array();

	array.push([3,0]);
	array.push([2,0]);
	array.push([1,0]);
	array.push([0,0]);

	return array;

}
function Cut(j){

	var arr = new Array();

	for (var i=0;i<Game.TheSnake.parts.length;++i){

		arr.push([Game.TheSnake.parts[i][0],Game.TheSnake.parts[i][1]]);

		if (i==j){

			return arr;

		}

	}

}
function Hits(){

	for (var i=0;i<Game.TheSnake.parts.length;++i){

		for (var j=0;j<Game.TheSnake.parts.length;++j){

			if (Game.TheSnake.parts[i][0]==Game.TheSnake.parts[j][0]&&
				Game.TheSnake.parts[i][1]==Game.TheSnake.parts[j][1]&&
				j!=i){
			
				Game.TheSnake.parts=Cut(i);
			}
		}
		for (var j=0;j<Game.ThsFood.locations.length;++j){

			if (Game.TheSnake.parts[i][0]==Game.ThsFood.locations[j][0]&&
				Game.TheSnake.parts[i][1]==Game.ThsFood.locations[j][1]){

				Game.TheSnake.toAdd=Game.TheSnake.toAdd+2;
				Game.ThsFood.locations.splice(j,1);
			}
		}
	}		
}
function Snake (){

	this.toAdd = 30;
	this.headx = 3;
	this.heady = 0;
	this.der = "Down";
	this.parts = MakeParts();

}
function Game(){

	++Game.ThsFood.timer;

	if (Game.ThsFood.timer>=80){
		SpawnFood();
		Game.ThsFood.timer=0;
	}

	Move();
	Hits();
	Draw();

};
function Draw(){

	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext('2d');

	ctx.fillStyle = 'rgb(255,255,255)';

	ctx.fillRect(0,0,600,600);

	ctx.fillStyle = 'rgb(200,0,0)';

	for (var i=0;i<Game.TheSnake.parts.length;++i){

		ctx.fillRect((Game.TheSnake.parts[i][0]*10)+1,(Game.TheSnake.parts[i][1]*10)+1,8,8);

	}

	ctx.fillStyle = 'rgb(0,255,0)';

	for (var i=0;i<Game.ThsFood.locations.length;++i){

		ctx.fillRect((Game.ThsFood.locations[i][0]*10)+1,(Game.ThsFood.locations[i][1]*10)+1,8,8);

	}		

}
