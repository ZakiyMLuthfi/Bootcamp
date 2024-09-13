const readline = require("node:readline");

const { stdin: input, stdout: output, err } = require("node:process");
const { writeFileSync, readFileSync } = require("node:fs");

const rl = readline.createInterface({ input, output });

const val = require("validator");

const yargs = require("yargs");
const { error } = require("node:console");

function validateData(name, email, mobile) {
  if (!val.isAlpha(name)) {
    console.log("Nama kamu salah");
    return false;
  }
  if (email) {
    if (!val.isEmail(email)) {
      console.log("Email kamu salah");
      return false;
    }
  }
  if (!val.isMobilePhone(mobile, "id-ID")) {
    console.log("Nomor kamu salah");
    return false;
  }

  return true;
}

function validateData2(name, contacts) {
  const existingContact = contacts.find(
    (contact) => contact.name.toLowerCase() == name.toLowerCase()
  );
  if (existingContact) {
    console.log("Nama sudah ada");
    return false;
  }
  return true;
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
  handler(argv) {
    const contact = {
      name: argv.name,
      email: argv.email,
      mobile: argv.mobile,
    };
    console.log(contact);

    if (validateData(contact.name, contact.email, contact.mobile)) {
      try {
        let contacts = [];
        try {
          const file = readFileSync("Hari-ke-5/data/contacts.json", "utf-8");
          contacts = JSON.parse(file);
          if (validateData2(contact.name, contacts)) {
            contacts.push(contact);
            console.log("Data berhasil tersimpan!");
          }
        } catch (err) {
          console.error("File mungkin belum ada", err);
        }
        writeFileSync(
          "Hari-ke-5/data/contacts.json",
          JSON.stringify(contacts),
          null,
          2
        );
      } catch {
        console.error("Error saving file", err);
      }
    }
    rl.close();
  },
});

yargs.parse();
