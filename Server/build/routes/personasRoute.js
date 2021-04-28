"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personaController_1 = require("../controllers/personaController");
class PersonasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', personaController_1.personaController.listaPersonas);
        this.router.get('/:idCliente', personaController_1.personaController.buscarPersona);
        this.router.post('/', personaController_1.personaController.createPersona);
        this.router.delete('/:idCliente', personaController_1.personaController.deletePersona);
        this.router.put('/:idCliente', personaController_1.personaController.updatePersona);
    }
}
const personaRoute = new PersonasRoutes();
exports.default = personaRoute.router;
