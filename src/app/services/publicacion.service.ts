import { Publicacion } from 'src/app/model/Publicacion';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private URL=environment.API_URL; 

  constructor(private http: HttpClient) { }

  getPublicaciones(idUsu:number) {
    return this.http.get(`${this.URL}/publicacion/getPubUser/${idUsu}`,{observe: 'events', reportProgress: true});
  }

  getTopPublicaciones(idUsu:number) {
    return this.http.get(`${this.URL}/publicacion/getTopPubUser/${idUsu}`,{observe: 'events', reportProgress: true});
  }

  getColPublicaciones(idUsu:number) {
    return this.http.get(`${this.URL}/publicacion/getColPubUser/${idUsu}`,{observe: 'events', reportProgress: true});
  }

  getPublicacionById(idPub:string) {
    return this.http.get(`${this.URL}/publicacion/getPubId/${idPub}`,{observe: 'events', reportProgress: true});
  }

  getDetallePublicacion(idPub:string) {
    return this.http.get(`${this.URL}/publicacion/getDetalles/${idPub}`,{observe: 'events', reportProgress: true});
  }

  postPublicacion(publicacion:Publicacion) {
    return this.http.post(`${this.URL}/publicacion/post`,publicacion,{observe: 'events', reportProgress: true});
  }
  postArchivosPublicacion(files:FormData) {
    return this.http.post(`${this.URL}/publicacion/saveFiles`,files);
  }

  //publicaciones de la comunidad
  getPublicacionesCommunity(idUsu:number) {
    return this.http.get(`${this.URL}/publicacion/getPubCom/${idUsu}`,{observe: 'events', reportProgress: true});
  }

  eliminarPublicacion(idPub:number){
    return this.http.put(`${this.URL}/publicacion/delete/${idPub}`,{id:idPub},{observe: 'events', reportProgress: true});
  }

  completarPublicacion(idPub:number){
    return this.http.put(`${this.URL}/publicacion/comPublicacion/${idPub}`,{id:idPub},{observe: 'events', reportProgress: true});
  }

}
