import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errores:string ='';
  user={
    correo:'', 
    contrasena:''
  }
  constructor( private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {

  }

  login(){
    console.log(this.user);
    this.authService.login(this.user).subscribe((res:any) => {
      console.log(res);
      if(res.ok === 1){
      localStorage.setItem('token',res.token);
      this.router.navigate(['app']);
      this.errores='';
      }
      else{
        this.errores=res.mensaje;
      }
    })
  }

}
