import { Comentario } from './../model/Comentario';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComentariesService {

  URL:string = environment.API_URL
  
  constructor( private http: HttpClient ) { }

  getCommentariosPublicacionId(idUsu:string) {
    return this.http.get(`${this.URL}/comentario/getComentario/${idUsu}`,{observe: 'events', reportProgress: true});
  }

  postComentariosPublicacion(comentario:Comentario){
    // console.log(comentario);
    return this.http.post(`${this.URL}/comentario/post/`,comentario,{observe: 'events', reportProgress: true});
  }

  postArchivosComentarios(files:FormData) {
    return this.http.post(`${this.URL}/comentario/saveFiles`,files);
  }

  getDetalleCommentariosId(idPub:string) {
    return this.http.get(`${this.URL}/comentario/getDetallesCom/${idPub}`,{observe: 'events', reportProgress: true});
  }

  getCalificacionCommentariosId(idCom:number) {
    return this.http.get(`${this.URL}/calificacion/comentarioId/${idCom}`,{observe: 'events', reportProgress: true});
  }
}
