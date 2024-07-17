import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from './api/api';
import { Telas } from '../models/telas';
import { Busqueda } from '../models/busqueda';

@Injectable({
  providedIn: 'root'
})
export class TelasService {


  private apiURL: string = API.URL + "db/carga/"
  private apiTelas: string = API.URL

  constructor(private httpClient: HttpClient) { }

  cargar(url: string, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log(this.apiURL + url);
    return this.httpClient.post(this.apiURL + url, formData, { responseType: 'text' });
  }

  nuevo(url: string, telas: Telas[]): Observable<any> {
    return this.httpClient.post(this.apiTelas + url + "/varios", telas);
  }

  masivo(url: string, porcentaje: number): Observable<any> {
    const params = new HttpParams().set('porcentaje', porcentaje.toString());
    return this.httpClient.put(this.apiTelas + url + "/masivo", {}, { params, responseType: 'text' });
  }

  filtro(url: string, busqueda: Busqueda): Observable<any[]> {
    return this.httpClient.post<any[]>(this.apiTelas + url + '/filtro', busqueda)
  }

  filtroUno(url: string, id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiTelas + url + `/lista/${id}`);
  }

  editar(url: string, id: number, tela: Telas): Observable<any> {
    return this.httpClient.put(this.apiTelas + url + `/editar/${id}`, tela);
  }

  borrar(url: string, id: number): Observable<any> {
    return this.httpClient.delete(this.apiTelas + url + `/borrar/${id}`, { responseType: 'text' });
  }
}