/* global reacion -- start*/
const backpack = [];

const nextpage = (loc) => {
    window.location = './' + loc + '.html';
}

const hintOpened = [false, false, false, false];
const itemOpened = {};

const opens = (x) => {
    if (x === "item"){
        document.getElementById('backpack').style.animation = "none";
    }
    document.getElementById(x+"-board").style.animation = "opening-" + x + " 0.5s forwards";
    document.getElementById("fade").style.display = "block";
    document.getElementById("fade").style.animation = "fade-in 0.5s forwards";
    setTimeout(()=> {
        document.getElementById("close-"+x).style.display = "flex";
        document.getElementById(x+"-container").style.display="flex";
    }, 500);
}

const closes = (x, maxN) => {
    document.getElementById("close-"+x).style.display = "none";
    document.getElementById(x+"-container").style.display="none";
    document.getElementById(x+"-board").style.animation = "closing-" + x + " 0.5s forwards";
    document.getElementById("fade").style.animation = "fade-out 0.5s forwards";
    setTimeout( () => {
        document.getElementById("fade").style.display = "none";
        for (let i = 0; i < maxN; i++) { 
            document.getElementById("hint-content" + (i+1)).style.animation = "none";
            document.getElementById("hint-content" + (i+1)).style.height = "0";
            document.getElementById("hint-content" + (i+1)).style.color = "transparent";
            document.getElementById("expand" + (i+1)).style.clipPath = "polygon(20% 20%, 80% 20%, 50% 80%)";
            hintOpened[i] = false;
        }
    }, 500);
}

const clickHint = (e, n) => {
    if (!hintOpened[n]){
        e.children[0].style.clipPath = "polygon(20% 80%, 80% 80%, 50% 20%)";
        e.children[1].style.animation = "expanding 0.5s forwards";
        setTimeout( () => {
            e.children[1].style.color = "white";
            hintOpened[n] = true;
        }, 500);
    } else {
        e.children[0].style.clipPath = "polygon(20% 20%, 80% 20%, 50% 80%)";
        e.children[1].style.color = "transparent";
        e.children[1].style.animation = "gathering 0.5s forwards";
        setTimeout( () => {
            hintOpened[n] = false;
        }, 500);
    }
}


const backpackAdd = (image_src, text, type) => {
    let figure = document.createElement('figure');
    figure.className = 'in-backpack';
    document.getElementById('item-container').appendChild(figure);
    let image = document.createElement('img');
    image.className = type;
    let caption = document.createElement('figcaption');
    let captionText = document.createTextNode(text);
    image.src = image_src;
    image.onclick = function() {
        if (!itemOpened[text]){
            image.style.position = 'fixed';
            image.style.left = '50%';
            
            if (type === 'wide-img') {
                image.style.top = '10%';
                image.style.width = '80vw';
                image.style.height = 'auto';
            }else {
                image.style.width = 'auto';
                image.style.height = '80vh';
            }
            
            image.style.transform = 'translate(-50%,0)';
            document.getElementById('fade2').style.display = 'block';
            document.getElementById('fade2').style.zIndex = '1';
            image.style.zIndex = '2';
            itemOpened[text] = true;
        }else {
            image.style.position = 'static';
            if (type === 'wide-img') {
                image.style.width = '100%';
            }else {
                image.style.height = '80%';
                image.style.width = 'auto';
            }
            image.style.transform = 'translate(0,0)';
            image.style.marginLeft = 'auto';
            image.style.zIndex = '0';
            document.getElementById('fade2').style.display = 'none';
            itemOpened[text] = false;
        }
    };
    figure.appendChild(image);
    figure.appendChild(caption);
    caption.appendChild(captionText);
}

const check_valid = (e, next) => {
    if (e.value.toLowerCase().replace(/ /g, "")===e.id) {
        if (e.id === '已抵達') {
            document.getElementById('hidden-input').style.display = 'none';
        }else {
            e.style.animation = "correct 1s forwards";
            e.setAttribute("readOnly",true);
        }
        setTimeout(()=>document.getElementById("go-to-" + next).style.display = "block",1000);
    }
    else {
        e.style.animation = "wrong 0.7s ease-out forwards";
        setTimeout(()=>e.style.animation="none", 700);
    }
}
/*global reacion -- end */

/* items -- start*/

let acquiredItems = [
    {itemName:'臺大地圖', source:'./image/臺大地圖.jpg', type:'wide-img'},
    {itemName:'阿姨寄來的信', source:'./image/aunt_letter.png', type:'wide-img'},
    {itemName:'威脅信', source:'./image/threat.jpg', type:'wide-img'},
    {itemName:'借據', source:'./image/credit.jpg', type:'wide-img'},
    {itemName:'日記 日期未知', source:'./image/diary_unknown.jpg', type:'long-img'},
    {itemName:'日記 4/12', source:'./image/diary0412.png', type:'long-img'},
    {itemName:'診療單', source: './image/diagnosis.jpg', type:'long-img'},
    {itemName:'日記 2/7', source:'./image/diary0207.png', type:'long-img'},
];

const prepareItems = (n) => {
    for (let i = 0; i<=n; i++){
        backpackAdd(acquiredItems[i]['source'], acquiredItems[i]['itemName'], acquiredItems[i]['type']);
    }
}

/* items -- end */

/* instruction -- start */
let inst = 1;
const nextInstruction = () => {
    if (inst < 6) {
        document.getElementById('I' + inst++).style.animation = 'show-up 1s forwards';
        if (inst === 4) {
            backpackAdd('./image/臺大地圖.jpg', '臺大地圖', 'wide-img');
            document.getElementById('backpack').style.animation = "white-blink 1.5s infinite";
        }
    }
    if (inst === 6) {
        document.getElementById('I6').style.display = 'none';
        document.getElementById('進入遊戲').style.display = 'block';
    }
}

/* instruction -- end */

/*story -- start */

let page = 1;
let last = [8, 15, 9, 10, 14, 5, 21];


const visualize = () => {
    document.getElementById("p1").style.display='flex';
}

const nxt = (n) => {  
    if (++page === last[n]){  // change page
        switch (n) {
            case 0:
                window.location = "./wordle.html";
                break;
            case 1:
                window.location = "./creditor.html";
                break;
            case 2:
                window.location = "./music.html";
                break;
            case 3:
                window.location = "./building.html";
                break;
            case 4:
                window.location = "./sand.html";
                break;
            case 5:
                window.location = "./library.html";
                break;
            case 6:
                window.location = './end.html';
                break;
        }
    }else {
        document.getElementById("p" + (page-1) ).style.display = 'none';
        document.getElementById("p" + page).style.display = 'flex';
        switch (n) {
            case 0:
                if (page === 6) {
                    backpackAdd('./image/aunt_letter.png', '阿姨寄來的信', 'wide-img');
                    document.getElementById('backpack').style.animation = "white-blink 1.5s infinite";
                }
                break;
            case 1:
                switch (page) {
                    case 6:
                        backpackAdd('./image/credit.jpg', '借據', 'wide-img');
                        document.getElementById('backpack').style.animation = "white-blink 1.5s infinite"; 
                        break;
                    case 8:
                        backpackAdd('./image/threat.jpg', '威脅信', 'wide-img');
                        document.getElementById('backpack').style.animation = "white-blink 1.5s infinite";
                        break;
                    case 11:
                        document.getElementById('go-to-next-page').style.display = 'none';
                        setTimeout(()=>{document.getElementById('hidden-input').style.display = 'block';}, 5000);
                        break;
                    case 12:
                        document.getElementById('hidden-input').style.display = 'none';
                        break;
                }
                break;
            case 2:
                switch (page) {
                    case 2:
                        document.getElementById('go-to-next-page').style.display = 'none';
                        setTimeout(()=>{document.getElementById('與我無關').style.display = 'block';}, 5000);
                        break;
                    case 3:
                        document.getElementById('與我無關').style.display = 'none';
                        break;
                    case 6:
                        backpackAdd('./image/diary_unknown.jpg', '日記 日期未知', 'long-img');
                        document.getElementById('p6').style.marginTop = '10vh'; 
                        document.getElementById('p6').style.height = '70vh'; 
                        document.getElementById('backpack').style.animation = "white-blink 1.5s infinite";
                        break;
                    case 8:
                        document.getElementById('go-to-next-page').style.display = 'none';
                        setTimeout(()=>{document.getElementById('hidden-input').style.display = 'block';}, 5000);
                        break;
                }
                break;
            case 3:
                switch (page) {
                    case 2:
                        backpackAdd('./image/diary0412.png', '日記 4/12', 'long-img');
                        document.getElementById('p2').style.marginTop = '10vh'; 
                        document.getElementById('p2').style.height = '70vh'; 
                        document.getElementById('backpack').style.animation = "white-blink 1.5s infinite";
                        break;
                    case 4:
                        backpackAdd('./image/diagnosis.jpg', '診療單', 'long-img');
                        document.getElementById('p4').style.marginTop = '10vh'; 
                        document.getElementById('p4').style.height = '70vh'; 
                        document.getElementById('backpack').style.animation = "white-blink 1.5s infinite";
                        break;
                    case 6:
                        document.getElementById('go-to-next-page').style.display = 'none';
                        setTimeout(()=>{document.getElementById('hidden-input').style.display = 'block';}, 4500);
                        break;
                    case 7:
                        document.getElementById('hidden-input').style.display = 'none';
                        break;
                }
                break;
            case 4:
                switch (page) {
                    case 10:
                        backpackAdd('./image/diary0207.png', '日記 2/7', 'long-img');
                        document.getElementById('p10').style.marginTop = '10vh'; 
                        document.getElementById('p10').style.height = '70vh'; 
                        document.getElementById('backpack').style.animation = "white-blink 1.5s infinite";
                        break;
                    case 13:
                        document.getElementById('p13').style.marginTop = '10vh'; 
                        document.getElementById('p13').style.height = '70vh'; 
                        document.getElementById('go-to-next-page').style.display = 'none';
                        setTimeout(()=>{document.getElementById('hidden-input').style.display = 'block';}, 5000);
                        break;
                }
                break;
            case 5:
                switch (page) {
                    case 3:
                        document.getElementById('p3').style.marginTop = '10vh'; 
                        document.getElementById('p3').style.height = '70vh';               
                        backpackAdd('./image/diary0103.png', '日記 1/3', 'long-img');
                        document.getElementById('backpack').style.animation = "white-blink 1.5s infinite";
                        break;
                    case 4:
                        document.getElementById('go-to-library').style.display = 'none';
                        document.getElementById('book-name').style.display = 'block';
                        document.getElementById('p4').style.marginTop = '10vh'; 
                        document.getElementById('p4').style.height = '70vh';               
                        backpackAdd('./image/diary1225.png', '日記 12/25', 'wide-img');
                        document.getElementById('backpack').style.animation = "white-blink 1.5s infinite";
                        break;
                }
                break;
        }        
    }
}

/* story -- end */

/* library -- start */

const state = {
    "pass_demon": false,
    "pass_balcony": false,
}

const check_valid2 = (e) => {
    if (e.value.toLowerCase().replace(/ /g, "")===e.id) {
        e.style.animation = "correct 1s forwards";
        e.setAttribute("readOnly",true);
        state["pass_"+e.id] = true;
        if (state["pass_demon"] && state["pass_balcony"]) {
            setTimeout(()=>document.getElementById("go-to-somePlace").style.display = "block",1000);
        }
    }
    else {
        e.style.animation = "wrong 0.7s ease-out forwards";
        setTimeout(()=>e.style.animation="none", 700);
    }
}

/* library -- end */

/* wordle -- start */

let pos = [1,1];
let wordLength = 4;
let guess = ['','','','',''];
let submit = ['','','','',''];
const word = "GONE";
const press = (e)=> {
    if (e.id === "ENTER") {
        if (pos[1] === 5){
            let used = [false,false,false,false];
            let color = ["#3a3a3c","#3a3a3c","#3a3a3c","#3a3a3c"];
            for (let i=0; i<wordLength; i++) {
                if (word[i] === submit[i]) {
                    color[i] = "#538d4e";
                    used[i] = true;
                }
            }
            for (let i = 0; i < wordLength; i++) {
                for (let j = 0; j < wordLength; j++) {
                    if (submit[i] === word[j] && !used[j]) {
                        used[j] = true;
                        color[i] = "#b59f3b";
                    }
                }
            }
            for (let i = 0; i < wordLength; i++) {
                setTimeout(() => {
                    document.getElementById(('g' + pos[0]) + (i+1)).style.animation = "flip 0.5s";
                }, 300*i);
                setTimeout(() => {
                    document.getElementById(('g' + pos[0]) + (i+1)).style.backgroundColor = color[i];
                    document.getElementById(('g' + pos[0]) + (i+1)).style.borderColor = color[i];
                }, 300*i + 150);
            }
            for (let i = 0; i < wordLength; i++) {
                document.getElementById(submit[i]).style.backgroundColor = color[i];
            }
            if (color.every((c) => c==='#538d4e')) {
                for (let i = 0; i < wordLength; i++) {
                    setTimeout(() => {
                        document.getElementById(('g' + pos[0]) + (i+1)).style.animation = "bingo 0.5s ease-out";
                    }, 300*i + 1500);
                }
                setTimeout(()=>document.getElementById("go-to-second_text").style.display = "block",4000);
            }else {
                setTimeout(() => {
                    let newGuess = document.createElement("div");
                    newGuess.id = "guess" + (++pos[0]);
                    newGuess.className = "guess";
                    document.getElementById('answer-board').appendChild(newGuess);
                    for (let i = 0; i < wordLength; i++) {
                        guess[i] = document.createElement("div");
                        guess[i].id = ('g'+ pos[0]) + (i+1);
                        guess[i].className = "guess-letter";
                        newGuess.appendChild(guess[i]);
                    }
                    pos[1] = 1;
                }, 2000);
            }
        }
    }
    else if(e.id === "delete") {
        pos[1] = pos[1]>1? pos[1]-1 : 1;
        document.getElementById('g' + pos[0] + pos[1]).innerText = '';
        document.getElementById('g' + pos[0] + pos[1]).style.borderColor = "#3a3a3c"
    }
    else {
        document.getElementById('g' + pos[0] + pos[1]).innerText = e.id;
        document.getElementById('g' + pos[0] + pos[1]).style.animation = "magnify 0.15s"
        submit[pos[1]-1] = e.id; 
        document.getElementById('g' + pos[0] + pos[1]).style.borderColor = "#787c7e"
        if (pos[1]<5) pos[1]++;
    }
}

/* wordle -- end */

/* music -- start */

let date = "1224";
let current = 1;
const enterNumber = (num) => {
    if (current<5) {
        document.getElementById('date' + current++).innerText = num;
    }
}
const backspace = () => {
    if (current>1){
        document.getElementById('date' + --current).innerText = '';
    }
}
const checkDate = () => {
    for (let i=1; i<=4; i++) {
        if (document.getElementById('date'+i).innerText !== date[i-1]) {
            for (let j=1; j<=4; j++) {
                document.getElementById('date'+j).style.animation = "wrong 0.7s ease-out forwards";
                setTimeout(() => document.getElementById('date'+j).style.animation="none", 700);
            }
            return;
        }
    }
    for (let i=1; i<=4; i++) {
        document.getElementById('date'+i).style.animation = "correct 1s forwards";
    }
    setTimeout(()=>document.getElementById("go-to-fourth_text").style.display = "block",1000);

}

/* music -- end */

/*testing
const goToSecondPage = () => {
    window.location = './second_page.html';
}

const goToThirdPage = () => {
    window.location = './third_page.html';
}


let inputField = '';
let idx = 1;
let answer = '6537';

const password = (e) => {
    if (idx<=4) {
        document.getElementById('d'+idx).innerText = e.innerText;
        idx++;
    }
}

const del = () => {
    if (idx>1) {
        idx--;
        document.getElementById('d'+idx).innerText = '';
    }
}

const clr = () => {
    for (let i=1; i<=4; i++){
        document.getElementById('d'+i).innerText = '';
    }
    idx=1;
}

const checkAnswer = () => {
    let submission = '';
    for (let i = 1; i<=4; i++) {
        submission += document.getElementById('d'+i).innerText;
    }
    if (idx === 5) {
        if (submission === answer) {
            document.getElementById('instruction').innerHTML = 'Yeah, you got it';
            for (let i = 1; i<=4; i++) {
                document.getElementById('d'+i).style.animation = "correct 1s forwards";
            }
        }
        else {
            document.getElementById('instruction').innerHTML = "Woops, it's worng";
            for (let i = 0; i<4; i++) {
                document.getElementsByClassName('shake')[i].style.animation = "shake 4s forwards";
            }
        }
    }
    else {
        document.getElementById('instruction').innerHTML = '輸入必須為四位數字!';
    }
}
*/
