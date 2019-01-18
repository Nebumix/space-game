"use strict";

var canvas1 = document.getElementById("canvas"); 
var contesto = canvas1.getContext("2d");

// definisco il buffer 
var buffer = document.createElement('canvas'); 
buffer.width = canvas.width; 
buffer.height = canvas.height;       
var buffer_context = buffer.getContext('2d'); 


var spazio = new Image();     
spazio.src = "img/spazio1.jpg"; 

// variabili globali 
var posx = 350, posy = 300; 

function draw(){

    // scorrimento sfondo 
    //2.2 e 3.6 sono il rapporto tra altezza e larghezza del canvas e dell'immagine
    //-162, -84 è il punto fuori dal canvas da cui ha origine l'immagine di sfondo
    var shiftx = (posx - (canvas1.width/2)) / 2.2; 
    var shifty = (posy - (canvas1.height/2)) / 3.6; 
    buffer_context.drawImage(spazio, -162 - shiftx, -84 - shifty); 

    contesto.drawImage(buffer, 0, 0); 

    requestAnimationFrame(draw);
}

function init(){
    canvas.addEventListener('mousemove', mousemove, false); 

    draw();
}

//salva le coordinate del mouse
function mousemove (ev) {                                   
        posx = ev.layerX;                         
        posy = ev.layerY;             
} 