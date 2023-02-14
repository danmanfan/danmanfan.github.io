// arcade shooter

    let canvas = document.getElementById("shoot_em_canvas");
    let ctx = canvas.getContext("2d");

    let bob = badguy(canvas.width + 25, canvas.height - 25);

    let then = Date.now();
    let ref = 100;
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
        this.status = ['#00ff40', '#ffff00', '#ff0000'];
        this.s = 0; // current status of badguy
    }


    function drawBadGuy(theBadguy) {
        ctx.beginPath();
        ctx.arc(theBadguy?.x, theBadguy?.y, theBadguy?.headRadius, 0 , Math.PI*2);
        ctx.fillStyle = theBadguy?.status[theBadguy?.s];
        ctx.fill();
        
        ctx.rect(theBadguy?.x, theBadguy?.y + theBadguy?.headRadius, theBadguy?.bodyWidth, theBadguy?.bodyHeight);
        // ctx.fillStyle = theBadguy.status[theStatus];
        ctx.fill();
        

        ctx.closePath();



    }

    function drawShootEm(){
        let sNow = Date.now();
        let sElapsed = sNow - then;

        if (sElapsed > 100 / 9) {
            iRef = iRef + 1;

            then = Date.now();

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBadGuy(bob);


        }

    }



    function shootEmMainMenu(){

        if(iRef < ref){
            drawShootEm();
            requestAnimationFrame(shootEmMainMenu);
        }

        

    }

shootEmMainMenu();