

let mine_canvas = document.getElementById("minesweeper_canvas");
let mine_ctx = mine_canvas.getContext("2d");
let block_length = mine_canvas.width / 25; // magic number
let mine_radius = block_length;
let padding = mine_canvas.width/100;
let line_padding = padding / 10;
var numb_of_mines = 25;

let xClick = -1;
let yClick = -1;

let gameOver = false;

var minesweep_rows = 10;
var minesweep_col = 10;

var minesweep = [];

var mines = [];

for(let ii = 0; ii < minesweep_rows; ii++) {
    minesweep[ii] = [];
    for(let jj = 0; jj <  minesweep_col; jj++) {
        minesweep[ii][jj] = {value: 0, hidden: true, bomb: false};
    }
}

var mine_count = 0;

// needs to be a function
while(mine_count < numb_of_mines) {
    for(let i = 0; i < minesweep_rows; i++) {
        for(let j = 0; j < minesweep_col; j++) {
            var rand = Math.floor(Math.random() * 100);
            if(rand < 10 && minesweep[i][j].value < 10) {
                minesweep[i][j].value = 10;
                minesweep[i][j].bomb = true;
                mines[mines.length] = minesweep[i][j];
                mine_count++;
                // needs to be a function 
                for(let k = -1; k < 2; k++) { 
                    for (let l = -1; l < 2; l++) {
                        if(i + k > -1 && i + k < minesweep_rows) {
                            if(j + l > -1 && j + l < minesweep_col) {
                                if(minesweep[i+k][j+l].value < 10) {
                                    minesweep[i+k][j+l].value ++;
                                }
                            }
                        }
                    }
                }
            }
            if (mine_count == numb_of_mines) {
                break;
            }
        }
        if(mine_count == numb_of_mines) {
            break;
        }
    }
}


function drawSquares() {
    for(let dsi = 0; dsi < minesweep_rows; dsi++) {
        for(let dsj = 0; dsj < minesweep_col; dsj++) {
            let block = minesweep[dsi][dsj];
            let squareX = (dsj * (block_length+line_padding)) + padding; //magic number :padding of one, magic number : square offset left 
            let squareY = (dsi * (block_length+line_padding)) + padding; //
            if(xClick > squareX && xClick < squareX + block_length){
                if(yClick > squareY && yClick < squareY + block_length){
                    block.hidden = false;
                    if(block.value == 10) {
                        xClick = -1;
                        yClick = -1;
                        // drawSquares();

                        gameOver = true;

                    }
                }
            }
            
            if(block.hidden) {

                mine_ctx.beginPath();
                mine_ctx.fillStyle = "#0095DD";
                mine_ctx.rect(squareX, squareY, block_length, block_length);
                mine_ctx.fill();
                mine_ctx.closePath();

            } else {

                mine_ctx.beginPath();
                mine_ctx.fillStyle = "black";
                mine_ctx.fillText(block.value,squareX + block_length/4,squareY + ((block_length/4) * 3), block_length/2.5);
                mine_ctx.closePath();
            }

            
            // mine_ctx.closePath();
        }
    }

}


function revealMines() {
    for(let i = 0; i < mines.length; i++) {
        mines[i].hidden = false;
    }
}



// minesweep[1][3].hidden = false;


// random mine on i j matrix





// left click to reveal square
mine_canvas.addEventListener("mousedown", mouseDownHandler, false);
mine_canvas.addEventListener("touchstart", mouseDownHandler);


function mouseDownHandler(e){
    let client_x = e.clientX;
    let client_y = e.clientY;
    if(e.type == "touchstart") {
        let e_cond = (typeof e.originalEvent === "undefined")? e : e.originalEvent;
        let touch = e_cond.touches[0] || e_cond.changedTouches[0];
        client_x = touch.pageX;
        client_y = touch.pageY;
    } else {
        client_x = e.clientX;
        client_y = e.clientY;
    }
    mouseDownHelper(mine_canvas, client_x, client_y);
    mine_ctx.beginPath();
    mine_ctx.clearRect(0,0, mine_canvas.width, mine_canvas.height);
    mine_ctx.closePath();
    drawSquares();
    if(gameOver) {
        revealMines();
        
        // let then = Date.now();
        // let now = then;
        // while(now - then < 200){
        //     now = Date.now();
        // }
        alert("GAME OVER");
        drawSquares();
        document.location.reload();
    }
}

function mouseDownHelper(the_canvas, the_client_x, the_client_y) {
    let canvas_client_rect = the_canvas.getBoundingClientRect();
    xClick = ((the_client_x - canvas_client_rect.left)) * the_canvas.width / canvas_client_rect.width;
    yClick = ((the_client_y - canvas_client_rect.top)) * the_canvas.height / canvas_client_rect.height;
}


drawSquares();


// right click to flag square
