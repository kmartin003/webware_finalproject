var http = require('http')
  , fs = require('fs')
  , url = require('url')
  , path = require('path')

// Goal: get this to client
var classes = ['cs573', 'cs4241']

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url);

  switch( uri.pathname ) {
    case '/':
      sendFile(res, 'index.html');
      break;
    case '/index.html':
      sendFile(res, 'index.html');
      break;
    case '/add':
      handleResBody(req);
      res.end('testing return');
      break;
    case '/list':
      res.end( JSON.stringify(classes) );
      break;
    default:
      res.end('404 not found');
  }
});

function handleResBody(req) {
 var chunk = ""
 req.on('data', function(data) {
   chunk += data;
 })
 req.on('end', function(data) {
   // Note: this is not a great way to access this object.
   var obj = chunk.split('=');
   classes.push( obj[1] );
 })
}

server.listen(8080);
console.log('listening on 8080');

// subroutines

function sendFile(res, filename) {
  res.writeHead(200, {'Content-type': 'text/html'})

  var stream = fs.createReadStream(filename)

  stream.on('data', function(data) {
    res.write(data);
  })

  stream.on('end', function(data) {
    res.end();
    return;
  })
}
