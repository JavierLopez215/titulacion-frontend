import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errores: string = "";
  ec_register: string = "C"
  rutaImg: string = environment.images_URL;

  public registerForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20),Validators.pattern('[a-zA-Z áéíóú]*')]],
    apellido: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(20),Validators.pattern('[a-zA-Z áéíóú]*')]],
    direccion: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(255)]],
    perfil_prof: ['', [Validators.required, Validators.minLength(50),Validators.maxLength(1000)]],
    telefono: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(255)]]
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

