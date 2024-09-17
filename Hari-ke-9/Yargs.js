const yargs = require("yargs");
const { validateData, isNameExist } = require("./resources/validator.js");
const fsPromises = require("fs/promises");

yargs.command({
  command: "add",
  describe: "Add new contact",
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
  async handler(argv) {
    const contact = {
      name: argv.name,
      email: argv.email,
      mobile: argv.mobile,
    };
    console.log(contact);

    const validationResult = validateData(
      contact.name,
      contact.email,
      contact.mobile
    );
    if (validationResult !== true) {
      console.error(validationResult);
      return;
    }
    try {
      let contacts = [];
      try {
        const file = await fsPromises.readFile(
          "Hari-ke-9/data/contacts.json",
          "utf-8"
        );
        contacts = JSON.parse(file);
        if (isNameExist(contact.name, contacts)) {
          contacts.push(contact);
        }
      } catch (err) {
        console.error("File mungkin belum ada. Membuat file baru.", err);
      }
      await fsPromises.writeFile(
        "Hari-ke-9/data/contacts.json",
        JSON.stringify(contacts),
        null,
        2
      );
    } catch {
      console.error("Error saving file", err);
    }
  },
});

yargs.command({
  command: "list",
  describe: "List of data (name and mobile)",
  async handler() {
    try {
      const file = await fsPromises.readFile(
        "Hari-ke-9/data/contacts.json",
        "utf-8"
      );
      const contacts = JSON.parse(file);

      contacts.forEach((contact, index) => {
        console.log(
          `${index + 1}. Name: ${contact.name} \n   Mobile: ${contact.mobile}`
        );
      });
    } catch (err) {
      console.error("Tidak dapat membaca file", err);
    }
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
  async handler(argv) {
    try {
      const file = await fsPromises.readFile(
        "Hari-ke-9/data/contacts.json",
        "utf-8"
      );
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
  async handler(argv) {
    try {
      // Membaca file JSON
      const file = await fsPromises.readFile(
        "Hari-ke-9/data/contacts.json",
        "utf-8"
      );
      const contacts = JSON.parse(file);
      // Cari data lama menggunakan find
      const oldContact = contacts.find(
        (contact) => contact.name.toLowerCase() === argv.oldName.toLowerCase()
      );

      //Seandainya data ditemukan
      if (oldContact) {
        // Membuat data yang diperbarui
        const updatedContact = {
          name: argv.newName || oldContact.name,
          email: argv.newEmail || oldContact.email,
          mobile: argv.newMobile || oldContact.mobile,
        };
        // Filter kontak yang tidak sama dengan oldName
        const updatedContacts = contacts.filter(
          (contact) => contact.name.toLowerCase() !== argv.oldName.toLowerCase()
        );

        // Push data yang diperbarui
        updatedContacts.push(updatedContact);

        await fsPromises.writeFile(
          "Hari-ke-9/data/contacts.json",
          JSON.stringify(updatedContacts),
          null,
          2
        );

        console.log(`Kontak atas nama ${argv.oldName} berhasil diperbarui!`);
      } else {
        console.log("Kontak tidak ditemukan.");
      }
    } catch (err) {
      console.log("Terjadi kesalahan saat mencari data", err);
    }
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
  async handler(argv) {
    //membaca file apa saja yang ada di JSON
    try {
      const file = await fsPromises.readFile(
        "Hari-ke-9/data/contacts.json",
        "utf-8"
      );
      //parsing file yang sudah dibaca ke dalam contacts
      const contacts = JSON.parse(file);

      //data yang sudah diambil (variabel yang mewakili = contacts), akan dilakukan filter di mana input yang
      //dicari akan dikecualikan, dan kumpulan data yang terfilter tersebut dimasukan ke dalam updateContacts
      const updatedContacts = contacts.filter(
        (contact) => contact.name.toLowerCase() !== argv.name.toLowerCase()
      );
      // console.log(updatedContacts);

      if (updatedContacts) {
        console.log(` Name: ${argv.name} sudah berhasil dihapus`);
        await fsPromises.writeFile(
          "Hari-ke-9/data/contacts.json",
          JSON.stringify(updatedContacts),
          null,
          2
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
  },
});

yargs.parse();
