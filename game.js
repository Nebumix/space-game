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

var esplosione = new Image();     
esplosione.src = "img/esplosione.png"; 

var cockpit = new Image();     
cockpit.src = "img/cockpit1.png"; 

//stelle
var stelle = new Array(); 
var nstelle = 200; 

//meteoriti
var nmeteoriti = 100, nattivi = 0, ndistrutti = 0; 
var meteoriti = new Array(); 

// variabili globali 
    //posizione di partenza posizionata al centro del canvas
var posx = canvas1.width/2, posy = canvas1.height/2; 
    //coordinate del centro del canvas
var centrox = canvas1.width / 2, centroy = canvas1.height / 2; 

var punteggio = 0; 
var livello = 1; 
var schermata = 0;       

var TO_RADIANS = Math.PI/180;
    
var fire = 0; 

var punti = new Array(); 
var datap = new Array(); 

//var ritardo = 30; 
var pausa = false; 

//audio
var firesound = new Audio("audio/laser1.mp3");
firesound.volume = 0.3; 

var crash = new Audio("audio/explosion.mp3");     

var m1 = new Audio("audio/m1.mp3"); 
m1.loop = true;

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
    if (schermata == 1) {
        ordinaMeteoriti();
        for (var n = 0; n < nattivi; n++) 
        meteoriti[n].draw();  

        //disegno il mirino
        buffer_context.drawImage(mirino, posx - (mirino.width/2), posy - (mirino.height/2)); 
    }       

    if (fire > 0) 
        drawFire(); 

    // scorrimento cockpit e scritte 
    shiftx = (posx - 350) / 14; 
    shifty = (posy - 300) / 30;             
    // disegno il cockpit 
    buffer_context.drawImage(cockpit, -50 - shiftx, -20 - shifty , 800, 700); 

    if (schermata == 0) {             
        // premi il tasto del mouse per iniziare     
        buffer_context.fillStyle ="#434343";             
        buffer_context.fillRect(150 - shiftx, 380 - shifty, 395, 30);         
                
        buffer_context.fillStyle ="#fff";             
        buffer_context.font = "16px Arial Black";     
        buffer_context.fillText('CLICCA CON IL MOUSE PER COMINCIARE', 165 - shiftx, 400 - shifty);          
                                     
        // scrivo i punteggi    
        caricaPunteggi(); 

        buffer_context.fillStyle ="#fff";             
        buffer_context.font = "12px Arial Black"; 
        buffer_context.fillText('PUNTEGGI MIGLIORI', 300 - shiftx, 460 - shifty + 15);          
         
        for (var n = 0; n < 5; n ++) {             
            buffer_context.font = "11px Arial";             
            buffer_context.fillText(datap[n] + " : "+ punti[n], 300 - shiftx, 500 - shifty + (15 * n));             
        } 
    } 
    
    if (schermata == 1) {
        buffer_context.fillStyle ="#BBF";             
        buffer_context.font = "16px Arial Black";             
        buffer_context.fillText('PUNTI: '+ punteggio, 300 - shiftx, 500 - shifty);             
        buffer_context.fillText('LIVELLO: '+ livello, 300 - shiftx, 520 - shifty); 
    } 
    
    if (schermata == 2) {             
        buffer_context.fillStyle ="#434343";             
        buffer_context.fillRect(190, 340, 320, 80);  
        buffer_context.strokeStyle = "#434343";           
        buffer_context.rect(180, 320, 340, 120);    
        buffer_context.stroke();     
       
        buffer_context.fillStyle ="#fff";             
        buffer_context.font = "22px Arial Black";             
        buffer_context.fillText('Fine partita. Punti: '+ punteggio, 200,380);             
        buffer_context.fillText('Premi R per ricominciare', 200, 400); 
    }   

    

    if (pausa) {             
        buffer_context.fillStyle ="#fff";             
        buffer_context.font = "16px Arial";             
        buffer_context.fillText('Gioco in Pausa', 300 - shiftx, 400 - shifty); 
    } 


    contesto.drawImage(buffer, 0, 0); 

    requestAnimationFrame(gameLoop);
}

function aggiornaLogica(){

    if(!pausa){

        // // Imposto una durata di 10 frame per la visualizzazione del fuoco 
        if (fire > 0) 
            fire ++; 

        if (fire > 10) 
            fire = 0; 


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

        //meteoriti
        if (schermata == 1) {         

            for (var n = 0; n < nattivi; n ++) {                         
                meteoriti[n].dist -= (meteoriti[n].speed + 4) / 6;                           
                meteoriti[n].angle += meteoriti[n].speed;                           
                if (meteoriti[n].stato > 0) {
                    meteoriti[n].stato ++;   
                    //playSound(crash);         
                }
                                
                //se vengo colpito
                if ((meteoriti[n]. dist < 605) && (meteoriti[n].stato == 0)) {                                       
                    playSound(crash);                                         
                    meteoriti[n].stato++;                                         
                    salvaPunteggio();
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

        }   
        
    }  
}

function gameLoop() {
    //acquisizioneInput();
    aggiornaLogica();
    draw();
}

function init(){
    playSound(m1); 

    window.addEventListener('keydown', doKeyDown, false); 
    // window.addEventListener('keyup', 
    //     function(event) { 
    //         Key.onKeyup(event); 
    //     }, false); 
        
    // window.addEventListener('keydown', function(event) { 
    //     Key.onKeydown(event); }, false); 


    canvas.addEventListener('mousemove', mousemove, false); 
    canvas.addEventListener('click', mouseclick, false); 

    gameLoop();
}