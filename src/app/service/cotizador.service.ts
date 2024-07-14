import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from './api/api';

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {

  private apiURL: String = API.URL + "flex/"

  constructor(private http: HttpClient) { }

  cotizar(telaN: string, alto: number, ancho: number, sistema: string): Observable<any> {
    const params = new HttpParams()
      .set('telaN', telaN)
      .set('alto', alto.toString())
      .set('ancho', ancho.toString())
      .set('sistema', sistema);
    
    return this.http.get(`${this.apiURL}cotizar`, { params });
  }

  getTelas(sistema: string): Observable<[]> {
    return this.http.get<[]>(`${this.apiURL}lista/telas`, {
      params: { sistema }
    });
  }

  getSistemas(sistema: string): Observable<[]> {
    return this.http.get<[]>(`${this.apiURL}lista/sistemas`, {
      params: { sistema }
    });
  }


}