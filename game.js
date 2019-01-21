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
spazio.src = "img/spazio2.jpg"; 

var met1 = new Image();     
met1.src = "img/meteor.png"; 

var mirino = new Image();     
mirino.src = "img/mirino1.png"; 

//stelle
var stelle = new Array(); 
var nstelle = 200; 

//meteoriti
var nmeteoriti = 100, nattivi = 5, ndistrutti = 0; 
var meteoriti = new Array(); 

// variabili globali 
    //posizione di partenza posizionata al centro del canvas
var posx = canvas1.width/2, posy = canvas1.height/2; 
    //coordinate del centro del canvas
var centrox = canvas1.width / 2, centroy = canvas1.height / 2; 

var livello = 1; 
var schermata = 0;       

var TO_RADIANS = Math.PI/180;
    

generaStelle()
resetMeteoriti(); 
ordinaMeteoriti();




function draw(){

    // scorrimento sfondo 
    //2.2 e 3.6 sono il rapporto tra altezza e larghezza del canvas e dell'immagine
    //-162, -84 è il punto fuori dal canvas da cui ha origine l'immagine di sfondo
    var shiftx = (posx - (canvas1.width/2)) / 2.2; 
    var shifty = (posy - (canvas1.height/2)) / 3.6; 
    buffer_context.drawImage(spazio, -162 - shiftx, -84 - shifty); 

    // disegno le stelle 
    for (var n = 0; n < nstelle; n++) 
        stelle[n].draw();

    // disegno i meteoriti 
    //if (schermata == 1) {
        ordinaMeteoriti();
        for (var n = 0; n < nattivi; n++) 
        meteoriti[n].draw();  

        //disegno il mirino
        buffer_context.drawImage(mirino, posx - (mirino.width/2), posy - (mirino.height + 10)); 
    //}       

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

    //if (schermata == 1) {         

        for (var n = 0; n < nattivi; n ++) {                         
            meteoriti[n].dist -= (meteoriti[n].speed + 4) / 6;                           
            meteoriti[n].angle += meteoriti[n].speed;                           
            if (meteoriti[n].stato > 0) meteoriti[n].stato ++;           
                            
            if ((meteoriti[n]. dist < 605) && (meteoriti[n].stato == 0)) {                                       
                //playSound(crash);                                         
                meteoriti[n].stato++;                                         
                //salvaPunteggio();
                schermata = 2;                           
            }                           
                
            if ((meteoriti[n].dist < 500) || (meteoriti[n].stato > 12)) {                                         
                meteoriti[n].dist = 1000;                                         
                meteoriti[n].speed = (Math.random() * 6) - 3;                             
                meteoriti[n].x = (Math.floor(Math.random() * 700) - 350) / 8;                                         
                meteoriti[n].y = (Math.floor(Math.random() * 600) - 300) / 20;                                         
                meteoriti[n].stato = 0;                                         
                meteoriti[n].angle = (Math.random() * 360);                                 
                ordinaMeteoriti();                           
            }             
        } 

    //}     
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