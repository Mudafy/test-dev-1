import http from 'http';
import { createLogger } from 'bunyan';

const logger = createLogger({name: 'feedparser'});

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

logger.info('Server running at http://127.0.0.1:1337/');

