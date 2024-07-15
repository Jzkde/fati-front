import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from './api/api';
import { Telas } from '../models/telas';

@Injectable({
  providedIn: 'root'
})
export class TelasService {


  private apiURL: string = API.URL + "db/carga/"
  private apiTelas: string = API.URL

  constructor(private httpClient: HttpClient) { }

  uploadFile(url: string, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log(this.apiURL + url);
    return this.httpClient.post(this.apiURL + url, formData, { responseType: 'text' });
  }

  saveData(url: string, telas: Telas[]): Observable<any> {
    return this.httpClient.post(this.apiTelas + url + "/varios", telas);
  }

  masivo(url: string, porcentaje: number): Observable<any> {
    const params = new HttpParams().set('porcentaje', porcentaje.toString());
    return this.httpClient.put(this.apiTelas + url + "/masivo", {}, { params, responseType: 'text' });
  }
}