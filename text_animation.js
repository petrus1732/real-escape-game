let page = 0;

const visualize = () => {
    document.getElementById("p1").style.display='flex';
}

const nxt = () => {   
    if (page!==0){
        document.getElementById("p" + page ).style.display = 'none';
    }
    document.getElementById("p" + (++page) ).style.display = 'flex';
    /*
    if (page===last){
        document.getElementById("nextpage").style.display = 'none';
    }*/
}


