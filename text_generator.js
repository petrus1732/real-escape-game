let s="咦?這是什麼?";
for  (let i=0; i<s.length; i++) {
    if (i%12===0) {
        console.log("\n\n");
    }
    console.log("<span>"+s[i]+"</span>");
}



