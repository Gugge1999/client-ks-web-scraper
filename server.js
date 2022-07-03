import express, { json } from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(json());

const port = process.env.PORT || 8080;

const relativePath = (p) => join(dirname(fileURLToPath(import.meta.url)), p);

const pathToAngularDist = relativePath('./dist/client-ks-web-scraper');

app.use('/', express.static(pathToAngularDist));

// Hantera 404
app.use('*', express.static(pathToAngularDist));

app.listen(port, () => {
  console.log(`Started client.`);
});
