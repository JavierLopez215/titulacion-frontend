import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
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

  errores: string = "";
  ec_register: string = "C"

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
    private router: Router, private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ec_register='C'
  }

  registro() {

    this.authService.register(this.registerForm.value);
    // console.log(this.loginForm);
    this.authService.register(this.registerForm.value).subscribe((res: any) => {
      console.log(res);

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_register = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_register = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_register = 'C'
        if (res.body.ok === 1) {
          localStorage.setItem('token', res.body.token);
          window.location.reload();
          // this.router.navigate(['/']);
          // this.errores = '';
        }
        else {
          // this.errores = res.mensaje;
          this.ec_register='C'
          this.toastr.error('Ha ocurrido un error durante el registro','Error')
        }
      }
    }, (err)=>{
      this.ec_register='C'
      this.toastr.error('Ha ocurrido un error','Error')
    })
  }
}

