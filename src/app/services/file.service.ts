import { FileAp } from '../model/FileAp';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private URL=environment.API_URL; 

  constructor(private http: HttpClient) { }

  getAportesUsu(idUsu:string) {
    return this.http.get(`${this.URL}/aporte/aporteUsu/${idUsu}`,{observe: 'events', reportProgress: true});
  }

  getAportesCom(idUsu:string) {
    return this.http.get(`${this.URL}/aporte/aporteCom/${idUsu}`,{observe: 'events', reportProgress: true});
  }

  postArchivoAporte(files:FormData) {
    return this.http.post(`${this.URL}/aporte/saveFiles`,files);
  }

  postAporte(fileApo:FileAp) {
    return this.http.post(`${this.URL}/aporte/post`,fileApo,{observe: 'events', reportProgress: true});
  }

  deleteAporte(idApo:number){
    return this.http.put(`${this.URL}/aporte/delete/${idApo}`,{},{observe: 'events', reportProgress: true});

  }
}
