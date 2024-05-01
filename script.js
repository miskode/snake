let board = null;
let alive = true;
let started = false;
let paused = false;
let cand = "r"
let direction = "r";
let snake = [[12, 8], [13, 8], [14, 8]];
let apple = [20, 8];
let empty = [];

let bgColor = null;
let snakeColor = null;
let appleColor = null;
let speed = null;
if (localStorage.getItem("bgColor") === null) {
    bgColor = "#000000";
    localStorage.setItem("bgColor", bgColor)
} else {
    bgColor = localStorage.getItem("bgColor");
}
if (localStorage.getItem("snakeColor") === null) {
    snakeColor = "#00ff00";
    localStorage.setItem("snakeColor", snakeColor)
} else {
    snakeColor = localStorage.getItem("snakeColor");
}
if (localStorage.getItem("appleColor") === null) {
    appleColor = "#ff0000";
    localStorage.setItem("appleColor", appleColor)
} else {
    appleColor = localStorage.getItem("appleColor");
}
if (localStorage.getItem("speed") === null) {
    speed = 5;
    localStorage.setItem("speed", speed);
} else {
    speed = localStorage.getItem("speed");
}

for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 32; x++) {
        if (!(y === 8 && x > 11 && x < 15)) {
            empty.push([x, y]);
        }
    }
}



//------Boilerplate Functions------



function print(t) {
    document.getElementById("output").innerHTML = t;
}



function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



Array.prototype.indexOfForArrays = function(search)
{
  var searchJson = JSON.stringify(search); // "[3,566,23,79]"
  var arrJson = this.map(JSON.stringify); // ["[2,6,89,45]", "[3,566,23,79]", "[434,677,9,23]"]

  return arrJson.indexOf(searchJson);
};

Array.prototype.arrIncludes = function(search)
{
  var searchJson = JSON.stringify(search); // "[3,566,23,79]"
  var arrJson = this.map(JSON.stringify); // ["[2,6,89,45]", "[3,566,23,79]", "[434,677,9,23]"]

  return arrJson.includes(searchJson);
};



//---------Game Functions----------



function setup() {
    board = document.getElementById("board").getContext("2d");
    addEventListener("keydown", (e) => {
        e.preventDefault();
        if (!started) {
            game();
        }
        started = true;
        switch (e.key) {
            case "ArrowUp":
                if (direction !== "d") {
                    cand = "u";
                }
                break;
            case "w":
                if (direction !== "d") {
                    cand = "u";
                }
                break;
            case "ArrowDown":
                if (direction !== "u") {
                    cand = "d";
                }
                break;
            case "s":
                if (direction !== "u") {
                    cand = "d";
                }
                break;
            case "ArrowLeft":
                if (direction !== "r") {
                    cand = "l";
                }
                break;
            case "a":
                if (direction !== "r") {
                    cand = "l";
                }
                break;
            case "ArrowRight":
                if (direction !== "l") {
                    cand = "r";
                }
                break;
            case "d":
                if (direction !== "l") {
                    cand = "r";
                }
                break;
            case " ":
                if (started) {
                    if (paused) {
                        paused = false;
                        manage("pause", "close");
                    } else {
                        paused = true;
                        manage("pause", "open");
                    }
                }
        j();
    }
    });
    render_grid();
    document.getElementById("board").style.backgroundColor = bgColor;
    board.fillStyle = "rgb(0 0 0 / 70%)";
    board.fillRect(0, 0, 1280, 640);
}



function test() {
    switch (cand) {
        case "u":
            if (snake[snake.length - 1][1] > 0 && !snake.arrIncludes([snake[snake.length - 1][0], snake[snake.length - 1][1] - 1])) {
                return true;
            } else if (snake[snake.length - 1][0] === snake[0][0] && snake[snake.length - 1][1] - 1 === snake[0][1]) {
                return true;
            } else {
                return false;
            }
            break;
        case "d":
            if (snake[snake.length - 1][1] < 15 && !snake.arrIncludes([snake[snake.length - 1][0], snake[snake.length - 1][1] + 1])) {
                return true;
            } else if (snake[snake.length - 1][0] === snake[0][0] && snake[snake.length - 1][1] + 1 === snake[0][1]) {
                return true;
            } else {
                return false;
            }
            break;
        case "l":
            if (snake[snake.length - 1][0] > 0 && !snake.arrIncludes([snake[snake.length - 1][0] - 1, snake[snake.length - 1][1]])) {
                return true;
            } else if (snake[snake.length - 1][0] - 1 === snake[0][0] && snake[snake.length - 1][1] === snake[0][1]) {
                return true;
            } else {
                return false;
            }
            break;
        case "r":
            if (snake[snake.length - 1][0] < 31 && !snake.arrIncludes([snake[snake.length - 1][0] + 1, snake[snake.length - 1][1]])) {
                return true;
            } else if (snake[snake.length - 1][0] + 1 === snake[0][0] && snake[snake.length - 1][1] === snake[0][1]) {
                return true;
            } else {
                return false;
            }
            break;
    }
}



function move() {
    switch (cand) {
        case "u":
            snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - 1]);
            empty.splice(empty.indexOfForArrays([snake[snake.length - 1][0], snake[snake.length - 1][1] - 1]), 1);
            break;
        case "d":
            snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + 1]);
            empty.splice(empty.indexOfForArrays([snake[snake.length - 1][0], snake[snake.length - 1][1] + 1]), 1);
            break;
        case "l":
            snake.push([snake[snake.length - 1][0] - 1, snake[snake.length - 1][1]]);
            empty.splice(empty.indexOfForArrays([snake[snake.length - 1][0] - 1, snake[snake.length - 1][1]]), 1);
            break;
        case "r":
            snake.push([snake[snake.length - 1][0] + 1, snake[snake.length - 1][1]]);
            empty.splice(empty.indexOfForArrays([snake[snake.length - 1][0] + 1, snake[snake.length - 1][1]]), 1);
            break;
    }
    if (snake[snake.length - 1][0] !== apple[0] || snake[snake.length - 1][1] !== apple[1]) {
        empty.push(snake[0]);
        snake.splice(0, 1);
    } else {
        apple = empty[rand(0, empty.length)];
    }
    direction = cand;
}



function draw_tile(x, y, c) {
    const cMap = [bgColor, snakeColor, appleColor];
    board.fillStyle = cMap[c]
    board.fillRect(x * 40, y * 40, 40, 40);
}



function render_grid() {
    board.clearRect(0, 0, 1280, 640);
    draw_tile(apple[0], apple[1], 2);
    for (let i of snake) {
        draw_tile(i[0], i[1], 1);
    }
}



function apply() {
    appleColor = document.getElementById("apcol").value;
    snakeColor = document.getElementById("sncol").value;
    bgColor = document.getElementById("bgcol").value;
    speed = document.getElementById("speed").value;
    localStorage.setItem("appleColor", appleColor);
    localStorage.setItem("snakeColor", snakeColor);
    localStorage.setItem("bgColor", bgColor);
    localStorage.setItem("speed", speed);
    document.getElementById("board").style.backgroundColor = bgColor;
    render_grid();
    board.fillStyle = "rgb(0 0 0 / 70%)";
    board.fillRect(0, 0, 1280, 640);
}



function reset() {
    document.getElementById("apcol").value = "#ff0000";
    document.getElementById("sncol").value = "#00ff00";
    document.getElementById("bgcol").value = "#000000";
    document.getElementById("speed").value = 5;
    appleColor = "#ff0000"
    snakeColor = "#00ff00"
    bgColor = "#000000"
    speed = 5;
    localStorage.setItem("appleColor", appleColor);
    localStorage.setItem("snakeColor", snakeColor);
    localStorage.setItem("bgColor", bgColor);
    localStorage.setItem("speed", speed);
}



function manage(focus, op) {
    if (op === "open") {
        document.getElementById(focus).style.display = "initial";
    } else {
        document.getElementById(focus).style.display = "none";
    }
    if (focus === "settings") {
        document.getElementById("apcol").value = appleColor;
        document.getElementById("sncol").value = snakeColor;
        document.getElementById("bgcol").value = bgColor;
        document.getElementById("speed").value = speed;
    }
}



function retry() {
    manage("game_over", "close");
    alive = true;
    started = false;
    cand = "r"
    direction = "r";
    snake = [[12, 8], [13, 8], [14, 8]];
    apple = [20, 8];
    empty = [];
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 32; x++) {
            if (!(y === 8 && x > 11 && x < 15)) {
                empty.push([x, y]);
            }
        }
    }
    render_grid();
    board.fillStyle = "rgb(0 0 0 / 70%)";
    board.fillRect(0, 0, 1280, 640);
}



//------------Game Loop------------



async function game() {
    let prevTime = 0;
    let deltaTime = 0;
    while (alive) {
        if (!paused) {
            prevTime = Date.now()
            if (test()) {
                move();
                render_grid();
            } else {
                alive = false;
                board.fillStyle = "rgb(0 0 0 / 70%)";
                board.fillRect(0, 0, 1280, 640);
                document.getElementById("score").innerHTML = (snake.length * 10 - 30).toString();
                document.getElementById("game_over").style.display = "initial";
            }
            deltaTime = Date.now() - prevTime;
            await new Promise(m => setTimeout(m, 1000 / speed - deltaTime));
        } else {
            await new Promise(m => setTimeout(m, 17));
        }
    }
}
