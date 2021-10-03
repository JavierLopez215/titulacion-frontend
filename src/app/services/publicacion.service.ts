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
}
