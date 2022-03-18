let num = 0;

const visualize = () => {
    document.getElementById("p1").style.display='flex';
}

const nxt = () => {
    if (num!==0){
        document.getElementById("p" + num ).style.display = 'none';
    }
    document.getElementById("p" + (++num) ).style.display = 'flex';
}