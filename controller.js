


let breakout_canvas = document.getElementById("breakout_canvas");
// let shoot_em_canvas = document.getElementById("shoot_em_canvas");
// let space_rocks_canvas = document.getElementById("space_rocks_canvas");
// let js_breakout = new JSBreakOut();

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);


function mouseDownHandler(e){
    let client_x = e.clientX;
    let client_y = e.clientY;
    mouseDownHelper(breakout_canvas, client_x, client_y, jsBreakOut);

    
    
}


function mouseDownHelper(the_canvas, the_client_x, the_client_y, the_game_cons) {
    let canvas_client_rect = the_canvas.getBoundingClientRect();
    let relative_x = the_client_x - canvas_client_rect.left;
    let relative_y = the_client_y - canvas_client_rect.top;
    if(relative_x > 0 && relative_x < the_canvas.width && relative_y > 0 && relative_y < the_canvas.height) {

        if(the_game_cons.play) {
            the_game_cons.start = true;
        }
        the_game_cons.play = true;

    } else {
        the_game_cons.play = false;
    }

    console.log(the_game_cons.play);
}




function mouseMoveHandler(e) {
    let client_x = e.clientX;
    let client_y = e.clientY;
    mouseMoveHelper(breakout_canvas, client_x, client_y, jsBreakOut, paddleMoveHandler);
    // console.log(js_breakout.hover);
}


function mouseMoveHelper(the_canvas, the_client_x, the_client_y, the_game_cons, the_fun_callback_x) {
    let canvas_client_rect = the_canvas.getBoundingClientRect();
    let relative_x = the_client_x - canvas_client_rect.left;
    let relative_y = the_client_y - canvas_client_rect.top;   
    if(!the_game_cons.play) {
        if(relative_x > 0 && relative_x < the_canvas.width && relative_y > 0 && relative_y < the_canvas.height) {
            the_game_cons.hover = true;
        } else {
            the_game_cons.hover = false;
        }
    }

    the_fun_callback_x(relative_x);

}
