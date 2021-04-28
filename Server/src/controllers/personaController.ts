import { Request, Response } from 'express';
import pool from '../database';
import {Direccion} from '../models/direccion.model'
import {User} from '../models/user.model'
import * as uuid from 'uuid';
class PersonaController {

  public async listaPersonas(req: Request, res: Response): Promise<void> {
    const listaPersonas = await pool.query('SELECT * FROM persona');
    const direccion = await pool.query('SELECT * FROM direccion');
    let dataObj = Array();
     for (let index = 0; index < listaPersonas.length; index++) {
       dataObj.push(Object.assign(listaPersonas[index], direccion[index]));
       
     }
    res.json(dataObj);
  }

  public async buscarPersona(req: Request, res: Response): Promise<any> {
    const { idCliente } = req.params;
    console.log(req.params);
  
    const listaPersonas = await pool.query('SELECT * FROM persona  WHERE idCliente = ?' , [idCliente]);
    const direccion = await pool.query('SELECT * FROM direccion WHERE id_Cliente = ?' , [idCliente]);
    let dataObj = Array();
     for (let index = 0; index < listaPersonas.length; index++) {
       dataObj.push(Object.assign(listaPersonas[index], direccion[index]));
       
     }
    res.json(dataObj);

  }

  public async createPersona(req: Request, res: Response): Promise<void> {
    const dataUser: User = {
      idCliente: Math.round(Math.random()*10000000000000),
      nombres:req.body.nombres,
      apellidoP: req.body.apellidoP,
    }

    const dataDireccion: Direccion = {
      idDireccion: Math.round(Math.random()*10000000000),
      id_Cliente: dataUser.idCliente,
      estado: req.body.estado,
      ciudad: req.body.ciudad,
      calle: req.body.calle,
      numExt: req.body.numExt,
    }
    await pool.query('INSERT INTO persona set ?', [dataUser]);
    await pool.query('INSERT INTO direccion set ?', [dataDireccion]);
    res.json('Gurdaaste una persona')
  }

  public async deletePersona(req: Request, res: Response): Promise<void> {
    const { idCliente } = req.params;
    await pool.query('DELETE FROM persona WHERE idCliente = ?', [idCliente]);
    await pool.query('DELETE FROM direccion WHERE id_Cliente = ?', [idCliente]);
    res.json('elimando a la persona');

  }

  public async updatePersona(req: Request, res: Response): Promise<void> {
    const dataUser: User = {
     // idCliente:req.body.idCliente,
      nombres:req.body.nombres,
      apellidoP: req.body.apellidoP,
    }

    const dataDireccion: Direccion = {
      //idDireccion:req.body.idDireccion,
      //id_Cliente: req.body.id_Cliente,
      estado: req.body.estado,
      ciudad: req.body.ciudad,
      calle: req.body.calle,
      numExt: req.body.numExt,
    }
    
    const result = await pool.query('UPDATE persona set ? WHERE idCliente = ?', [dataUser, req.body.idCliente]);
     await pool.query('UPDATE direccion set ? WHERE id_Cliente = ?', [dataDireccion, req.body.idCliente]);

    //console.log(result);

    res.json('actualizado a la persona');
  }
}
export const personaController = new PersonaController();
export default personaController;