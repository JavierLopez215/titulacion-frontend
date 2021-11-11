import { EspeciallityService } from './../../services/especiallity.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Profile } from './../../model/Profile';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user : Profile = {} as Profile;
  public listaEspecialidades : Array<any> = [];
  public listaEspecialidadesUsuario : Array<any> = [];

  constructor(private authService : AuthService, private especiallityService: EspeciallityService,
    private router: Router, private formBuilder: FormBuilder) { }

  public updateDataForm = this.formBuilder.group({
    nombre: [this.user.nombre, Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    perfil_prof: ['', Validators.required],
    telefono: ['', Validators.required],
    correo: ['', Validators.required]
  });

  ngOnInit(): void {
    this.getDataUser();
    this.getListaEspecialidades();
    this.getListaMisEspecialidades();
  }

  updateDataUser() {
    console.log(this.updateDataForm.value);
  }

  getDataUser(){
    this.user = this.authService.dataUser() as Profile;
    this.updateDataForm.value.nombre = this.user.nombre;
    console.log(this.user)
  }

  getListaMisEspecialidades() {

    // console.log(this.loginForm);
    const dataUser:any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.especiallityService.getEspecialidadesUsuario(idUsu).subscribe((res: any) => {

      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.listaEspecialidadesUsuario = res.data;
        console.log(this.listaEspecialidadesUsuario);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })

  }

  getListaEspecialidades() {

    // console.log(this.loginForm);
    this.especiallityService.getEspecialidades().subscribe((res: any) => {

      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.listaEspecialidades = res.data;
        console.log(this.listaEspecialidades);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })

  }
}
