import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { People } from '../components/models/persona.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  public APU_URL = 'http://localhost:3000/api'
  constructor(private http: HttpClient) { }

  getAllPeople() {
    return this.http.get(`${this.APU_URL}/persona`);
  }
  getPeople(idCliente: string) {

    return this.http.get(`${this.APU_URL}/persona/${idCliente}`);
  }
  savePeople(data: People) {
    return this.http.post(`${this.APU_URL}/persona/`, data);
  }




  deletePeople(idClient: number) {
    return this.http.delete(`${this.APU_URL}/persona/${idClient}`);
  }
  updatePeople(idClient: number, data: People): Observable<People> {
    return this.http.put(`${this.APU_URL}/persona/${idClient}`, data);
  }

}
