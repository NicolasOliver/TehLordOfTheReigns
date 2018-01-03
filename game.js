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

// Fonction qui dessine les zombies de premier niveau
var drawGoblin = function ()
{
	ctx.drawImage(goblin,sx,sy,32,32,x,y,32,32);
}

// Fonction qui dessine les tombes 
var drawTower = function()
{
	ctx.drawImage(tower,0,0,244,563,x,y-30,32,32);
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
	img: goblin,
	x: Math.round(Math.random()*601),
	y: Math.round(Math.random()*101),
	sx: 0,
	sy: 0,
	change: function() {
		this.x=Math.round(Math.random()*601);
		this.y=Math.round(Math.random()*101);
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
		if(this.y>768)
		{
			drawGround();
		}
		else
		{
			drawGround();
			for(var i=0;i<zombies.length;i++)
			{
				zombies[i].create();
			}
		}
	}
}


// Fonction qui gère l'intelligence artificielle du jeu
function AI()
{
	setInterval(function () {
		if(zombies.length==0)
		{
			perso.create();
			zombies.push(perso);
		}
		else 
		{
			var newperso=Object.create(perso);
			newperso.change();
			zombies.push(newperso);
			for(var i=0;i<zombies.length;i++)
			{
				zombies[i].create();
				
			}
		}
	},2000)
	setInterval(function () {
		for(var i=0;i<zombies.length;i++)
		{
			zombies[i].move();
		}
	},100)	
}


// Fonction principale du jeu
function game()
{
	drawGround();
	//play();
	document.onmousemove = follow;
	AI();
}

window.onload = game;

