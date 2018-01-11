var cs = document.getElementById("cv");
var ctx = cs.getContext("2d");

// Ensemble des variables utiles
var ground = new Image();
ground.src="ground.png";
var imgoblin = new Image();
imgoblin.src="goblin.png";
var imsauron = new Image();
imsauron.src="Sauron.png";
var imbalrog= new Image();
imbalrog.src="balrog.png";
var imnazgul = new Image();
imnazgul.src="Nazgul.png";
soundManager.url='soundmanager2.swf';
soundManager.debugMode=false;
var tower = new Image();
tower.src="tower.png";
var zombies = new Array();
var creation;
var move;
var pause = false;
var life = 1000;
var loose = false;
var win = false;
var point = 0;
var timer=" 3:20";
var compt = 0;
var time;
var createsauron=false;
var choice;
var sec100=false;
var notsauron=false;
var music;
var music2=true;

// Variables de coordonnées
var sx;
var sy;
var x;
var y;

// Fonction qui gère les musiques tout au long de la partie
var play = function () {
	if(loose == false && win == false && createsauron == false && notsauron == false) {
		soundManager.createSound('son','shallnotpass.wav', function () { soundManager.destroySound('son');});
    	soundManager.play('son');
    	notsauron = true;
    	music = true;
	}
	if(pause == true) {
		music=false;
		soundManager.pauseAll();
	}
	if(pause == false) {
		soundManager.resumeAll();
	}
	if(loose == true && pause==false) {
		notsauron=false;
		createsauron=false;
		soundManager.stop('son6');
		soundManager.createSound('son2','fly.wav', function () { soundManager.destroySound('son2'); });
    	soundManager.play('son2');
    	soundManager.createSound('son3','pippin.mp3', function () { soundManager.destroySound('son3'); })
    	soundManager.play('son3');
	}
	if(win == true && pause==false) {
		notsauron=false;
		createsauron=false;
		soundManager.createSound('son4','thefellowship.mp3', function () { soundManager.destroySound('son4'); });
    	soundManager.play('son4');
	}
	if(createsauron == true && pause==false && music2 == true) {
		notsauron=false;
		soundManager.createSound('son5','Sauron.mp3', function () { soundManager.destroySound('son5'); });
    	soundManager.play('son5');
	}
	if(notsauron == true && win == false && loose == false && pause==false && music == true) {
		soundManager.createSound('son6','Isengard.mp3', function () { soundManager.destroySound('son6'); });
    	soundManager.play('son6');
	}

}

// Fonctions qui gère le timer du jeu
function startTimer() {
  var presentTime = timer;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}

  timer = m+":"+s;
  compt++;
  time=setTimeout(startTimer, 1000);

}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

// Fonction qui dessine le plateau de jeu
var drawGround = function ()
{
	for(let j=0;j<8;j++)
    {
        for(let i=0;i<6;i++)
        {
            ctx.drawImage(ground,0,0,256,256,100*i,100*j,100,100);
        }
    }
    ctx.fillStyle="white";
    ctx.font="15px Georgia";
    ctx.fillText("'p' : pause",5,15);
    ctx.fillText("Life :"+life,270,15);
    ctx.fillText("Timer :"+timer,500,15);
    ctx.fillText("Point :"+point,535,785);
}

// Fonction pour faire suivre un élement au déplacement de la souris
function follow(evenement)
{
    if(navigator.appName=="Microsoft Internet Explorer")
    {
            var x = event.x+document.body.scrollLeft;
    }
    else
    {
            var x =  evenement.pageX;
    }
    if(x>580 && x<1155)
    {
    	document.getElementById("gandalf").style.left = (x+1)+'px';
    }
}

var goblin = {
	grave: tower,
	img: imgoblin,
	name:"goblin",
	life:1,
	x: Math.round(Math.random()*601),
	y: Math.round(Math.random()*101),
	sx: 0,
	sy: 0,
	change: function() {
		this.x=Math.round(Math.random()*601);
		this.y=Math.round(Math.random()*101);
	},
	tower: function() {
		ctx.drawImage(this.grave,0,0,244,563,this.x,this.y-20,32,32);
	},
	create: function() {
		ctx.drawImage(this.img,this.sx,this.sy,32,32,this.x,this.y,32,32);
	},
	move: function() {
		this.sx=this.sx+32;
		if(this.sx==96)
		{
			this.sx=0;
		}
		this.y=this.y+10;
		drawGround();
		for(var i=0;i<zombies.length;i++)
		{
			if(zombies[i].y<768)
			{
				zombies[i].create();
			}
			else
			{
				zombies.splice(i,1);
				life=life-1;
			}
		}
	}
}

var sauron = {
	grave: tower,
	img: imsauron,
	name: "sauron",
	life:25,
	x: Math.round(Math.random()*601),
	y: Math.round(Math.random()*101),
	sx: 0,
	sy: 0,
	change: function() {
		this.x=Math.round(Math.random()*601);
		this.y=Math.round(Math.random()*101);
	},
	tower: function() {
		ctx.drawImage(this.grave,0,0,244,563,this.x,this.y-20,32,32);
	},
	create: function() {
		ctx.drawImage(this.img,this.sx,this.sy,127,256,this.x,this.y,50,100);
	},
	move: function() {
		this.sx=this.sx+127;
		if(this.sx==508)
		{
			this.sx=0;
		}
		this.y=this.y+2;
		drawGround();
		for(var i=0;i<zombies.length;i++)
		{
			if(zombies[i].y<768)
			{
				zombies[i].create();
			}
			else
			{
				zombies.splice(i,1);
				life=life-1;
			}
		}
	}
}

var balrog = {
	grave: tower,
	img: imbalrog,
	name:"balrog",
	life:3,
	x: Math.round(Math.random()*601),
	y: Math.round(Math.random()*101),
	sx: 0,
	sy: 0,
	change: function() {
		this.x=Math.round(Math.random()*601);
		this.y=Math.round(Math.random()*101);
	},
	tower: function() {
		ctx.drawImage(this.grave,0,0,244,563,this.x,this.y-20,32,32);
	},
	create: function() {
		ctx.drawImage(this.img,this.sx,this.sy,129,108,this.x,this.y,100,100);
	},
	move: function() {
		this.sx=this.sx+129;
		if(this.sx==516)
		{
			this.sx=0;
		}
		this.y=this.y+7;
		drawGround();
		for(var i=0;i<zombies.length;i++)
		{
			if(zombies[i].y<768)
			{
				zombies[i].create();
			}
			else
			{
				zombies.splice(i,1);
				life=life-1;
			}
		}
	}
}

var nazgul = {
	grave: tower,
	img: imnazgul,
	name:"nazgul",
	life:2,
	x: Math.round(Math.random()*601),
	y: Math.round(Math.random()*101),
	sx: 0,
	sy: 0,
	change: function() {
		this.x=Math.round(Math.random()*601);
		this.y=Math.round(Math.random()*101);
	},
	tower: function() {
		ctx.drawImage(this.grave,0,0,244,563,this.x,this.y-20,32,32);
	},
	create: function() {
		ctx.drawImage(this.img,this.sx,this.sy,160,195,this.x,this.y,100,100);
	},
	move: function() {
		this.sx=this.sx+160;
		if(this.sx==480)
		{
			this.sx=0;
		}
		this.y=this.y+4;
		drawGround();
		for(var i=0;i<zombies.length;i++)
		{
			if(zombies[i].y<768)
			{
				zombies[i].create();
			}
			else
			{
				zombies.splice(i,1);
				life=life-1;
			}
		}
	}
}

// Fonction qui gère l'intelligence artificielle du jeu
function AI()
{
	creation=setInterval(function() {
		if(zombies.length==0)
		{
			goblin.create();
			zombies.push(goblin);
		}
		else
		{
			if(compt<=30) {
				var newgoblin=Object.create(goblin);
				newgoblin.change();
				zombies.push(newgoblin);
			}


      		if(compt>=140 && createsauron==false) {
      			var newsauron=Object.create(sauron);
				newsauron.change();
				zombies.push(newsauron);
				createsauron=true;
				play();
				music2=false;
			}

			if(compt>=100) {
				choice=Math.round(Math.random()*6);
				switch(choice) {
					case 0:
						var newgoblin=Object.create(goblin);
						newgoblin.change();
						zombies.push(newgoblin);
						break;
					case 1:
						var newnazgul=Object.create(nazgul);
						newnazgul.change();
						zombies.push(newnazgul);
						break;
					case 2:
						var newgoblin=Object.create(goblin);
						newgoblin.change();
						zombies.push(newgoblin);
						var newnazgul=Object.create(nazgul);
						newnazgul.change();
						zombies.push(newnazgul);
						break;
					case 3:
						var newbalrog=Object.create(balrog);
						newbalrog.change();
						zombies.push(newbalrog);
						break;
					case 4:
						var newnazgul=Object.create(nazgul);
						newnazgul.change();
						zombies.push(newnazgul);
						var newbalrog=Object.create(balrog);
						newbalrog.change();
						zombies.push(newbalrog);
						break;
					case 5:
						var newgoblin=Object.create(goblin);
						newgoblin.change();
						zombies.push(newgoblin);
						var newbalrog=Object.create(balrog);
						newbalrog.change();
						zombies.push(newbalrog);
						break;
					case 6:
						var newgoblin=Object.create(goblin);
						newgoblin.change();
						zombies.push(newgoblin);
						var newbalrog=Object.create(balrog);
						newbalrog.change();
						zombies.push(newbalrog);
						var newnazgul=Object.create(nazgul);
						newnazgul.change();
						zombies.push(newnazgul);
						break;
				}
			}

			if(compt>=30 && sec100==false) {
				if(compt==100) { sec100=true; }
				choice=Math.round(Math.random()*2);
				switch(choice) {
					case 0:
						var newgoblin=Object.create(goblin);
						newgoblin.change();
						zombies.push(newgoblin);
						break;
					case 1:
						var newnazgul=Object.create(nazgul);
						newnazgul.change();
						zombies.push(newnazgul);
						break;
					case 2:
						var newgoblin=Object.create(goblin);
						newgoblin.change();
						zombies.push(newgoblin);
						var newnazgul=Object.create(nazgul);
						newnazgul.change();
						zombies.push(newnazgul);
						break;
				}
			}

			for(var i=0;i<zombies.length;i++)
			{
				zombies[i].create();
			}
		}
	},2000)
	move=setInterval(function () {
		if(compt != 200) {
			if(life>0 && life <=1000)
			{
				for(var i=0;i<zombies.length;i++)
				{
					zombies[i].move();
				}
			}
			else {
				clearInterval(creation);
				clearInterval(move);
				document.getElementById("cv").style.webkitFilter = "blur(3px)"
				document.getElementById("loose").style.display = "block";
				loose=true;
				document.onkeydown = function(e) {
					if(e.key === "r")
					{
						window.location.reload();
					}
				}
				play();
			}
		}
		else {
		  	clearInterval(creation);
			clearInterval(move);
			win=true;
			document.getElementById("won").style.display = "block";
			document.getElementById("cv").style.webkitFilter = "blur(3px)";
			document.onkeydown = function(e) {
				if(e.key === "r")
				{
					window.location.reload();
				}
			}
			play();
		}
	},100)
}

// Fonction qui permet de mettre le jeu en pause
function stop() {
	document.onkeydown = function(e) {
		if(e.key==="p")
		{
			if(pause==false && loose==false && win==false)
			{
				clearInterval(creation);
				clearInterval(move);
				clearTimeout(time);
				pause=true;
				play();
				document.getElementById("pause").style.display = "block";
				document.getElementById("cv").style.webkitFilter = "blur(3px)"
			}
			else
			{
				document.getElementById("cv").style.webkitFilter = "blur(0px)"
				document.getElementById("pause").style.display = "none";
				AI();
				time=setTimeout(startTimer,1000);
				pause=false;
				play();
			}
		}
	}
}


//Click sur les zombies
function onclick_page(event)
{
  // Coordonnées du click sur canvas
  var rect = cs.getBoundingClientRect();
  var cx = event.clientX - rect.left;
  var cy = event.clientY - rect.top;

  for (var i=0;i<zombies.length;i++){
    var zone;
    if (zombies[i].name=="balrog" && cx>(zombies[i].x) && cx<(zombies[i].x + 80) && cy>(zombies[i].y) && cy<(zombies[i].y + 80) ) {
      zone = true;
			zombies[i].life--;
			if (zombies[i].life == 0){
				console.log("Le balrog est mort!");
			}
			break;
    }
		else if(zombies[i].name=="nazgul" && cx>(zombies[i].x) && cx<(zombies[i].x + 80) && cy>(zombies[i].y) && cy<(zombies[i].y + 100) ) {
      zone = true;
			zombies[i].life--;
			if (zombies[i].life == 0){
				console.log("Le nazgul est mort!");
			}
			break;
    }
		else if(zombies[i].name=="sauron" && cx>(zombies[i].x) && cx<(zombies[i].x + 80) && cy>(zombies[i].y) && cy<(zombies[i].y + 100) ) {
      zone = true;
			break;
    }else if(zombies[i].name=="goblin" && cx>(zombies[i].x) && cx<(zombies[i].x + 50) && cy>(zombies[i].y) && cy<(zombies[i].y + 50) ) {
      zone = true;
			zombies[i].life--;
			if (zombies[i].life == 0){
				console.log("Le goblin est mort!");
			}
			break;
    }
    else {
      zone = false;
    }
  }
  if(zone == true) {
    console.log("Sur un zombie");
  }
  else{
    console.log("en dehors");
  }

}

// Fonction principale du jeu
function game()
{
	drawGround();
	startTimer();
	play();
	document.onmousemove = follow;
	stop();
	AI();
	onclick_page();
}

window.onload = game;
