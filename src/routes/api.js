'use strict';
const router = require("express").Router();
const dc = require("../controllers/dropbox");



router.get("/login", dc.login);
router.get("/callback", dc.callback);

router.get("/logged", dc.logged);

router.post("/get/files", dc.isAuth, dc.getFileList);
router.post("/get/note", dc.isAuth, dc.getNote);

router.post("/create/directory", dc.isAuth, dc.createDirectory);
router.post("/create/note", dc.isAuth, dc.createNote);

router.post("/delete", dc.delete);

module.exports = router;
/*
const router = require("express").Router();
const keys = require("../config/secrets");
const appCfg = require("../config/app");

const request = require("request-promise");
const dc = require("../controllers/dropbox");

router.get("*", (req, res, next) => {
    req.session.token = "JD4f5lB5fNAAAAAAAAAFq4WOLSb4tP1EIb6JTksey4I2A_7Orbj0yr3N9aA_bare";
    next();
});

Sends user to dropbox authorization page 
router.get("/login", (req, res) => {
    
});

/* Callback after dropbox authorization, makes request for api access_code then redirect user to app 
router.get("/callback", async (req, res) => {
    
});

router.get("/logged", dc.logged);
router.post("/files", dc.getFileList);
router.post("/create_cat", dc.createCatalog);
router.post("/delete", dc.delete);
router.post("/create_note", dc.createNote);


module.exports = router;*/