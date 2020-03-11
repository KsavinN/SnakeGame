// @ts-nocheck

const canvas = document.createElement("canvas");

const context = canvas.getContext('2d');


context.fillStyle = 'black';



const stateGame = {
    end: false,
}



let start =  Date.now();

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

document.body.appendChild(canvas);


const blockSize = 20;
let interval = 100;


const snake = {
    body: [],
    head: {
        position: createBlock(40, 40),
        direction: 'down'
    }
}

const fruit = {
    position: createBlock(100, 100, 'red')
}

// context.fillStyle = 'red';
// context.fillRect(100, 100, 400, 300);

// const makeWall = function () {
//     context.fillStyle = 'white';
//     context.fillRect()
// }

function createBlock(x,y,color) {
    context.fillStyle = color || 'white';
    context.fillRect(x, y, blockSize, blockSize);
    return { x, y }
}





const growthSnake = function () {
    const { direction, position } = (snake.body.length > 0 ) ? snake.body.slice(-1)[0]:snake.head;
    
    const addBlock = (direction, position) => {
        const { x, y } = position;
        switch (direction) {
            case ('right'):
                return createBlock(x - blockSize, y);
            case ('left'):
                return createBlock(x + blockSize, y);
              
            case ('up'):
                return createBlock(x, y + blockSize);
                
            case ('down'):
                return createBlock(x, y - blockSize);
        } 
    }
    
        
        
    snake.body.push(
        {
            direction: direction,
            position: addBlock(direction,position)
        }
    )   
    console.log({ snake });
}

const moveBlock = (addX,addY,block) => {
    const { x, y } = block;
    context.clearRect(x, y, blockSize, blockSize);
    return createBlock(addX + x, addY + y);
}



const moveElement = (element) => {
    const { position, direction } = element;
    switch (direction) {
        case ('right'):
            return moveBlock(blockSize, 0, position)
        case ('left'):
            return moveBlock(-blockSize,0,position)
            
        case ('up'):
            return moveBlock(0,-blockSize,position)
            
        case ('down'):
            return moveBlock(0,blockSize,position) 
    }
    
}

const moveSnake = () => {
    snake.head.position = moveElement(snake.head);
    
    snake.body.forEach((element, index) => {
        snake.body[index].position = moveElement(element);
    });
    for (let i = snake.body.length-1; i >= 0; --i) {
        snake.body[i].direction = (i !== 0) ? snake.body[i-1].direction : snake.head.direction;
    }
}


const movingAnimation = async () => { 
    if (stateGame.end) return;
    requestAnimationFrame(movingAnimation);
    if (Date.now()-start > interval ) {
        moveSnake();
        iSateFriut();
        checkWall();
        colission();
        start =  Date.now();
    }
}


const checkWall = () => {
    const { x,y } = snake.head.position;
    if (x < 0 || x >  document.body.clientWidth-10) {
        stateGame.end = true;
    }
    if (y < 0 || y > document.body.clientHeight-10) {
        stateGame.end = true;
    }
}

const colission = () => {
    const { x, y } = snake.head.position;
    snake.body.forEach(element => {
        const { position } = element;
        if (position.x === x && position.y === y) {
            stateGame.end = true;
        };
    })
}

iSateFriut = () => {
    const { position } = snake.head;
     
    if (position.x == fruit.position.x && fruit.position.y === position.y) {
        fruit.position = createBlock(randomPostion(document.body.clientWidth), randomPostion(document.body.clientHeight), 'red');
        growthSnake();
    }
}

randomPostion = (max) => {
    const pixel = (Math.random() * max).toPrecision(1);
    return pixel - (pixel % blockSize);
}



requestAnimationFrame(movingAnimation)

const doKeyDown = (e) => {
    const { key } = e;
    const fastCheck = (direction) => {
        return snake.body.length != 0 && direction === snake.head.direction;
    }
    switch (key) {
        case ('ArrowUp'):
            if (fastCheck('down')) {
                return;
            }
            snake.head.direction = 'up';
            break
        case ('ArrowDown'):
            if (fastCheck('up')) {
                return;
            }
            snake.head.direction = 'down';
            break
        case ('ArrowLeft'):
            if (fastCheck('right')) {
                return;
            }
            snake.head.direction = 'left';
            break
        case ('ArrowRight'):
            if (fastCheck('left')) {
                return;
            }
            snake.head.direction = 'right';
            break
    }
}


window.addEventListener('keydown', doKeyDown, true);