var http = require('http');
 
var hostname = 'ec2-18-221-25-10.us-east-2.compute.amazonaws.com';
var port = 4000;
 
var server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});