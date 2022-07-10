import { ToastrService } from 'ngx-toastr';
import { Profile } from './../../model/Profile';
import { Reunion } from '../../model/Meeting';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MeetingsService } from './../../services/meetings.service';
import { PublicacionService } from './../../services/publicacion.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, TranslationWidth } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
declare let $: any;

const I18N_VALUES = {
  'es': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  }
  // other languages you would support
};

@Injectable()
export class I18n {
  language: string = 'es';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayLabel(weekday: number, width?: TranslationWidth): string {
    return ''
  }
  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES['es'].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES['es'].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}


@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
})

export class MeetingsComponent implements OnInit {

  titulo_reuniones?: string;
  public listaReunionesAceptadas: Array<any> = [];
  public listaHistorialReuniones: Array<any> = [];
  public user = {} as Profile;

  reunion_: Reunion = {} as Reunion

  model!: NgbDateStruct;
  date!: { year: number, month: number };

  public addSolicitudReunion = this.formBuilder.group({
    titulo: ['', [Validators.required,
    Validators.maxLength(255)]],
    descripcion: ['', [Validators.required,
    Validators.maxLength(5000)]],
    fecha_sol: ['', [Validators.required]],
    hora: ['', [Validators.required]],
  });

  ec_ReunionesAce: string = 'P';
  ec_ReunionesHis: string = 'P';
  ec_postReuniones: string = 'P';



  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private meetingsService: MeetingsService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.titulo_reuniones = "Mis reuniones";
    this.btnMisReuniones();
  }

  btnMisReuniones() {
    this.titulo_reuniones = "Mis reuniones";
    this.getListaMisReunionesAceptadas();
    this.getListaMisReunionesHistorial();
  }


  getListaMisReunionesAceptadas() {
    this.ec_ReunionesAce = 'P'
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.meetingsService.getReunionAceptadaUsuario(idUsu).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        this.ec_ReunionesAce = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        this.ec_ReunionesAce = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_ReunionesAce = 'C';
        if (res.body.ok === 1) {
          this.listaReunionesAceptadas = res.body.data;
        }
        else {
          this.toastr.error('Ha ocurrido un error', 'Error')
        }
      }
    }, (error) => {
      this.ec_ReunionesAce = 'C'
      this.toastr.error('Ha ocurrido un error', 'Error')
    })

  }

  getDataUser() {
    this.user = this.authService.dataUser() as Profile;
  }

  getListaMisReunionesHistorial() {
    this.ec_ReunionesHis = 'P'
    // console.log(this.loginForm);
    this.getDataUser();
    // const dataUser:any = this.authService.dataUser();
    const idUsu = this.user.id;
    this.meetingsService.getReunionHistorialUsuario(idUsu).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        this.ec_ReunionesHis = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        this.ec_ReunionesHis = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_ReunionesHis = 'C';
        if (res.body.ok === 1) {
          this.listaHistorialReuniones = res.body.data;
          // console.log(this.listaHistorialReuniones);
        }
        else {
          // this.errores = res.mensaje;
          this.toastr.error('Ha ocurrido un error', 'Error');
          // console.log('error');
        }
      }
    }, (err) => {
      this.ec_ReunionesHis = 'C';
      this.toastr.error('Ha ocurrido un error', 'Error');
      // console.log('ha ocurrido un error');
    })
  }

  btnReunionesComunidad() {
    this.titulo_reuniones = "Reuniones Comunidad"
    this.getListaReunionesComunidadAceptadas();
    this.getListaReunionesComunidadHistorial();
  }

  getListaReunionesComunidadAceptadas() {
    this.ec_ReunionesAce = 'P'
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.meetingsService.getReunionAceptadaComunidad(idUsu).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        this.ec_ReunionesAce = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        this.ec_ReunionesAce = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_ReunionesAce = 'C';
        if (res.body.ok === 1) {
          this.listaReunionesAceptadas = res.body.data;
        }
        else {
          this.toastr.error('Ha ocurrido un error', 'Error')
        }
      }
    }, (error) => {
      this.ec_ReunionesAce = 'C'
      this.toastr.error('Ha ocurrido un error', 'Error')
    })

  }

  getListaReunionesComunidadHistorial() {
    this.ec_ReunionesHis = 'P'
    this.getDataUser();
    // const dataUser:any = this.authService.dataUser();
    const idUsu = this.user.id;
    this.meetingsService.getReunionHistorialComunidad(idUsu).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        this.ec_ReunionesHis = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        this.ec_ReunionesHis = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_ReunionesHis = 'C';
        if (res.body.ok === 1) {
          this.listaHistorialReuniones = res.body.data;
          console.log(this.listaHistorialReuniones);
        }
        else {
          // this.errores = res.mensaje;
          this.toastr.error('Ha ocurrido un error', 'Error');
          // console.log('error');
        }
      }
    }, (err) => {
      this.ec_ReunionesHis = 'C';
      this.toastr.error('Ha ocurrido un error', 'Error');
      // console.log('ha ocurrido un error');
    })

  }

  postSolicitudReunion() {
    this.getDataUser();
    this.reunion_ = this.addSolicitudReunion.value as Reunion;
    // console.log(this.addSolicitudReunion.value.fecha_sol.day + '/' + this.addSolicitudReunion.value.fecha_sol.month + '/' + this.addSolicitudReunion.value.fecha_sol.year)
    var day = this.addSolicitudReunion.value.fecha_sol.day;
    var month = this.addSolicitudReunion.value.fecha_sol.month;
    var year = this.addSolicitudReunion.value.fecha_sol.year;
    var hour = this.addSolicitudReunion.value.hora.hour;
    var minute = this.addSolicitudReunion.value.hora.minute;
    if (month <= 9) month = '0' + month
    if (day <= 9) day = '0' + day
    if (hour <= 9) hour = '0' + hour
    if (minute <= 9) minute = '0' + minute
    console.log(`${day}/${month}/${year}`)
    this.reunion_.fecha_sol = new Date(`${year}-${month}-${day}`)
    this.reunion_.hora = `${hour}:${minute}:00`
    // this.addSolicitudReunion.value.fecha_sol.day
    // this.reunion_.fecha_sol = new Date(`this.addS`)
    this.reunion_.id_usuario_sol = this.user.id;
    // console.log(this.reunion_.fecha_sol.getDay());
    // this.reunion_.fecha_sol = new Date(this.reunion_.fecha_sol.year)
    this.reunion_.estado = 'P';

    // console.log('Reunion', this.reunion_)

    this.meetingsService.postReunion(this.reunion_).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        this.ec_postReuniones = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        this.ec_postReuniones = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_postReuniones = 'C';

        if (res.body.ok === 1) {
          $('#modalAddSolicitud').modal('hide');
          this.toastr.success('Datos ingresados correctamente', 'Safisfactorio');
          this.addSolicitudReunion.reset();
          this.getListaMisReunionesAceptadas();
          this.getListaMisReunionesHistorial();
        }
        else {
          console.log(res)
          this.toastr.error('Ha ocurrido un error', 'Error')
        }
      }
    }, (error) => {
      console.log(error)
      this.ec_postReuniones = 'C';
      this.toastr.error('Ha ocurrido un error', 'Error');
    });

  }

  detallePublicacion(reunion_a:any){
    this.router.navigate(['/meetings', reunion_a.id]);
  }

  abrirDetalleReunion(reunion:Reunion){
    // console.log(reunion)
    this.router.navigate(['/meetings', reunion.id]);
  }

  resetFormularioSolicitud() {
    this.addSolicitudReunion.reset();
    
  }
}

