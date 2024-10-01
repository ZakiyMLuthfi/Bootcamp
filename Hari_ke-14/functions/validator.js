const val = require("validator");
const pool = require("../db");
const fs = require("fs/promises");

const validateContact = (name, email, mobile) => {
  if (!val.isLength(name, { min: 1 })) {
    return "Nama harus diisi.";
  }
  if (!val.isAlpha(name, "en-US", { ignore: " " })) {
    return "Nama tidak boleh angka.";
  }
  if (email && !val.isEmail(email)) {
    return "Email tidak valid.";
  }
  if (!val.isMobilePhone(mobile, "id-ID")) {
    return "Nomor telepon tidak valid.";
  }
  return null; // Tidak ada error
};

const sendErrorResponse = (res, status, message) => {
  return res.status(status).json({ message });
};
module.exports = {
  validateContact,
  sendErrorResponse,
};
