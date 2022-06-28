import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private URL=environment.API_URL; 

  constructor(private http: HttpClient) { }

  getEtiquetas() {
    return this.http.get(`${this.URL}/etiqueta/getLabels`);
  }



}
