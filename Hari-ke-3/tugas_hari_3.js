const readline = require('node:readline');

const {stdin:input,stdout:output} = require("node:process");
const { writeFileSync, readFileSync } = require('node:fs');

const rl = readline.createInterface({input, output});

const val = require("validator");


rl.question('Sebutkan nama: ', (nama) => {
    rl.question('Sebutkan nomor: ', (nomor) =>{
        rl.question('Sebutkan email: ', (email) =>{
            if(val.isAlphanumeric(nama) && (val.isMobilePhone(nomor) && (val.isEmail(email)))) {
                const result = {nama,nomor,email};

                const file = readFileSync('Hari-ke-3/data/contacts.json', 'utf-8');
                // parsing dan push adalah combine data
                const contacts = JSON.parse(file);
                contacts.push(result);

                writeFileSync('Hari-ke-3/data/contacts.json', JSON.stringify(contacts));
                

                console.log("Data kamu telah tersimpan");
            // menutup interface redline
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
