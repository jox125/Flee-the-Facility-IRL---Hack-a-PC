export class InputHandler {
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((   e.key === 'e' || 
                    e.key === 'E'
                )&& this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
            //console.log(e.key, this.keys);
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'e'||
                e.key === 'E'
            ){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            //console.log(e.key, this.keys);
        });
        window.addEventListener('mousedown', e => {
            if('mousedown' && this.keys.indexOf('hiirall') === -1 ){          
            this.keys.push('hiirall');
            }
            //console.log('hiirall', this.keys);
        });
        window.addEventListener('mouseup', e => {
            if('mouseup'){          
            this.keys.splice(this.keys.indexOf('hiirall'), 1);
            }
            //console.log('hiirüleval', this.keys);
        });
    }
}