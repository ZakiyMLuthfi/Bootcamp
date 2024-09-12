const readline = require('node:readline');

const {stdin:input,stdout:output} = require("node:process");
const { writeFileSync, readFileSync } = require('node:fs');

const rl = readline.createInterface({input, output});

const val = require("validator");

// } else {




function validasiData(nama, nomor, email){
    if (val.isAlpha(nama) && val.isMobilePhone(nomor) && val.isEmail(email)){
        return { nama, nomor, email };
    } else {
    if (!val.isAlpha(nama)){ 
        console.log("Nama kamu salah");
        return main();

    } else {
    if(!val.isMobilePhone(nomor)){
        console.log("Nomor kamu salah");
        return main();

    }else{
    if(!val.isEmail(email))
        console.log("Email kamu salah");
        return main();

    }
        }
    }
}


function saveData(data){
    try{
        const file = readFileSync('Hari-ke-4/data/contacts.json', 'utf-8');
        // parsing dan push adalah combine data

        const contacts = JSON.parse(file);
        contacts.push(data);
        writeFileSync('Hari-ke-4/data/contacts.json', JSON.stringify(contacts));
        console.log("Data berhasil tersimpan!");
        
    } catch (err) {
        console.log("Terjadi kesalahan saat menyimpan data. Periksa kembali data yang anda berikan");
}    
}

function main(){
rl.question('Sebutkan nama: ', (nama) => {
    rl.question('Sebutkan nomor: ', (nomor) =>{
        rl.question('Sebutkan email: ', (email) =>{
        const newData = validasiData(nama, nomor, email);
            if(newData) {
                rl.question('Apakah anda ingin menyimpan data? (ya/tidak): ', (answer) => {
                    if (answer.toLowerCase() === 'ya'){
                        saveData(newData);
                        
                    } else {
                        console.log('Data tidak tersimpan.');
                    }
                    rl.close();
                });   

                        }
            
                                                });
                                            });
                                        });
                }
    


main();
