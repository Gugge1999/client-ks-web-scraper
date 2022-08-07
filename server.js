import express, { json } from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(json());

const port = process.env.PORT || 8080;

// Behövs p?
const relativePath = (p) => join(dirname(fileURLToPath(import.meta.url)), p);

const pathToAngularDist = relativePath('./dist/client-ks-web-scraper');

app.use(express.static(pathToAngularDist));

app.listen(port, () => {
  console.log(`Started client.`);
});

// For all GET requests, send back index.html so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
  res.sendFile(`${pathToAngularDist}/index.html`);
});
