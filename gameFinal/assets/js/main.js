const timer = document.getElementById("timer");
const gameStatus = document.getElementById("gameStatus");
const start = document.getElementById("start");
const check = document.getElementById("check");
const choose=document.getElementById("choose");
const username = document.getElementById("username");
const boxScore = document.getElementById("boxScore");
const scoreboard = document.getElementById("scoreboard");
const inputName=document.getElementById("inputName");
const about=document.getElementById("about");
const next=document.getElementById("next");
const resume=document.getElementById("resume");
const animation1=document.getElementById("animation1");
const animation2=document.getElementById("animation2");
const scores = getScoreTable();
const countLevel = [3,2,1];
const userData = [];
const nameImg = [
    "алекс","алладин","барт","валли","вольт","вуди","гомер","гарфилд","глория","гринч","грю","джери","дори","золушка","котопес","крош",
    "майк","марти","маша","мейбл","мелман","мэтр","немо","нюша","олаф","патрик","пикачу","пумба","рапунцель","сквидвард","сид","скрудж",
    "скуби","тимон","шрек"
]
const rankLevel = [
    "easy",
    "medium",
    "hard"
];
var taskInfo = document.getElementById("taskInfo");
var boxLevel = document.getElementById("boxLevel");
var indexLevel = 0;
var valueScore = [0,0,0];
var sumValueScore =0;
var levelCount = 1;
var total=0;
var numIndex = [];
var timerHandler;
var currentTick;
var thirdLImg;

let currentLevel;
let active = false;

if (!localStorage.theme) localStorage.theme = "blue"
    document.body.className = localStorage.theme

toggleThemeBtn.onclick = () => {
    document.body.classList.toggle("green")
    localStorage.theme = document.body.className || "blue"
}

document.getElementById('chooseLevel').addEventListener('click', () => {
    if (!username.value) return alert('Введите имя');
    endGame()
    if (indexLevel==2){
        deleteImg();
        document.getElementById('checkImg').style.display='none';
    }
    resume.style.display='none'
    animation1.style.display='none';
    animation2.style.display='none';
    timer.style.display='none';
    next.style.display='none';
    boxLevel.style.display='none';
    choose.style.display='block';
    boxScore.style.display = 'none';
    gameStatus.style.display = 'none';
    check.style.display = 'none';
    taskInfo.style.display = 'none';
    total=0;
    sumValueScore=0;
    document.getElementById("currScore").innerText = "Результат: " + sumValueScore;
});
document.getElementById('firstLevel').addEventListener('click', () => {
    indexLevel=0;
    choose.style.display='none';
    about.innerText='Выбирайте картинки на которых изображены персонажи, чьи имена начинаются на указанную букву';
    about.style.display='block';
    start.innerText='Начать';
    start.style.display='block';
});
document.getElementById('secondLevel').addEventListener('click', () => {
    indexLevel=1;
    choose.style.display='none';
    about.innerText='Выбирайте картинки на которых изображены персонажи, в именах которых указанная буква находится на третьем месте';
    about.style.display='block';
    start.innerText='Начать';
    start.style.display='block';
});
document.getElementById('thirdLevel').addEventListener('click', () => {
    
    indexLevel=2;
    choose.style.display='none';
    about.innerText='Выбирайте и перетаскивайте картинки на которых изображены персонажи, в именах которых указанная буква находится на третьем месте. Будьте осторожны, отменить выбор нельзя!';
    about.style.display='block';
    start.innerText='Начать';
    start.style.display='block';
});
document.getElementById("end").addEventListener('click', () => {
    if (active) {
        if (indexLevel==2){
            deleteImg();
            document.getElementById('checkImg').style.display='none';
        }
        pushScore();
        active = false;
        inputName.style.display='block';
        boxLevel.style.display='none';
        taskInfo.style.display = 'none';
        check.style.display = 'none';
        gameStatus.innerText = 'Игра завершена пользователем!';
        gameStatus.style.display = 'block';
        buildScoreTable();
        animation1.style.display='block';
        animation1.classList.add('animate1');
        endGame();
    } 
});

document.getElementById("start").addEventListener('click', () => {
    animation1.style.display='none';
    animation2.style.display='none';
    gameStatus.innerText = " ";
    next.style.display='none';
    start.style.display='none';
    about.style.display='none';
    gameStatus.style.display = 'block';
    inputName.style.display='none';
    timer.style.display = 'block';
    check.innerText = 'Проверить';
    init(rankLevel[indexLevel]);
    currentTick=0;
    startTimer();
});
document.getElementById('next').addEventListener('click', () => {
    animation1.style.display='none';
    animation2.style.display='none';
    gameStatus.innerText = " ";
    next.style.display='none';
    indexLevel+=1;
    switch (indexLevel) {
        case 1: 
            about.innerText='Выбирайте картинки на которых изображены персонажи, в именах которых указанная буква находится на третьем месте';
            about.style.display='block';            
            break;
        case 2: 
            about.innerText='Выбирайте и перетаскивайте картинки на которых изображены персонажи, в именах которых указанная буква находится на третьем месте. Будьте осторожны, отменить выбор нельзя!';
            about.style.display='block';
            break;
    }
    start.innerText='Начать';
    start.style.display='block';
});
document.getElementById('resume').addEventListener('click', () => {
    gameStatus.innerText = " ";
    resume.style.display='none';
    startTimer();
    init(rankLevel[indexLevel]);
});
function init(complexityLevel) {
    numIndex = new Array(35);
    inputIndex(numIndex);
    boxLevel.innerHTML = '';
    currentComplexity = complexityLevel;
    currentLevel = data[complexityLevel][0];
    setTask(currentLevel);
    currentName = username.value;

    if(indexLevel!=2){
        document.getElementById('tasks').style.display='none';
        const h = currentLevel.len;
        const w = currentLevel.len;
    
        for (let i = 0; i < h; i++) {
            userData[i] = [];
            for (let j = 0; j < w; j++) {
                userData[i][j] = 0;
            }
        }

        const b2 = createMatrix(h, w, "game_cell");
        userMatrix = b2.matrix;
        setAnswer(userMatrix, currentLevel.answer);
        boxLevel.append(...[b2].map(e => e.div));
        boxLevel.style.display = 'flex';
    }
    else{
        
        document.getElementById('checkImg').style.display='block';
        document.getElementById('tasks').style.display = 'block';
        const l3= setThirdLImg();
        document.getElementById('img_list').append(...[l3].map(e => e.div));
        document.getElementById('img_list').style.display = 'block';
        makeDrag();
    }
    
    taskInfo.innerText = currentLevel.name;
    taskInfo.style.display = 'block';
    check.style.display = 'block';
    boxScore.style.display = 'block';
    active = true;
};


function setTask(currentLevel) {
    let task = "";
    switch (indexLevel) {
        case 0: 
            task = taskEasy();
            currentLevel.name = "1-ая буква " + task;
            break;
        case 1: 
            task = taskMedium();
            currentLevel.name = "3-ья буква " + task;
            break;
        case 2: 
            task = taskHard();
            currentLevel.name = "3-ья буква " + task;
            break;
    }
}

function createMatrix(h, w, cell) {
    const block = document.createElement("div");
    block.classList.add("block");
    const matrix = [];
    for (let i = 0; i < h; i++) {
        matrix[i] = [];
        const flex = document.createElement("div");
        flex.classList.add("row");
        for (let j = 0; j < w; j++) {
            const htmlElement = document.createElement("img");
            htmlElement.classList.add(cell);
            setImg(htmlElement, nameImg);
            flex.appendChild(htmlElement);
            matrix[i][j] = htmlElement;
            if (cell == "game_cell") {
                htmlElement.addEventListener("click", () => {
                    if (htmlElement.classList.contains("active")) {
                        if (htmlElement.classList.contains("mistake")) {
                            htmlElement.classList.remove("mistake");
                        }
                        htmlElement.classList.remove("active");
                        userData[i][j] = 0;
                    } else {
                        htmlElement.classList.add("active");
                        userData[i][j] = 1;
                    }
                });
            } 
        }
        block.appendChild(flex);
    }
    addValidImg(matrix);
    return {
        div: block,
        matrix: matrix
    };
}

function setImg(htmlElement, nameImg) {
    let item = Math.floor(Math.random() * numIndex.length);
    let imgIndex = numIndex[item];
    let img = nameImg[imgIndex];
    numIndex.splice(numIndex.indexOf(imgIndex),1);
    let srcImg = "assets/img/" + img + ".jpg";
    htmlElement.setAttribute("name", img);
    htmlElement.setAttribute("src", srcImg);
}

function addValidImg(matrix) {
    let lastSym = currentLevel.name[currentLevel.name.length - 1].toLowerCase();
    let num = Number(currentLevel.name[0]) - 1;
    let numSym = [];
    for (let i = 0; i < nameImg.length; i++) {
        if (nameImg[i][num].toLowerCase() === lastSym) {
            numSym.push(nameImg[i]);
        }
    }
    for (let i = 0; i < currentLevel.len; i++) {
        for (let j = 0; j < currentLevel.len; j++) {
            let name = matrix[i][j].getAttribute('name');
            if (numSym.indexOf(name) > -1) {
                numSym.splice(numSym.indexOf(name),1);
            } 
        }
    }
    if (numSym.length !== 0) {
        let item = Math.floor(Math.random() * numSym.length);
        let img = numSym[item];
        let srcImg = "assets/img/" + img + ".jpg";
        let i = Math.floor(Math.random() * currentLevel.len);
        let j = Math.floor(Math.random() * currentLevel.len);
        matrix[i][j].setAttribute("name", img);
        matrix[i][j].setAttribute("src", srcImg);
    }
}
function setAnswer(matrix, answer) {
    let lastSym = currentLevel.name[currentLevel.name.length - 1].toLowerCase();
    let num = Number(currentLevel.name[0]) - 1;
    for (let i = 0; i < matrix.length; i++) {
        let arr = [];
        for (let j = 0; j < matrix[0].length; j++) {
            let el = matrix[i][j].name;
            if (el[num].toLowerCase() == lastSym) {
                arr.push(1);
            } else {
                arr.push(0);
            }
        }
        answer[i] = arr;
    }
}

function inputIndex(Indexes) {
    for (let i = 0; i < Indexes.length; i++) {
        Indexes[i]=i;
    }
}

document.getElementById("check").addEventListener('click', () => {
    if (!active) {
        return;
    }
    if (active) {
        if(indexLevel!=2){
            checkResult();
            if(indexLevel==0){
                stopGame();
                resume.style.display='block';
                check.style.display='none';
            }
            else{
                init(rankLevel[indexLevel]);                
            }
        }
        else{
            checkThirdLevel();
            deleteImg();
            init(rankLevel[indexLevel]);
        }
    }
});

function checkResult() {
    let currValueScore = 0;
    let mis = 0;
    let unClick = 0;
    for (let i = 0; i < currentLevel.answer.length; i++) {
        for (let j = 0; j < currentLevel.answer[i].length; j++) {
            if ((userData[i][j] !== currentLevel.answer[i][j]) && (currentLevel.answer[i][j] == 0)) {
                mis++;
                currValueScore = currValueScore - 20;
                userMatrix[i][j].classList.add("mistake");
            } else if (((userData[i][j] !== currentLevel.answer[i][j]) && (currentLevel.answer[i][j] == 1))) {
                unClick++
                currValueScore = currValueScore - 20;
            } else {
                switch(indexLevel){
                    case 0: currValueScore += 10; break;
                    case 1: currValueScore += 15; break;
                }            
            }
        }
    }
    if ((mis !== 0) || (unClick !== 0)) {
        if((mis !== 0) && (unClick == 0)){
            gameStatus.innerText = ("Вы выбрали " + mis + " лишних картинок!");
        }
        if((mis == 0) && (unClick !== 0)){
            gameStatus.innerText = ("Вы не выбрали " + unClick + " верных картинок!");
        }
        if((mis !== 0) && (unClick !== 0)){
            gameStatus.innerText = ("Вы выбрали " + mis + " лишних и не выбрали " + unClick + " верных картинок!");
        }
        if(indexLevel!=0){
            setTimeout(()=> {gameStatus.innerText = " ";},3000);
        }

    } else {
        gameStatus.innerText = "Уровень пройден! ";
        if(indexLevel!=0){
            setTimeout(()=> {gameStatus.innerText = " ";},3000);
        }

    }
    sumValueScore+=currValueScore;
    document.getElementById('currScore').style.display='block';
    valueScore[indexLevel] = sumValueScore;
    document.getElementById("currScore").innerText = "Результат: " + sumValueScore;
}

function pushScore() {
    total=Total();
    curTime=timeToStr();
    const resultPlayer = {
        name: currentName, 
        time: curTime, 
        TOTAL: total
    };
    if (!scores["Game"])
        scores["Game"] = {};
    const arr = scores["Game"]["Player"];
    if (arr)
        arr.push(resultPlayer);
    else
        scores["Game"]["Player"] = [resultPlayer];
    localStorage.setItem('scores', JSON.stringify(scores));
}
function Total(){
    var currTotal=0;
    for (let i = 0; i < valueScore.length; i++) {
        currTotal+=valueScore[i];
    }
    return currTotal;
}

function buildScoreTable() {
    const arr = (scores["Game"]) ?
        scores["Game"]["Player"] : [];

        scoreboard.innerHTML = '';
        arr.slice(arr.length - 10, arr.length).reverse().forEach(e => {
        const record = document.createElement('div');
        const time = document.createElement('div');
        const res = document.createElement('div');
        time.classList.add('time');
        time.innerText = 'Время: '+`${e.time}`;
        record.innerText = `${e.name}:`;
        res.innerText = 'Счет: ' + `${e.TOTAL}`;
        record.appendChild(time);
        record.appendChild(res);
        scoreboard.append(record);
    });    
}
function onTick() {
    currentTick += 1;
    timer.innerText=timeToStr();
    
    if (currentTick==60) {
        pushScore();
        active = false;
        gameStatus.innerText = "Время вышло!";
        gameStatus.style.display = 'block';
        inputName.style.display='block';
        if (indexLevel==2){
            deleteImg();
            document.getElementById('checkImg').style.display='none';
        }
        endGame();
        buildScoreTable();
        nextLevel();
    }
}
function startTimer() {
    timerHandler = setInterval(onTick, 1000);
}
function endGame(){
    clearInterval(timerHandler);
    currentTick = 0;
} 
function stopGame() {
    clearInterval(timerHandler);
}
function timeToStr(){
    const minutes = (Math.floor(currentTick / 60)).toString().padStart(2, '0');
    const seconds = ((currentTick % 60)).toString().padStart(2, '0');
    return `${minutes}:${seconds}`
}

function nextLevel(){
    boxLevel.style.display='none';
    boxScore.style.display = 'none';
    check.style.display = 'none';
    taskInfo.style.display = 'none';
    start.innerText='Пройти снова'
    start.style.display='block';
    if(indexLevel!=2){
        next.style.display='block';
    }
    animation2.style.display='block';
    animation2.classList.add('animate2');
}
document.getElementById("saveBoard").addEventListener('click', () => {
    if (active || username.value == "") {
        return;
    }
    var indexPlayer = [];
    for (let i = 0; i < scores.Game.Player.length; i++) {
        if (scores.Game.Player[i].name == username.value) {                
            indexPlayer.push(scores.Game.Player[i]);
        }
    }
    if(indexPlayer.length == 0) {
        alert("Вы еще ни разу не прошли игру!");
    } 
    else {
        var data =  JSON.stringify(indexPlayer) ;
        var blob = new Blob( [ data ], {
            type: 'application/octet-stream'
        });
        url = URL.createObjectURL( blob );
        var link = document.createElement( 'a' );
        link.setAttribute( 'href', url );
        let date = new Date();
        let nameFile = "ScoreTable" + ".txt";
        link.setAttribute( 'download', nameFile );
        var event = document.createEvent( 'MouseEvents' );
        event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent( event );
    }
});

function getScoreTable() {
    const json = localStorage.getItem('scores');
    if (json) {
        try {
            return JSON.parse(json);
        } catch (e) {
            return {};
        }
    }
    return {};
}

check.style.display = 'none';
next.style.display = 'none';
about.style.display = 'none';
start.style.display = 'none';
taskInfo.style.display = 'none';
timer.style.display = 'none';
document.getElementById('currScore').style.display='none';
document.getElementById('checkImg').style.display='none';
gameStatus.style.display = 'block';
inputName.style.display='block';
animation1.style.display='none';
animation2.style.display='none';
resume.style.display='none';
document.getElementById('tasks').style.display='none';