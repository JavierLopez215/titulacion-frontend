import { Profile } from './model/Profile';
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
  public user : Profile = {} as Profile;
  public logged:boolean=false;
  constructor(public authService:AuthService, 
    public router:Router){
    this.logged = this.authService.isAuth();
    this.getDataUser();
  }


  logout() {
    this.authService.logout();
    this.logged=false;
    this.router.navigate(['home']);
  }
  getDataUser(){
    this.user = this.authService.dataUser() as Profile;
    // console.log(this.user);
  }
}
