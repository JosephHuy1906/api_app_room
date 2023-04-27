import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import connect from './models/database.js';
import { userRouter, roomRouter, partitiinedRouter } from './router/index.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';

const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

const app = express();
const port = process.env.PORT || 3002;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/apiuser', userRouter);
app.use('/apiroom', roomRouter);
app.use('/apipartitiinde', partitiinedRouter);
app.use(
    cors({
        origin: '*',
    }),
);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, async () => {
    await connect();
    console.log(`server running to port: ${port}`);
});
