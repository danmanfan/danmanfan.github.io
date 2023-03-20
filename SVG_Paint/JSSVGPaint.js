

let svg_paint = document.getElementById("svg_paint");
// let svg_color_wheel = document.getElementById("svg_color_wheel");
let red_slider = document.getElementById("red_slider");
let green_slider = document.getElementById("green_slider");
let blue_slider = document.getElementById("blue_slider");

let color_block = document.getElementById("color_block");
let color_block_ctx = color_block.getContext("2d");

// let svg_ctx = svg_color_wheel.getContext("2d");


// Have buttons selectable such that: if circle is selected, user begins drawing a circle etc.

let js_svg_rel_x = 0;
let js_svg_rel_y = 0;

let r = 0;
let g = 0;
let b = 0;

let r_paint = 0;
let g_paint = 0;
let b_paint = 0;

let svg_stroke = "\"rgb(" + r_paint + ", " + g_paint + ", " + b_paint + ")\""

// Rectangle <rect>
// Circle <circle>
// Ellipse <ellipse>
// Line <line>
// Polyline <polyline>
// Polygon <polygon>
// Path <path>
let js_svg_path_M = "M 0 0";
let js_svg_path = "";
let pen_down = false;
let js_svg_path_tail = " \" stroke=" + svg_stroke + "stroke-width=\"1\" fill=\"none\"/>";


// M = moveto
// L = lineto
// H = horizontal lineto
// V = vertical lineto
// C = curveto
// S = smooth curveto
// Q = quadratic Bezier curve
// T = smooth quadratic Bezier curveto
// A = elliptical Arc
// Z = closepath


// Have svg file savable to user computer

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);
// document.addEventListener("ontouchstart", mouseDownHandler, false);
// document.addEventListener("ontouchmove", mouseMoveHandler, false);



function mouseDownHandler(e) {
    // let svg_color_wheel_rect = svg_color_wheel.getBoundingClientRect();
    // let svg_color_rel_x = e.clientX - svg_color_wheel_rect.left;
    // let svg_color_rel_y = e.clientY - svg_color_wheel_rect.top;
    // if(svg_color_rel_x > 255 && svg_color_rel_x < 512) {
    //     r_paint = svg_color_rel_x - 255;
    //     b_paint = 0;
    // } else if(svg_color_rel_x > -1 && svg_color_rel_x < 256) {
    //     r_paint = 0;
    //     b_paint = 256 - svg_color_rel_x;
    // }
    // if(svg_color_rel_y > -1 && svg_color_rel_y < 256) {
    //     g_paint = svg_color_rel_y;
    // }


    svg_stroke = "\"rgb(" + r_paint + ", " + g_paint + ", " + b_paint + ")\""
    js_svg_path_tail = " \" stroke=" + svg_stroke + "stroke-width=\"1\" fill=\"none\"/>";
    js_svg_path = js_svg_path + "<path d=\"" + js_svg_path_M + js_svg_path_tail;
    pen_down = true;
}

function mouseUpHandler(e) {
    pen_down = false;
}

function mouseMoveHandler(e) {
    let js_svg_path_end = js_svg_path.length - js_svg_path_tail.length;
    let svg_paint_rect = svg_paint.getBoundingClientRect();
    js_svg_rel_x = e.clientX - svg_paint_rect.left;
    js_svg_rel_y = e.clientY - svg_paint_rect.top;
    if(pen_down) {
        
        

        let points = "L" + js_svg_rel_x + " " + js_svg_rel_y;
        js_svg_path = js_svg_path.substring(0, js_svg_path_end) + points + js_svg_path_tail;
        svg_paint.innerHTML = js_svg_path;
    } else {
        js_svg_path_M = "M" + " " + js_svg_rel_x + " " + js_svg_rel_y;
    }
}

// Block color selector that displays current selected color.
function colorInBlock() {
    r_paint = red_slider.value;
    g_paint = green_slider.value;
    b_paint = blue_slider.value;

    color_block_ctx.beginPath();
    color_block_ctx.fillStyle = "rgb(" + r_paint + ", " + g_paint + ", " + b_paint + ")";
    color_block_ctx.rect(0, 0, color_block.width, color_block.height);
    color_block_ctx.fill();
    color_block_ctx.closePath();
    requestAnimationFrame(colorInBlock);
}




colorInBlock();
