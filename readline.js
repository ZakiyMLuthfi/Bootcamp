const readline = require('node:readline');

const {stdin:input,stdout:output} = require("node:process");
const { writeFileSync } = require('node:fs');

const rl = readline.createInterface({input, output});



rl.question('Sebutkan nama: ', (nama) => {
    rl.question('Sebutkan nomor: ', (nomor) =>{
        rl.question('Sebutkan domisili: ', (domisili) =>{
        const data = `Nama kamu adalah ${nama} \nNomor kamu adalah ${nomor} \nDomisili kamu adalah ${domisili}`;
            writeFileSync('test.txt', data);
            rl.close();
            });
        });
    });




