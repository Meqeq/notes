'use strict';
const request = require("request-promise");  

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