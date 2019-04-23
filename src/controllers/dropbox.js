'use strict';
const request = require("request-promise");  
const crypto = require('crypto');
const keys = require('../config/secrets') || {};

class ApiError extends Error {
    constructor(statusCode, ...params) {
        super(params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }

        this.statusCode = statusCode;
    }
}

/**
 * Redirects user to dropbox login page
 */
exports.login = async ( req, res ) => {
    let hash = crypto.randomBytes(64); // generates random state, which will be compared after response from dropbox

    req.session.state = hash.toString("hex");
    req.session.app = req.query.app;
    
    req.session.redirect_uri = req.protocol + '://' + req.get('host') + "/api/callback";

    const path = `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${ keys.clientId }&redirect_uri=${ req.session.redirect_uri }&state=${ req.session.state }`;

    res.redirect(path);
}

/**
 * Callback for OAuth2 dropbox login
 */
exports.callback = async ( req, res ) => {
    try {
        if(req.session.state != req.query.state) throw new ApiError(500, "Wystąpił problem z autoryzacją");

        let response = await request({ // request for access token
            uri: "https://api.dropboxapi.com/oauth2/token",
            method: "POST",
            form: {
                code: req.query.code,
                grant_type: "authorization_code",
                client_id: keys.clientId,
                client_secret: keys.clientSecret,
                redirect_uri: req.session.redirect_uri
            },
            json: true
        });

        if(response.token_type != 'bearer' || typeof response.access_token != "string") throw new ApiError(500, "Wystąpił problem z autoryzacją");

        req.session.token = response.access_token; // saving  token in session
        res.redirect(req.session.app); // redirecting user to app
    } catch(e) {
        console.log("Error: " + e.message + " /callback");
        res.status(e.statusCode).json({
            error: e.message
        });
    }
} 

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
        } else res.json({ logged: false });
    } catch(e) {
        console.log(e);
    }
}

/**
 * Checks if user is authenticated in dropbox, sends 401 code when not
 */
exports.isAuth = async ( req, res, next ) => {
    try {
        if(typeof req.session.token === "undefined") throw new ApiError(401, "Musisz zalogować się na swoje konto Dropbox, aby skorzystać z tej funkcji");
        next();
    } catch(e) {
        console.log("Error: " + e.message + " /isAuth");
        res.status(e.statusCode).json({
            error: e.message
        });
    }
}

/**
 * Returns files from given directory
 */
exports.getFileList = async (req, res) => {
    try {
        if(/[<>:"|?*\\]/.test(req.body.path)) throw new ApiError(400, "Ścieżka do wybranego katalogu jest niepoprawna");

        let response = await request({
            uri: "https://api.dropboxapi.com/2/files/list_folder",
            method: "POST",
            headers: { Authorization: "Bearer " + req.session.token },
            body: { path: req.body.path },
            json: true
        });

        res.json(response.entries);
    } catch(e) {
        if(e instanceof ApiError) res.status(e.statusCode).json({ error: e.message });

        switch(e.statusCode) {
            case 409:
                res.status(409).json({ error: "Nie znaleziono podanej ścieżki" });
                break;
            case 400:
                res.status(400).json({ error: "Podana ścieżka zawiera błędy"});
                break;
            default:
                res.status(500).json({ error: "Wystąpił nieznany błąd" });
        }
    }
}

let escapeHeaderCharacters = string => {
    return string.replace(/[\u007f-\uffff]/g, value => {
        return "\\u" + ("000" + value.charCodeAt(0).toString(16)).substr(-4);
    });
}

exports.getNote = async (req, res) => {
    try {
        if(/[<>:"|?*\\]/.test(req.body.path)) throw new ApiError(400, "Ścieżka do wybranego pliku jest niepoprawna");

        console.log(escapeHeaderCharacters(req.body.path));

        let response = await request({
            uri: "https://content.dropboxapi.com/2/files/download",
            method: "POST",
            headers: { 
                Authorization: "Bearer " + req.session.token, 
                "Dropbox-API-Arg": escapeHeaderCharacters(JSON.stringify({ path: req.body.path }) )
            },
            json: true
        });

        res.json({ success: true, content: response });
    } catch(e) {
        //console.log(e);
        if(e instanceof ApiError) res.status(e.statusCode).json({ error: e.message });

        res.status(500).json({ error: "Wystąpiły błędy podczas pobierania notatki" });
    }
}

/**
 * Creates new directory in given path
 */
exports.createDirectory = async (req, res) => {
    try {
        if( typeof req.body.path === "undefined" || typeof req.body.name === "undefined" ) 
            throw new ApiError(400, "Nie podano nazwy katalogu lub ścieżki");

        if(/[<>:"|?*\\]/.test(req.body.path)) 
            throw new ApiError(400, "Ścieżka do wybranego katalogu jest niepoprawna");

        if(/[/\\<>:?*"|]/.test(req.body.name)) 
            throw new ApiError(400, "Nazwa folderu zawiera niepoprawne znaki");

        if(req.body.name.charAt(req.body.name.length - 1) === ".") 
            throw new ApiError(400, "Nazwa folderu nie może zawierać kropki na końcu");

        if(req.body.name.charAt(0) === " ") 
            throw new ApiError(400, "Nazwa folderu nie może zawierać spacji na początku");

        await request({
            uri: "https://api.dropboxapi.com/2/files/create_folder_v2",
            method: "POST",
            headers: { Authorization: "Bearer " + req.session.token },
            body: { path: req.body.path + "/" + req.body.name },
            json: true
        });

        res.json({ success: true, msg: "Pomyślnie utworzono folder: " + req.body.name });
    } catch(e) {
        if(e instanceof ApiError)
            res.status(e.statusCode).json({ error: e.message });
        
        res.status(e.statusCode).json({ error: "Wystąpił błąd podczas tworzenia folderu" });
    }
}


exports.delete = async (req, res) => {
    try {
        await request({
            uri: "https://api.dropboxapi.com/2/files/delete_v2",
            method: "POST",
            headers: { Authorization: "Bearer " + req.session.token },
            body: { path: req.body.path },
            json: true
        });

        res.json({ success: true, msg: "Pomyślnie usunięto" });
    } catch(e) {
        console.log("Error: " + e.message + " /delete");
        res.status(500).json({ error: "Nie udało się usunąć wybranago zasobu" });
    }
}

exports.createNote = async (req, res) => {
    try {
        if( typeof req.body.path === "undefined" || typeof req.body.note === "undefined" ) 
            throw new ApiError(400, "Nie podano nazwy notatki");

        if(/[<>:"|?*\\]/.test(req.body.path)) 
            throw new ApiError(400, "Ścieżka jest niepoprawna");

        if(/[\\<>:?*"|]/.test(req.body.path)) 
            throw new ApiError(400, "Nazwa notatki zawiera niepoprawne znaki");

        if(req.body.path.charAt(req.body.path.length - 1) === ".") 
            throw new ApiError(400, "Nazwa folderu nie może zawierać kropki na końcu");

        if(req.body.path.charAt(0) === " ") 
            throw new ApiError(400, "Nazwa folderu nie może zawierać spacji na początku");
        
        await request({
            uri: "https://content.dropboxapi.com/2/files/upload",
            method: "POST",
            headers: { 
                Authorization: "Bearer " + req.session.token,
                "Content-Type": "application/octet-stream",
                "Dropbox-API-Arg": escapeHeaderCharacters(JSON.stringify({
                    path: req.body.path + ".json",
                    autorename: true
                })) 
            },
            body: JSON.stringify(req.body.note)
        });

        res.json({ success: true, msg: "Pomyślnie zapisano notatkie" });
    } catch(e) {
        console.log(e);
        if(e instanceof ApiError)
            res.status(e.statusCode).json({ error: e.message });
        
        res.status(e.statusCode).json({ error: "Wystąpił błąd podczas tworzenia folderu" });
    }
}