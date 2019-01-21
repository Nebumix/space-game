

function playSound(snd) {             
    try {                         
        snd.currentTime = 0;                           
        snd.play();             
    }                           
    catch(e) {}     
} 
