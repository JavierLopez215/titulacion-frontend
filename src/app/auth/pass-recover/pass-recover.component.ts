import { environment } from 'src/environments/environment';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pass-recover',
  templateUrl: './pass-recover.component.html',
  styleUrls: ['./pass-recover.component.scss']
})
export class PassRecoverComponent implements OnInit {

  public passRecoveryForm = this.formBuilder.group({
    correo: ['', [Validators.required, Validators.email]]
  });
  ec_recover: string = "";
  rutaImg :string = environment.images_URL;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  recuperarContrasena() {

    // console.log(this.loginForm);
    this.authService.recuperarContraseniaUsuario(this.passRecoveryForm.value).subscribe((res: any) => {
      // console.log(res);

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_recover = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_recover = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_recover = 'C'
        if (res.body.ok === 1) {

          this.toastr.success('Mensaje enviado con éxito.', 'Safisfactorio');
          console.log(res.body.mensaje)

        }
        else {
          this.ec_recover = 'C'
          this.toastr.error(res.body.mensaje, 'Error')
          // this.errores = res.mensaje;
        }
      }
    }, (err) => {
      this.ec_recover = 'C'
      this.toastr.error('Ha ocurrido un error', 'Error')
    })
  }

}
