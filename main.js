/* global reacion -- start*/


const nextpage = (loc) => {
    window.location = './' + loc + '.html';
}

const openBackpack = () => {
    document.getElementById("item-board").style.animation = "open-backpack 0.5s forwards";
    document.getElementById("fade").style.display = "block";
    document.getElementById("fade").style.animation = "fade-in 0.5s forwards";
    setTimeout(()=>document.getElementById("close").style.display = "flex", 500);
}

const closeBackpack = () => {
    document.getElementById("close").style.display = "none";
    document.getElementById("item-board").style.animation = "close-backpack 0.5s forwards";
    document.getElementById("fade").style.animation = "fade-out 0.5s forwards";

    setTimeout(()=>document.getElementById("fade").style.display = "none", 500);
}
/*global reacion -- end */

/* library -- start */

const state = {
    "pass_不願面對的真相": false,
    "pass_demon": false,
    "pass_balcony": false
}

const check_valid = (e) => {
    if (e.value.toLowerCase().replace(/ /g, "")===e.id) {
        e.style.animation = "correct 1s forwards";
        e.setAttribute("readOnly",true);
        state["pass_"+e.id] = true;
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

