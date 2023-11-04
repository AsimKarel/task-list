
import express, { Request, Response } from 'express';

const app: express.Application = express();
const controller = require('./Controller/Controller')
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/', controller)

app.listen(3100, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});