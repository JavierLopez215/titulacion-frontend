import { environment } from './../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
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

  rutaImg: string = environment.images_URL;

  public loginForm = this.formBuilder.group({
    correo: ['', [Validators.required,Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]]
  });

  ec_login: string = 'C'
  errores: string = '';
  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  ngAfterContentInit(){
    this.ec_login='C';
  }

  login() {
    // console.log(this.loginForm);
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      // console.log(res);

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_login = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_login = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_login = 'C'
        if (res.body.ok === 1) {
          localStorage.setItem('token', res.body.token);
          this.authService.actualizarToken();
          this.router.navigate(['app']);
          this.errores = '';
        }
        else {
          this.ec_login='C'
          this.toastr.error(res.body.mensaje,'Error')
          // this.errores = res.mensaje;
        }
      }
    },(err)=>{
      this.ec_login='C'
      this.toastr.error('Ha ocurrido un error','Error')
    })
  }

}
