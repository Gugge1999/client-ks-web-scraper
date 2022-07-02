import express, { json } from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(json());

const port = process.env.PORT || 8080;

const relativePath = (a) => join(dirname(fileURLToPath(import.meta.url)), a);

const pathToAngularDist = relativePath('./dist/ks-web-scraper');

app.use('/', express.static(pathToAngularDist));

app.listen(port, () => {
  console.log(`Started server on: http://127.0.0.1:${port}/`);
});
