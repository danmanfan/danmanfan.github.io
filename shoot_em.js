// arcade shooter

    let shoot_em_canvas = document.getElementById("shoot_em_canvas");
    let shoot_em_ctx = shoot_em_canvas.getContext("2d");

    // let bob = badguy(shoot_em_canvas.width + 25, shoot_em_canvas.height - 25);

    let shoot_em_then = Date.now();
    let ref = 1000;
    let iRef = 0;


    function badguy(theX, theY){
        this.x = theX;
        this.y = theY;
        this.headRadius = 10;
        this.bodyHeight = 75;
        this.bodyWidth = 30;
        this.rArmHeight = 40;
        this.armWidth = 15;
        this.lArmHeight = 90;
        this.legHeight = 90;
        this.legWidth = 20;
        this.status = ["#00ff40", "#ffff00", "#ff0000"];
        this.s = 0; // current status of badguy
    }


    function drawBadGuy(theBadguy) {
        shoot_em_ctx.beginPath();
        shoot_em_ctx.arc(theBadguy?.x, theBadguy?.y, theBadguy?.headRadius, 0 , Math.PI*2);
        shoot_em_ctx.fillStyle = theBadguy?.status[theBadguy?.s];
        // shoot_em_ctx.fill();
        // console.log(theBadguy.status[1]);
        shoot_em_ctx.rect(theBadguy?.x/2, theBadguy?.y + theBadguy?.headRadius, theBadguy?.bodyWidth, theBadguy?.bodyHeight);
        // shoot_em_ctx.fillStyle = theBadguy.status[theBadguy?.s];
        shoot_em_ctx.fill();
        

        shoot_em_ctx.closePath();



    }

    function drawShootEm(){
        let sNow = Date.now();
        let sElapsed = sNow - shoot_em_then;

        if (sElapsed > 100 / 9) {
            iRef = iRef + 1;

            shoot_em_then = Date.now();

            shoot_em_ctx.clearRect(0, 0, shoot_em_canvas.width, shoot_em_canvas.height);
            let bob = new badguy(25, 25);
            // console.log(bob.status[1]);
            drawBadGuy(bob);


        } // end if sElapsed > 100 / 9

        if(iRef < ref) {
            requestAnimationFrame(drawShootEm);
        }


    }



    function shootEmMainMenu(){

        if(iRef < ref){
            drawShootEm();
            requestAnimationFrame(shootEmMainMenu);
        }

        

    }

shootEmMainMenu();