import { FormBuilder, Validators } from '@angular/forms';
import { EspeciallityService } from './../../services/especiallity.service';
import { Profile } from './../../model/Profile';
import { ActivitiesService } from './../../services/activities.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {


  public listaPublicaciones: Array<any> = [];
  public listaEspecialidades: Array<any> = [];

  public user : Profile = {} as Profile;

  public postDataForm = this.formBuilder.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    area: ['',Validators.required],
    detalles:[{}]
    // direccion: ['', Validators.required],
    // perfil_prof: ['', Validators.required],
    // telefono: ['', Validators.required],
    // correo: ['', Validators.required]
  });


  constructor(private authService: AuthService,
    private activitiesService: ActivitiesService, private router: Router,
    private especiallityService: EspeciallityService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getPublicaciones();
    this.getListaEspecialidades();
  }

  getDataUser(){
    this.user = this.authService.dataUser() as Profile;
  }

  getListaEspecialidades() {

    this.especiallityService.getEspecialidades().subscribe((res: any) => {

      if (res.ok === 1) {
        this.listaEspecialidades = res.data;
      }
      else {
        console.log('error');
      }
    }, (err:any)=>
    {
      console.log(err);
    })

  }

  postPublicacion(){
    console.log(this.postDataForm.value)
  }

  getPublicaciones() {
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.activitiesService.getPublicaciones(idUsu).subscribe((res: any) => {

      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.listaPublicaciones = res.data;
        console.log(res.data);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    }, (err:any)=>
    {
      console.log(err);
    })
  }

  printData(item: any) {
    this.router.navigate(['/publication', item.id]);
  }

}
