// pemanggilan modul file system
const fs = require("fs");

//
// fs.writeFileSync("text.txt", "Hello sinkronus")

fs.readFile('text.txt', "utf-8", (err, data) =>{
    if (err) throw err;
    console.log(data);  
})