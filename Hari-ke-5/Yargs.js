const readline = require("node:readline");

const { stdin: input, stdout: output, err } = require("node:process");
const { writeFileSync, readFileSync } = require("node:fs");

const rl = readline.createInterface({ input, output });

const val = require("validator");

const yargs = require("yargs");
const { error } = require("node:console");

const ErrorType = {
  INVALID_EMAIL: "Alamat email tidak valid",
  INVALID_NAME: "Nama anda salah",
  INVALID_MOBILE: "Nomor telepon tidak sesuai",
};

function validateData(name, email, mobile) {
  if (!val.isAlpha(name, "en-US", { ignore: " " })) {
    return ErrorType.INVALID_NAME;
  }
  if (email && !val.isEmail) {
    return ErrorType.INVALID_EMAIL;
  }
  if (!val.isMobilePhone(mobile, "id-ID")) {
    return ErrorType.INVALID_MOBILE;
  }
  return true;
}

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
          if (isNameExist(contact.name, contacts)) {
            contacts.push(contact);
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
