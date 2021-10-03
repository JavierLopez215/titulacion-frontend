import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestsGuard implements CanActivate {
  
  constructor(private apiAuth: AuthService,
    public router: Router) {

  }

  canActivate(): boolean {
    if (!this.apiAuth.isAuth()) {
      return true;
    } else {
      this.router.navigate(['app'])
      return false;
    }
    return true;
  }
  
}
