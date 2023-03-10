// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Create_the_Canvas_and_draw_on_it
// Daniel Flynn
// Summer 2022

            let canvas = document.getElementById("breakout_canvas");
            let ctx = canvas.getContext("2d");
            let ballRadius = 10;
            let paddleHeight = 10;
            let paddleWidth = 75;
            let paddleX = (canvas.width-paddleWidth) / 2;
            // let rightPressed = false;
            // let leftPressed = false;
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
            // let play = false;
            // let start = false;
            // let hover = false;
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



            class JSBreakOut {
                constructor(){
                    this.play = false;
                    this.start = false;
                    this.hover = false;
                    this.leftPressed = false;
                    this.rightPressed = false;
                }
              
            }

            var jsBreakOut = new JSBreakOut();



            // document.addEventListener("keydown", keyDownHandler, false);
            // document.addEventListener("keyup", keyUpHandler, false);
            
            function paddleMoveHandler(the_relative_x) {
                if(the_relative_x > paddleWidth/2 && the_relative_x < canvas.width - paddleWidth/2) {
                    dv = paddleX;
                    paddleX = the_relative_x - paddleWidth/2;
                    dv = paddleX - dv;
                }

                console.log()

                // console.log(this.hover);

            }

            // function keyDownHandler(e) {
            //     if(e.key =="Right" || e.key == "ArrowRight") {
            //         jsBreakOut.rightPressed = true;
            //     }
            //     else if(e.key == "Left" || e.key == "ArrowLeft") {
            //         jsBreakOut.leftPressed = true;
            //     }
            //     else if((e.key == "Up" || e.key == "ArrowUp") && jsBreakOut.play) {
            //         e.preventDefault();
            //         jsBreakOut.start = true;
            //     }
            //     else if((e.key == "Down" || e.key == "ArrowDown") && jsBreakOut.play) {
            //         e.preventDefault();
            //     }
            // }

            // function keyUpHandler(e) {
            //     if(e.key == "Right" || e.key == "ArrowRight") {
            //         jsBreakOut.rightPressed = false;
            //     }
            //     else if(e.key == "Left" || e.key == "ArrowLeft") {
            //         jsBreakOut.leftPressed = false;
            //     }
            // }

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
                ctx.beginPath();
                if(jsBreakOut.hover) {
                    ctx.font = "32px Arial";
                    ctx.fillStyle = "#0035DD";
                    if(!jsBreakOut.start){
                        ctx.fillText("CLICK TO START!", canvas.width/8 , canvas.height/2);
                    } else {
                        ctx.fillText("CLICK TO RESUME!", canvas.width/8, canvas.height/2);
                    }
                } else {
                    ctx.font = "32px Arial";
                    ctx.fillStyle = "#0095DD";
                    if(!jsBreakOut.start){
                        ctx.fillText("CLICK TO START!", canvas.width/8 , canvas.height/2);
                    } else {
                        ctx.fillText("CLICK TO RESUME!", canvas.width/8, canvas.height/2);
                    }
                }
                ctx.closePath();
            }

            function drawScore() {
                ctx.beginPath();
                ctx.font = "16px Arial";
                ctx.fillStyle = "#0095DD";
                ctx.fillText("Score: "+score, 8, 20);
                ctx.closePath();
            }

            function drawLives() {
                ctx.beginPath();
                ctx.font = "16px Arial";
                ctx.fillStyle = "#0095DD";
                ctx.fillText("Lives: "+lives, canvas.width-65, 20);
                ctx.closePath();
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
                ctx.beginPath();
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
                ctx.beginPath();
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
                            jsBreakOut.start = false;
                            x = canvas.width/2;
                            y = canvas.height-30;
                            dx = 0;
                            dy = -2;

                            paddleX = (canvas.width-paddleWidth)/2;
                        }
                    }
                }
                if(jsBreakOut.rightPressed) {
                    paddleX += 7;
                    dv = 5; // should be 7 but its 5 just because.
                    if (paddleX + paddleWidth > canvas.width) {
                        paddleX = canvas.width - paddleWidth;
                    }
                }
                else if(jsBreakOut.leftPressed) {
                    paddleX -= 7;
                    dv = -5;
                    if (paddleX < 0){
                        paddleX = 0;
                    }
                } else {
                    dv = 0;
                }

                if (jsBreakOut.start) {
                    x += dx;
                    y += dy;
                } else {
                    x = paddleX + paddleWidth/2;
                    // y = canvas.height-ballRadius+1;
                }

                } // end if elapsed > 100 / 9
                // if(play) {
                //     requestAnimationFrame(draw);
                // }
                ctx.closePath();
            }

            function mainMenu() {

                if(jsBreakOut.play) {
                    draw();
                } else {
                    drawMenu();
                }

                // requestAnimationFrame(mainMenu);

            }





            mainMenu();