import { Snake } from "./snake.js";
import { Board } from "./board.js";
import { Fruit } from "./fruit.js";

const board = new Board();
const snake = new Snake();
const fruit = new Fruit();

const stateGmae = {
    speed: 0,
}

let time = 0;

const animation = (tick) => {
    if (time++ % (5-stateGmae.speed) === 0) {
        snake.moveSnake();
    }
    isFruitAte();
    requestAnimationFrame(animation); 
}

const compareSnakeFruit = () => {
    fruit.renderNewFruit();
    const fastCompare = (x1, x2, y1, y2) => x1 === x2 && y1 === y2;
    const { x:xFruit, y:yFruit } = fruit.getPosition();
    for (const ele of snake.body) {
        const { x, y } = ele.getPosition();
        if (fastCompare(x,xFruit,y,yFruit)) {
            compareSnakeFruit();
            break;
        }
    }
}

const isFruitAte = () => {
    const { x:xFruit, y:yFruit } = fruit.getPosition();
    const { x:xSnake, y:ySnake } = snake.head.getPosition();
    if (xFruit === xSnake && yFruit === ySnake) {
        snake.growthSnake();
        compareSnakeFruit();
        stateGmae.speed = stateGmae.speed === 5 ? 5:stateGmae.speed+1
    }
}

requestAnimationFrame(animation)  
       
    




