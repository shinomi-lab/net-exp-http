const http = require('node:http');

const server = http.createServer((req, res) => {
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Header:');
  console.dir(req.headers);
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf8' });
  res.end('Hello, world!');
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});

