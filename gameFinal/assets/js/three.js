var left;
var top;
var shift;
var shiftEnd;
 function setThirdLImg(){
	shift=0;
	shiftEnd=0;
    const imgBlock=document.createElement("div");
    imgBlock.classList.add("imgBlock");
	imgBlock.id="imgBlock";
    const imgs=[];
    for (let i=0;i<10;i++){
        const htmlElement = document.createElement("img");
        htmlElement.classList.add("thirdLImg");
		htmlElement.id="thirdLImg"+i;
		htmlElement.setAttribute("draggable",true);
        setImg(htmlElement, nameImg);
        imgBlock.appendChild(htmlElement);
        imgs[i]=htmlElement;
    }
    addThirdLValidImg(imgs);
    return {
        div: imgBlock,
        imgs: imgs
    };
}
function addThirdLValidImg(imgs){
    let lastSym = currentLevel.name[currentLevel.name.length - 1].toLowerCase();
    let num = Number(currentLevel.name[0]) - 1;
    let numSym = [];
    for (let i = 0; i < nameImg.length; i++) {
        if (nameImg[i][num].toLowerCase() === lastSym) {
            numSym.push(nameImg[i]);
        }
    }
    for (let i = 0; i < 10; i++) {        
        let name = imgs[i].getAttribute('name');
        if (numSym.indexOf(name) > -1) {
            numSym.splice(numSym.indexOf(name),1);
        } 
        
    }
    if (numSym.length !== 0) {
        let item = Math.floor(Math.random() * numSym.length);
        let img = numSym[item];
        let srcImg = "assets/img/" + img + ".jpg";
        let i = Math.floor(Math.random() * 10);
        imgs[i].setAttribute("name", img);
        imgs[i].setAttribute("src", srcImg);
    }
	setPlace(imgs);
	
}

function setPlace(imgs){
	for(let i=0;i<10;i++){
		imgs[i].style.top=2*shift+ 'px';
		imgs[i].style.left=2*shift+ 'px';
		shift=20*(i+1);
	}
}
function makeDrag(){
    thirdLImg=document.querySelectorAll('.thirdLImg');
    thirdLImg.forEach(e => e.ondragstart = drag);
}
const chckmg = document.querySelector('.checkImg');
chckmg.ondragover = allowDrop;
chckmg.ondrop=drop;

function allowDrop (e) {
    e.preventDefault();
}
function drag(event){
    event.dataTransfer.setData('id',event.target.id);
}
function drop(event){
    let itemId=event.dataTransfer.getData('id');
	document.getElementById(itemId).style.position='absolute';
	document.getElementById(itemId).style.top=Math.floor(Math.random()*300)+'px';
	document.getElementById(itemId).style.left=Math.floor(Math.random()*200)+'px';
    if(event.target.nodeName=="IMG"){
        event.target.parentElement.append(document.getElementById(itemId));
    }
    else{
        event.target.append(document.getElementById(itemId));
    }
}
function deleteImg(){
	var img_l=document.getElementById("img_list");
	if(img_l.firstChild){
		var dblock=document.getElementById("imgBlock");
		dblock.parentElement.removeChild(dblock);
	}
	
	var dimg=document.getElementById("checkImg");
	if(dimg.firstChild){
		for(let i=0;i=dimg.childNodes.length;i++){
			dimg.removeChild(dimg.firstChild);
		}
	}
	
}

function checkThirdLevel() {
	let lastSym = currentLevel.name[currentLevel.name.length - 1].toLowerCase();
	let num = Number(currentLevel.name[0]) - 1;
    let currValueScore = 0;
    let mis = 0;
    let unClick = 0;
	var choosenImg=document.getElementById("checkImg");
	if(choosenImg.firstChild){
		var children = choosenImg.childNodes;
		console.log(typeof(children))
		for(let i=0;i<children.length;i++){
			console.log(children[i])
			if(children[i].name[num].toLowerCase()==lastSym){
				currValueScore += 25;
			}
			else{
				mis++;
                currValueScore = currValueScore - 20;
			}
		}
	}
	var img_l=document.getElementById("img_list");
	if(img_l.firstChild){
		var chblock=document.getElementById("imgBlock");
		if(chblock.firstChild){
			var blockChildren = chblock.childNodes;
			for(let i=0;i<blockChildren.length;i++){
				if(blockChildren[i].name[num].toLowerCase()==lastSym){
					unClick++
                	currValueScore = currValueScore - 20;
				}
				else{
					currValueScore += 25;
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
        setTimeout(()=> {gameStatus.innerText = " ";},3000);

    } else {
        gameStatus.innerText = "Уровень пройден! ";
        setTimeout(()=> {gameStatus.innerText = " ";},3000);
    }
    sumValueScore+=currValueScore;
    document.getElementById('currScore').style.display='block';
    valueScore[indexLevel] = sumValueScore;
    document.getElementById("currScore").innerText = "Результат: " + sumValueScore;
}