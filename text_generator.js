let s="寄信至";
console.log('<span>「</span>');
for  (let i=0; i<s.length; i++) {
    if (i%11===0 && i!==0) {
        console.log("\n<span></span>");
    }
    console.log("<span>"+s[i]+"</span>");
}
console.log('<span>」</span>\n');



