import { HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EspeciallityService } from './../../services/especiallity.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Profile } from './../../model/Profile';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Libreria Toast
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: Profile = {} as Profile;
  public mensaje: string = "";
  public listaEspecialidades: Array<any> = [];
  public listaEspecialidadesUsuario: Array<any> = [];
  public file!: File;
  public file_name: string = "";
  public formData = new FormData();
  public rutaImgProfile = environment.images_URL;
  ec_updateCont: string = "C";
  ec_updateDataU: string = "C";
  ec_getEspecialidades: string = "C";
  ec_postEspecialidadesU: string = "C";
  ec_deleteEspecialidadU: string = "C";
  ec_updatePhotoU: string = "C";
  ec_getEspecialidadesUsu: string = "C";

  constructor(private authService: AuthService, private especiallityService: EspeciallityService,
    private router: Router, private formBuilder: FormBuilder,
    private toastr: ToastrService) { }
  public archivo_seleccionado: any;

  public updateDataForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z áéíóú]*')]],
    apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z áéíóú]*')]],
    direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
    perfil_prof: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(1000)]],
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
    correo: ['', [Validators.required, Validators.email]]
  });

  public updatePhotoUserForm = this.formBuilder.group({
    file: ['', Validators.required]
  });

  public updateContraseniaUserForm = this.formBuilder.group({
    nueva_cont: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    actual_cont: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]]
  });

  ngOnInit(): void {
    this.getDataUser();
    this.getListaEspecialidades();
    this.getListaMisEspecialidades();
    this.updateDataForm.patchValue({
      nombre: this.user.nombre,
      apellido: this.user.apellido,
      direccion: this.user.direccion,
      perfil_prof: this.user.perfil_prof,
      telefono: this.user.telefono,
      correo: this.user.correo
    });
  }

  CancelarCargaArchivo() {

    this.updatePhotoUserForm.patchValue({
      file: ''
    });
    this.file_name = "";
    this.archivo_seleccionado = ""
  }

  postEspeciallityUser(idEs: number) {

    const data = {
      id_usuario: this.user.id,
      id_especialidad: idEs
    }

    this.especiallityService.postEspecialidadUsuario(data).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_postEspecialidadesU = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_getEspecialidades = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_postEspecialidadesU = 'C'

        if (res.body.ok === 1) {
          this.toastr.info('Agregado correctamente', 'Informativo');
          this.getListaEspecialidades();
          this.getListaMisEspecialidades();
        } else {
          // this.errores = res.mensaje;
          this.ec_postEspecialidadesU = 'C'
          this.toastr.error(res.body.mensaje, 'Error');
        }
      }
    }, (err) => {
      this.ec_postEspecialidadesU = 'C'
      this.toastr.error('Ha ocurrido un error', 'Error')
    });

  }


  deleteEspeciallityUser(idEU: number) {

    this.especiallityService.deleteEspecialidadUsuario(idEU).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_deleteEspecialidadU = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_deleteEspecialidadU = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_deleteEspecialidadU = 'C'

        if (res.body.ok === 1) {
          //   this.user = res.data;
          //   localStorage.setItem('token', res.body.token);
          this.toastr.info('Eliminado de tus especialidades', 'Safisfactorio');
          this.getListaMisEspecialidades();
          this.getListaEspecialidades();
        }
        else {
          this.ec_deleteEspecialidadU = 'C'
          // this.errores = res.mensaje;
          this.toastr.error(res.body.mensaje, 'Error');
        }
      }
    }, (err) => {
      this.ec_deleteEspecialidadU = 'C'
      this.toastr.error('Ha ocurrido un error', 'Error')
    })

  }

  updateDataUser() {

    const idUsu = this.user.id;
    this.authService.actuaizarDatosUsuario(idUsu, this.updateDataForm.value).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_updateDataU = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_updateDataU = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_updateDataU = 'C'

        if (res.body.ok === 1) {
          this.user = res.body.data;
          localStorage.setItem('token', res.body.token);
          this.authService.actualizarToken();
          this.toastr.success('Datos actualizados correctamente', 'Safisfactorio');
        }
        else {
          // this.errores = res.mensaje;
          this.ec_updateDataU = 'C'
          this.toastr.error(res.body.mensaje, 'Error');
        }
      }
    }, (err) => {
      this.ec_updateDataU = 'C'
      this.toastr.error('Ha ocurrido un error', 'Error')
    });
  }

  onChangeFile(event: any): void {
    // console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      //  console.log(event.target.files[0].name);
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.archivo_seleccionado = reader.result;
        this.file_name = event.target.files[0].name;
      };
      reader.readAsDataURL(this.file);
      // reader.onload = e => console.log(reader.result);
    }
  }

  updatePhotoUsers() {

    // const dataUser: any = this.authService.dataUser();
    // const idUsu = dataUser.id;
    this.formData = new FormData();
    this.formData.append('file', this.file);
    // console.log(this.formData)
    this.authService.actualizarFotoUsuario(this.formData).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_updatePhotoU = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_updatePhotoU = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_updatePhotoU = 'C'

        if (res.body.ok === 1) {

          this.user = res.body.data;
          localStorage.setItem('token', res.body.token);
          this.toastr.success('Datos actualizados correctamente', 'Safisfactorio');
          this.authService.actualizarToken();
          this.updatePhotoUserForm.reset();
          this.file_name = "";
          this.archivo_seleccionado = null;
          // this.router.navigate(['/']);
          // this.errores = '';
          // this.listaEspecialidadesUsuario = res.data;
          // this.mensaje = 'Datos actualizados correctamente'
          // console.log(this.listaEspecialidadesUsuario);
        }
        else {
          // this.errores = res.mensaje;
          this.ec_updatePhotoU = 'C'
          this.toastr.error(res.body.mensaje, 'Error');
        }
      }
    }, (err) => {
      this.ec_updatePhotoU = 'C'
      this.toastr.error('Ha ocurrido un error', 'Error')
    });

  }


  show() {
    this.toastr.success('Datos actualizados correctamente', 'Safisfactorio');
    // console.log("correcto")
  }

  getDataUser() {
    this.user = this.authService.dataUser() as Profile;
    this.updateDataForm.value.nombre = this.user.nombre;
    // console.log(this.user)
  }

  getListaMisEspecialidades() {

    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.especiallityService.getEspecialidadesUsuario(idUsu).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_getEspecialidadesUsu = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_getEspecialidadesUsu = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_getEspecialidadesUsu = 'C'

        if (res.body.ok === 1) {
          // this.router.navigate(['/']);
          // this.errores = '';
          this.listaEspecialidadesUsuario = res.body.data;
          this.mensaje = 'Datos actualizados correctamente'
          // console.log(this.listaEspecialidadesUsuario);
        }
        else {
          // this.errores = res.mensaje;
          this.ec_getEspecialidadesUsu = 'C'
          this.toastr.error(res.body.mensaje, 'Error');
        }
      }
    }, (err) => {
      this.ec_getEspecialidadesUsu = 'C'
      this.toastr.error('Ha ocurrido un error', 'Error')
    });

  }

  getListaEspecialidades() {

    // console.log(this.loginForm);
    this.especiallityService.getEspecialidades().subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_getEspecialidades = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_getEspecialidades = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_getEspecialidades = 'C'

        if (res.body.ok === 1) {
          // this.router.navigate(['/']);
          // this.errores = '';
          this.listaEspecialidades = res.body.data;
          // console.log(this.listaEspecialidades);
        }
        else {
          // this.errores = res.mensaje;
          this.ec_getEspecialidades = 'C'
          this.toastr.error(res.body.mensaje, 'Error');
        }
      }
    }, (err) => {
      this.ec_getEspecialidades = 'C'
      this.toastr.error('Ha ocurrido un error', 'Error')
    });

  }

  cambiarContraseniaUsuario() {

    // this.authService.actuaizarContraseniaUsuario(this.updateContraseniaUserForm.value);
    // console.log(this.loginForm);
    this.authService.actuaizarContraseniaUsuario(this.updateContraseniaUserForm.value).subscribe((res: any) => {
      // console.log(res);

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_updateCont = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_updateCont = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_updateCont = 'C'
        if (res.body.ok === 1) {
          localStorage.setItem('token', res.body.token);
          this.toastr.success('Contraseña actualizada correctamente', 'Safisfactorio');
          this.updateContraseniaUserForm.reset();
          // window.location.reload();
          // this.router.navigate(['/']);
          // this.errores = '';
        }
        else {
          // this.errores = res.mensaje;
          this.ec_updateCont = 'C'
          this.toastr.error(res.body.mensaje, 'Error')
        }
      }
    }, (err) => {
      this.ec_updateCont = 'C'
      this.toastr.error('Ha ocurrido un error', 'Error')
    })
  }

}

