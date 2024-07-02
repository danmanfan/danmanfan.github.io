

let mine_canvas = document.getElementById("minesweeper_canvas");
let flagDoc = document.getElementById("flag");
let numbOfMineDoc = document.getElementById("number_of_mines");
let updateInfoDoc = document.getElementById("update_info");
let headerDoc = document.getElementById("header");
let mine_ctx = mine_canvas.getContext("2d");
let scale = mine_canvas.width / mine_canvas.getBoundingClientRect().width;
mine_ctx.font = 3 * scale + "vw Georgia";
let block_length = mine_canvas.width / 25; // magic number
let mine_radius = block_length;
let padding = mine_canvas.width/100;
let line_padding = padding / 10;
var numb_of_mines = 25;

// Let user move around the mine field.
let scroll_right = 0;
let scroll_down = 0;

let flag = false;

let xClick = -1;
let yClick = -1;

let gameOver = false;

var minesweep_rows = 10;
var minesweep_col = 10;

var minesweep = [];

var mines = [];

let then = Date.now();

let timer = {hour:0, minute:0, sec:0, milisec:0};
let timer_x = padding;
let timer_y = padding;
let timer_size = mine_canvas.height/ 10;

let r = 255;
let g = 0;
let b = 0;
let roy = true;
let gee = false;
let biv = false;

for(let ii = 0; ii < minesweep_rows; ii++) {
    minesweep[ii] = [];
    for(let jj = 0; jj <  minesweep_col; jj++) {
        minesweep[ii][jj] = {value: 0, hidden: true, bomb: false, flagged: false};
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

    var now = Date.now();
    var elapsed = now - then;
    if(elapsed > 5.75) { // magic number, greater than 10 milisec
        then = Date.now();
        rainbow();
        timer.milisec++;
        if(timer.milisec > 100) {
            timer.milisec = 0;
            timer.sec++;
            if(timer.sec > 60) {
                timer.sec = 0;
                timer.minute++;
                if(timer.minute > 60) {
                    timer.minute = 0;
                    timer.hour++;
                }
            }
        }




        mine_ctx.beginPath();
        mine_ctx.clearRect(0,0, mine_canvas.width, mine_canvas.height);
        mine_ctx.closePath();
        // mine_ctx.closePath();

        for(let dsi = 0; dsi < minesweep_rows; dsi++) {
            for(let dsj = 0; dsj < minesweep_col; dsj++) {
                let block = minesweep[dsi][dsj];
                let squareX = (dsj * (block_length+line_padding)) + padding ; //magic number :padding of one, magic number : square offset left 
                let squareY = (dsi * (block_length+line_padding)) + (padding * 2) + timer_size; //
                if(xClick > squareX && xClick < squareX + block_length){
                    if(yClick > squareY && yClick < squareY + block_length){
                        xClick = -1;
                        yClick = -1;
                        if(flag) {
                            if(block.hidden) {
                                // block.flagged = !block.flagged; // careful here.
                                if(block.flagged) {
                                    block.flagged = false;
                                } else {
                                    block.flagged = true;
                                }
                            }
                        } else {
                            if(!block.flagged) {
                                block.hidden = false;
                                if(block.value == 10) {

                                    // drawSquares();
        
                                    gameOver = true;
                                    if(gameOver) {
                                        revealMines();
                                        alert("GAME OVER");
                                        document.location.reload();
                                    }
                                }

                            }

                        }

                    }
                }
                
                if(block.hidden) {

                    mine_ctx.beginPath();
                    // mine_ctx.fillStyle = "#0095DD";
                    mine_ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
                    mine_ctx.rect(squareX, squareY, block_length, block_length);
                    mine_ctx.fill();
                    
                    if(block.flagged) {
                        mine_ctx.fillStyle = "black";
                        mine_ctx.moveTo(squareX, squareY + block_length);
                        mine_ctx.lineTo(squareX + (block_length/2), squareY);
                        mine_ctx.lineTo(squareX + block_length, squareY + block_length);
                        mine_ctx.lineTo(squareX, squareY + block_length);
                        mine_ctx.fill();
                    }
                    mine_ctx.closePath();

                } else {

                    mine_ctx.beginPath();
                    // mine_ctx.fillStyle = "black";
                    mine_ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
                    mine_ctx.fillText(block.value,squareX + block_length/4,squareY + ((block_length/4) * 3), block_length/2.5);
                    mine_ctx.closePath();
                }

                mine_ctx.beginPath();
                // mine_ctx.fillStyle = "black";
                mine_ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
                mine_ctx.fillText(timer.hour + ":" + timer.minute + ":" + timer.sec 
                    // + "." + (timer.milisec - (timer.milisec %10))
                    , timer_x + timer_size/8, timer_y + (timer_size/4 * 3));
                mine_ctx.closePath();
                // mine_ctx.closePath();
            }
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


function rainbow(){
    if(roy) {
        if(g < 255) {
            g++;
        } else {
            roy = false;
            gee = true;
        }
    } else if(gee) {
        if(r >0) {
            r--;
        } else {
            if(g>0) {
                g--;
            }
            if(b<255) {
                b++;
            }
        }
        if(g ==0 && b ==255) {
            gee = false;
            biv = true;
        }
    } else if(biv) {
        if(r==255 && b==0) {
            roy = true;
        } else if(r < 75) {
            if(b > 130 ) {
                b--;
            }
            r++;
        } else if(r > 74 && r < 127 ) {
            r++;
            if(b < 255) {
                b++;
            }
        } else if(r == 127 && b <255) {
                b++;
        } else {
            biv = false;
        } 
    } else {
        if(r < 255) {
            r++;
        }
        if(b > 0) {
            b--;
        }
        if(r == 255 & b == 0) {
            roy = true;
        }
    }

}


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

    // drawSquares();
    // if(gameOver) {
    //     revealMines();
        
    //     // let then = Date.now();
    //     // let now = then;
    //     // while(now - then < 200){
    //     //     now = Date.now();
    //     // }
    //     alert("GAME OVER");
    //     drawSquares();
    //     document.location.reload();
    // }
}

function mouseDownHelper(the_canvas, the_client_x, the_client_y) {
    let canvas_client_rect = the_canvas.getBoundingClientRect();
    xClick = ((the_client_x - canvas_client_rect.left)) * the_canvas.width / canvas_client_rect.width;
    yClick = ((the_client_y - canvas_client_rect.top)) * the_canvas.height / canvas_client_rect.height;
}



function flagOnClick() {
    
    if(flag) {
        flag = false;
    } else{
        
        flag = true;
    }
}


function main() {
    flagDoc.style.color = "black";
    if(flag) {
        flagDoc.style.color = "rgb(" + r + ", " + g + ", " + b + ")";
    }
    numbOfMineDoc.innerHTML = numb_of_mines;
    numbOfMineDoc.style.color = "rgb(" + r + ", " + g + ", " + b + ")";
    updateInfoDoc.style.color = "rgb(" + r + ", " + g + ", " + b + ")";
    headerDoc.style.color = "rgb(" + r + ", " + g + ", " + b + ")";
    drawSquares();
    requestAnimationFrame(main);
}

main();


// drawSquares();




// right click to flag square
