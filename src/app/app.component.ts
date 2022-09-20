import { environment } from 'src/environments/environment';
import { Profile } from './model/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'App - Refuerzo Académico';
  public rutaImgProfile = environment.images_URL;
  rutaImg: string = environment.images_URL;
  public user : Profile = {} as Profile;
  public logged:boolean=false;
  constructor(public authService:AuthService, 
    public router:Router){
    this.authService.usuario.subscribe(res => {
      this.getDataUser();
      this.logged = this.authService.isAuth();
    })
  }


  logout() {
    this.authService.logout();
    this.logged=false;
    // this.router.navigate(['/']);
    window.location.reload();
  }
  
  getDataUser(){
    this.user = this.authService.dataUser() as Profile;
    // console.log(this.user);
  }
}
