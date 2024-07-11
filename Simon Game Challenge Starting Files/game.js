// TEST IF ACCESS TO JS IS THERE
alert('HEY THERE.....COME PLAY SIMON GAME WITH ME !');
// VARIABLES 
let order = [];
let playing = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector('#turn');
const topLeft = document.querySelector('#topleft');
const topRight = document.querySelector('#topright');
const bottomLeft = document.querySelector('#bottomleft');
const bottomRight = document.querySelector('#bottomright');
const strictBtn = document.querySelector('#strict');
const onBtn = document.querySelector('#on');
const startBtn = document.querySelector('#start');

// power button, strict and start button 
// strict button
strictBtn.addEventListener('change', () => { 
    if (strictBtn.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
});

// on button
onBtn.addEventListener('click', () => {
    if (onBtn.checked == true) {
        on = true;
        turnCounter.innerHTML = '-';
    } else {
        on = false;
        turnCounter.innerHTML = '';
        clearColor();
        clearInterval(intervalId);
    }
})

// start button 
startBtn.addEventListener('click', (event) =>{
    if (on || win) {
        play()
    }
})

// function to play 
function play(){
    // reset variables
    win = false;
    order = [];
    playerOder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;

    // RANDOM FILL UP ARRAY
    for (var i = 0; i < 20; i++){
        order.push(Math.floor(Math.random() * 4) + 1)
    }
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}
function gameTurn() {
    on = false
    if (flash == turn){
        clearInterval(intervalId)
        compTurn = false;
        clearColor();
        on = true;
    }
    if (compTurn){
        clearColor();
        setTimeout( () => {
            if(order[flash] == 1) one();
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++;
        }, 200);
    }
}
// function to light up colors
function one(){
    if (noise){
        let audio = document.getElementById('clip1');
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = 'lightgreen';
}
function two(){
    if (noise){
        let audio = document.getElementById('clip2');
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = 'tomato';
}
function three(){
    if (noise){
        let audio = document.getElementById('clip3');
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = 'yellow';
}
function four(){
    if (noise){
        let audio = document.getElementById('clip4');
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = 'lightskyblue';
}
// check color
function clearColor(){
    topLeft.style.backgroundColor = 'darkgreen';
        topRight.style.backgroundColor = 'darkred';
        bottomLeft.style.backgroundColor = 'goldenrod';
        bottomRight.style.backgroundColor = 'darkblue';    
}
// flash color
function flashColor(){
    topLeft.style.backgroundColor = 'lightgreen';
        topRight.style.backgroundColor = 'tomato';
        bottomLeft.style.backgroundColor = 'yellow';
        bottomRight.style.backgroundColor = 'skyblue';    
}


// make color clickable 
topLeft.addEventListener('click', (event) => {
    if (on){
        playerOder.push(1);
        check();
        one();
        if (!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});
topRight.addEventListener('click', (event) => {
    if (on){
        playerOder.push(2);
        check();
        two();
        if (!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});
bottomLeft.addEventListener('click', (event) => {
    if (on){
        playerOder.push(3);
        check();
        three();
        if (!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});
bottomRight.addEventListener('click', (event) => {
    if (on){
        playerOder.push(4);
        check();
        four();
        if (!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});
// check function to check correct
function check(){
    // player clicked the right color or not
    if (playerOder[playerOder.length - 1] !== order[playerOder.length - 1])
        good = false;
    // game has been played 20 times
    if (playerOder.length == 3 && good){
        winGame();
    }
    // player is wrong
    if (good == false){
        flashColor();
        turnCounter.innerHTML = 'NO NOT THE RIGHT COLOR!';
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();

            if (strict){
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        noise = false;
    }
    // player is right but has not win the game yet
    if (turn == playerOder.length && good && !win){
        turn++;
        playerOder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
           
}
// win game function
function winGame(){
    flashColor();
    turnCounter.innerHTML = 'YOU WON!';
    on = false;
    win = true;
}