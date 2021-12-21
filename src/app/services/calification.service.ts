import { CalificacionPublicacion } from '../model/CalificacionPublicacion';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalificationService {

  URL:string = environment.API_URL
  constructor(private http: HttpClient) { }

  getCalificacionPublicacionId(idPub:string) {
    return this.http.get(`${this.URL}/calificacion/publicacionId/${idPub}`);
  }

  getCalificacionPublicacionUserId(idUsu:string) {
    return this.http.get(`${this.URL}/calificacion/publicacionId/${idUsu}`);
  }

  postCalificacionPublicacion(calificacion:CalificacionPublicacion) {
    // console.log(publicacion)
    // console.log(archivos)
    
    return this.http.post(`${this.URL}/calificacion/post/publicacion`,calificacion);
  }
}
