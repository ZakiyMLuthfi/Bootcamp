const readline = require("node:readline");

const { stdin: input, stdout: output, err } = require("node:process");
const { writeFileSync, readFileSync, readFile } = require("node:fs");

const rl = readline.createInterface({ input, output });

const { validateData, isNameExist } = require("./validator.js");

// const val = require("validator");
const yargs = require("yargs");
const { error } = require("node:console");

const fs = require("fs/promises");

async function addContact(contact) {
  try {
    let contacts = [];
    try {
      //blok pembacaan database contact
      const file = await fs.readFile("functions/data/contacts.json", "utf-8");
      contacts = JSON.parse(file);
    } catch (err) {
      console.error("File mungkin belum ada", err);
    }

    //Periksa apakah nama sudah ada
    if (!isNameExist(contact.name, contacts)) {
      throw new Error("Data sudah ada, tidak dapat menambahkan nama");
    }
    const validationResult = validateData(
      contact.name,
      contact.email,
      contact.mobile
    );
    if (validationResult !== true) {
      throw new Error(validationResult);
    }

    // Jika nama belum ada, tambahkan kontak
    contacts.push(contact);
    await fs.writeFile(
      "functions/data/contacts.json",
      JSON.stringify(contacts),
      null,
      2
    );
    console.log(`Kontak ${contact.name} berhasil ditambahkan!`);
    return "Kontak berhasil ditambahkan!";
  } catch (err) {
    console.error("Error saving file", err);
    throw err; //Lempar error agar bisa ditangani di tempat lain(file js utama)
  }
}

async function detailContact(name) {
  try {
    const file = await fs.readFile("functions/data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);

    const contact = contacts.find(
      (contact) => contact.name.toLowerCase() === argv.name.toLowerCase()
    );

    if (contact) {
      console.log(
        ` Name: ${contact.name} \n Email: ${
          contact.email || "Tidak ada email"
        } \n Mobile: ${contact.mobile}`
      );
    } else {
      console.log("Kontak tidak ditemukan");
    }
  } catch (err) {
    console.error(
      "Tidak dapat membaca file. Nama yang anda minta mungkin tidak ada",
      err
    );
  }
}

async function updateContact(oldName, newName, newEmail, newMobile) {
  console.log("(add-data.js)Tipe oldname:", typeof oldName);

  try {
    const file = await fs.readFile("./functions/data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);

    console.log("Daftar kontak:", contacts);

    const index = contacts.findIndex((contact) => {
      console.log(`Mencari kontak: ${contact.name.toLowerCase()} vs
        ${String(oldName).toLowerCase()}`);

      return (
        contact.name.trim().toLowerCase() ===
        String(oldName).trim().toLowerCase()
      );
    });

    if (index !== -1) {
      contacts[index].name = newName || contacts[index].name; // Update name jika diberikan
      contacts[index].email = newEmail || contacts[index].email; // Update email jika diberikan
      contacts[index].mobile = newMobile || contacts[index].mobile; // Update mobile jika diberikan

      // Simpan kembali ke file
      await fs.writeFile(
        "./functions/data/contacts.json",
        JSON.stringify(contacts, null, 2)
      );
      console.log(`Kontak ${oldName} berhasil diupdate.`);
    } else {
      console.log(`Kontak tidak ditemukan.`);
    }
  } catch (error) {
    console.error("Gagal memperbarui kontak", error);
  }
}

async function deleteContact({ name }) {
  try {
    const file = await fs.readFile("functions/data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);

    // Filter kontak yang tidak sesuai dengan nama yang akan dihapus
    const updatedContacts = contacts.filter(
      (contact) => contact.name.toLowerCase() !== name.toLowerCase()
    );

    await fs.writeFile(
      "functions/data/contacts.json",
      JSON.stringify(updatedContacts, null, 2)
    );
  } catch (err) {
    console.error("Tidak dapat membaca file", err);
  }
}

yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    name: {
      describe: "Contact name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Contact Email",
      demandOption: false,
      type: "string",
    },
    mobile: {
      describe: "Contact mobile",
      demandOption: true,
      type: "string",
    },
  },
  handler: async function (argv) {
    const contact = {
      name: argv.name,
      email: argv.email,
      mobile: argv.mobile,
    };
    await addContact(contact);
  },
});

yargs.command({
  command: "detail",
  describe: "See the detail of a data",
  builder: {
    name: {
      describe: "Data's name",
      demandOption: true,
      type: "string",
    },
  },
  handler: async function (argv) {
    await detailContact(contact);
  },
});

yargs.command({
  command: "update",
  describe: "Update the data",
  builder: {
    oldName: {
      describe: "Existing data contact",
      demandOption: true,
    },
    newName: {
      describe: "New user name",
      demandOption: false,
    },
    newEmail: {
      describe: "New user email",
      demandOption: false,
    },
    newMobile: {
      describe: "New user mobile",
      demandOption: false,
    },
  },
  handler: async function (argv) {
    const { name, mobile, email } = argv;
    await updateContact(argv);
  },
});

yargs.command({
  command: "delete-name",
  describe: "Delete the data",
  builder: {
    name: {
      describe: "Data's name",
      demandOption: true,
      type: "string",
    },
  },
  handler: async function (argv) {
    await deleteContact(contact);
  },
});

module.exports = { addContact, updateContact, deleteContact };
