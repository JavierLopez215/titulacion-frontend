import { FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { CalificacionReunion } from '../../model/GradeMeeting';
import { Reunion } from '../../model/Meeting';
import { Profile } from './../../model/Profile';
import { ToastrService } from 'ngx-toastr';
import { MeetingsService } from './../../services/meetings.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
declare let $:any;

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
  ec_acepReunion:string = 'P'
  otraCalificacion:boolean = false;
  aux_calificacion:CalificacionReunion = {} as CalificacionReunion;
  public msj_confirm:string=''
  opcion_sel=''

  public user = {} as Profile;
  public reunion = {} as Reunion;
  public reunionA = {fotoA:'profile.png'} as Reunion;
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
  ec_cancelReunion: string = 'C';
  
  

  constructor(private authService: AuthService,
    // private formBuilder: FormBuilder,
    private meetingsService: MeetingsService,
    private acRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }
    

  ngOnInit(): void {
    this.getReunionPenId();
    this.getReunionAceId();
    this.getDataUser();
    this.getCalificacionesReunionId();
  }

  getDataUser() {
    this.user = this.authService.dataUser() as Profile;
  }

  getReunionPenId() {
    this.ec_reunion = 'P'
    // this.getDataUser();

    // const dataUser:any = this.authService.dataUser();
    const idReu = this.acRouter.snapshot.paramMap.get('id') || "";
    this.meetingsService.getReunionPenById(+idReu).subscribe((res: any) => {

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

  getReunionAceId() {
    this.ec_reunion = 'P'
    // this.getDataUser();

    // const dataUser:any = this.authService.dataUser();
    const idReu = this.acRouter.snapshot.paramMap.get('id') || "";
    this.meetingsService.getReunionAceById(+idReu).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        this.ec_reunion = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        this.ec_reunion = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_reunion = 'C';
        if (res.body.ok === 1) {
          this.reunionA = res.body.data[0] as Reunion;
          // console.log(res.body)
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

  validarOtraCalificacion(){
    this.otraCalificacion=false
    let index = 0
    var calificacion;
    if(this.listaCalificaciones.length > 0){
      do {
        calificacion = this.listaCalificaciones[index];
        if(calificacion.id_usuario_cali == this.user.id){
          this.addCalificacion.patchValue({
            calificacion: calificacion.calificacion,
            motivo_cal : calificacion.motivo_cal
          });
          this.aux_calificacion=calificacion
          this.otraCalificacion=true;
          
        }
        index=index+1;
          console.log(index)
      } while (index <= (this.listaCalificaciones.length-1) && this.otraCalificacion==false);

    }
  }

  guardarCalificacion(){
    if(this.otraCalificacion){
      this.updateCalificacion();
    }else{
      this.postCalificacion();
    }
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
          // this.addCalificacion.reset();
          this.getCalificacionesReunionId();
          // window.location.reload()
          $('#modalCalificacionComentario').modal('hide')

        }
        else {
          // this.errores = res.mensaje;
          console.log(res);
        }
      }
    });
  }

  updateCalificacion(){
    this.getDataUser();
    this.calificacionReunion = this.addCalificacion.value as CalificacionReunion;
    this.calificacionReunion.id = this.aux_calificacion.id

    this.meetingsService.updateCalificacionReunion(this.calificacionReunion).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_postCalificacion = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_postCalificacion = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_postCalificacion = 'C';
        if (res.body.ok === 1) {
          this.toastr.success('Datos actualizados correctamente.', 'Safisfactorio');
          // window.location.reload()
          this.getCalificacionesReunionId()
          $('#modalCalificacionComentario').modal('hide')
        }
        else {
          // this.errores = res.mensaje;
          console.log(res);
        }
      }
    });
  }

  aceptarReunionCom(){
    this.getDataUser();
    const _reunion ={
      id:this.reunion.id,
      id_usuario_ace:this.user.id
    } as Reunion
    this.meetingsService.aceptarReunion(_reunion).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_acepReunion = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_acepReunion = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_acepReunion = 'C';
        if (res.body.ok === 1) {
          this.toastr.success('Reunion aceptada', 'Safisfactorio');
          this.getReunionPenId();
          this.getReunionAceId();
          
        }
        else {
          this.ec_acepReunion = 'C';
          // this.errores = res.mensaje;
          console.log(res);
          this.toastr.success('Ha ocurrido un error', 'Error');
        }
      }
    },(error)=>{
      this.ec_acepReunion = 'C';
      this.toastr.success('Ha ocurrido un error', 'Error');
    });
  }

  opcionCancel(){
    this.msj_confirm='¿Desea Cancelar?'
    this.opcion_sel='C'
  }

  opcionEliminar(){
      this.msj_confirm='¿Desea Eiminar?'
      this.opcion_sel='E'
  }

  confirmarOpcion(){
    switch (this.opcion_sel) {
      case 'E':
        this.eliminarReunion()
        break;
      case 'C':
        this.cancelarReunion()
        break;
    }
  }

  eliminarReunion(){
    this.meetingsService.eliminarReunion(this.reunion.id).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_acepReunion = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_acepReunion = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_acepReunion = 'C';
        if (res.body.ok === 1) {
          $('#modal_confirm').modal('hide')
          this.toastr.success('Ha eliminado la reunion', 'Satisfactorio');
          this.router.navigate(['/meetings']);
        }
        else {
          this.ec_acepReunion = 'C';
          // this.errores = res.mensaje;
          console.log(res);
          this.toastr.error('Ha ocurrido un error', 'Error');
        }
      }
    },(error)=>{
      this.ec_acepReunion = 'C';
      this.toastr.error('Ha ocurrido un error', 'Error');
    });
  }

  cancelarReunion(){
    // const _reunion ={
    //   id:this.reunion.id,
    //   id_usuario_ace:this.user.id
    // } as Reunion
    this.meetingsService.cancelarReunion(this.reunion.id).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_cancelReunion = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_cancelReunion = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_cancelReunion = 'C';
        if (res.body.ok === 1) {
          $('#modal_confirm').modal('hide')
          this.toastr.success('Reunion cancelada', 'Safisfactorio');
          this.getReunionPenId();
          this.getReunionAceId();
          
        }
        else {
          this.ec_acepReunion = 'C';
          // this.errores = res.mensaje;
          // console.log(res);
          this.toastr.success('Ha ocurrido un error', 'Error');
        }
      }
    },(error)=>{
      this.ec_acepReunion = 'C';
      this.toastr.success('Ha ocurrido un error', 'Error');
    });
  }

  
}
