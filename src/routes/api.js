'use strict';
const router = require("express").Router();
const keys = require("../config/secrets");
const appCfg = require("../config/app");
const crypto = require('crypto-promise');
const request = require("request-promise");
const dc = require("../controllers/dropbox");

router.get("*", (req, res, next) => {
    req.session.token = "JD4f5lB5fNAAAAAAAAAFq4WOLSb4tP1EIb6JTksey4I2A_7Orbj0yr3N9aA_bare";
    next();
});

/* Sends user to dropbox authorization page */
router.get("/login", (req, res) => {
    crypto.randomBytes(64).then( hash => { // generates random state, which will be compared after response from dropbox
        req.session.state = hash.toString("hex");

        const path = `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${ keys.clientId }&redirect_uri=${appCfg.redirect}&state=${req.session.state}`;

        res.redirect(path);
    });
});

/* Callback after dropbox authorization, makes request for api access_code then redirect user to app */
router.get("/callback", async (req, res) => {
    try {
        if(req.session.state != req.query.state) throw new Error("Wystąpił błąd z autoryzajcą"); // comparing states

        let response = await request({ // request for access token
            uri: "https://api.dropboxapi.com/oauth2/token",
            method: "POST",
            form: {
                code: req.query.code,
                grant_type: "authorization_code",
                client_id: keys.clientId,
                client_secret: keys.clientSecret,
                redirect_uri: appCfg.redirect
            },
            json: true
        });

        if(response.token_type != 'bearer' || typeof response.access_token != "string") throw new Error("Wystąpił problem z autoryzacją");

        req.session.token = response.access_token; // saving  token in session
        res.redirect(appCfg.app); // redirecting user to app
    } catch(e) {
        console.log(e);
    }
});

router.get("/logged", dc.logged);


module.exports = router;