var r,g,b,x,y;
var offset=10;
var color;
var score=1000;
var best=9001;
var count=0;
var differ;
function Setup() {

	count =0;
	score=1000;
	offset=100;
	var gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.width = 600;
    gameCanvas.height = 600;

    document.getElementById("gameCanvas").addEventListener("click",click);

    loadLvl();

	if(typeof game_loop != "undefined") clearInterval(game_loop);

		game_loop = setInterval(update, 60);



}

function click(e){

	var X=e.offsetX;
	var Y=e.offsetY;

	if (X>((x*60)-10)&&Y>((y*60)-10)&&X<(((x+1)*60)+10)&&Y<(((y+1)*60)+10)){

		offset=offset-1;

		if (offset<=0){
			offset=1;
		}

		++count;
		if (count>=30){

			if (score<=best){best=score;}
			
			Setup();

		}

		loadLvl();

	}
	else{

		Setup();

	}

}

function loadLvl(){

	r=Math.floor((Math.random()*200)+22);
	g=Math.floor((Math.random()*200)+22);
	b=Math.floor((Math.random()*200)+22);

	color='rgb('+r+','+g+','+b+')';

	if (g>=127)
		g=g-offset;
	else
		g=g+offset;

	differ='rgb('+r+','+g+','+b+')';

	x=Math.floor(parseInt(Math.random()*10));
	y=Math.floor(parseInt(Math.random()*10));

	score=score+1;

}
function paint(){

	--score;

	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext('2d');

	ctx.fillStyle = 'rgb(255,255,255)';

	ctx.fillRect(0,0,600,600);

	ctx.font="20px Verdana";

    var curser = new Image();
    
  	ctx.fillStyle = color;

  	
    var i=0;
	for (;i<10;++i){

		var j=0;
		for (;j<10;++j){

			ctx.fillRect(j*60,i*60,57,57)

		}
	}

	ctx.fillStyle = differ;

	ctx.fillRect(x*60,y*60,57,57)
	ctx.fillStyle ='rgb(0,0,0)';
	ctx.fillText("Get to 30 as fast as possible",0,20);
	ctx.fillText("Current score:"+score,0,550);
	ctx.fillText("Best score:"+best,0,590);
	ctx.fillText("#"+count,550,20);


}

function update(){
	paint();

}