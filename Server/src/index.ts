console.log("funciona");

import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import personasRoute from './routes/personasRoute';

class Server {
    public UrlApi = '/api/persona'
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }


    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());//era el bodypaerser antes
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use(indexRoutes);
        this.app.use(this.UrlApi, personasRoute);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log("Escuchando en ", this.app.get('port'));

        });
    }
}


const server = new Server();
server.start();