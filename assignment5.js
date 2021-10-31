// Name : Kanishk Sachdeva
// Student id : 301182362

var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 1310;
document.getElementById("CanvasforGame").appendChild(canvas);


var IsBackgroundReady = false;
var ImageofBug = new Image();
ImageofBug.onload = function() {
    IsBackgroundReady = true;
};
ImageofBug.src = "ladybug.png";

var IsBackgroundReady = false;
var ImageofBackground = new Image();
ImageofBackground.onload = function() {
    IsBackgroundReady = true;
};
ImageofBackground.src = "bg.jpg";


var bug = {
    speed: 256
};

var hopingInterval = 1800;
var totalScore = 0;

var bugHop = setInterval(function() {
    reset();
}, hopingInterval);


canvas.addEventListener("click", clicked, false);

function clicked(event) {
    event.preventDefault();
    var yaxis = event.clientY;
    var xaxis = event.clientX;

    if (yaxis > bug.y && yaxis < bug.y + 169 && xaxis < bug.x + 61 && xaxis > bug.x) {
        totalScore += 10;
        reset();
        if (hopingInterval - 100 >= 50) {
            clearInterval(bugHop);
            hopingInterval -= 100;
            bugHop = setInterval(function() {
                reset();
            }, hopingInterval);

        }
    }
}

var reset = function() {
    bug.x = 32 + (Math.random() * (canvas.width - 64));
    bug.y = 32 + (Math.random() * (canvas.height - 64));
};


var resetSpeed = function() {
    clearInterval(bugHop);
    hopingInterval = 2000;
    bugHop = setInterval(function() {
        reset();
    }, hopingInterval);
};
var scoreReset = function() {
    totalScore = 0;
    resetSpeed();
};


var render = function() {
    if (IsBackgroundReady) {
        context.drawImage(ImageofBackground, 0, 0);
    }

    if (IsBackgroundReady) {
        context.drawImage(ImageofBug, bug.x, bug.y);
    }

    document.getElementById("totalScore").innerHTML = "Total Score : " + totalScore;
    context.fillStyle = "rgb(0, 0, 250)";
    context.font = "24px Helvetica";
    context.textAlign = "left";
    context.textBaseline = "top";
};

var main = function() {
    render();
    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();