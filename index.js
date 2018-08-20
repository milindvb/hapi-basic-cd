const Hapi = require("hapi");
const fs = require("fs");

const server = new Hapi.Server({
        "host": process.env.HOST || 'localhost',
        "port": process.env.PORT || 3000
    });

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Hello, world!';
    }
});

server.route({
    method: "POST",
    path: "/submit",
    config: {
        payload: {
            output: "stream",
            parse: true,
            allow: "multipart/form-data",
            maxBytes: 2147483648,
            timeout: false
        }
    },
    handler: (request, response) => {
        var result = [];
        for(var i = 0; i < request.payload["file"].length; i++) {
            result.push(request.payload["file"][i].hapi);
            request.payload["file"][i].pipe(fs.createWriteStream(__dirname + "/uploads/" + request.payload["file"][i].hapi.filename))
        }
        response(result);
    }
});


server.start(error => {
    if(error) {
        throw error;
    }
    console.log("Listening at " + server.info.uri);
});
