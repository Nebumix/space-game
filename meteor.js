
function meteorite(x, y, dist, speed, angle) {             
    this.x = x;             
    this.y = y;             
    this.dist = dist;             
    this.draw = drawMet;             
    this.speed = speed;             
    this.stato = 0;             
    this.angle = angle;    
    //variabili da utilizzare per controllare se lo sparo colpisce il meteorite         
    this.x0 = 0;             
    this.y0 = 0;             
    this.x1 = 0;             
    this.y1 = 0; 
} 

function drawMet(){   
    //posizione, stessa logica stelle          
    var x1 = this.x * ((1000 - this.dist) / 60);
    var y1 = this.y * ((1000 - this.dist) / 60);

    //ctx.save(); 
    // ctx.translate(birdX, birdY); 
    // ctx.rotate( angle * TO_RADIANS );
    //ctx.drawImage(bird, bird_costume, 0, 38, 28, -(bird.width/4), -(bird.height/2), 38, 28);
    //ctx.restore(); 
    buffer_context.save();

    //var ang =- (Math.PI / 180) * this.angle;
    //buffer_context.transform(Math.cos(ang), -Math.sin(ang), Math.sin(ang), Math.cos(ang), centrox + x1, centroy + y1);
    buffer_context.translate(centrox + x1, centroy + y1); 
    buffer_context.rotate( this.angle * TO_RADIANS );

    var larg = (met1.width / ((this.dist - 599) / 20));
    var alt = (met1.height / ((this.dist - 599) / 20));

    this.x0 = (centrox + x1 - (larg / 2));
    this.x1 = (centrox + x1 + (larg / 2));

    this.y0 = (centroy + y1 - (alt / 2));
    this.y1 = (centroy + y1 + (alt / 2));

    if(this.stato == 0) {
        buffer_context.drawImage(met1, -(larg / 2), -(alt / 2), alt, larg);
    } /*else { 
        var sx = (this.stato - 1) * 120;
        larg *= 3;
        alt *= 3;
        buffer_context.drawImage(esplosione, sx, 0,120,120, -(larg / 2), -(alt / 2), alt, larg);
    }    */
    
    buffer_context.restore(); 
} 


//ordina i meteoriti in ordine di distanza
function ordinaMeteoriti() {
    var ordinati = false;
    var bufm = new meteorite(0,0,0,0);

    while (true) {
        ordinati = true;
        for (var n = 0; n < (nattivi - 1); n++) {
            if (meteoriti[n].dist < meteoriti[n+1].dist) {
                bufm = meteoriti[n+1];
                meteoriti[n+1] = meteoriti[n];
                meteoriti[n] = bufm;
                //ordinati = false;
                //console.log(meteoriti[n].dist + " - " + meteoriti[n+1].dist);
            }
        }

        if (ordinati == true) break;
    }

} 

function resetMeteoriti() { 
    for(var n = 0; n < nmeteoriti; n ++) {

        //da 0 a 360
        var angle = (Math.random() * 360);

        //da -3 a 3
        var speed = (Math.random() * 6) - 3;

        var dist = 1000;
        // la distanza va da 700 a 1000
        var x = (Math.floor(Math.random() * 700) - 350) / 8;   
        // x da  -35 a 35
        var y = (Math.floor(Math.random() * 600) - 300) / 20;   
        // x da  -30 a 30
        meteoriti[n] = new meteorite(x, y, dist, speed, angle); 
    } 
} 