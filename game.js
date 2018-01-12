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
var BarreVerte = new Image();
BarreVerte.src="BarreVerte.png";
var BarreOrangeNazgul = new Image();
BarreOrangeNazgul.src="BarreOrangeNazgul.png";
var BarreVerteBalrog = new Image();
BarreVerteBalrog.src="BarreVerteBalrog.png";
var BarreOrangeBalrog = new Image();
BarreOrangeBalrog.src="BarreOrangeBalrog.png";
var BarreOrangeSauron1 = new Image();
BarreOrangeSauron1.src="BarreOrangeSauron1.png";
var BarreOrangeSauron2 = new Image();
BarreOrangeSauron2.src="BarreOrangeSauron2.png";
var BarreOrangeSauron3 = new Image();
BarreOrangeSauron3.src="BarreOrangeSauron3.png";
var BarreOrangeSauron4 = new Image();
BarreOrangeSauron4.src="BarreOrangeSauron4.png";
var BarreOrangeSauron5 = new Image();
BarreOrangeSauron5.src="BarreOrangeSauron5.png";
var BarreOrangeSauron6 = new Image();
BarreOrangeSauron6.src="BarreOrangeSauron6.png";
var BarreOrangeSauron7 = new Image();
BarreOrangeSauron7.src="BarreOrangeSauron7.png";
var BarreOrangeSauron8 = new Image();
BarreOrangeSauron8.src="BarreOrangeSauron8.png";
var BarreOrangeSauron9 = new Image();
BarreOrangeSauron9.src="BarreOrangeSauron9.png";
var BarreOrangeSauron10 = new Image();
BarreOrangeSauron10.src="BarreOrangeSauron10.png";
var BarreOrangeSauron11 = new Image();
BarreOrangeSauron11.src="BarreOrangeSauron11.png";
var BarreOrangeSauron12 = new Image();
BarreOrangeSauron12.src="BarreOrangeSauron12.png";
var BarreOrangeSauron13 = new Image();
BarreOrangeSauron13.src="BarreOrangeSauron13.png";
var BarreRougeSauron1 = new Image();
BarreRougeSauron1.src="BarreRougeSauron1.png";
var BarreRougeSauron2 = new Image();
BarreRougeSauron2.src="BarreRougeSauron2.png";
var BarreRougeSauron3 = new Image();
BarreRougeSauron3.src="BarreRougeSauron3.png";
var BarreRougeSauron4 = new Image();
BarreRougeSauron4.src="BarreRougeSauron4.png";
var BarreRougeSauron5 = new Image();
BarreRougeSauron5.src="BarreRougeSauron5.png";
var BarreRougeSauron6 = new Image();
BarreRougeSauron6.src="BarreRougeSauron6.png";
var BarreRougeSauron7 = new Image();
BarreRougeSauron7.src="BarreRougeSauron7.png";
var BarreRougeSauron8 = new Image();
BarreRougeSauron8.src="BarreRougeSauron8.png";
var BarreRougeSauron9 = new Image();
BarreRougeSauron9.src="BarreRougeSauron9.png";
var BarreRougeSauron10 = new Image();
BarreRougeSauron10.src="BarreRougeSauron10.png";
var BarreRougeSauron11 = new Image();
BarreRougeSauron11.src="BarreRougeSauron11.png";
soundManager.url='soundmanager2.swf';
soundManager.debugMode=false;
var towerIsengard = new Image();
towerIsengard.src="towerIsengard.png";
var towerSauron = new Image();
towerSauron.src="towerSauron.png";
var zombies = new Array();
var creation;
var move;
var pause = false;
var life = 10;
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
		soundManager.createSound('son7','elevator.mp3', function () { soundManager.destroySound('son7');});
    	soundManager.play('son7');
	}
	if(pause == false) {
		soundManager.stop('son7');
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
    ctx.fillText("Point :"+point,515,785);
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
	time: 0,
	born: false,
	grave: towerIsengard,
	img: imgoblin,
	name:"goblin",
	lifegoblin:1,
	lifeBarGobelin:Array(BarreVerte),
	tx: 0,
	ty: 0,
	x: Math.round(Math.random()*569),
	y: Math.round(Math.random()*101),
	sx: 0,
	sy: 0,
	change: function() {
		this.x=Math.round(Math.random()*569);
		this.y=Math.round(Math.random()*101);
		this.tx=0;
		this.ty=0;
		this.born=false;
		this.time=0;
	},
	create: function() {
		if(this.born==false) {
			this.time++;
			ctx.drawImage(this.grave,0,0,230,307,this.x,this.y-70,70,90);
			this.tx=this.x;
			this.ty=this.y-70;
		}
		if(this.born==true && this.time!=100) {
			this.time++;
			ctx.drawImage(this.grave,0,0,230,307,this.tx,this.ty,70,90);
		}
		ctx.drawImage(this.lifeBarGobelin[0],0,0,482,195,this.x-7,this.y-10,50,20);
		ctx.drawImage(this.img,this.sx,this.sy,32,32,this.x,this.y,32,32);
		this.born=true;
	},
	move: function() {
		this.sx=this.sx+32;
		if(this.sx==96)
		{
			this.sx=0;
		}
		this.y=this.y+8;
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
	time: 0,
	born: false,
	grave: towerSauron,
	img: imsauron,
	name: "sauron",
	lifesauron:25,
	lifeBarSauron:Array(BarreVerte,BarreOrangeSauron1,BarreOrangeSauron2,BarreOrangeSauron3,BarreOrangeSauron4,
		BarreOrangeSauron5,BarreOrangeSauron6,BarreOrangeSauron7,BarreOrangeSauron8,BarreOrangeSauron9,BarreOrangeSauron10,
		BarreOrangeSauron11,BarreOrangeSauron12,BarreOrangeSauron13,BarreRougeSauron1,BarreRougeSauron2,BarreRougeSauron3,
		BarreRougeSauron4,BarreRougeSauron5,BarreRougeSauron6,BarreRougeSauron7,BarreRougeSauron8,BarreRougeSauron9,BarreRougeSauron10,BarreRougeSauron11),
	tx: 0,
	ty: 0,
	x: Math.round(Math.random()*551),
	y: Math.round(Math.random()*101),
	sx: 0,
	sy: 0,
	create: function() {
		if(this.born==false) {
			this.time++;
			ctx.drawImage(this.grave,0,0,244,563,this.x,this.y-70,50,90);
			this.tx=this.x;
			this.ty=this.y-70;
		}
		if(this.born==true && this.time!=100) {
			this.time++;
			ctx.drawImage(this.grave,0,0,244,563,this.tx,this.ty,50,90);
		}
		if(this.lifesauron == 25){
			ctx.drawImage(this.lifeBarSauron[0],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 24){
			ctx.drawImage(this.lifeBarSauron[1],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 23){
			ctx.drawImage(this.lifeBarSauron[2],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 22){
			ctx.drawImage(this.lifeBarSauron[3],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 21){
			ctx.drawImage(this.lifeBarSauron[4],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 20){
			ctx.drawImage(this.lifeBarSauron[5],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 19){
			ctx.drawImage(this.lifeBarSauron[6],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 18){
			ctx.drawImage(this.lifeBarSauron[7],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 17){
			ctx.drawImage(this.lifeBarSauron[8],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 16){
			ctx.drawImage(this.lifeBarSauron[9],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 15){
			ctx.drawImage(this.lifeBarSauron[10],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 14){
			ctx.drawImage(this.lifeBarSauron[11],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 13){
			ctx.drawImage(this.lifeBarSauron[12],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 12){
			ctx.drawImage(this.lifeBarSauron[13],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 11){
			ctx.drawImage(this.lifeBarSauron[14],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 10){
			ctx.drawImage(this.lifeBarSauron[15],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 9){
			ctx.drawImage(this.lifeBarSauron[16],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 8){
			ctx.drawImage(this.lifeBarSauron[17],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 7){
			ctx.drawImage(this.lifeBarSauron[18],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 6){
			ctx.drawImage(this.lifeBarSauron[19],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 5){
			ctx.drawImage(this.lifeBarSauron[20],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 4){
			ctx.drawImage(this.lifeBarSauron[21],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 3){
			ctx.drawImage(this.lifeBarSauron[22],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 2){
			ctx.drawImage(this.lifeBarSauron[23],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		if(this.lifesauron == 1){
			ctx.drawImage(this.lifeBarSauron[24],0,0,482,195,this.x+5,this.y-2,70,20);
		}
		ctx.drawImage(this.img,this.sx,this.sy,127,256,this.x,this.y,80,150);
		this.born=true;
	},
	move: function() {
		this.sx=this.sx+127;
		if(this.sx==508)
		{
			this.sx=0;
		}
		this.y=this.y+3;
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
	time: 0,
	born: false,
	grave: towerIsengard,
	img: imbalrog,
	name:"balrog",
	lifebalrog:3,
	lifeBarBalrog:Array(BarreVerte,BarreVerteBalrog,BarreOrangeBalrog),
	tx: 0,
	ty: 0,
	x: Math.round(Math.random()*531),
	y: Math.round(Math.random()*101),
	sx: 0,
	sy: 0,
	change: function() {
		this.x=Math.round(Math.random()*531);
		this.y=Math.round(Math.random()*101);
		this.tx=0;
		this.ty=0;
		this.born=false;
		this.time=0;
	},
	create: function() {
		if(this.born==false) {
			this.time++;
			ctx.drawImage(this.grave,0,0,230,307,this.x,this.y-70,70,90);
			this.tx=this.x;
			this.ty=this.y-70;
		}
		if(this.born==true && this.time!=100) {
			this.time++;
			ctx.drawImage(this.grave,0,0,230,307,this.tx,this.ty,70,90);
		}
		if(this.lifebalrog == 3){
			ctx.drawImage(this.lifeBarBalrog[0],0,0,482,195,this.x+15,this.y-2,70,20);
		}
		if(this.lifebalrog == 2){
			ctx.drawImage(this.lifeBarBalrog[1],0,0,482,195,this.x+15,this.y-2,70,20);
		}
		if (this.lifebalrog == 1){
			ctx.drawImage(this.lifeBarBalrog[2],0,0,482,195,this.x+15,this.y-2,70,20);
		}
		ctx.drawImage(this.img,this.sx,this.sy,129,108,this.x,this.y,100,100);
		this.born=true;
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
	time: 0,
	born: false,
	grave: towerIsengard,
	img: imnazgul,
	name:"nazgul",
	lifenazgul:2,
	lifeBarNazgul:Array(BarreVerte,BarreOrangeNazgul),
	tx: 0,
	ty: 0,
	x: Math.round(Math.random()*531),
	y: Math.round(Math.random()*101),
	sx: 0,
	sy: 0,
	change: function() {
		this.x=Math.round(Math.random()*531);
		this.y=Math.round(Math.random()*101);
		this.tx=0;
		this.ty=0;
		this.born=false;
		this.time=0;
	},
	create: function() {
		if(this.born==false) {
			this.time++;
			ctx.drawImage(this.grave,0,0,230,307,this.x,this.y-70,70,90);
			this.tx=this.x;
			this.ty=this.y-70;
		}
		if(this.born==true && this.time!=100) {
			this.time++;
			ctx.drawImage(this.grave,0,0,230,307,this.tx,this.ty,70,90);
		}
		if(this.lifenazgul == 2){
			ctx.drawImage(this.lifeBarNazgul[0],0,0,482,195,this.x+5,this.y-5,70,20);
		}
		else {
			ctx.drawImage(this.lifeBarNazgul[1],0,0,482,195,this.x+5,this.y-5,70,20);
		}
		ctx.drawImage(this.img,this.sx,this.sy,160,195,this.x,this.y,100,100);
		this.born=true;
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
  var i=0;

  if(pause == false) {
  	while (true)
  	{
	    if (zombies[i].name=="balrog" && cx>(zombies[i].x) && cx<(zombies[i].x + 80) && cy>(zombies[i].y) && cy<(zombies[i].y + 80)) 
	    {
			zombies[i].lifebalrog--;
			if (zombies[i].lifebalrog == 0){
				zombies.splice(i,1);
				point+=5;
				break;
			}
	    }
		if(zombies[i].name=="nazgul" && cx>(zombies[i].x) && cx<(zombies[i].x + 80) && cy>(zombies[i].y) && cy<(zombies[i].y + 100)) 
		{
			zombies[i].lifenazgul--;
			if (zombies[i].lifenazgul == 0){
				zombies.splice(i,1);
				point+=3;
				break;
			}
	    }
		if(zombies[i].name=="sauron" && cx>(zombies[i].x) && cx<(zombies[i].x + 60) && cy>(zombies[i].y) && cy<(zombies[i].y + 150)) 
		{
			zombies[i].lifesauron--;
			if (zombies[i].lifesauron == 0){
				zombies.splice(i,1);
				point+=30;
				break;
			}
		}
		if(zombies[i].name=="goblin" && cx>(zombies[i].x) && cx<(zombies[i].x + 50) && cy>(zombies[i].y) && cy<(zombies[i].y + 50)) 
		{
			zombies[i].lifegoblin--;
			if (zombies[i].lifegoblin == 0){
				zombies.splice(i,1);
				point++;
				break;
			}
	    }
		i++
  	}
  }
}

// Fonction principale du jeu
function game()
{
	drawGround();
	startTimer();
	stop();
	AI();
	play();
	document.onmousemove = follow;
	onclick_page();
}

window.onload = game;
