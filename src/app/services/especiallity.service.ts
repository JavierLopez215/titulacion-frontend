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
    return this.http.get(`${this.URL}/especialidad/get`,{observe: 'events', reportProgress: true});
  }
  getEspecialidadesUsuario(idUsu:number) {
    return this.http.get(`${this.URL}/espec-usu/get/${idUsu}`, {observe: 'events', reportProgress: true});
  }
  deleteEspecialidadUsuario(idEU:number){
    return this.http.delete(`${this.URL}/espec-usu/delete/${idEU}`, {observe: 'events', reportProgress: true});
  }
  postEspecialidadUsuario(data:any){
    return this.http.post(`${this.URL}/espec-usu/post`,data, {observe: 'events', reportProgress: true});
  }
}
