const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Rute khusus untuk file HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Hari-ke-11", "html", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "Hari-ke-11", "html", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "Hari-ke-11", "html", "contact.html"));
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
