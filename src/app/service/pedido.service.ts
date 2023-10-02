import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Busqueda } from '../models/busqueda';
import { Estado } from '../models/Estado';
import { Pedido } from '../models/pedido';
import { API } from './api/api';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiURL: String = API.URL + "pedido/"

  constructor(private httpClient: HttpClient) { }

  lista(): Observable<any[]> {
    return this.httpClient.get<Pedido[]>(this.apiURL + 'lista')
  }
  uno(id: number): Observable<Pedido> {
    return this.httpClient.get<Pedido>(this.apiURL + `lista/${id}`);
  }
  filtro(busqueda: Busqueda): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiURL + 'filtro', busqueda)
  }
  nuevo(id: number, pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(this.apiURL + `nuevo/${id}`, pedido)
  }
  actualizar(id: number, llego: Estado): Observable<any> {
    return this.httpClient.put(this.apiURL + `actualizar/${id}`, llego)
  }
  editar(id: number, pedido: Pedido): Observable<any> {
    return this.httpClient.put(this.apiURL + `editar/${id}`, pedido)
  }
}
