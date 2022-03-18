let num = 0;
let last = 3;

const visualize = () => {
    document.getElementById("p1").style.display='flex';
}

const nxt = () => {
    if (num!==0){
        document.getElementById("p" + num ).style.display = 'none';
    }
    document.getElementById("p" + (++num) ).style.display = 'flex';
    if (num===last){
        document.getElementById("nextpage").style.display = 'none';
    }
}