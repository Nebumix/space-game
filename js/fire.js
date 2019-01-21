function drawFire() {             
    buffer_context.beginPath();           
    
    if (fire < 5) 
        buffer_context.lineWidth = fire; 
    else 
    buffer_context.lineWidth = 10 - fire;     
            
    buffer_context.lineCap = "round";             
    buffer_context.strokeStyle = "#FFD700";           
    buffer_context.moveTo(0, canvas.height);           
    buffer_context.lineTo(posx - 5, posy + 5);             
    buffer_context.moveTo(canvas.width, canvas.height);           
    buffer_context.lineTo(posx + 5, posy + 5);             
    buffer_context.stroke(); 
} 