'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

let app = express();

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false, httpOnly: true } }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", require("./routes/api"));

app.listen(5000, () => console.log("Server started "));