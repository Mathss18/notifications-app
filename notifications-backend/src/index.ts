import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import { router } from './api/routes/routes';
import { AppDataSource } from './data-source'
dotenv.config()

AppDataSource.initialize().then(() => {

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use('/api', router)

    app.listen(3000, async () => {
        console.log('rodando na 3000!');
    })

})

