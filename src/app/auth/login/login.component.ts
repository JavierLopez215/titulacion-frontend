import { Login } from './../../model/Login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    correo: ['', Validators.required],
    contrasena: ['', Validators.required]
  });

  errores: string = '';
  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  login() {
    // console.log(this.loginForm);
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      console.log(res);
      if (res.ok === 1) {
        localStorage.setItem('token', res.token);
        window.location.reload();
        // this.router.navigate(['/']);
        this.errores = '';
      }
      else {
        this.errores = res.mensaje;
      }
    })
  }

}
