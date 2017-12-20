var cs = document.getElementById("cv");
var ctx = cs.getContext("2d");

var play = function () {
    soundManager.createSound('son','shallnotpass.wav');
    soundManager.play('son');
}

var drawGround = function ()
{
	for(let j=0;j<7;j++)
    {
        for(let i=0;i<6;i++)
        {
            ctx.drawImage(ground,0,0,256,256,100*i,100*j,100,100);
        }
    }
}

var drawZomb = function () 
{
	context.drawImage(zombies,sx,sy,32,32,x,y,64,64);
}
var ground = new Image();
ground.src="ground.png";
ground.onload = drawGround;

soundManager.url='soundmanager2.swf';
soundManager.debugMode=false;
soundManager.onload = play;


