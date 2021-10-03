import decode from 'jwt-decode';
import { Login } from './../model/Login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.API_URL;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  login(login: Login) {
    return this.http.post(`${this.URL}/user/login`, login);
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
      console.log('token',token);
      return decode(token || '')
    }
    else
      return null;
  }

  logout() {
    localStorage.removeItem('token');
  }

}
