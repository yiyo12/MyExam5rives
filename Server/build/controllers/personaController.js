"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personaController = void 0;
const database_1 = __importDefault(require("../database"));
class PersonaController {
    listaPersonas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listaPersonas = yield database_1.default.query('SELECT * FROM persona');
            const direccion = yield database_1.default.query('SELECT * FROM direccion');
            let dataObj = Array();
            for (let index = 0; index < listaPersonas.length; index++) {
                dataObj.push(Object.assign(listaPersonas[index], direccion[index]));
            }
            res.json(dataObj);
        });
    }
    buscarPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCliente } = req.params;
            console.log(req.params);
            const listaPersonas = yield database_1.default.query('SELECT * FROM persona  WHERE idCliente = ?', [idCliente]);
            const direccion = yield database_1.default.query('SELECT * FROM direccion WHERE id_Cliente = ?', [idCliente]);
            let dataObj = Array();
            for (let index = 0; index < listaPersonas.length; index++) {
                dataObj.push(Object.assign(listaPersonas[index], direccion[index]));
            }
            res.json(dataObj);
        });
    }
    createPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = {
                idCliente: Math.round(Math.random() * 10000000000000),
                nombres: req.body.nombres,
                apellidoP: req.body.apellidoP,
            };
            const dataDireccion = {
                idDireccion: Math.round(Math.random() * 10000000000),
                id_Cliente: dataUser.idCliente,
                estado: req.body.estado,
                ciudad: req.body.ciudad,
                calle: req.body.calle,
                numExt: req.body.numExt,
            };
            yield database_1.default.query('INSERT INTO persona set ?', [dataUser]);
            yield database_1.default.query('INSERT INTO direccion set ?', [dataDireccion]);
            res.json('Gurdaaste una persona');
        });
    }
    deletePersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCliente } = req.params;
            yield database_1.default.query('DELETE FROM persona WHERE idCliente = ?', [idCliente]);
            yield database_1.default.query('DELETE FROM direccion WHERE id_Cliente = ?', [idCliente]);
            res.json('elimando a la persona');
        });
    }
    updatePersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = {
                // idCliente:req.body.idCliente,
                nombres: req.body.nombres,
                apellidoP: req.body.apellidoP,
            };
            const dataDireccion = {
                //idDireccion:req.body.idDireccion,
                //id_Cliente: req.body.id_Cliente,
                estado: req.body.estado,
                ciudad: req.body.ciudad,
                calle: req.body.calle,
                numExt: req.body.numExt,
            };
            const result = yield database_1.default.query('UPDATE persona set ? WHERE idCliente = ?', [dataUser, req.body.idCliente]);
            yield database_1.default.query('UPDATE direccion set ? WHERE id_Cliente = ?', [dataDireccion, req.body.idCliente]);
            //console.log(result);
            res.json('actualizado a la persona');
        });
    }
}
exports.personaController = new PersonaController();
exports.default = exports.personaController;
