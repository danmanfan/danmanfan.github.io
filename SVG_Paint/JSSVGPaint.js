

let svg_paint = document.getElementById("svg_paint");
svg_paint.innerHTML = "<circle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"green\" stroke-width=\"4\" fill=\"yellow\" />";

// Have buttons selectable such that: if circle is selected, user begins drawing a circle etc.

let js_svg_rel_x = 0;
let js_svg_rel_y = 0;

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
let js_svg_path_tail = " \" stroke=\"green\" stroke-width\"3\" fill=\"none\"/>";


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




function mouseDownHandler(e) {
    // let svg_paint_rect = svg_paint.getBoundingClientRect();
    // let js_svg_path_end = js_svg_path.length - 2;
    // js_svg_rel_x = e.clientX - svg_paint_rect.left;
    // js_svg_rel_y = e.clientX - svg_paint_rect.top;
    // let points = "L" + js_svg_rel_x + " " + js_svg_rel_y;
    // if(pen_down) {
        // js_svg_path = js_svg_path.substring(0, js_svg_path_end) + points + "/>";
        // svg_paint.innerHTML = js_svg_path;
    // } else {
        js_svg_path = js_svg_path + "<path d=\"" + js_svg_path_M + js_svg_path_tail;
        pen_down = true;
    // }
    // console.log(js_svg_path);
    // console.log(js_svg_path_M);
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







function JSSVGPaintMain() {


    // requestAnimationFrame(JSSVGPaintMain);    
}


JSSVGPaintMain();