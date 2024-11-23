export class PClocked {
    constructor(game){
        this.game = game;
        this.width = 1280;
        this.height = 720;
        this.x = 0;
        this.y = 0;
        this.image = document.getElementById('PClocked');
    }
    update(){
        
    }
    draw(context){ 
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);             
    }
    
}  