import { Router } from 'express';
import { personaController } from '../controllers/personaController';


class PersonasRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', personaController.listaPersonas);
        this.router.get('/:idCliente', personaController.buscarPersona);
        this.router.post('/', personaController.createPersona);
        this.router.delete('/:idCliente', personaController.deletePersona);
        this.router.put('/:idCliente', personaController.updatePersona);
    }
}

const personaRoute = new PersonasRoutes();

export default personaRoute.router;