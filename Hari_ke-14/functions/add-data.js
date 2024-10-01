const val = require("validator");

const fs = require("fs/promises");

const pool = require("../db");

const { validateContact, sendErrorResponse } = require("./validator");

const addContact = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    const errorMessage = validateContact(name, email, mobile);
    if (errorMessage) return sendErrorResponse(res, 400, errorMessage);

    // Lakukan validasi atau pengecekan jika kontak sudah ada
    const existingContact = await pool.query(
      "SELECT * FROM contacts WHERE name = $1",
      [name]
    );

    if (existingContact.rows.length > 0) {
      return sendErrorResponse(res, 400, "Kontak sudah ada."); // Return untuk menghentikan eksekusi lebih lanjut
    }

    // Tambahkan kontak baru ke database
    await pool.query(
      "INSERT INTO contacts (name, email, mobile) VALUES ($1, $2, $3)",
      [name, email, mobile]
    );

    return res.status(200).json({ message: "Kontak berhasil ditambahkan!" }); // Tempat mengirim respons
  } catch (error) {
    console.error(error.message);
    return sendErrorResponse(res, 500, "Server Error"); // Penanganan error di sini
  }
};

const detailContact = async (req, res) => {
  try {
    const { name } = req.params;
    const contact = await pool.query("SELECT * FROM contacts WHERE name = $1", [
      name,
    ]);

    if (contact.rows.length === 0) {
      return res.status(404).json({ message: "Kontak tidak ditemukan" });
    }

    return res.status(200).json(contact.rows[0]);
  } catch (err) {
    console.error(err.message);
    return sendErrorResponse(res, 500, "Server error");
  }
};

const updateContact = async (req, res) => {
  const contactId = req.params.id;
  const { newName, newEmail, newMobile } = req.body;

  const errorMessage = validateContact(newName, newEmail, newMobile);
  if (errorMessage) return sendErrorResponse(res, 400, errorMessage);
  try {
    const updatedContact = await pool.query(
      "UPDATE contacts SET name = $1, email = $2, mobile = $3 WHERE id = $4 RETURNING *",
      [newName, newEmail, newMobile, contactId]
    );

    if (updatedContact.rows.length === 0) {
      return res.status(404).json({ message: "Kontak tidak ditemukan" });
    }

    return res.status(200).json({ message: "Kontak berhasil diperbarui!" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteContact = async (req, res) => {
  const contactName = req.params.name;
  try {
    const result = await pool.query("SELECT id FROM contacts WHERE name = $1", [
      contactName,
    ]);

    if (result.rowCount === 0) {
      return sendErrorResponse(res, 404, "Kontak tidak ditemukan");
    }

    const contactId = result.rows[0].id;
    await pool.query("DELETE FROM contacts WHERE id = $1", [contactId]);
    return res.status(200).json({ message: "Kontak berhasil dihapus!" });
  } catch (err) {
    console.error(err.message);
    return sendErrorResponse(res, 500, "Server error");
  }
};

module.exports = { addContact, detailContact, updateContact, deleteContact };
