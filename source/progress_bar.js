import { getgamestarted, getchecknumber, setchecknumber } from "./main.js";



export class ProgressBar {
    constructor(game){
        this.game = game;
        this.width = 20; //1000
        this.height = 29,9;
        this.x = 140;
        this.y = 600;
        this.image = document.getElementById('progressBar');
        
    }
    update(){
        if (getgamestarted() == true){
        this.width++
        if(this.width>1000){
            let number = getchecknumber();
            number++;
            setchecknumber(number);
            
        }
        
       
        }
    }
    draw(context){ 
         
        context.fillStyle = 'green'
        context.fillRect(this.x, this.y, this.width, this.height);           
    }
    
}  