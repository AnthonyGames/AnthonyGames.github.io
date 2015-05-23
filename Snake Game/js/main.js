RedScore=0;
BlueScore=0;

function Start(){
	var gameCanvas = document.getElementById("gameCanvas");

	Game.ok=false;
	Game.Snakes = new Array();
	Game.Snakes.push(new Snake(0));
	Game.Snakes.push(new Snake(1));
	Game.Stones = new Stones();

	Game.ThsFood = new Food();
	SpawnFood();

	document.getElementById("StartText").style.visibility = "hidden";
	document.getElementById("StartText2").style.visibility = "hidden";
	document.getElementById("StartText3").style.visibility = "hidden";
	document.getElementById("StartText4").style.visibility = "hidden";

	window.onkeydown = function(e) {
		
		if (e.which==37&&Game.Snakes[0].der!="Right") Game.Snakes[0].der="Left";
		if (e.which==38&&Game.Snakes[0].der!="Down") Game.Snakes[0].der="Up";
		if (e.which==39&&Game.Snakes[0].der!="Left") Game.Snakes[0].der="Right";
		if (e.which==40&&Game.Snakes[0].der!="Up") Game.Snakes[0].der="Down";

		if (e.which==65&&Game.Snakes[1].der!="Right") Game.Snakes[1].der="Left";
		if (e.which==87&&Game.Snakes[1].der!="Down") Game.Snakes[1].der="Up";
		if (e.which==68&&Game.Snakes[1].der!="Left") Game.Snakes[1].der="Right";
		if (e.which==83&&Game.Snakes[1].der!="Up") Game.Snakes[1].der="Down";

	};

	if(typeof game_loop != "undefined") clearInterval(game_loop);

		game_loop = setInterval(Game, 60);

}
function Move(num){

	var der=Game.Snakes[num].der;

	if (Game.Snakes[num].toAdd<=0)
		Game.Snakes[num].parts.splice(0,1);
	else
		--Game.Snakes[num].toAdd;

	if (der=="Right"){

		Game.Snakes[num].parts.push([Game.Snakes[num].headx+1,Game.Snakes[num].heady]);
		++Game.Snakes[num].headx;
	}
	if (der=="Left"){
		
		Game.Snakes[num].parts.push([Game.Snakes[num].headx-1,Game.Snakes[num].heady]);
		--Game.Snakes[num].headx;
	}
	if (der=="Up"){
		
		Game.Snakes[num].parts.push([Game.Snakes[num].headx,Game.Snakes[num].heady-1]);
		--Game.Snakes[num].heady;
	}
	if (der=="Down"){
		
		Game.Snakes[num].parts.push([Game.Snakes[num].headx,Game.Snakes[num].heady+1]);
		++Game.Snakes[num].heady;
	}

	for (var i=0;i<Game.Snakes[num].parts.length;++i){

		if (num==1){

			if (Game.Snakes[num].parts[i][0]<10) Game.Snakes[num]=new Snake(num);
			if (Game.Snakes[num].parts[i][0]>59) Game.Snakes[num]=new Snake(num);
			if (Game.Snakes[num].parts[i][1]<0) Game.Snakes[num]=new Snake(num);
			if (Game.Snakes[num].parts[i][1]>59) Game.Snakes[num]=new Snake(num);

		}
		else{

			if (Game.Snakes[num].parts[i][0]<0) Game.Snakes[num]=new Snake(num);
			if (Game.Snakes[num].parts[i][0]>49) Game.Snakes[num]=new Snake(num);
			if (Game.Snakes[num].parts[i][1]<0) Game.Snakes[num]=new Snake(num);
			if (Game.Snakes[num].parts[i][1]>59) Game.Snakes[num]=new Snake(num);

		}
	}
	

}
function SpawnFood(){

	Game.ThsFood.locations.push([Math.floor(Math.random()*40)+10,Math.floor(Math.random()*40)+10]);

	Game.Stones.AllStones.push([Math.floor(Math.random()*40)+10,Math.floor(Math.random()*40)+10]);

	for (var i=0;i<Game.ThsFood.locations.length;++i){
		for (var j=0;j<Game.Stones.AllStones.length;++j){

			
			if (Game.Stones.AllStones[j][0]==Game.ThsFood.locations[i][0]&&
				Game.Stones.AllStones[j][1]==Game.ThsFood.locations[i][1]){

				Game.Stones.AllStones.splice(j,1);
				Game.ThsFood.locations.splice(i,1);
			}

		}
	}

	
}
function Stones(){

	this.AllStones = new Array();

}
function Food (){

	this.timer = 0;
	this.locations=new Array();
	
}
function MakeParts(num){

	var array = new Array();

	if (num==0){

		array.push([0,0]);
		array.push([0,1]);
		array.push([0,2]);
		array.push([0,3]);

	}
	else{

		array.push([59,59]);
		array.push([59,58]);
		array.push([59,57]);
		array.push([59,56]);

	}
	return array;

}
function Cut(j,num){

	var arr = new Array();

	for (var i=0;i<Game.Snakes[num].parts.length;++i){

		arr.push([Game.Snakes[num].parts[i][0],Game.Snakes[num].parts[i][1]]);

		if (i==j){

			return arr;

		}

	}

}
function Hits(){

	for (var i=0;i<Game.Snakes.length;++i){

		for (var j=0;j<Game.Snakes.length;++j){

			for (var k=0;k<Game.Snakes[i].parts.length;++k){

				for (var l=0;l<Game.Snakes[j].parts.length;++l){

					if (Game.Snakes[i].parts[k][0]==Game.Snakes[j].parts[l][0]&&
						Game.Snakes[i].parts[k][1]==Game.Snakes[j].parts[l][1]&&
						!(i==j&&k==l)){

						if (k==Game.Snakes[i].parts.length-1){
							Game.Snakes[i]=new Snake(i);

						}

						if (l==Game.Snakes[j].parts.length-1){

							Game.Snakes[j]=new Snake(j);

						}
				
						

						return;
					}
				}
			}
		}
		for (var k=0;k<Game.Snakes[i].parts.length;++k){

			for (var l=0;l<Game.ThsFood.locations.length;++l){

				if (Game.Snakes[i].parts[k][0]==Game.ThsFood.locations[l][0]&&
					Game.Snakes[i].parts[k][1]==Game.ThsFood.locations[l][1]){

					Game.ThsFood.locations.splice(l,1);
					Game.Snakes[i].toAdd=Game.Snakes[i].toAdd+3;

				}
			}
			for (var l=0;l<Game.Stones.AllStones.length;++l){

				if (Game.Snakes[i].parts[k][0]==Game.Stones.AllStones[l][0]&&
					Game.Snakes[i].parts[k][1]==Game.Stones.AllStones[l][1]){

					Game.Snakes[i]=new Snake(i);
				}
			}
		}
	}		
}
function Snake (num){

	this.toAdd = 0;
	if (num==0){

		this.headx = 0;
		this.heady = 3;
		this.der = "Down";

	}
	else{

		this.headx = 59;
		this.heady = 56;
		this.der = "Up";

	}
	this.parts = MakeParts(num);

}
function Game(){

	RedScore=RedScore+Game.Snakes[0].parts.length;
	BlueScore=BlueScore+Game.Snakes[1].parts.length;

	++Game.ThsFood.timer;

	if (Game.ThsFood.timer>=40){
		SpawnFood();
		Game.ThsFood.timer=0;
	}

	Move(0);
	Move(1);
	Hits();
	Draw();

};
function Draw(){

	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext('2d');

	ctx.font="20px Verdana";

	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.fillRect(0,0,600,600);

	ctx.fillStyle = 'rgb(50,0,0)';
	ctx.fillRect(0,0,100,600);	

	ctx.fillStyle = 'rgb(0,0,50)';
	ctx.fillRect(500,0,100,600);

	ctx.fillStyle = 'rgb(200,0,0)';

	for (var j=0;j<Game.Snakes.length;++j){

		if (j==1) ctx.fillStyle = 'rgb(0,0,200)';

		for (var i=0;i<Game.Snakes[j].parts.length;++i){

			ctx.fillRect((Game.Snakes[j].parts[i][0]*10)+1,(Game.Snakes[j].parts[i][1]*10)+1,8,8);

		}
	}

	ctx.fillStyle = 'rgb(0,255,0)';

	for (var i=0;i<Game.ThsFood.locations.length;++i){

		ctx.fillRect((Game.ThsFood.locations[i][0]*10)+1,(Game.ThsFood.locations[i][1]*10)+1,8,8);

	}


	ctx.fillStyle = 'rgb(100,105,100)';

	for (var j=0;j<Game.Stones.AllStones.length;++j){

		ctx.fillRect((Game.Stones.AllStones[j][0]*10),(Game.Stones.AllStones[j][1]*10),10,10);

	}

  	ctx.fillStyle = 'rgb(150,50,50)';
  	ctx.fillText(RedScore,25,25);


  	ctx.fillStyle = 'rgb(50,50,150)';
  	ctx.fillText(BlueScore,525,25);
	

}
