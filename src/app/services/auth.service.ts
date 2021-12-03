import decode from 'jwt-decode';
import { Login } from './../model/Login';
import { Profile } from './../model/Profile';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.API_URL;
  private user : Profile = {} as Profile;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  login(login: Login) {
    return this.http.post(`${this.URL}/user/login`, login);
  }

  register(profile: Profile) {
    return this.http.post(`${this.URL}/user/register`, profile);
  }

  isAuth(): boolean {

    const token = localStorage.getItem('token') || '';
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }

  dataUser() {
    if (this.isAuth()) {
      const token = localStorage.getItem('token');
      // console.log('token',token);
      this.user = decode(token || '');
      return this.user;
    }
    else
      return null;
  }

  actuaizarDatosUsuario(id:number, profile:Profile){
    return this.http.post(`${this.URL}/user/update/${id}`, profile);
  }

  actualizarFotoUsuario(file:any){
    // console.log(foto);
    return this.http.post(`${this.URL}/user/updatePicture`, file);
  }

  logout() {
    localStorage.removeItem('token');
  }

}
