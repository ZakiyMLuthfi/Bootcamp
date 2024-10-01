// const val = require("validator");
// console.log(val.isEmail('zakiymluthfi@gmail.com'));

// ===========================

// const val = require("validator");
// const email = "zakiymluthfi@gmail.com";

// console.log(val.isEmail(email));

// ===========================

const val = require("validator");
const email = "zakiymluthfi@gmail.com";

if(val.isEmail(email)){
    console.log("format email anda betul");
} else {
    console.log("format email anda salah");
    
}


