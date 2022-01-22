import { CalificacionReunion } from './../model/CalificacionReunion';
import { Reunion } from './../model/Reunion';
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
    return this.http.get(`${this.URL}/reunion/aceptadas/getIdUsuSol/${idUsu}`,{observe: 'events', reportProgress: true});
  }

  getReunionHistorialUsuario(idUsu:number) {
    return this.http.get(`${this.URL}/reunion/historial/getIdUsuSol/${idUsu}`,{observe: 'events', reportProgress: true});
  }

  getReunionAceptadaComunidad(idUsu:number) {
    return this.http.get(`${this.URL}/reunion/aceptadasComunidad/getIdUsuSol/${idUsu}`,{observe: 'events', reportProgress: true});
  }

  getReunionById(idReu:number) {
    return this.http.get(`${this.URL}/reunion/getIdReu/${idReu}`,{observe: 'events', reportProgress: true});
  }

  getReunionHistorialComunidad(idUsu:number) {
    return this.http.get(`${this.URL}/reunion/historialComunidad/getIdUsuSol/${idUsu}`,{observe: 'events', reportProgress: true});
  }

  postReunion(reunion:Reunion) {
    return this.http.post(`${this.URL}/reunion/post`,reunion,{observe: 'events', reportProgress: true});
  }

  getCalificacionReunion(idReu:number) {
    return this.http.get(`${this.URL}/calificacion/reunionId/${idReu}`,{observe: 'events', reportProgress: true});
  }

  postCalificacionReunion(calificacion:CalificacionReunion){
    return this.http.post(`${this.URL}/calificacion/post/reunion`,calificacion,{observe: 'events', reportProgress: true});
  }

}
