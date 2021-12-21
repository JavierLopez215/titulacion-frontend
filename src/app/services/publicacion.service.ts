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
    return this.http.get(`${this.URL}/publicacion/getPubUser/${idUsu}`);
  }

  getTopPublicaciones(idUsu:number) {
    return this.http.get(`${this.URL}/publicacion/getTopPubUser/${idUsu}`);
  }

  getPublicacionById(idPub:string) {
    return this.http.get(`${this.URL}/publicacion/getPubId/${idPub}`);
  }

  getDetallePublicacion(idPub:string) {
    return this.http.get(`${this.URL}/publicacion/getDetalles/${idPub}`);
  }

  postPublicacion(publicacion:Publicacion) {
    // console.log(publicacion)
    // console.log(archivos)
    
    return this.http.post(`${this.URL}/publicacion/post`,publicacion);
  }
  postArchivosPublicacion(files:FormData) {
    return this.http.post(`${this.URL}/publicacion/saveFiles`,files);
  }
}
