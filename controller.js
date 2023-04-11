


let breakout_canvas = document.getElementById("breakout_canvas");
// let shoot_em_canvas = document.getElementById("shoot_em_canvas");
// let space_rocks_canvas = document.getElementById("space_rocks_canvas");
// let js_breakout = new JSBreakOut();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);

// https://www.w3schools.com/jsref/obj_touchevent.asp
document.addEventListener("touchmove", mouseMoveHandler);
document.addEventListener("touchstart", mouseDownHandler);


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

}




function mouseMoveHandler(e) {
    let client_x = 0;
    let client_y = 0;
    // https://stackoverflow.com/questions/41993176/determine-touch-position-on-tablets-with-javascript
    if(e.type == "touchmove") {
        //                         condition          =       true : false
        let e_cond = (typeof e.originalEvent === "undefined")? e : e.originalEvent;
        let touch = e_cond.touches[0] || e_cond.changedTouches[0];
        client_x = touch.pageX;
        client_y = touch.pageY;
    } else {
        client_x = e.clientX;
        client_y = e.clientY;
    }
        mouseMoveHelper(breakout_canvas, client_x, client_y, jsBreakOut, paddleMoveHandler);
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


function keyDownHandler(e) {
    if(e.key =="Right" || e.key == "ArrowRight") {
        jsBreakOut.rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        jsBreakOut.leftPressed = true;
    }
    else if((e.key == "Up" || e.key == "ArrowUp") && jsBreakOut.play) {
        e.preventDefault();
        jsBreakOut.start = true;
    }
    else if((e.key == "Down" || e.key == "ArrowDown") && jsBreakOut.play) {
        e.preventDefault();
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        jsBreakOut.rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        jsBreakOut.leftPressed = false;
    }
}
