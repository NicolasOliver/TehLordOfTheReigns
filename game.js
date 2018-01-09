var cs = document.getElementById("cv");
var ctx = cs.getContext("2d");

// Ensemble des variables utiles
var ground = new Image();
ground.src="ground.png";
var goblin = new Image();
goblin.src="goblin.png";
soundManager.url='soundmanager2.swf';
soundManager.debugMode=false;
var tower = new Image();
tower.src="tower.png";
var zombies = new Array();
var creation;
var move;
var pause = false;
var life = 10;
var loose = false;

// Variables de coordonnées
var sx;
var sy;
var x;
var y;

// Fonction qui joue une musique au lancement de la page
var play = function () {
    soundManager.createSound('son','shallnotpass.wav');
    soundManager.play('son');
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

var perso = {
	grave: tower,
	img: goblin,
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
		this.y=this.y+5;
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
			perso.create();
			zombies.push(perso);
		}
		else 
		{
			var newperso=Object.create(perso);
			newperso.change();
			newperso.create();
			for(var i=0;i<zombies.length;i++)
			{
				zombies[i].create();
			}
			zombies.push(newperso);
		}
	},2000)
	move=setInterval(function () {
		if(life>0 && life <=10)
		{
			for(var i=0;i<zombies.length;i++)
			{
				zombies[i].move();
			}
		}
		else {
			clearInterval(creation);
			clearInterval(move);
			document.getElementById("loose").style.display = "block";
			loose=true;
		}
	},100) 
}

// Fonction qui permet de mettre le jeu en pause
function stop() {
	document.onkeydown = function(e) {
		if(e.key==="p")
		{
			if(pause==false && loose==false)
			{
				clearInterval(creation);
				clearInterval(move);
				pause=true;
				document.getElementById("pause").style.display = "block";
				document.getElementById("cv").style.webkitFilter = "blur(3px)"
			}
			else
			{
				document.getElementById("cv").style.webkitFilter = "blur(0px)"
				document.getElementById("pause").style.display = "none";
				AI();
				pause=false;
			}
		}
	}
}

// Fonction principale du jeu
function game()
{
	drawGround();
	play();
	document.onmousemove = follow;
	stop();
	AI();
}

window.onload = game;