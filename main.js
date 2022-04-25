


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
                image.style.width = '80vw';
                image.style.top = '10%';
            }else {
                image.style.width = '70vw'
                image.style.top = 0;
            }
            image.style.height = 'auto';
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
    if (window.localStorage.getItem('pass') !== 'true') {
        window.location = './cover.html';     
    }else{
        for (let i = 0; i<=n; i++){
            backpackAdd(acquiredItems[i]['source'], acquiredItems[i]['itemName'], acquiredItems[i]['type']);
        }
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
                        document.getElementById('hint').style.display = 'flex';
                        document.getElementById('go-to-next-page').style.display = 'none';
                        setTimeout(()=>{document.getElementById('與我無關').style.display = 'block';}, 5000);
                        break;
                    case 3:
                        document.getElementById('hint').style.display = 'none';
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

/* Authentication -- start */

const numbers = [
    78373503772, 22250045313, 43737918688, 41115990510, 36853908386,
    53034041990, 50428951450, 51824721517, 35116899405, 95322048868,
    58083971822, 59344777394, 12780608633, 62496901886, 41175018325,
    82172113696, 36471598679, 70131513000, 89810186708, 45384776088,
    96748944355, 84148915481, 73768044733, 71619392875, 59010008603,
    71272325551, 54106776885, 22395828395, 54863345792, 35756307690,
    82038432762,  8090300333,  5406500348, 91213925652, 23440382341,
    11283232152, 96742789088, 20845963900, 13296583632, 47388831834,
    18774277394, 74973184706, 50578908139, 79878658676, 62602503308,
    74523327306,  1660937144,  5421122707, 32579537608, 56089968615,
    26992619152, 20554885649, 25231096213, 93064891816, 87100717266,
    17060152771,  6416444950, 36158093107, 75708515597, 57866380470,
    62303510867, 37789274550,  3621433604, 77508355353, 73797708386,
    12917763073, 54843876421,  9565092890, 75004682835, 13155441032,
    27042349927, 97167986970, 70202063784, 63470614407, 63501897968,
    20554818804, 50577433589, 23232761041,  5848244224, 65408968136,
    54295150971, 79747720937, 48749671807, 19138538697, 22625055585,
    75655038450, 11779595240, 71415718340, 33304242585, 64130880339,
    41292257733, 85165094065, 51561116308, 12301562811,  2795878902,
     4627978554, 75015469210,  5318742832, 60363341889, 12648169311,
    11381165075, 56078077278, 43173912869, 25742271923, 23489253961,
    39420021038, 33363462942, 97906912405, 53621841743, 91676602814,
    40833021996, 27555663537, 99249295820,  8834444703, 82139726711,
    23568326363, 70081888841, 81202959750, 76073398069, 80603446125,
    99867425551, 68530059881, 85102161984, 25324198331, 80924096299,
    42209421996, 49874489335, 61772050290, 49919707660, 11846435490,
    76696370617, 89310336418, 85246725435, 68896408023, 85918865408,
    32736233937, 26779140800, 74730020574, 95611926363, 64823364843,
    41456472185, 16342234910, 15911372155, 90529795719, 69807994166,
     1792608865, 89114997025, 17316507776, 55020592643, 41756048868,
    83144062246, 51527476668, 59131134996, 17085695240, 93476428511,
    88112136433, 86350033604, 73632157718, 41216438218, 58006086506,
    31609489915, 34735992048, 62872129076, 26672870269, 32114942832,
    80333497040, 36057372271, 34741905774, 65923065554, 94374260330,
    13504111331, 80453256412, 87020154556, 22128572069, 71825865307,
    53224723418, 16187025536, 44419420937, 35765052655, 42100252161,
    22446553815, 98788527452, 69045261419,  7146386970, 75979060330,
    67484992875, 71573747431, 12392145066, 94326036650, 68684740931,
    42138880571, 77528236070, 35768774767, 98932786375, 69427184126,
    33467177480, 31877295502, 37856622692,  5430798447, 35505253714,
     4846182094, 99150968136, 57951503540, 58587316686, 13618931572,
    96443625536, 12976256442, 18165823650, 74653210852, 81983246473,
    84114766134, 23593281383, 77831568731, 67602009692, 11872345081,
    27810315249, 57409103061, 85822991569, 22642554788, 62779117498,
    51095093354, 63130215118, 73243328960, 50433490394, 36886544486,
    51251889219,  5539438682, 66408271923, 83292528612, 37967565670,
    92335697025, 59826239741,  1875974883,   120709112, 23152786970,
    47570289683, 67840759851, 97133554657, 99099096430, 39867924956,
    89630264843, 66737592411, 54748073461, 52241672634, 78563606863,
    81826996183,  8889026842,  6579834199, 45510377016, 56534634315,
     1788807065, 86798602567,  9712708618, 23225045414,  2424473592,
    87493853583, 56320940946,   541191090, 34982663870, 39485125304,
    14041026741, 67543965176, 24545166976, 65629483632, 62792313348,
    72173051334,  2011753845, 84835152887, 90949391685, 23856059634,
    86994615380, 19474749549, 96127857385, 19141955847, 67905213247,
    25300761636, 99704264364, 85917378453,  2597481746,   808610272,
    91631630150, 53068449579, 64682561389, 33097089915, 11093860693,
    99677647431,  1407816177, 16524083516, 57697006601, 35883815380,
    86729011679,  8206491715, 75780607660, 56238620821, 22014640235,
    46584486375, 18005372634, 57289308981, 14511882240, 42567791685,
    96434712405, 83626975594, 84385129918, 97546870980,  7214190858,
    73459782936, 66103528249, 10977206848, 85769395704, 90709054077,
    42108372649, 71009569442, 68571685170, 73091032747, 14487454410,
     9692143775, 37058919500,  5197144123, 24907284590,  8626033458,
    93343619253,  1023022127,  9565947663, 62755084358, 17953605542,
    24396541990,   558898069, 68136124825, 77213003162, 21635878569,
    53074239973, 96750029091, 94660794080, 14576045646, 42175025667,
     5550721386,   186556079, 73145394065, 62138885881, 26318664495,
    22838882820, 79266404105, 48552905310, 59172640916, 74547860809,
    95130553235, 94722332167, 76345444239, 20298072402, 84710102829,
    89426549201, 74039877510, 70752794907, 96034558459, 70863426958,
    78959912899,   911611810, 98070444965, 50325482603, 54756896793,
    91728021270, 29573459735, 12021623418, 28795060940, 45240236912,
    38916923403, 79760358792, 13737401407, 40296295139, 64084693934,
    19401981645, 56244128032, 60032001639, 21410547300, 79203996546,
     4229874303, 53194922097, 77233145792, 89689103873, 36454183400,
    83854451798, 59182837275, 73353641874,  3594347794, 28157132762,
    65178108633, 10909983430, 85298823070, 30515712057, 81115530281,
    88795913842, 16454854294, 31326167208, 37265739161, 63333069790,
    77047057123, 69533007428,  9319892512, 35790343281, 65713961636,
     2959928264, 66388364581, 30170467208, 56829566033, 70484259634,
    51602162710, 95432066149, 71626892744, 35594254193,   711033125,
    49823099289, 42604446503, 98620092411, 67370458575, 59914170153,
    46060369311,  8549575115, 90914729439, 17481239030, 49922735722,
    63127257864, 83069693369, 58267816439, 48346054642, 21568654178,
    18579192280, 86062652060, 72523108502, 96250235606, 21192547214,
    27050720342, 44117035258, 28389218194, 79732262100,  6468370632,
    73444070037, 55063036534, 46856952524, 77722806268,   557847315,
    10150950870, 51280108850, 24926973824, 93024087303, 47497007428,
    35968909112,  8446794080, 81911001624, 55049004135, 45208075957,
    75188428990, 27292768267, 14991541627, 24640713464, 68915037507,
    36742028728,  3875084938, 97112731950, 28187505643, 74041189451,
    52826216656, 79210010650, 36902033357, 82183218804, 85213534315,
    17686614538, 45944564248, 24466528249, 65785182704, 79564018093,
    36707134547, 39317004367, 25179879280, 17953466860, 98593055136,
    66863419863, 68208030614, 34335140684, 34647013348, 93283804730,
    43221959851, 15858933821, 64252186143, 37621228032, 63727552655, 93359236302
]

const hashFunction =  (string) => {
    let prime = 100000003787;
    let hash = 0;
    for (i = 0 ;i<string.length ; i++)
    {
        ch = string.charCodeAt(i);
        hash = ((hash << 20) - hash) + ch;
        hash = Math.abs(hash & hash)*100000%prime;
    }
    return hash;
}

const auth = (e) => {
    if (numbers.some(n => n === hashFunction(e.value.replace(/ /g, "")))) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('cover-arrow').style.display = 'flex';
        window.localStorage.setItem('pass', 'true');
    }else {
        e.style.animation = "wrong 0.7s ease-out forwards";
        setTimeout(()=>e.style.animation="none", 700);
    }
}

const deleteLocalStorage = () => {
    window.localStorage.clear();
}

/* Authentication -- end */

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
