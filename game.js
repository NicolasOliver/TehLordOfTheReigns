var cs = document.getElementById("cv");
var ctx = cs.getContext("2d");

var play = function () {
    soundManager.createSound('son','shallnotpass.wav');
    soundManager.play('son');
}

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

var ground = new Image();
ground.src="ground.png";
ground.onload = drawGround;

soundManager.url='soundmanager2.swf';
soundManager.debugMode=false;
soundManager.onload = play;


document.onmousemove = follow;
