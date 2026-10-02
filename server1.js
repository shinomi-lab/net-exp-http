const http = require('node:http');
const fs = require('node:fs/promises');

const db = {
  'A0001': {
    'name': 'Taro',
    'phone': '111-1111-1111',
  },
  'A0002': {
    'name': 'Jiro',
    'phone': '222-2222-2222',
  },
  'A0003': {
    'name': 'Goro',
    'phone': '333-3333-3333',
  },
};

const server = http.createServer(async (req, res) => {
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Header:');
  console.dir(req.headers);

  switch (req.method) {
    case 'GET':
      try {
        const data = await fs.readFile('./index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      } catch (err) {
        res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf8' });
        res.end('index.html not implemented');
      }
      break;
    case 'POST':
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
        if (body.length > 1e6) {
          res.writeHead(413, { 'Content-Type': 'text/plain; charset=utf8' });
          res.end('Payload too large');
        }
      });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          console.dir(parsed);

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

          if (parsed.key in db) {
            res.end(JSON.stringify({
              found: true,
              data: db[parsed.key],
            }));
          } else {
            res.end(JSON.stringify({
              found: false,
              message: `${parsed.key} is not found`,
            }));
          }
        } catch (err) {
          console.log(err);
          res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf8' });
          res.end('Bad request');
        }
      });
      break;
  }
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});

