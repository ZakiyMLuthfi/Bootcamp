const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const fs = require("fs");
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");

app.use(expressLayouts);

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

app.get("/contact", (req, res) => {
  fs.readFile("./views/data/contacts.json", "utf-8", (err, file) => {
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
