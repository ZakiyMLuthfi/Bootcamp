const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const fs = require("fs");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const {
  addContact,
  updateContact,
  deleteContact,
} = require("./functions/add-data");

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.static("resources"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.set("views", "./views");
app.set("layout", "layouts/layout");

// Rute khusus untuk file HTML
app.get("/", (req, res) => {
  const nama = "Zakiy M Luthfi";
  res.render("index", { name: nama, title: "Homepage" });
  // res.sendFile((__dirname, "Hari-ke-11", "html", "index.html"));
});

app.get("/about", (req, res) => {
  res.render("about", { title: "This is about" });

  // res.sendFile((__dirname, "Hari-ke-11", "html", "about.html"));
});

app.post("/add-contact", async (req, res) => {
  const { name, email, mobile } = req.body;
  try {
    await addContact({ name, email, mobile });
    res.status(200).send("Kontak berhasil ditambahkan");
  } catch (err) {
    console.error(err);
    if (err.message.includes("data sudah ada")) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send("Gagal menambahkan kontak");
    }
  }
});

app.put("/update-contact", async (req, res) => {
  const { oldName, newName, newEmail, newMobile } = req.body;
  console.log("Input kontak", req.body);
  console.log("(Server) Tipe oldName:", typeof req.body.oldName);

  try {
    await updateContact(oldName, newName, newEmail, newMobile);
    res.status(200).send("Kontak berhasil diperbarui kang");
  } catch (error) {
    console.error("Gagal memperbarui kontak", error);
    res.status(500).send("Gagal memperbarui kontak");
  }
});

app.delete("/delete-contact", async (req, res) => {
  const { name } = req.body;
  try {
    await deleteContact({ name });
    res.status(200).send("Kontak berhasil dihapus gan");
  } catch (error) {
    console.error("Gagal menghapus kontak", err);
    res.status(500).send("Gagal menghapus kontak");
  }
});

app.get("/contact", (req, res) => {
  fs.readFile("./functions/data/contacts.json", "utf-8", (err, file) => {
    let contacts = [];
    let errorMessage = "File tidak ada";
    if (!err) {
      try {
        contacts = JSON.parse(file);
        errorMessage = "";
      } catch (parseError) {
        errorMessage = "Terdapat kesalahan saat parsing data";
      }
    }

    res.render("contact", {
      contacts,
      errorMessage,
      title: "This is contact",
    });
  });
});

app.use("/product/:prodID", (req, res) => {
  res.send(
    `product ID: ${req.params.prodID} <br>category ID: ${req.params.catID}`
  );
});

// Penanganan rute yang tidak ditemukan
app.use((req, res) => {
  res.status(404).send("Page not found: 404");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
