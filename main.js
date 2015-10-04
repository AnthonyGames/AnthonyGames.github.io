var canvasWidth=10;
var canvasHeight=10;
var img=new Image();

var glowImg=new Image();

var boxSize=105;

var squareData=new Array();

var cursorX=1;
var cursorY=1;

function init (){
	canvas = document.getElementById("canvas");
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;
	
	if(typeof game_loop != "undefined") clearInterval(game_loop);
	game_loop = setInterval(update, 60);
	
	document.onmousemove = function(e){
	    cursorX = e.pageX;
	    cursorY = e.pageY;
	}
	
	document.onmousedown = function(e){
		for (var i=0;i<squareData.length;++i){
			
			var x=(canvasWidth/2)-(boxSize/2)-(squareData[i].x*boxSize);
			var y=(canvasHeight/2)-(boxSize/2)-(squareData[i].y*boxSize);
			
			if (cursorX>x&&cursorX<x+boxSize&&cursorY>y&&cursorY<y+boxSize){
				location.assign(squareData[i].link);
			}
		}
	}
	

	
	img.src='images/StaryBackground.png';
	glowImg.src='images/glow.png';
	
	squareData.push(new game("Snake Game",'images/snake.png',"browser Games/Snake Game/game.html",0,0));
	squareData.push(new game("Color Game",'images/color.png',"browser Games/Color Game/game.html",1,0));
	squareData.push(new game("Swaper Game",'images/swaper.png',"browser Games/Swaper Game/game.html",0,1));
}

function game (name,img,link,x,y){
	
	this.name=name;
	
	this.img=new Image();
	this.img.src=img;
	this.link=link;
	
	this.x=x;
	this.y=y;
	
	this.tint=true;
	this.size=50;
	
}

function update(){
	
	var done=false;
	
	for (var i=0;i<squareData.length;++i){
		
		squareData[i].tint=false;
		
		var x=(canvasWidth/2)-(boxSize/2)-(squareData[i].x*boxSize);
		var y=(canvasHeight/2)-(boxSize/2)-(squareData[i].y*boxSize);
		
		
		if (cursorX>x&&cursorX<x+boxSize&&cursorY>y&&cursorY<y+boxSize){
			done=true;
			++squareData[i].size;
			squareData[i].tint=true;
		}
	}
	
	if (done==false){
		for (var i=0;i<squareData.length;++i){
			if (squareData[i].size>50) --squareData[i].size;
			if (squareData[i].size<50) ++squareData[i].size;
		}
	}
	
	else{
		for (var i=0;i<squareData.length;++i){
			if (squareData[i].tint==false){
				--squareData[i].size;
			}
		}
	}
	
	for (var i=0;i<squareData.length;++i){
		if (squareData[i].size>=60) squareData[i].size=60;
		if (squareData[i].size<=40) squareData[i].size=40;
	}
	
	paint();
	
}

function drawPolygon (ctx,img,text,size, x, y){
	
	var sizeY=20;
	var sizeX=20;
	
	var pattern = ctx.createPattern(img, "repeat");
	ctx.fillStyle = pattern;
	
	ctx.beginPath();
	ctx.arc(x+40,y+40,size,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
	
	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.fillText(text,x,y+sizeY*4);
}

function paint(){
	
	var gameCanvas = document.getElementById("canvas");
	var ctx = gameCanvas.getContext('2d');

	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.font = "15px Arial";
	
	ctx.drawImage(img,0,0,canvasWidth,canvasHeight);
	
	for (var i=0;i<squareData.length;++i){

		var x=(canvasWidth/2)-(boxSize/2)-(squareData[i].x*boxSize);
		var y=(canvasHeight/2)-(boxSize/2)-(squareData[i].y*boxSize);
		
		if (squareData[i].tint){
			var effect=squareData[i].size;
			var newx=x+40;
			var newy=y+40;
			
			ctx.drawImage(glowImg,newx-effect*1.3,newy-effect*1.3,effect*2.6,effect*2.6);
		}
		
		drawPolygon(ctx,squareData[i].img,squareData[i].name,squareData[i].size,x,y);
		
		
	}
}
