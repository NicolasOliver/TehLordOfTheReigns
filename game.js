var cs = document.getElementById("cv");
var ctx = cs.getContext("2d");

// Ensemble des variables utiles
var ground = new Image();
ground.src="ground.png";
var goblin = new Image();
goblin.src="goblin.png";
soundManager.url='soundmanager2.swf';
soundManager.debugMode=false;

// Variables de coordonnées
var sx = 0;
var sy = 0;
var x = Math.round(Math.random()*601);
var y = Math.round(Math.random()*101);

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

// Fonction qui cadence le déplacement des zombies vers le bas
function autodown()
{
	setInterval(function () {
		sx=sx+32;
		if(sx==96)
		{
			sx=0;
		}
		y=y+5;
		if(y>768)
		{
			ctx.clearRect(0,0,600,800);
			drawGround();
		}
		
		else
		{
			ctx.clearRect(0,0,600,800);
			drawGround();
			drawGoblin();
		}
	},100)
}

// Fonction principale du jeu
function game()
{
	drawGround();
	play();
	document.onmousemove = follow;
	autodown();
}

window.onload = game;

