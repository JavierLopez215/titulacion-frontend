import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errores : string ="";

  public registerForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    perfil_prof: ['', Validators.required],
    telefono: ['', Validators.required],
    correo: ['', Validators.required],
    contrasena: ['', Validators.required]
  });

  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  registro() {

    this.authService.register(this.registerForm.value);
    // console.log(this.loginForm);
    this.authService.register(this.registerForm.value).subscribe((res: any) => {
      console.log(res);
      if (res.ok === 1) {
        localStorage.setItem('token', res.token);
        window.location.reload();
        // this.router.navigate(['/']);
        // this.errores = '';
      }
      else {
        // this.errores = res.mensaje;
      }
    })
  }
}

