import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'app';
  public logged:boolean=false;
  constructor(public authService:AuthService, 
    public router:Router){
    this.logged = this.authService.isAuth();
  }

  logout() {
    this.authService.logout();
    this.logged=false;
    this.router.navigate(['home']);
  }
}
