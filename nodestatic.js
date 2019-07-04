// serve a file using node-static

/*
  we also require http to create the server.
*/

var nstatic = require('node-static'),
    http = require('http');

/*
  folder to serve and port:
*/

var folder = './public',
    port = 8080;

/*
  set up the node-static file server:
*/

var dir = new(nstatic.Server)(folder);

console.log('serving at %s, version 0.1', folder);

/*
  create the http server:
*/

http.createServer(function(request, response) {
    request.addListener('end', function() {
	dir.serve(request, response);
    }).resume();
}).listen(port);

console.log('server running: http://localhost:%d', port);
