import { CalificacionPublicacion } from '../model/CalificacionPublicacion';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalificationService {

  URL: string = environment.API_URL
  constructor(private http: HttpClient) { }

  getCalificacionPublicacionId(idPub: string) {
    return this.http.get(`${this.URL}/calificacion/publicacionId/${idPub}`,{observe: 'events', reportProgress: true});
  }

  getCalificacionPublicacionUserId(idUsu: string) {
    return this.http.get(`${this.URL}/calificacion/publicacionId/${idUsu}`,{observe: 'events', reportProgress: true});
  }

  postCalificacionPublicacion(calificacion: CalificacionPublicacion) {
    // console.log(publicacion)
    // console.log(archivos)

    return this.http.post(`${this.URL}/calificacion/post/publicacion`, calificacion,{observe: 'events', reportProgress: true});
  }

  getCalificacionComentarioId(idCom: number) {
    return this.http.get(`${this.URL}/calificacion/comentarioId/${idCom}`,{observe: 'events', reportProgress: true});
  }
}
