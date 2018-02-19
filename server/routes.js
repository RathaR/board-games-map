import path from 'path';
import thing from './api/thing';

export default function (app) {
  // Insert routes below
  app.use('/api/things', thing);
  // All undefined asset or api routes should return a 404
  // All other routes should redirect to the app.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
