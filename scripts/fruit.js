import { Block } from './block.js';

export class Fruit extends Block{
    constructor () {
        super(null, null, 'red');
    }

    renderNewFruit() {
        this.clearBlock();
        this.x = this.randomPostion(document.body.clientWidth);
        this.y = this.randomPostion(document.body.clientHeight);
        console.log({x:this.x,y:this.y})
        this.renderBlock();
    }
   
}

