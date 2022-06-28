import { CalificacionComentario } from '../model/GradeComment';
import { CalificacionPublicacion } from '../model/GradePublication';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  URL: string = environment.API_URL
  constructor(private http: HttpClient) { }

  getCalificacionPublicacionId(idPub: string) {
    return this.http.get(`${this.URL}/calificacion/publicacionId/${idPub}`,{observe: 'events', reportProgress: true});
  }

  getCalificacionPublicacionUserId(idPub: number) {
    return this.http.get(`${this.URL}/calificacion/publicacionUsuIdPub/${idPub}`,{observe: 'events', reportProgress: true});
  }

  postCalificacionPublicacion(calificacion: CalificacionPublicacion) {
    return this.http.post(`${this.URL}/calificacion/post/publicacion`, calificacion,{observe: 'events', reportProgress: true});
  }

  updateCalificacionPublicacion(calificacion: CalificacionPublicacion) {
    console.log(calificacion.id)
    return this.http.put(`${this.URL}/calificacion/update/publicacion/${calificacion.id}`, calificacion,{observe: 'events', reportProgress: true});
  }


  //Comentarios Calificaciones

  getCalificacionComentarioUserId(idCom: number) {
    return this.http.get(`${this.URL}/calificacion/comentarioUsuIdCom/${idCom}`,{observe: 'events', reportProgress: true});
  }

  getCalificacionComentarioId(idCom: number) {
    return this.http.get(`${this.URL}/calificacion/comentarioId/${idCom}`,{observe: 'events', reportProgress: true});
  }

  postCalificacionComentario(calificacion: CalificacionComentario) {
    return this.http.post(`${this.URL}/calificacion/post/comentario`, calificacion,{observe: 'events', reportProgress: true});
  }

  updateCalificacionComentario(calificacion: CalificacionComentario) {
    return this.http.put(`${this.URL}/calificacion/update/comentario/${calificacion.id}`, calificacion,{observe: 'events', reportProgress: true});
  }
}
