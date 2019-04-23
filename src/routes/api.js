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