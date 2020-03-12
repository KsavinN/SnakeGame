import { Block } from './block.js';

export  class Snake {
    constructor () {
        this.body = [];
        this.head = new SnakeBlock(60, 60, 'down'),
        window.addEventListener('keydown', this.doKeyDown.bind(this));
    }

    moveSnake() {
        this.head.moveBlock();
        this.body.forEach(block => block.moveBlock());
        
        for (let i = this.body.length-1; i >= 0; --i) {
            this.body[i].direction = (i !== 0) ? this.body[i-1].direction : this.head.direction;
        }
    }
    

    growthSnake() {
        const { x, y , direction , blockSize } = (this.body.length > 0) ? this.body.slice(-1)[0]:this.head;;
            switch (direction) {
                case ('right'):
                    this.body.push(new SnakeBlock(x - blockSize, y, direction));
                    break
                case ('left'):
                    this.body.push(new SnakeBlock(x + blockSize, y, direction));
                    break
                case ('up'):
                    this.body.push(new SnakeBlock(x, y + blockSize, direction));
                    break
                case ('down'):
                    this.body.push(new SnakeBlock(x, y - blockSize, direction));
                    break;
            } 
        
    }
    
    doKeyDown(e) {
        const { key } = e;
        const fastCheck = (direction) => {
            return this.body.length != 0 && direction === this.head.direction;
        }
        switch (key) {
            case ('ArrowUp'):
                if (fastCheck('down')) {
                    return;
                }
                this.head.direction = 'up';
                break
            case ('ArrowDown'):
                if (fastCheck('up')) {
                    return;
                }
                this.head.direction = 'down';
                break
            case ('ArrowLeft'):
                if (fastCheck('right')) {
                    return;
                }
                this.head.direction = 'left';
                break
            case ('ArrowRight'):
                if (fastCheck('left')) {
                    return;
                }
                this.head.direction = 'right';
                break
        }
    } 
}


class SnakeBlock extends Block {
    constructor (x,y,direction,color) {
        super(x, y, color);
        this.direction = direction;
    }    

    moveBlock() {
        this.clearBlock();
        switch (this.direction) {
            case ('right'):
                this.x += this.blockSize;
                break
            case ('left'):
                this.x -= this.blockSize;
                break;
            case ('up'):
                this.y -= this.blockSize;
                break;
            case ('down'):
                this.y += this.blockSize;
                break;
        }
        this.renderBlock();
    }

    
}