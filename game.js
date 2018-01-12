//\\ IL FAUT LANCER LE JEU AVEC CHROME POUR UN RENDU OPTIMAL \\//

/////////////////////////////////////////////////// On récupère le contenu du canvas ///////////////////////////////////////////////////

var cs = document.getElementById("cv");
var ctx = cs.getContext("2d");

/////////////////////////////////////////////////// Ensemble des variables utiles ///////////////////////////////////////////////////

//===================== Variables d'images =====================//

var ground = new Image(); //Image du plateau
ground.src="ground.png";
var imgoblin = new Image(); //Image du gobelin (personnage faible)
imgoblin.src="goblin.png";
var imsauron = new Image(); //Image de sauron (boss)
imsauron.src="Sauron.png";
var imbalrog= new Image(); //Image du balrog (personnage fort)
imbalrog.src="balrog.png";
var imnazgul = new Image(); //Image du nazgul (personnage moyen)
imnazgul.src="Nazgul.png";
var BarreVerte = new Image(); //Barre verte pour gobelin et balrog
BarreVerte.src="BarreVerte.png";
var BarreOrangeNazgul = new Image(); //Barre orange pour nazgul
BarreOrangeNazgul.src="BarreOrangeNazgul.png";
var BarreVerteBalrog = new Image(); //Barre orange pour balrog
BarreVerteBalrog.src="BarreVerteBalrog.png";
var BarreOrangeBalrog = new Image(); //Barre rouge pour balrog
BarreOrangeBalrog.src="BarreOrangeBalrog.png";

// Ensemble des images pour la barre orange et rouge de sauron (1 par point de vie)
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

//Image des tours qui représentent les tombes
var towerIsengard = new Image();
towerIsengard.src="towerIsengard.png";
var towerSauron = new Image();
towerSauron.src="towerSauron.png";

//===================== Variable de son (utilisation de SoundManager) =====================//

soundManager.url='soundmanager2.swf';
soundManager.debugMode=false;

//===================== Variables de "décision" =====================//

var zombies = new Array(); //Pour stocker chaque zombie crée et ainsi gérer un refresh
var creation; //Pour stopper et reprendre le setInterval de la création
var move; //Pour stopper et reprendre le setInterval du mouvement vers le bas
var pause = false; //Variable qui sert à savoir si on est en pause
var life = 10; //Variable de vie pour l'utilisateur
var loose = false; //Variable pour savoir si on a perdu
var win = false; //Variable pour savoir si on a gagné
var point = 0; //Variable qui représente le nombre de points du joueur
var timer=" 3:20"; //Variable qui stocke le temps qui passe
var compt = 0; //Variable de comptage pour gérer les événement en fonction du timer
var time; //Pour stopper et reprendre le setInterval du timer
var createsauron=false; //Pour savoir si le boss a été crée
var choice; //Pour génerer aléatoirement les zombies au cours de la partie
var sec100=false; //Pour savoir si nous sommes à la moitié du jeu
var notsauron=false; //Pour être sur que le boss n'est pas encore crée (pour les musiques)
var music; //Pour gérer les musiques
var music2=true; //Pour gérer les musiques

//===================== Variables de coordonnées =====================//

var sx; //Pour position du sprite en x
var sy; //Pour position du sprite en y
var x; //Pour position en x
var y; //Pour position en y

/////////////////////////////////////////////////// Fonction qui gère les sons durants la partie ///////////////////////////////////////////////////

var play = function () {
	if(loose == false && win == false && createsauron == false && notsauron == false) { //Au lancement de la page ce son ce joue
		soundManager.createSound('son','shallnotpass.wav', function () { soundManager.destroySound('son');}); //Pour créer un son et le détruire quand il a finit de jouer
    	soundManager.play('son'); //Joue le son crée
    	notsauron = true;
    	music = true;
	}
	if(pause == true) { //Si la pause est activée, on bloque toutes les musiques en cours et on lance la musique d'attente
		music=false;
		soundManager.pauseAll(); //Mets en pause tous les sons en cours de lecture
		soundManager.createSound('son7','elevator.mp3', function () { soundManager.destroySound('son7');});
    	soundManager.play('son7');
	}
	if(pause == false) { //Si on reprend la partie, on stoppe la musique d'ambiance et on reprendre les musiques en cours de lecture
		soundManager.stop('son7'); //Arrête une musique
		soundManager.resumeAll(); //Reprend les musiques en état de pause
	}
	if(loose == true && pause==false) { //Si on perd
		notsauron=false;
		createsauron=false;
		soundManager.stop('son6');
		soundManager.createSound('son2','fly.wav', function () { soundManager.destroySound('son2'); });
    	soundManager.play('son2');
    	soundManager.createSound('son3','pippin.mp3', function () { soundManager.destroySound('son3'); })
    	soundManager.play('son3');
	}
	if(win == true && pause==false) { //Si on gagne
		notsauron=false;
		createsauron=false;
		soundManager.createSound('son4','thefellowship.mp3', function () { soundManager.destroySound('son4'); });
    	soundManager.play('son4');
	}
	if(createsauron == true && pause==false && music2 == true) { //Si le boss apparaît, on joue son thème
		notsauron=false;
		soundManager.createSound('son5','Sauron.mp3', function () { soundManager.destroySound('son5'); });
    	soundManager.play('son5');
	}
	if(notsauron == true && win == false && loose == false && pause==false && music == true) { //Thème d'Isengard tant que le boss n'apparaît pas, musique de fond
		soundManager.createSound('son6','Isengard.mp3', function () { soundManager.destroySound('son6'); });
    	soundManager.play('son6');
	}

}

/////////////////////////////////////////////////// Fonctions qui gère le timer du jeu ///////////////////////////////////////////////////

function startTimer() { //Fonction qui gère le timer
  var presentTime = timer; //On stocke le temps en cours
  var timeArray = presentTime.split(/[:]+/); //On découpe la string en 2 pour récupérer la minute en cours et les secondes
  var m = timeArray[0]; //On stocke la minute
  var s = checkSecond((timeArray[1] - 1)); //On check la seconde (si dépasse 59 ou si comprise entre 0 et 10)
  if(s==59){m=m-1} //Si on atteint la 59ème seconde, on descend d'une minute

  timer = m+":"+s; //On recompose notre string
  compt++; //On incrémente le compteur, ce qui signifie qu'une seconde est passée
  time=setTimeout(startTimer, 1000); //On appelle cette fonction chaque seconde
}

function checkSecond(sec) { //Fonction qui check la valeur de la seconde
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // ajoute 0 quand <10
  if (sec < 0) {sec = "59"}; //Si on est plus petit que 0 on réinitialise à 59
  return sec;
}

/////////////////////////////////////////////////// Fonction qui gère le plateau de jeu ///////////////////////////////////////////////////

var drawGround = function ()
{
	for(let j=0;j<8;j++) //800 de hauteur
    {
        for(let i=0;i<6;i++) //600 de largeur
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

/////////////////////////////////////////////////// Fonction qui gère le déplacement de la souris ///////////////////////////////////////////////////

function follow(evenement)
{
    if(navigator.appName=="Microsoft Internet Explorer") //On check sur quel navigateur on se situe
    {
            var x = event.x+document.body.scrollLeft; //On récupère la position de la souris
    }
    else
    {
            var x =  evenement.pageX; //On récupère la position de la souris sur toute autre navigateur
    }
    if(x>580 && x<1155) //On restreint le curseur et le personnage du bas à suivre la souris seulement sur le canvas
    {
    	document.getElementById("gandalf").style.left = (x+1)+'px'; //On actualise la position à chaque instant pour suivre la souris
    }
}

/////////////////////////////////////////////////// Ensemble des objets par personnages ///////////////////////////////////////////////////

//===================== Objet gobelin (personnage faible) =====================//

var goblin = {
	time: 0, //Argument pour gérer suppresion des tours
	born: false, //Vérifie si le personnage a été crée
	grave: towerIsengard, //Argument qui contient la tour 
	img: imgoblin, //Arguement qui contient le gobelin
	name:"goblin", //On nomme le personnage pour vérifier sur qui on tire et ainsi adapter la zone de tir sur ce personnage
	lifegoblin:1, //Variable de vie du personnage
	lifeBarGobelin:Array(BarreVerte), //Argument qui contient l'ensemble des images représentants l'évolution de la barre de vie
	tx: 0, //Coordonnée pour la tour
	ty: 0, //Coordonnée pour la tour
	x: Math.round(Math.random()*569), //Coordonnée pour le personnage tiré aléatoirement entre 0 et 600 - largeur du personnage (pour ne pas dépaser)
	y: Math.round(Math.random()*101), //Coordonnée pour le personnage tiré aléatoirement entre 0 et 100 pour limiter la zone d'appartition en haut du plateau de jeu
	sx: 0, //Coordonnée du sprite
	sy: 0, //Coordonnée du sprite
	change: function() { //Fonction qui actualise les données d'un objet crée à partir de cet objet
		this.x=Math.round(Math.random()*569);
		this.y=Math.round(Math.random()*101);
		this.tx=0;
		this.ty=0;
		this.born=false;
		this.time=0;
		this.lifegoblin=1;
	},
	create: function() { //Fonction qui crée le personnage et sa tour
		if(this.born==false) {
			this.time++;
			ctx.drawImage(this.grave,0,0,230,307,this.x,this.y-70,70,90);
			this.tx=this.x; //On stocke les variables d'apparition du personnage pour ne plus bouger la tour
			this.ty=this.y-70; //On stocke les variables d'apparition du personnage pour ne plus bouger la tour
		}
		if(this.born==true && this.time!=100) { //Au bout d'un certain temps, on ne l'affiche plus
			this.time++;
			ctx.drawImage(this.grave,0,0,230,307,this.tx,this.ty,70,90);
		}
		ctx.drawImage(this.lifeBarGobelin[0],0,0,482,195,this.x-7,this.y-10,50,20);
		ctx.drawImage(this.img,this.sx,this.sy,32,32,this.x,this.y,32,32);
		this.born=true;
	},
	move: function() { //Fonction qui gère le déplacement du personnage
		this.sx=this.sx+32;
		if(this.sx==96) //Si o, a fait le tour des positions sur le sprite, on revient au début
		{
			this.sx=0;
		}
		this.y=this.y+8; //Vitesse du personnage
		drawGround();
		for(var i=0;i<zombies.length;i++)
		{
			if(zombies[i].y<768) //Si on est pas encore arrivé au bout du canvas (basé sur 800 - hauteur d'un gobelin pour tous les personages)
			{
				zombies[i].create(); //On rafraîchit et on affiche tous les personnages présents sur le plateau de jeu
			}
			else //Sinon, on supprime le personnage du plateau de jeu, donc du tableau et le joueur perd une vie
			{
				zombies.splice(i,1);
				life=life-1;
			}
		}
	}
}

//===================== Objet sauron (boss) =====================//

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
		//En fonction de la vie du boss, on affiche une barre différente pour voir que ça décroît//
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

//===================== Objet balrog (personnage fort) =====================//

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
		this.lifebalrog=3;
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

//===================== Objet nazgul (personnage moyen) =====================//

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
		this.lifenazgul=2;
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

/////////////////////////////////////////////////// Fonction qui gère "l'intelligence artificelle" du jeu ///////////////////////////////////////////////////

function AI()
{
	if(zombies.length==0) //On crée un personnage dès le début du jeu
	{
		goblin.create(); //On utilise la méthode create du personnage souhaité
		zombies.push(goblin); //On l'ajoute au tableau
	}
	creation=setInterval(function() { //setInterval qui permet de créer un personnage toutes les 2 secondes
		if(compt<=30) { //Si on est encore sous la barre des 30 secs, il n'y a que des gobelins
			var newgoblin=Object.create(goblin); //On crée un nouveau gobelin sur la base de notre objet gobelin (donc il a tous les mêmes arguments)
			newgoblin.change(); //On lui initialise de nouvelles coordonnées et on remet ses données à 0;
			zombies.push(newgoblin); //on le rajoute au tableau
		}


		if(compt>=140 && createsauron==false) { //Si on passe la barre des 2m20 (140 secondes)
			var newsauron=Object.create(sauron);
			zombies.push(newsauron);
			createsauron=true;
			play(); //Musique d'entrée pour le boss qui se lance et ce jusqu'à la fin du jeu
			music2=false;
		}

		if(compt>=100) { //Si on arrive à la moitié du jeu, on tire au hasard le ou les personnages qui vont apparaître
			choice=Math.round(Math.random()*6); //Donne un chiffre entre 0 et 6
			switch(choice) {
				case 0: //Si c'est 0 on crée que le gobelin
					var newgoblin=Object.create(goblin);
					newgoblin.change();
					zombies.push(newgoblin);
					break;
				case 1: //Si c'est 1 on crée que le nazgul
					var newnazgul=Object.create(nazgul);
					newnazgul.change();
					zombies.push(newnazgul);
					break;
				case 2: //Si c'est 2 on crée le gobelin et le nazgul
					var newgoblin=Object.create(goblin);
					newgoblin.change();
					zombies.push(newgoblin);
					var newnazgul=Object.create(nazgul);
					newnazgul.change();
					zombies.push(newnazgul);
					break;
				case 3: //Si c'est 3 on crée que la balrog
					var newbalrog=Object.create(balrog);
					newbalrog.change();
					zombies.push(newbalrog);
					break;
				case 4: //Si c'est 4 on crée le nazgul et le balrog
					var newnazgul=Object.create(nazgul);
					newnazgul.change();
					zombies.push(newnazgul);
					var newbalrog=Object.create(balrog);
					newbalrog.change();
					zombies.push(newbalrog);
					break;
				case 5: //Si c'est 5 on crée le gobelin et le balrog
					var newgoblin=Object.create(goblin);
					newgoblin.change();
					zombies.push(newgoblin);
					var newbalrog=Object.create(balrog);
					newbalrog.change();
					zombies.push(newbalrog);
					break;
				case 6: //Si c'est 6 on crée le gobelin, le balrog et le nazgul
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

		if(compt>=30 && sec100==false) { //Si on arrive à 30 secondes du jeu mais pas encore à la moitié, on crée au hasard le gobelin, le nazgul ou les deux
			if(compt==100) { sec100=true; } //Dès qu'on arrive à la moitié du jeu, on passe à la boucle supérieur
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

		for(var i=0;i<zombies.length;i++) //Pour chaque zombie du tableau on affiche sa nouvelle position et ceux qui viennent d'être crées
		{
			zombies[i].create();
		}
	},2000)
	move=setInterval(function () { //setInterval qui cadence le mouvement des zombies toutes les 100ms
		if(compt != 200) { //Si on a pas épuisé le timer
			if(life>0 && life <=10) //Et si on a encore de la vie
			{
				for(var i=0;i<zombies.length;i++)
				{
					zombies[i].move(); //Les personnages avancent
				}
			}
			else { //Sinon, on a plus de vie et le timer n'est pas fini, on a donc perdu
				clearInterval(creation); //On stopppe les setInterval
				clearInterval(move); //On stopppe les setInterval
				document.getElementById("cv").style.webkitFilter = "blur(3px)" //On affiche un effet flou au canvas
				document.getElementById("loose").style.display = "block"; //On affiche le texte pour la défaite
				loose=true;
				document.onkeydown = function(e) {
					if(e.key === "r") //Si on appuie sur la touche 'R' du clavier, alors on peut restart le jeu
					{
						window.location.reload(); //On rafraîchit simplement la page
					}
				}
				play(); //On joue la musique lorsqu'on perd
			}
		}
		else { //Si le timer est épuisé et qu'il nous reste de la vie, on gagne
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
			play(); //Musique de la victoire
			onclick_page(); //On active la gestions des clics
		}
	},100)
}

/////////////////////////////////////////////////// Fonction qui gère la fonction pause du jeu ///////////////////////////////////////////////////

function stop() { 
	document.onkeydown = function(e) {
		if(e.key==="p") //Si on appuie sur la touche 'P' du clavier
		{
			if(pause==false && loose==false && win==false) //Si on était pas en pause et que le joueur n'a pas perdu ni gagner
			{
				//On stoppe tous les setInterval, y compris celui du timer
				clearInterval(creation);
				clearInterval(move);
				clearTimeout(time);

				pause=true;
				play();
				document.getElementById("pause").style.display = "block";
				document.getElementById("cv").style.webkitFilter = "blur(3px)"
			}
			else //Si on reprend la partie
			{
				document.getElementById("cv").style.webkitFilter = "blur(0px)" //On enlève l'effet de flou
				document.getElementById("pause").style.display = "none"; //On n'affiche plus le texte de pause
				AI(); //On reprend le jeu
				time=setTimeout(startTimer,1000); //On reprend le timer
				pause=false;
				play();
			}
		}
	}
}


/////////////////////////////////////////////////// Fonction qui gère les cliques sur "zombies" ///////////////////////////////////////////////////

function onclick_page(event)
{
  // Coordonnées du click sur canvas (méthode pour récupérer les coordonnées sur le canvas et non sur la page web, le coin en haut à gauche du canvas est donc (0,0))
  var rect = cs.getBoundingClientRect();
  var cx = event.clientX - rect.left;
  var cy = event.clientY - rect.top;

  if(pause == false) { //Si la pause n'est pas activé, pour éviter de tricher et de tuer les zombies pendant qu'on est en pause
  	if(zombies.length!=0) {
  		for(var i=0; i<zombies.length; i++) {
		    if (zombies[i].name=="balrog" && cx>(zombies[i].x) && cx<(zombies[i].x + 80) && cy>(zombies[i].y) && cy<(zombies[i].y + 80))  //On identifie le zombie sur lequel on tire et en fonction on établit une zone de vérité pour le tir
		    {
				zombies[i].lifebalrog--; //On descend la vie du zombie
				if (zombies[i].lifebalrog == 0){ //Si la vie du zombie est à 0
					zombies.splice(i,1); //On le supprime
					point+=5; //On gagne x points
				}
		    }
			if(zombies[i].name=="nazgul" && cx>(zombies[i].x) && cx<(zombies[i].x + 80) && cy>(zombies[i].y) && cy<(zombies[i].y + 100)) 
			{
				zombies[i].lifenazgul--;
				if (zombies[i].lifenazgul == 0){
					zombies.splice(i,1);
					point+=3;
				}
		    }
			if(zombies[i].name=="sauron" && cx>(zombies[i].x) && cx<(zombies[i].x + 60) && cy>(zombies[i].y) && cy<(zombies[i].y + 150)) 
			{
				zombies[i].lifesauron--;
				if (zombies[i].lifesauron == 0){
					zombies.splice(i,1);
					point+=30;
				}
			}
			if(zombies[i].name=="goblin" && cx>(zombies[i].x) && cx<(zombies[i].x + 50) && cy>(zombies[i].y) && cy<(zombies[i].y + 50)) 
			{
				zombies[i].lifegoblin--;
				if (zombies[i].lifegoblin == 0){
					zombies.splice(i,1);
					point++;
				}
		    }
	  	}
  	} 
  	else {
  		drawGround();
  	}
  }
}

/////////////////////////////////////////////////// Fonction principale du jeu ///////////////////////////////////////////////////

function game()
{
	drawGround(); //On génère le plateau de jeu
	startTimer(); //On commence le timer
	stop(); //On gère les pauses
	AI(); //On lance l'IA du jeu
	play(); //La musique d'entrée
	document.onmousemove = follow; //On fait suivre la souris
}

/////////////////////////////////////////////////// On lance le jeu ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.onload = game;
