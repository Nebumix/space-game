

    function incrementa_punteggio() {             
        ndistrutti ++;             
        punteggio += 100;             
        
        if (ndistrutti > ((livello + 2) * 5)) {                         
            ndistrutti = 0;                           
            livello ++;                           
            nattivi += 5;             
        } 
    } 

    function salvaPunteggio() { 
        var d = new Date; 
        var curr_date = d.getDate(); 
        var curr_month = d.getMonth(); 
        curr_month ++; 
        var curr_year = d.getFullYear(); 
        var today = curr_date + "-" + curr_month + "-" + curr_year;                 
        for (var n = 0; n < 5; n ++) {             
            if (punteggio > punti[n]) {                           
                // salvo i punteggi                           
                for (var x = 4; x >= n; x--) {                           
                    localStorage["punti" + (x + 1)] = localStorage["punti" + x];                           
                    localStorage["datap" +(x + 1)] = localStorage["datap" + x];                           
                    punti[x + 1] = punti[x];                           
                    datap[x + 1] = datap[x];             
                }             
                
                localStorage["punti" + n] = punteggio;             
                localStorage["datap" + n] = today;

                punti[n] = punteggio;             
                datap[n] = today;             
                break;             
            }             
            
            localStorage["punti" + n];             
            datap[n] = localStorage["datap" + n]; 
        } 
    } 

    function caricaPunteggi() { 
        for (var n = 0; n <= 5; n ++) {             
            if (localStorage.getItem("punti" + n) == null || localStorage.getItem("punti" + n) === undefined ) {                           
                localStorage.setItem("punti" + n," 0");             
            } 
            else{
                punti[n] = localStorage.getItem("punti" + n);             
            }
            
            if (localStorage.getItem("datap" + n) == null  || localStorage.getItem("datap" + n) === undefined) {                           
                localStorage.setItem("datap" + n,"-");             
            } 
            else {
                datap[n] = localStorage.getItem("datap" + n); 
            }
        } 
    } 