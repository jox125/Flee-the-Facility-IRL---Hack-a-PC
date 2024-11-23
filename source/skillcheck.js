import { setgamestarted, settimetohack, setcheckstarted, setchecknumber, getchecknumber } from "./main.js";


export class SkillCheck {

    constructor(game){
        this.game = game;
        this.width = 250;
        this.height = 250;
        this.x = this.game.width/2-this.width/2;
        this.y = 100;
        this.startpoint = 0.8;
        this.result = 'start';
        this.start = false;
    }
    update(){

   
    }
    draw(context, input){ 
        
        //tausta ülemine osa hall
        context.fillStyle = 'gray';
        context.fillRect(this.x, this.y, this.width, this.height/4); 
        //tausta alumine osa, pruun
        context.fillStyle = '#492F29';
        context.fillRect(this.x, this.y+this.height/4, this.width, this.height/4*3);
        //must ringi osa
        context.beginPath();
        context.arc(this.x+this.width/2, this.y+this.height/2, this.width/2-30, 2.4, 0.8);
        context.lineWidth = 50;
        context.strokeStyle = 'black';
        context.stroke();
        //valge ringi osa
        context.beginPath();
        context.arc(this.x+this.width/2, this.y+this.height/2, this.width/2-30, 0.8, 2.4);
        context.lineWidth = 50;
        context.strokeStyle = 'white';
        context.stroke();   


        //osuti
        if (this.startpoint>Math.PI*2){
            this.startpoint=0;
        }
        this.startpoint+=0.05;
        context.translate(this.game.width/2, this.y+this.width/2);
        context.strokeStyle = 'red';
        context.beginPath();
        context.lineWidth = 15;
        context.moveTo(0,0);
        context.rotate(this.startpoint);
        context.lineTo(0, this.width/2);
        context.stroke();
        context.rotate(-this.startpoint);
        //console.log(this.startpoint );
        context.resetTransform();

        //pruun taust keskel
        context.beginPath();
        context.arc(this.x+this.width/2, this.y+this.height/2, this.width/2-88, 0, 2 * Math.PI);
        context.lineWidth = 50;
        context.strokeStyle = '#492F29';
        context.stroke();      
        //valge ruut keskel
        context.fillStyle = 'white';
        context.fillRect(this.x+this.width/3, this.y+this.height/3, this.width/3, this.height/3);     
        //lõikab keskmisel ruudul nurgad ära
        context.beginPath();
        context.arc(this.x+this.width/2, this.y+this.height/2, this.width/2-68, 0, 2 * Math.PI);
        context.lineWidth = 10;
        context.strokeStyle = '#492F29';
        context.stroke(); 
        
        //keskele E täht
        context.font = "60px Arial Black";
        context.fillStyle = '#492F29';
        context.fillText('E', this.x+this.width/2-23, this.y+this.height/2+23)

        //kontrolli klahvi vajutust
        if (this.result == 'start' && this.startpoint>5.5){
            this.start = true;
            
            
        }
        if (this.start && (this.startpoint < 0.8 || this.startpoint > 5.5 )){
            if (input.includes('e') || input.includes('E')){
                this.result = 'success';
                this.start = false;
                settimetohack(false);
                setcheckstarted(false);
                this.startpoint=0.8;
                let number = getchecknumber();
                number++;
                setchecknumber(number);
            }
        }
        if (this.start && this.startpoint > 0.8 && this.startpoint < 5.5 && this.result != 'success'){

                this.result = 'fail';
                this.start = false;
            
            
        
        }
        
        
        

    }
    
}  