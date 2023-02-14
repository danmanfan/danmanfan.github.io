// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Create_the_Canvas_and_draw_on_it
// Daniel Flynn
// Summer 2022

            let canvas = document.getElementById("breakout_canvas");
            let ctx = canvas.getContext("2d");
            let ballRadius = 10;
            let paddleHeight = 10;
            let paddleWidth = 75;
            let paddleX = (canvas.width-paddleWidth) / 2;
            let rightPressed = false;
            let leftPressed = false;
            let x = canvas.width/2;
            let y = canvas.height-30;
            let dx = 0;
            let dy = -2;
            let dv = 0;
            let brickRowCount = 3;
            let brickColumnCount = 5;
            let brickWidth = 75;
            let brickHeight = 20;
            let brickPadding = 10;
            let brickOffsetTop = 30;
            let brickOffsetLeft = 30;
            let score = 0;
            let lives = 3;
            let play = false;
            let start = false;
            let hover = false;
            let then = Date.now();

            let bricks = [];

            // ctx.fillStyle = "#000000";
            // ctx.rect(0, 0, canvas.width, canvas.height);
            // ctx.fill();


            for (var c=0; c<brickColumnCount; c++) {
                bricks[c] = [];
                for(var r=0; r<brickRowCount; r++) {
                    bricks[c][r] = {x: 0, y: 0, status: 1 };

                }
            }

            document.addEventListener("keydown", keyDownHandler, false);
            document.addEventListener("keyup", keyUpHandler, false);
            document.addEventListener("mousemove", mouseMoveHandler, false);
            document.addEventListener("mousedown", mouseDownHandler, false);

            function mouseDownHandler(e) {
                let relativeX = e.clientX - canvas.offsetLeft;
                let relativeY = e.clientY - canvas.offsetTop;
                if(relativeX > 0 && relativeX < canvas.width && relativeY > 0 && relativeY < canvas.height) {

                    if(play) {
                        start = true;
                    }
                    play = true;
                } else {
                    play = false;
                }
            }

            function mouseMoveHandler(e) {
                let relativeX = e.clientX - canvas.offsetLeft;
                let relativeY = e.clientY - canvas.offsetTop;
                if(!play) {
                    if(relativeX > 0 && relativeX < canvas.width && relativeY > 0 && relativeY < canvas.height) {
                        hover = true;
                    } else {
                        hover = false;
                    }
                }

                if(relativeX > paddleWidth/2 && relativeX < canvas.width - paddleWidth/2) {
                    dv = paddleX;
                    paddleX = relativeX - paddleWidth/2;
                    dv = paddleX - dv;
                }
            }

            function keyDownHandler(e) {
                if(e.key =="Right" || e.key == "ArrowRight") {
                    rightPressed = true;
                }
                else if(e.key == "Left" || e.key == "ArrowLeft") {
                    leftPressed = true;
                }
                else if((e.key == "Up" || e.key == "ArrowUp") && play) {
                    start = true;
                }
            }

            function keyUpHandler(e) {
                if(e.key == "Right" || e.key == "ArrowRight") {
                    rightPressed = false;
                }
                else if(e.key == "Left" || e.key == "ArrowLeft") {
                    leftPressed = false;
                }
            }

            function collisionDetection() {
                for(var c=0; c<brickColumnCount; c++) {
                    for(var r=0; r<brickRowCount; r++) {
                        var b = bricks[c][r];
                        if(b.status == 1) {
                            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                                dy = -dy;
                                b.status = 0;
                                score++;
                                if(score == brickRowCount*brickColumnCount) {
                                    alert("YOU WIN, CONGRATULATIONS!");
                                    document.location.reload();
                                    // clearInterval(interval);
                                }
                            }
                        }
                    }
                }
            }



            function drawMenu() {
                drawBackground();
                if(hover) {
                    ctx.font = "32px Arial";
                    ctx.fillStyle = "#0035DD";
                    if(!start){
                        ctx.fillText("CLICK TO START!", canvas.width/8 , canvas.height/2);
                    } else {
                        ctx.fillText("CLICK TO RESUME!", canvas.width/8, canvas.height/2);
                    }
                } else {
                    ctx.font = "32px Arial";
                    ctx.fillStyle = "#0095DD";
                    if(!start){
                        ctx.fillText("CLICK TO START!", canvas.width/8 , canvas.height/2);
                    } else {
                        ctx.fillText("CLICK TO RESUME!", canvas.width/8, canvas.height/2);
                    }
                }
            }

            function drawScore() {
                ctx.font = "16px Arial";
                ctx.fillStyle = "#0095DD";
                ctx.fillText("Score: "+score, 8, 20);
            }

            function drawLives() {
                ctx.font = "16px Arial";
                ctx.fillStyle = "#0095DD";
                ctx.fillText("Lives: "+lives, canvas.width-65, 20);
            }


            function drawBall() {
                ctx.beginPath();
                ctx.arc(x, y, ballRadius, 0, Math.PI*2);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }

            function drawPaddle() {
                ctx.beginPath();
                ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth,
            paddleHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }

            function drawBackground() {
                ctx.fillStyle = "#000000";
                ctx.rect(0, 0, canvas.width, canvas.height);
                ctx.fill();
                ctx.closePath();
            }

            function drawBricks() {
                for(var c=0; c<brickColumnCount; c++) {
                    for(var r=0; r<brickRowCount; r++) {
                        
                        if(bricks[c][r].status == 1) {
                            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                            bricks[c][r].x = brickX;
                            bricks[c][r].y = brickY;
                            ctx.beginPath();
                            ctx.rect(brickX, brickY, brickWidth, brickHeight);
                            ctx.fillStyle = "#0095DD";
                            ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
            }

            function draw() {

                var now = Date.now();
                var elapsed = now - then;

                if(elapsed > 100 / 9) {
                then = Date.now();

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawBackground();
                drawBricks();
                drawBall();
                drawPaddle();
                drawScore();
                drawLives();
                collisionDetection();

                if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
                    dx = -dx;
                }
                if(y + dy < ballRadius) {
                    dy = -dy;
                }
                else if(y + dy > canvas.height-ballRadius) {
                    if(x > paddleX && x < paddleX + paddleWidth) {
                        dy = -dy;
                        dx += dv;
                        if (dx > 12) {
                            dx = 12;
                        } else if (dx < -12) {
                            dx = -12;
                        }
            
                        
                    }
                    else {
                        lives--;
                        if(!lives) {
                            alert("GAME OVER");
                            document.location.reload();
                            
                        }
                        else {
                            start = false;
                            x = canvas.width/2;
                            y = canvas.height-30;
                            dx = 0;
                            dy = -2;

                            paddleX = (canvas.width-paddleWidth)/2;
                        }
                    }
                }
                if(rightPressed) {
                    paddleX += 7;
                    dv = 5; // should be 7 but its 5 just because.
                    if (paddleX + paddleWidth > canvas.width) {
                        paddleX = canvas.width - paddleWidth;
                    }
                }
                else if(leftPressed) {
                    paddleX -= 7;
                    dv = -5;
                    if (paddleX < 0){
                        paddleX = 0;
                    }
                } else {
                    dv = 0;
                }

                if (start) {
                    x += dx;
                    y += dy;
                } else {
                    x = paddleX + paddleWidth/2;
                    // y = canvas.height-ballRadius+1;
                }

                } // end if elapsed > 100 / 9
                if(play) {
                    requestAnimationFrame(draw);
                }
            }

            function mainMenu() {

                if(play) {
                    draw();
                } else {
                    drawMenu();
                }


                requestAnimationFrame(mainMenu);

            }





            mainMenu();