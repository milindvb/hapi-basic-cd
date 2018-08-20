var hapi = require('hapi');
var server = new hapi.Server();

server.connection({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080
});


server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Hello, world!';
    }
});

if (!module.parent) {
    server.start(function() {
        console.log('Server started: ' + server.info.uri);
    });
}

module.exports = server;
