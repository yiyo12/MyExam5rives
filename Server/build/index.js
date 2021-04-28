"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("funciona");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const personasRoute_1 = __importDefault(require("./routes/personasRoute"));
class Server {
    constructor() {
        this.UrlApi = '/api/persona';
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json()); //era el bodypaerser antes
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use(this.UrlApi, personasRoute_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Escuchando en ", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
