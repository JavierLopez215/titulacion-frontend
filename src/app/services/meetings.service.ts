import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  private URL=environment.API_URL; 

  constructor(private http: HttpClient) { }

  getReunionAceptadaUsuario(idUsu:number) {
    return this.http.get(`${this.URL}/reunion/aceptadas/getIdUsuSol/${idUsu}`);
  }

  getReunionHistorialUsuario(idUsu:number) {
    return this.http.get(`${this.URL}/reunion/historial/getIdUsuSol/${idUsu}`);
  }

}
