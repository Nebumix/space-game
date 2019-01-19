"use strict";

var canvas1 = document.getElementById("canvas"); 
var contesto = canvas1.getContext("2d");

// definisco il buffer 
var buffer = document.createElement('canvas'); 
buffer.width = canvas.width; 
buffer.height = canvas.height;       
var buffer_context = buffer.getContext('2d'); 

//sfondo
var spazio = new Image();     
spazio.src = "img/spazio1.jpg"; 

//stelle
var stelle = new Array(); 
var nstelle = 200; 

// variabili globali 
    //posizione di partenza posizionata al centro del canvas
var posx = canvas1.width/2, posy = canvas1.height/2; 
    //coordinate del centro del canvas
var centrox = canvas1.width / 2, centroy = canvas1.height / 2; 

generaStelle()

function star(x, y, dist, speed) {
    this.x = x;
    this.y = y;
    this.dist = dist;
    this.draw = drawStar;
    this.speed = speed; 
}

function drawStar(){

    buffer_context.fillStyle = "#FFF";             
    //var x1 = this.x * ((1000 - this.dist) / 10); 
    var x1 = this.x * (this.dist / 10); 
    // console.log(this.x);
    // console.log("x = " + x1);            
    var y1 = this.y * (this.dist / 10);  
    //var y1 = this.y * ((1000 - this.dist) / 10); 
    //console.log("y = " + y1);                       
    buffer_context.fillRect(centrox + x1, centroy + y1, 2, 2); 

} 

function generaStelle() { 
    for (var n = 0; n < nstelle; n ++) {

        // la velocità va da 1 a 2
        // per math.random si fa  * max - min ) + min
        var speed = (Math.random() * 2) + 1;             
        // la distanza va da 700 a 1000             
        //var dist = (Math.random() * 300) + 700;    
        //faccio una prova prendendo da 0 a 300   
        var dist = 0;       

        //fingiamo di avere degli assi con l'origine al centro della figura
        //questi valori saranno poi sommati (+-) alle coordinate del centro del canvas      
        // la x va da -350 a 350
        var x = (Math.floor(Math.random() * 700) - 350) / 10;      
        //var x = (Math.floor(Math.random() * canvas1.width));  
        // la y va da -300 a 300             
        var y = (Math.floor(Math.random() * 600) - 300) / 10;     
        //var y = (Math.floor(Math.random() * canvas1.height));     

        stelle[n] = new star(x, y, dist, speed); 
    } 
} 

function draw(){

    // scorrimento sfondo 
    //2.2 e 3.6 sono il rapporto tra altezza e larghezza del canvas e dell'immagine
    //-162, -84 è il punto fuori dal canvas da cui ha origine l'immagine di sfondo
    var shiftx = (posx - (canvas1.width/2)) / 2.2; 
    var shifty = (posy - (canvas1.height/2)) / 3.6; 
    buffer_context.drawImage(spazio, -162 - shiftx, -84 - shifty); 

    // disegno le stelle 
    for (var n = 0; n < nstelle; n ++) 
        stelle[n].draw();

    contesto.drawImage(buffer, 0, 0); 

    requestAnimationFrame(gameLoop);
}

function aggiornaLogica(){
    // aggiorno dati e posizioni degli oggetti nella scena 
    // centrox = (canvas1.width / 2) - (posx - (canvas1.width / 2) ) / 2.2;
    // centroy = (canvas1.height / 2) - (posy - (canvas1.height / 2) ) / 3.6;
    
    for (var n = 0; n < nstelle; n++) {

        stelle[n].dist -= stelle[n].speed;
        //console.log(stelle[n].dist);                  

        //if (stelle[n].dist <= 700) {
        if (stelle[n].dist <= -300) {
            stelle[n].dist = 0;
            stelle[n].speed = (Math.random() * 2) + 1;
            stelle[n].x = (Math.floor(Math.random() * 700) - 350) / 10;
            stelle[n].y = (Math.floor(Math.random() * 600) - 300) / 10;
        }

    }
}

function gameLoop() {
    //acquisizioneInput();
    aggiornaLogica();
    draw();
}

function init(){
    canvas.addEventListener('mousemove', mousemove, false); 

    gameLoop();
}

//salva le coordinate del mouse
function mousemove (ev) {                                   
        posx = ev.layerX;                         
        posy = ev.layerY;             
} 