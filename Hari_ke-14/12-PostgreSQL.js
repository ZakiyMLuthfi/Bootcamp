const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const pool = require("./db");
const fs = require("fs");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const {
  addContact,
  updateContact,
  deleteContact,
  detailContact,
} = require("./functions/add-data");
const { debugLog } = require("./functions/debugger");

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.json());
app.use(express.static("resources"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rute khusus untuk file HTML
app.get("/", (req, res) => {
  res.render("index", { name: "Zakiy M Luthfi", title: "Homepage" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "This is about" });
});

app.post("/add-contact", addContact);
app.put("/update-contact/:id", updateContact);
app.get("/detail-contact/:name", detailContact);
app.delete("/delete-contact/:name", deleteContact);

app.get("/contact", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts");
    const contacts = result.rows;
    res.render("contact", {
      contacts,
      title: "Contact list",
    });
  } catch (err) {
    res.render("contact", {
      contacts: [],
      errorMessage: "Terjadi kesalahan saat mengambil data",
    });
  }
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
