// pemanggilan modul file system
const fs = require("fs");


fs.readFile('hasil_sinkronus.txt', "utf-8", (err, data) =>{
    if (err) throw err;
    console.log(data);  
})