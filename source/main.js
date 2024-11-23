import { ProgressBar } from './progress_bar.js';
import { ProgressBarTaust } from './progress_bar_taust.js'
import { PClocked } from './PC_locked.js';
import { StartPage } from './start_page.js';
import { InputHandler } from './input.js';
import { SkillCheck } from './skillcheck.js';
import { PChacked } from './PC_hacked.js';



let timeTohack = false;
let gamestarted = false;
let checkstarted = false;
let checknumber = 0;
let seconds;
let timepass;
let pcHacked = false;
let locked = 'start';
let locktime;
let coolingtime;


export const settimetohack = (val) => (timeTohack = val);
export const getgamestarted = () => gamestarted;
export const setgamestarted = (val) => (gamestarted = val);
export const setcheckstarted = (val) => (checkstarted = val);
export const setchecknumber = (val) => (checknumber = val);
export const getchecknumber = () => checknumber;


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;


    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.progressbar = new ProgressBar(this);
            this.progressbartaust = new ProgressBarTaust(this);
            this.pclocked = new PClocked(this);
            this.pchacked = new PChacked(this);
            this.startpage = new StartPage(this);
            this.input = new InputHandler();
            this.skillcheck = new SkillCheck(this);
        }
        update(){
            this.progressbar.update();
            this.startpage.update(this.input.keys);
            if (locked == 'locked' ){
                locked = 'cooldown';
            }
            if (locked == 'cooldown' ){
                coolingtime = Date.now();
                if(coolingtime > locktime+30000){
                    locked = 'start';
                    gamestarted = false;
                    timeTohack = false;
                    checkstarted = false;
                    checknumber = 0;
                    pcHacked = false;
                    this.skillcheck.result = 'start';
                    this.progressbar.width = 20;
                    
                }

            }
            //console.log(locked, pcHacked, locktime, coolingtime);

            
        }
        
        draw(context){
            if(pcHacked){
                this.pchacked.draw(context);
            }
            if (!gamestarted && !pcHacked){
                this.startpage.draw(context);

            }
            

            
            else if (checknumber<4 ){
                if (!checkstarted){
                    seconds = Date.now();
                    checkstarted = true;
                }
                timepass = Date.now();
                this.startpage.draw(context);
                this.progressbartaust.draw(context);
                if (timepass>seconds+3000){
                    timeTohack = true;
                }
                //console.log (checkstarted);
                if(timeTohack){
                    this.skillcheck.draw(context, this.input.keys);
                }
                if (this.skillcheck.result == 'success'){
                    this.skillcheck.result='start';
                }
                
                if(this.progressbar.width<1000){ //x<1090
                    this.progressbar.draw(context);
                }

                //Häkkimine ebaõnnestus
                if (this.skillcheck.result == 'fail'){
                    this.pclocked.draw(context);
                    if (locked == 'start') {
                        locked = 'locked';
                        locktime = Date.now();
                    }
                }
                
            }
            //Arvuti häkitud
            if (this.progressbar.width>1000 ){ //x>1090
            pcHacked=true;
            gamestarted=false;
               
            }
            
        
        }
    }

    const game = new Game(canvas.width, canvas.height);
    //console.log(game);

    function animate(){
        ctx.clearRect(0, 0, canvas.with, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();

});