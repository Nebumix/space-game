
function star(x, y, dist, speed) {
    this.x = x;
    this.y = y;
    this.dist = dist;
    this.draw = drawStar;
    this.speed = speed; 
}


function generaStelle() { 
    for (var n = 0; n < nstelle; n ++) {

        // la velocità va da 1 a 2
        // per math.random si fa  * max - min ) + min
        var speed = (Math.random() * 2) + 1;             
        // la distanza va da 700 a 1000             
        //var dist = (Math.random() * 300) + 700;    
        //faccio una prova prendendo da 0 a 300   
        //var dist = 0;       
        var dist = (Math.random() * -300);       

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