import { canvas } from './canvas.js';

export class Board {

    constructor (width,height)  {
        canvas.width = width || document.body.clientWidth;
        canvas.height = height || document.body.clientHeight;
        document.body.appendChild(canvas);
    }




}