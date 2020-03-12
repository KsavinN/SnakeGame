import { ctx } from './canvas.js';


export  class Block {
    constructor (x,y,color) {
        this.color = color || 'white';
        this.blockSize = 20;
        this.x = x ? x : this.randomPostion(document.body.clientWidth); 
        this.y = y ? y : this.randomPostion(document.body.clientHeight);
        
        
        this.renderBlock();
    }
    
    clearBlock() {
        ctx.clearRect(this.x, this.y, this.blockSize, this.blockSize);
    }

    getPosition() {
        return {x:this.x,y:this.y}
    }

    renderBlock() {
        ctx.fillStyle = this.color || 'white';
        ctx.fillRect(this.x, this.y, this.blockSize, this.blockSize);
    }

    randomPostion = (max) => {
        const pixel = Number((Math.random() * max).toPrecision(1));
        return (pixel - (pixel % this.blockSize));
    }
    
}