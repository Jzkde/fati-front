import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from './api/api';

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {

  private apiURL: String = API.URL

  constructor(private http: HttpClient) { }

  cotizarFlex(telaN: string, alto: number, ancho: number, sistema: string): Observable<any> {
    const params = new HttpParams()
      .set('telaN', telaN)
      .set('alto', alto.toString())
      .set('ancho', ancho.toString())
      .set('sistema', sistema);
    
    return this.http.get(`${this.apiURL}flex/cotizar`, { params });
  }

  getTelasFlex(sistema: string): Observable<[]> {
    return this.http.get<[]>(`${this.apiURL}flex/lista/telas`, {
      params: { sistema }
    });
  }

  getSistemasFlex(sistema: string): Observable<[]> {
    return this.http.get<[]>(`${this.apiURL}flex/lista/sistemas`, {
      params: { sistema }
    });
  }

  cotizarRoyal(telaN: string, alto: number, ancho: number, sistema: string): Observable<any> {
    const params = new HttpParams()
      .set('telaN', telaN)
      .set('alto', alto.toString())
      .set('ancho', ancho.toString())
      .set('sistema', sistema);
    
    return this.http.get(`${this.apiURL}royal/cotizar`, { params });
  }

  getTelasRoyal(sistema: string): Observable<[]> {
    return this.http.get<[]>(`${this.apiURL}royal/lista/telas`, {
      params: { sistema }
    });
  }

  getSistemasRoyal(sistema: string): Observable<[]> {
    return this.http.get<[]>(`${this.apiURL}royal/lista/sistemas`, {
      params: { sistema }
    });
  }








}