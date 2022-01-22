import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private URL=environment.API_URL; 

  constructor(private http: HttpClient) { }

  getPublicaciones(idUsu:number) {
    return this.http.get(`${this.URL}/publicacion/getPubUser/${idUsu}`,{observe: 'events', reportProgress: true});
  }
}


