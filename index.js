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
     method: 'POST',
     path: '/submit',
     config: { 	 
     	payload: {
         	output: 'stream',
         	parse: true,
         	allow: 'multipart/form-data',
            maxBytes: 1000000000 
     	},    	 
        handler: function (request, reply) {
             	var data = request.payload;
             	if (data.file) {
                 	var name = data.file.hapi.filename;
                 	var path = __dirname + "/uploads/" + name;
                 	var file = fs.createWriteStream(path);
                 	 
                 	file.on('error', function (err) { 
                 	    console.error(err) 
                 	});
                 	 
                 	data.file.pipe(file);
                 	 
                 	data.file.on('end', function (err) { 
                     	var ret = {
                         	filename: data.file.hapi.filename,
                         	headers: data.file.hapi.headers
                     	}
                 	    reply(JSON.stringify(ret));
                 	})
             	}
        }
    }
});


server.start(error => {
    if(error) {
        throw error;
    }
    console.log("Listening at " + server.info.uri);
});
