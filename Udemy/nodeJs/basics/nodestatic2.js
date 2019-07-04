// serve a file using node-static

/*
  node-static is required, 
  we also require http to create the server.
*/

var nstatic = require('node-static'),
    http = require('http'),
    util = require('util');     // *for util.format

/*
  folder to serve and port, 
  as well as this file's version number:
*/

var folder = './public',
    port = 8080,
    version = "0.2";

/*
  set up the node-static file server:
*/

var dir = new(nstatic.Server)(folder);

console.log('serving at %s, version %s', folder, version);

/*
  create the http server:
*/

http.createServer(function(request, response) {
    request.addListener('end', function() {
	// *** intercept errors:
	dir.serve(request, response, function(err, result) {
	    if (err) {
		console.error('Error with %s : %s', request.url, err.message);

		// ***
		// if error is 404 or 500, serve the matching page,
		// using util.format to create the page name for
		// dir.serveFile:
		if (err.status === 404 || err.status === 500) {
		    dir.serveFile(util.format('/%d.html', err.status),
				  err.status,{}, request, response);
		} else {
		    // otherwise, write the status and header
		    // of the error in the page header:
		    response.writeHead(err.status, err.headers);
		    // and end the response
		    response.end();
		}
	    } else { 
		// no error... may want to do some logging here...
	    }
	});
    }).resume();
}).listen(port);

console.log('server running: http://localhost:%d', port);
