/* global reacion -- start*/
let backpack = [];

const nextpage = (loc) => {
    window.location = './' + loc + '.html';
}

let hintOpened = [false, false, false, false];

const opens = (x) => {
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

/*global reacion -- end */

/* library -- start */

const state = {
    "pass_usury591": false,
    "pass_不願面對的真相": false,
    "pass_demon": false,
    "pass_balcony": false
}

const check_valid = (e) => {
    if (e.value.toLowerCase().replace(/ /g, "")===e.id) {
        e.style.animation = "correct 1s forwards";
        e.setAttribute("readOnly",true);
        state["pass_"+e.id] = true;
        if (state["pass_usury591"]) {
            setTimeout(()=>document.getElementById("goToSomePlace").style.display = "block",1000);
        }
        if (state["pass_不願面對的真相"]) {
            setTimeout(()=>document.getElementById("goToLibrary").style.display = "block",1000);
        }
        if (state["pass_demon"] && state["pass_balcony"]) {
            setTimeout(()=>document.getElementById("goToSomePlace").style.display = "block",1000);
        }
    }
    else {
        e.style.animation = "wrong 0.7s ease-out forwards";
        setTimeout(()=>e.style.animation="none", 700);
    }
}

/* library -- end */

/*testing*/
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

