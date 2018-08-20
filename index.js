/*
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


'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, world!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
*/

const Hapi = require("hapi");
const fs = require("fs");
const server = new Hapi.server({  
  host: 'localhost',
  port: 3000
});

server.route({
   method: 'GET',
   path: '/',
   handler: (request, h) => {
      return 'Hello, world!';
   }
});

server.start(error => {
      if(error) {
      throw error;
   }
   console.log("Listening at " + server.info.uri);
}); 
 

