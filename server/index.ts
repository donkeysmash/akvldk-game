import * as http from 'http';

let reqCnt = 1;

http.createServer((req, res) => {

  const message = `Request Count: ${reqCnt}`;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<html><head><meta http-equiv="refresh" content="2"></head><body>${message}</body></html>`);

  console.log("handled request: " + reqCnt++);
}).listen(8080);

console.log('server running on port 8080');