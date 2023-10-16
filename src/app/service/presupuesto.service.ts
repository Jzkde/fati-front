import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Presupuesto } from '../models/presupuesto';
import { API } from './api/api';
import { Busqueda } from '../models/busqueda';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

private apiURL: String = API.URL + "presupuesto/"

  constructor(private httpClient: HttpClient) { }

  lista(): Observable<any[]> {
    return this.httpClient.get<Presupuesto[]>(this.apiURL + 'lista')
  }
  uno(id: number): Observable<Presupuesto> {
    return this.httpClient.get<Presupuesto>(this.apiURL + `lista/${id}`);
  }
  filtro(busqueda: Busqueda): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiURL + 'filtro', busqueda)
  }
  nuevo(id: number,presupuesto: Presupuesto): Observable<Presupuesto> {
    return this.httpClient.post<Presupuesto>(this.apiURL + `nuevo/${id}`, presupuesto)
  }
  editar(id: number, presupuesto: Presupuesto): Observable<any> {
    return this.httpClient.put(this.apiURL + `editar/${id}`, presupuesto)
  }
 



}
