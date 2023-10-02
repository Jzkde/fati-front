import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { API } from './api/api';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


private apiURL: String = API.URL + "cliente/"

  constructor(private httpClient: HttpClient) { }

  lista(): Observable<any[]> {
    return this.httpClient.get<Cliente[]>(this.apiURL + 'lista')
  }
  uno(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.apiURL + `lista/${id}`);
  }
  nuevo(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.apiURL + "nuevo", cliente)
  }
  editar(id: number, cliente: Cliente): Observable<any> {
    return this.httpClient.put(this.apiURL + `editar/${id}`, cliente)
  }
 
}