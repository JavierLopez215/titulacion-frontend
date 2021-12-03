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
  public formData=new FormData();

  constructor(private authService: AuthService, private especiallityService: EspeciallityService,
    private router: Router, private formBuilder: FormBuilder,
    private toastr: ToastrService) { }
  public archivo_seleccionado: any;

  public updateDataForm = this.formBuilder.group({
    nombre: [this.user.nombre, Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    perfil_prof: ['', Validators.required],
    telefono: ['', Validators.required],
    correo: ['', Validators.required]
  });

  public updatePhotoUserForm = this.formBuilder.group({
    file: ['', Validators.required]
  });

  ngOnInit(): void {
    this.getDataUser();
    this.getListaEspecialidades();
    this.getListaMisEspecialidades();
  }

  postEspeciallityUser(idEs: number) {

    const data = {
      id_usuario: this.user.id,
      id_especialidad: idEs
    }

    try {

      this.especiallityService.postEspecialidadUsuario(data).subscribe((res: any) => {
        if (res.ok === 1) {
          this.toastr.info('Agregado correctamente', 'Informativo');
          this.getListaEspecialidades();
          this.getListaMisEspecialidades();
        } else {
          // this.errores = res.mensaje;
          this.toastr.error('Ha ocurrido un error', 'Error!');
        }
      })
    } catch (er) {
      this.toastr.error('Ha ocurrido un error', 'Error!');
    }
  }


  deleteEspeciallityUser(idEU: number) {
    console.log(idEU);
    try {


      this.especiallityService.deleteEspecialidadUsuario(idEU).subscribe((res: any) => {
        if (res.ok === 1) {
          //   this.user = res.data;
          //   localStorage.setItem('token', res.token);
          this.toastr.info('Eliminado de tus especialidades', 'Safisfactorio');
          this.getListaMisEspecialidades();
          this.getListaEspecialidades();
        }
        else {
          // this.errores = res.mensaje;
          this.toastr.error('Ha ocurrido un error', 'Error!');
        }
      })
    } catch (er) {
      this.toastr.error('Ha ocurrido un error', 'Error!');
    }
  }

  updateDataUser() {

    const idUsu = this.user.id;
    this.authService.actuaizarDatosUsuario(idUsu, this.updateDataForm.value).subscribe((res: any) => {

      // console.log(res)

      if (res.ok === 1) {
        this.user = res.data;
        localStorage.setItem('token', res.token);
        this.toastr.success('Datos actualizados correctamente', 'Safisfactorio');
      }
      else {
        // this.errores = res.mensaje;
        this.toastr.error('Ha ocurrido un error', 'Error!');
      }
    });
  }

  onChangeFile(event: any): void {
    // console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      //  console.log(event.target.files[0].name);
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {this.archivo_seleccionado = reader.result;
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
    this.formData.append('file',this.file);
    // console.log(this.formData)
    this.authService.actualizarFotoUsuario(this.formData).subscribe((res: any) => {

      if (res.ok === 1) {

        this.user = res.data;
        localStorage.setItem('token', res.token);
        this.toastr.success('Datos actualizados correctamente', 'Safisfactorio');
        this.updatePhotoUserForm.reset();
        this.file_name="";
        this.archivo_seleccionado=null;
        // this.router.navigate(['/']);
        // this.errores = '';
        // this.listaEspecialidadesUsuario = res.data;
        // this.mensaje = 'Datos actualizados correctamente'
        // console.log(this.listaEspecialidadesUsuario);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
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

      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.listaEspecialidadesUsuario = res.data;
        this.mensaje = 'Datos actualizados correctamente'
        // console.log(this.listaEspecialidadesUsuario);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    });

  }

  getListaEspecialidades() {

    // console.log(this.loginForm);
    this.especiallityService.getEspecialidades().subscribe((res: any) => {

      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.listaEspecialidades = res.data;
        // console.log(this.listaEspecialidades);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })

  }
}
