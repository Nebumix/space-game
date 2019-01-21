
//salva le coordinate del mouse
function mousemove (ev) {                                   
    posx = ev.layerX;                         
    posy = ev.layerY;             
} 

//salva le coordinate del mouse
function mouseclick (ev) {                                   
    posx = ev.layerX;                         
    posy = ev.layerY;             
} 

function mouseclick (ev) {                         
    if (schermata == 0) {   
        nattivi = 5;
        ndistrutti = 0;                           
        punteggio = 0;                           
        livello = 1;                           
        resetMeteoriti();                           
        schermata++;             
    }             
    
    if (schermata == 1) {                           
        fire = 1;                           
        //playSound(firesound);       
                                                      
        //controllo se ho colpito un meteorite                           
        for (var n = 0; n < nattivi; n ++) {                                         
            if ((posx > meteoriti[n].x0) && (posx < meteoriti[n].x1)) {                                                     
                if ((posy > meteoriti[n].y0) && (posy < meteoriti[n].y1)) {         
                    if (meteoriti[n].stato == 0)                                                                           
                        meteoriti[n].stato ++;                                                     
                        
                        incrementa_punteggio();                                                                                                         
                }                                         
            }                           
        }             
    } 
}  