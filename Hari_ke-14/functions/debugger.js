// debug.js
const path = require("path");

function debugLog(message) {
  // Ambil stack error
  const stack = new Error().stack;
  console.log(stack);

  // Ambil baris yang tepat untuk pemanggilan fungsi
  const callerLines = stack.split("\n");

  // Di sebagian besar runtime, pemanggilan akan berada pada baris ketiga atau keempat
  // Cobalah mengambil baris ke-3 atau ke-4, tergantung pada environment
  const caller = callerLines[3];

  // Ambil nama file dari stack dengan regex
  const fileNameMatch = caller.match(/([^\/\\]+\.js)/); // Mencari nama file dengan format .js

  // Jika ditemukan, gunakan nama file, jika tidak, gunakan 'unknown file'
  const fileName = fileNameMatch ? fileNameMatch[1] : "unknown file";

  // Tampilkan pesan dengan format yang lebih ringkas
  console.log(`(${fileName}) ${message}`);
}

module.exports = {
  debugLog,
};
