

function doKeyDown(eve) {              
    var key = eve.keyCode; 
    switch(key) {    
        // p         
        case 80: {                                
            pause();                                 
            break;             
        }                      
        
        // r
        case 82: {                              
            if (schermata == 2) {                                       
                nattivi = 0;                                       
                ndistrutti = 0;                                       
                punteggio = 0;                                       
                livello = 1;                                       
                schermata = 0;                           
            }
            break;             
        }
    } 
    // riferimento codici tasti: http:// msdn.microsoft.com/ en-us/ library/ bb979636(v = vs. 95). aspx 
} 

function pause() {             
    if (pausa == true) {                           
        pausa = false;             
    } else {                           
        pausa = true;             
    } 
}   