import express from 'express';
import http from 'http';
import config from './config/environment';
import expressConfig from './config/express';
import routes from './routes';

// Setup server
const app = express();
const server = http.createServer(app);

expressConfig(app);
routes(app);

// Start server
function startServer() {
  app.myApp = server.listen(config.port, config.ip, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
export default app;
