import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspeciallityService {

  private URL=environment.API_URL; 

  constructor(private http: HttpClient) { }

  getEspecialidades() {
    return this.http.get(`${this.URL}/especialidad/get`);
  }
  getEspecialidadesUsuario(idUsu:number) {
    return this.http.get(`${this.URL}/espec-usu/get/${idUsu}`);
  }
}
