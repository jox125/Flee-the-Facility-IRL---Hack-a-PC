export class ProgressBarTaust {
    constructor(game){
        this.game = game;
        this.width = 1000;
        this.height = 29,9;
        this.x = 140;
        this.y = 600;
        this.image = document.getElementById('progressBar');
    }
    update(){
        
    }
    draw(context){ 
        context.drawImage(this.image, 0, 30, this.width, this.height, this.x, this.y, this.width, this.height);             
    }
    
}  