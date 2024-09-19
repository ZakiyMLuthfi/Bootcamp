const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile("../Hari-ke-10/html/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("../Hari-ke-10/html/about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("../Hari-ke-10/html/contact.html", { root: __dirname });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("Page not found: 404");
});

app.get("/product/:prodID", (req, res) => {
  res.send(`product ID :${req.params.prodID} `);
});

app.listen(port, () => {
  console.log(`Port is listening to ${port}`);
});
