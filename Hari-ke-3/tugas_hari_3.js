const readline = require('node:readline');

const {stdin:input,stdout:output} = require("node:process");
const { writeFileSync } = require('node:fs');

const rl = readline.createInterface({input, output});

const val = require("validator");


rl.question('Sebutkan nama: ', (nama) => {
    rl.question('Sebutkan nomor: ', (nomor) =>{
        rl.question('Sebutkan email: ', (email) =>{
            if(val.isAlphanumeric(nama) && (val.isMobilePhone(nomor) && (val.isEmail(email)))) {
                const data = `Nama kamu adalah ${nama} \nNomor kamu adalah ${nomor} \nEmail kamu adalah ${email}`;
                writeFileSync('Hari-ke-3/hasil_tugas_3.txt', data);
                console.log("Data kamu telah tersimpan");

            rl.close();
            } else {
                if (val.isAlphanumeric(nama) === false)
                console.log("Nama kamu salah");

                if(val.isMobilePhone(nomor) === false)
                console.log("Nomor kamu salah");

                if(val.isEmail(email) === false)
                console.log("Email kamu salah");
        }
            rl.close();
            
            });
        });
    });
