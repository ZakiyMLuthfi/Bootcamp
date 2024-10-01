const val = require("validator");

const ErrorType = {
  INVALID_EMAIL: "Alamat email tidak valid",
  INVALID_NAME: "Nama anda salah",
  INVALID_MOBILE: "Nomor telepon tidak sesuai",
};

function validateData(name, email, mobile) {
  if (!name || name.trim() === "") {
    return "Nama wajib diisi";
  }
  if (!val.isAlpha(name, "en-US", { ignore: " " })) {
    return ErrorType.INVALID_NAME;
  }
  if (email && !val.isEmail(email)) {
    return ErrorType.INVALID_EMAIL;
  }
  if (!mobile || mobile.trim() === "") {
    return "Nomor telepon wajib diisi";
  }
  if (!val.isMobilePhone(mobile, "id-ID")) {
    return ErrorType.INVALID_MOBILE;
  }
  return true;
}

// Memeriksa apa nama sudah ada di database
function isNameExist(name, contacts) {
  const existingContact = contacts.find(
    (contact) => contact.name.toLowerCase() == name.toLowerCase()
  );
  if (existingContact) {
    console.log("Nama sudah ada");
    return false;
  }
  return true;
}

module.exports = {
  validateData,
  isNameExist,
  ErrorType,
};
