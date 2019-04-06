'use strict';
const request = require("request-promise");  

let token = "JD4f5lB5fNAAAAAAAAAFumby2dpMQsYBisdk83OjN4UMZ3GQjXTHipUJjN-tztNt";

exports.logged = async (req, res) => {
    try {
        if(typeof req.session.token == "string") {
            let response = await request({
                uri: "https://api.dropboxapi.com/2/users/get_current_account",
                method: "POST",
                headers: { Authorization: "Bearer " + req.session.token },
                json: true
            });
            //console.log(response);
            res.json({ 
                logged: true,
                name: response.name.given_name,
                surname: response.name.surname,
                display: response.name.display_name
            });
        } else setTimeout( () => res.json({ logged: false }), 1000);
    } catch(e) {
        console.log(e);
    }
}

exports.getFileList = async (req, res) => {
    console.log(req.body.path);
    try {
        let response = await request({
            uri: "https://api.dropboxapi.com/2/files/list_folder",
            method: "POST",
            headers: { Authorization: "Bearer " + token },
            body: { path: req.body.path },
            json: true
        });
        console.log("KEK");
        //console.log(response);
        res.json(response.entries);
    } catch(e) {
        //console.log(e);
        res.status(400).json({ error: "Nie udało się pobrać listy plików"});
    }
}

exports.createCatalog = async (req, res) => {
    try {
        console.log( req.body.path + "/" + req.body.name);
        if(/[/\\<>:?*"|]/.test(req.body.name)) throw new Error("Nazwa folderu zawiera niepoprawne znaki");
        if(req.body.name.charAt(req.body.name.length - 1) === ".") throw new Error("Nazwa folderu nie może zawierać kropki na końcu");
        if(req.body.name.charAt(0) === " ") throw new Error("Nazwa folderu nie może zawierać spacji na początku");

        let response = await request({
            uri: "https://api.dropboxapi.com/2/files/create_folder_v2",
            method: "POST",
            headers: { Authorization: "Bearer " + token },
            body: { path: req.body.path + "/" + req.body.name },
            json: true
        });

        res.json({ success: true, msg: "ok" });
    } catch(e) {
        console.log(e);
        res.json({ success: false, msg: "error" });
    }
}

exports.delete = async (req, res) => {
    try {
        let response = await request({
            uri: "https://api.dropboxapi.com/2/files/delete_v2",
            method: "POST",
            headers: { Authorization: "Bearer " + token },
            body: { path: req.body.path },
            json: true
        });

        res.json({ success: true, msg: "ok" });
    } catch(e) {
        console.log(e);
        res.json({ success: false, msg: "error" });
    }
}