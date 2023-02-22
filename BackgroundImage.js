// Daniel Flynn
// Spring 2023

// Have background image move around


// class BackgroundImage {

    // BackgroundImage() {
        let background_canvas = document.getElementById("live_background");
        let background_ctx = background_canvas.getContext("2d");
        // let background_image = "art001e000343_orig.jpg"
        let background_image = document.createElement('img');
        background_image.id = 'background_image';
        background_image.src = 'art001e000343_orig.jpg'
        let background_sx = 0;
        let background_sy = 0;
        let background_sWidth = background_canvas.width;
        let background_sHeight = background_canvas.height;
        let background_dx = 0;
        let background_dy = 0;
        let background_then = Date.now();
    // }
    
    function drawBackgroundImage() {
        let background_now = Date.now();
        let background_elapsed = background_now - background_then;
        if(background_elapsed > 100 / 3) {
            background_then = Date.now();
            background_sx ++;
            background_sy ++;
            if(background_sx + background_sWidth == background_image.naturalWidth) {
                background_sx = 0;
                background_sy = 0;
            }
            if(background_sy + background_sHeight == background_image.naturalHeight) {
                background_sx = 0;
                background_sy = 0;
            }
            background_ctx.beginPath();
            background_ctx.drawImage(background_image, background_sx, background_sy,
                background_sWidth, background_sHeight, background_dx, background_dy, 
                background_canvas.width, background_canvas.height);
            background_ctx.fill();
            background_ctx.closePath();
            
        }
        // console.log("hi");
        // requestAnimationFrame(drawBackground);
    }

    drawBackgroundImage();

// }

// drawBackground();

