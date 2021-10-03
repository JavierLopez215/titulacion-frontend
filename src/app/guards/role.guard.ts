import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private apiAuth: AuthService,
    public router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.roleId;
    const token = localStorage.getItem('token');
    if (this.apiAuth.isAuth()) {
      // const {id, nombre, ......} = decode(token||'');
      const user: any = decode(token || '');
      const tipoUser = user.tipo;
      if (tipoUser !== expectedRole) {
        console.log('Usuario no autorizado para la vista');
        return false;
      }
    } else {
      return false;
    }
    return true;
  }

}
