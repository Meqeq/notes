function RequestError({status, msg}) {
    this.status = status;
    this.msg = msg;
}

export default (adr, options = {}) => {
    return new Promise( async(resolve, reject) => {
        try {
            let { method, body, credentials, headers } = options;
            
            let reqOptions = {};

            reqOptions.method = method ? method : "GET";
            
            if(body && ( reqOptions.method === "GET" || reqOptions.method === "HEAD" ) ) throw new RequestError({ status: 99, msg: "Żądanie GET lub HEAD nie może zawierać paramtru body"});

            if(credentials) reqOptions.credentials = credentials;

            if(headers) reqOptions.headers = headers;

            if(body) {
                reqOptions.body = JSON.stringify(body);
                reqOptions.headers = { ...reqOptions.headers, 'Content-Type': 'application/json' };
            }

            let res = await fetch(adr, reqOptions);
            console.log(res);
            let data = await res.json();
            if(!res.ok) {
                throw new RequestError({ status: res.status, msg: data.msg });
            }
            

            resolve(data);
        } catch(e) {
            reject(e);
        }
        
    });
}