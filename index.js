const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const { check, validationResult } = require("express-validator");
const router = require("./routes/chart");
const port = 8080;
//const routes = require('./routes')

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//app.use(routes);

db.sequelize.sync();

//app.use(express.static("frontend/build/"));
//const frontEndServer = (req, res) => {
//res.sendFile("frontend/build/index.html", { root: __dirname });
//};

app.get("/", (req, res) => {
  res.status(200).json({ result: true });
});

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
