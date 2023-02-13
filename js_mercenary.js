


class actor {
    constructor(height, width, name, color, alive) {
        this.height = height;
        this.width = width;
        this.name = name;
        this.color = color;
        this.alive = alive;
    }
}



var canvas2 = document.getElementById("mercenary_canvas");

var ctx2 = canvas2.getContext("2d");
var number_of_monsters = 25;
var height_of_monsters = 20;
var width_of_monsters = 30;
var height_of_player = 20;
var width_of_player = 30;

var mercPlay = false;

var player = new actor(height_of_player, width_of_player, "player", "#666", true);


var monsters = [];
for (var i = 0; i < number_of_monsters; i++) {
    monsters[i] = new actor(height_of_monsters, width_of_monsters, "monster", "#fff", true);
}

function drawMenu(theCtx, theCanvas) {
    if(hover) {
        theCtx.font = "32px Arial";
        theCtx.fillStyle = "#0035DD";
        theCtx.fillText("CLICK TO START!", theCanvas.width/8 , theCanvas.height/2);
    } else {
        theCtx.font = "32px Arial";
        theCtx.fillStyle = "#0095DD";
        theCtx.fillText("CLICK TO START!", theCanvas.width/8 , theCanvas.height/2);
    }
}


function drawMonster(i) {
    ctx2.rect(0, 0, monsters[i].width, monsters[i].height);
    ctx2.fillStyle = monsters.color;

}

function drawPlayer(){
    ctx2.rect(100, 100, player.width, player.height);
    ctx2.fillStyle = player.color;

}

function drawMerc(){
    ctx2.beginPath();
    drawMonster(1);
    drawPlayer();
    ctx2.fill();
    ctx2.closePath();
}

function drawThis(){
    if(mercPlay){
        drawMerc();
    } else {
        drawMenu(ctx2, canvas2)
    }
    // drawMerc();
    requestAnimationFrame(drawThis);
}

drawThis();



