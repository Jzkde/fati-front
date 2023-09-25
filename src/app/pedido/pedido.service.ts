import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Busqueda } from '../models/busqueda';
import { Estado } from '../models/Estado';
import { Pedido } from '../models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {


  private pedidoURL: String = "http://192.168.1.103:8080/pedido/"

  constructor(private httpClient: HttpClient) { }

  lista(): Observable<any[]> {
    return this.httpClient.get<Pedido[]>(this.pedidoURL + 'lista')
  }
  uno(id: number): Observable<Pedido> {
    return this.httpClient.get<Pedido>(this.pedidoURL + `lista/${id}`);
  }
  filtro(busqueda: Busqueda): Observable<any[]> {
    return this.httpClient.post<any[]>(this.pedidoURL + 'filtro', busqueda)
  }
  nuevo(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(this.pedidoURL + 'nuevo', pedido)
  }
  actualizar(id: number, llego: Estado): Observable<any> {
    return this.httpClient.put(this.pedidoURL + `actualizar/${id}`, llego)
  }
  editar(id: number, pedido: Pedido): Observable<any> {
    return this.httpClient.put(this.pedidoURL + `editar/${id}`, pedido)
  }
 



}
