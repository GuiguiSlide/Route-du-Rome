let player, npc, cursors;
let dialogueOpen = false;

const config = {
type: Phaser.AUTO,
width: window.innerWidth,
height: window.innerHeight,
physics: {
default: "arcade",
arcade: { debug: false }
},
scene: {
preload,
create,
update
}
};

new Phaser.Game(config);

function preload(){}

/* ======================
   🎮 CREATE
====================== */

function create(){

const scene = this;
const w = this.scale.width;
const h = this.scale.height;

/* ======================
   🌍 MAP SAINT-MALO
====================== */

// mer
scene.add.rectangle(w/2, h-100, w*2, 300, 0x1e4d7a);

// plage
scene.add.rectangle(400, 500, 500, 250, 0xd9c9a5);

// ville intra-muros
scene.add.rectangle(900, 350, 600, 500, 0xc9b28f);

// port
scene.add.rectangle(1500, 600, 500, 300, 0x5e432b);

/* ======================
   🧍 HERO (SAFE ZELDA SPRITE)
====================== */

const g = scene.make.graphics({ x: 0, y: 0, add: false });

// ombre
g.fillStyle(0x000000, 0.25);
g.fillEllipse(20, 62, 30, 10);

// tête
g.fillStyle(0xf2c9a0);
g.fillCircle(20, 12, 10);

// cheveux
g.fillStyle(0x1d1e3c);
g.fillRect(10, 2, 20, 10);

// tunique France Travail
g.fillStyle(0x00A859);
g.fillRect(8, 22, 24, 30);

// ceinture
g.fillStyle(0x003189);
g.fillRect(8, 30, 24, 4);

// jambes
g.fillStyle(0x1d1e3c);
g.fillRect(12, 52, 6, 14);
g.fillRect(22, 52, 6, 14);

g.generateTexture("hero", 40, 70);
g.destroy();

/* ======================
   🧍 PLAYER
====================== */

player = scene.physics.add.sprite(300, 400, "hero");
player.setCollideWorldBounds(true);

/* ======================
   ⚓ NPC (FIX IMPORTANT)
====================== */

npc = scene.physics.add.sprite(900, 350, "hero");
npc.setImmovable(true);
npc.setTint(0x00A859); // différenciation visuelle

/* ======================
   🎥 CAMERA ZELDA
====================== */

scene.cameras.main.startFollow(player);
scene.cameras.main.setZoom(1.3);

/* ======================
   🎮 INPUT
====================== */

cursors = scene.input.keyboard.createCursorKeys();

/* ======================
   💬 INTERACTION NPC
====================== */

scene.input.keyboard.on("keydown-E", () => {

if (Phaser.Math.Distance.Between(player.x, player.y, npc.x, npc.y) < 120) {
openDialogue();
}

});

}

/* ======================
   🔁 UPDATE LOOP
====================== */

function update(){

if(dialogueOpen) return;

player.body.setVelocity(0);

let moving = false;

if(cursors.left.isDown){
player.body.setVelocityX(-220);
moving = true;
}

if(cursors.right.isDown){
player.body.setVelocityX(220);
moving = true;
}

if(cursors.up.isDown){
player.body.setVelocityY(-220);
moving = true;
}

if(cursors.down.isDown){
player.body.setVelocityY(220);
moving = true;
}

/* orientation simple Zelda */
player.flipX = cursors.left.isDown;

}

/* ======================
   📏 DISTANCE
====================== */

function distance(a,b){
return Phaser.Math.Distance.Between(a.x,a.y,b.x,b.y);
}

/* ======================
   💬 DIALOGUE
====================== */

function openDialogue(){
document.getElementById("dialogue").style.display = "block";
dialogueOpen = true;

document.getElementById("dialogueText").innerText =
"Morgane : Bienvenue à Saint-Malo ! Découvre les métiers du territoire.";
}

/* ======================
   🎯 CHOIX
====================== */

window.choose = function(id){

let t = document.getElementById("dialogueText");

if(id === 1) t.innerText = "Métiers terrain : logistique, port, BTP.";
if(id === 2) t.innerText = "Mobilité maritime et transport.";
if(id === 3) t.innerText = "Impact social et utilité publique.";

setTimeout(() => {
document.getElementById("dialogue").style.display = "none";
dialogueOpen = false;
}, 2000);

};
