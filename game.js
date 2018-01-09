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
var life = 10;
var loose = false;
//var win = false;

// Variables de coordonnées
var sx;
var sy;
var x;
var y;

// Fonction qui joue une musique au lancement de la page
var play = function () {
	if(loose == false) {
		soundManager.createSound('son','shallnotpass.wav', function () { soundManager.destroySound('son'); });
    	soundManager.play('son');
	}
	if(loose == true) {
		soundManager.createSound('son2','fly.wav', function () { soundManager.destroySound('son2'); });
    	soundManager.play('son2');
	}
    
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
    ctx.fillText("Life :"+life,250,15);
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
			balrog.create();
			goblin.create();
      		sauron.create();
      		nazgul.create();
      		zombies.push(nazgul);
      		zombies.push(balrog);
			zombies.push(goblin);
      		zombies.push(sauron);
		}
		else
		{
			var newgoblin=Object.create(goblin);
			newgoblin.change();
			newgoblin.create();

      		var newsauron=Object.create(sauron);
			newsauron.change();
			newsauron.create();

			var newbalrog=Object.create(balrog);
			newbalrog.change();
			newbalrog.create();

			var newnazgul=Object.create(nazgul);
			newnazgul.change();
			newnazgul.create();

			for(var i=0;i<zombies.length;i++)
			{
				zombies[i].create();
			}
			zombies.push(newgoblin);
      		zombies.push(newsauron);
      		zombies.push(newbalrog);
      		zombies.push(newnazgul);
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
