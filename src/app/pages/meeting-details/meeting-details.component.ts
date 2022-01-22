import { FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment.prod';
import { CalificacionReunion } from './../../model/CalificacionReunion';
import { Reunion } from './../../model/Reunion';
import { Profile } from './../../model/Profile';
import { ToastrService } from 'ngx-toastr';
import { MeetingsService } from './../../services/meetings.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss']
})
export class MeetingDetailsComponent implements OnInit {

  rutaImg: string = environment.images_URL;

  ec_reunion:string ='P'
  ec_calificacion_reunion:string = 'P'
  ec_postCalificacion:string = 'P'

  public user = {} as Profile;
  public reunion = {} as Reunion;
  listaCalificaciones: Array<CalificacionReunion> = [];
  public _val_calificacion: any = 0;
  calificacionReunion:CalificacionReunion = {} as CalificacionReunion;

  public addCalificacion = this.formBuilder.group({
    calificacion: [0, [Validators.required,
    Validators.max(5),
    Validators.min(0)]],
    motivo_cal: ['', [Validators.required,
    Validators.maxLength(255)]]
  });
  


  constructor(private authService: AuthService,
    // private formBuilder: FormBuilder,
    private meetingsService: MeetingsService,
    private acRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getReunionId();
    this.getDataUser();
    this.getCalificacionesReunionId();
  }

  getDataUser() {
    this.user = this.authService.dataUser() as Profile;
  }

  getReunionId() {
    this.ec_reunion = 'P'
    // this.getDataUser();

    // const dataUser:any = this.authService.dataUser();
    const idReu = this.acRouter.snapshot.paramMap.get('id') || "";
    this.meetingsService.getReunionById(+idReu).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        this.ec_reunion = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        this.ec_reunion = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_reunion = 'C';
        if (res.body.ok === 1) {
          this.reunion = res.body.data[0] as Reunion;
          console.log(this.reunion)
        }
        else {
          this.toastr.error('Ha ocurrido un error', 'Error');
          // console.log('error');
        }
      }
    }, (err) => {
      this.ec_reunion = 'C';
      this.toastr.error('Ha ocurrido un error', 'Error');
    })

  }

  getCalificacionesReunionId() {
    this.ec_calificacion_reunion = 'P'
    // this.getDataUser();

    // const dataUser:any = this.authService.dataUser();
    const idReu = this.acRouter.snapshot.paramMap.get('id') || "";
    this.meetingsService.getCalificacionReunion(+idReu).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        this.ec_calificacion_reunion = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        this.ec_calificacion_reunion = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_calificacion_reunion = 'C';
        if (res.body.ok === 1) {
          this.listaCalificaciones = res.body.data as Array<CalificacionReunion>;
          console.log(this.listaCalificaciones)
        }
        else {
          this.toastr.error('Ha ocurrido un error', 'Error');
          // console.log('error');
        }
      }
    }, (err) => {
      this.ec_reunion = 'C';
      this.toastr.error('Ha ocurrido un error', 'Error');
    })

  }

  cambioCalificacionReunion(e: any){
    // console.log(e);
    this._val_calificacion = e;
  }

  postCalificacion(){
    this.getDataUser();
    this.calificacionReunion = this.addCalificacion.value as CalificacionReunion;
    if(this.user.id == this.reunion.id_usuario_ace) this.calificacionReunion.id_usuario_rec = this.reunion.id_usuario_sol;
    else this.calificacionReunion.id_usuario_rec = this.reunion.id_usuario_ace;
    this.calificacionReunion.id_usuario_cali = this.user.id;
    this.calificacionReunion.id_reunion_cal = this.reunion.id;

    this.meetingsService.postCalificacionReunion(this.calificacionReunion).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_postCalificacion = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_postCalificacion = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_postCalificacion = 'C';
        if (res.body.ok === 1) {

          // this.user = res.data;
          // localStorage.setItem('token', res.token);
          this.toastr.success('Datos ingresados correctamente', 'Safisfactorio');
          // this.authService.actualizarToken();
          this.addCalificacion.reset();
          this.getCalificacionesReunionId();

        }
        else {
          // this.errores = res.mensaje;
          console.log(res);
        }
      }
    });
  }
}
