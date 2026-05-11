let player, npc, cursors;
let camera;
let dialogueOpen = false;

const config = {
type: Phaser.AUTO,
width: window.innerWidth,
height: window.innerHeight,
physics: {
default: "arcade",
arcade: { debug: false }
},
scene: { preload, create, update }
};

new Phaser.Game(config);

function preload(){}

function create(){

const scene = this;

/* ===== MAP SAINT-MALO ZELDA STYLE ===== */
scene.add.rectangle(800,400,2000,1200,0x1e4d7a); // mer

scene.add.rectangle(500,500,600,400,0xd9c9a5); // plage
scene.add.rectangle(1000,350,600,500,0xc9b28f); // ville
scene.add.rectangle(1500,600,500,300,0x5e432b); // port

/* ===== CAMERA ===== */
camera = scene.cameras.main;
camera.setBounds(0,0,2000,1200);

/* ===== HERO ===== */
const g = scene.make.graphics({x:0,y:0,add:false});

function hero(frame){

g.clear();

// tête
g.fillStyle(0xf2c9a0);
g.fillCircle(20,10,10);

// cheveux
g.fillStyle(0x1d1e3c);
g.fillRect(10,0,20,8);

// corps FT
g.fillStyle(0x00A859);
g.fillRect(8,18,24,28);

// jambes anim
g.fillStyle(0x1d1e3c);

if(frame===0){
g.fillRect(12,46,6,14);
g.fillRect(22,46,6,14);
}
if(frame===1){
g.fillRect(10,46,6,14);
g.fillRect(24,46,6,14);
}
if(frame===2){
g.fillRect(14,46,6,14);
g.fillRect(20,46,6,14);
}

g.generateTexture("hero"+frame,40,60);
}

hero(0); hero(1); hero(2);

/* PLAYER */
player = scene.physics.add.sprite(300,400,"hero0");
player.setCollideWorldBounds(true);

/* NPC */
npc = scene.physics.add.sprite(900,350,null);

/* CAMERA FOLLOW (ZELDA FEEL) */
camera.startFollow(player);

/* INPUT */
cursors = scene.input.keyboard.createCursorKeys();

/* INTERACTION */
scene.input.keyboard.on("keydown-E",()=>{

if(Phaser.Math.Distance.Between(player.x,player.y,npc.x,npc.y)<120){
openDialogue();
}

});

}

function update(){

if(dialogueOpen) return;

player.body.setVelocity(0);

let moving=false;

if(cursors.left.isDown){player.body.setVelocityX(-220);moving=true;}
if(cursors.right.isDown){player.body.setVelocityX(220);moving=true;}
if(cursors.up.isDown){player.body.setVelocityY(-220);moving=true;}
if(cursors.down.isDown){player.body.setVelocityY(220);moving=true;}

if(moving){
player.frameIndex = (player.frameIndex||0)+1;

if(player.frameIndex>10){
player.anim = (player.anim||0)+1;
player.anim%=3;
player.setTexture("hero"+player.anim);
player.frameIndex=0;
}
}else{
player.setTexture("hero0");
}

}

function openDialogue(){
document.getElementById("dialogue").style.display="block";
dialogueOpen=true;

document.getElementById("dialogueText").innerText =
"Morgane : Bienvenue dans les métiers du territoire 35.";
}

function choose(id){

let t=document.getElementById("dialogueText");

if(id===1) t.innerText="Métier terrain détecté (logistique / port)";
if(id===2) t.innerText="Mobilité internationale possible";
if(id===3) t.innerText="Impact social fort identifié";

setTimeout(()=>{
document.getElementById("dialogue").style.display="none";
dialogueOpen=false;
},2000);

}
