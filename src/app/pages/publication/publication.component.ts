import { CalificacionComentario } from './../../model/CalificacionComentario';
import { Response } from './../../model/Response';
import { DetalleComentario } from './../../model/DetalleComentario';
import { Publicacion } from './../../model/Publicacion';
import { Comentario } from './../../model/Comentario';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { CalificacionPublicacion } from '../../model/CalificacionPublicacion';
import { CalificationService } from './../../services/calification.service';
import { Profile } from './../../model/Profile';
import { PublicacionService } from './../../services/publicacion.service';
import { ActivitiesService } from './../../services/activities.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetallePublicacion } from 'src/app/model/DetallePublicacion';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ComentariesService } from 'src/app/services/comentaries.service';
import { HttpEventType } from '@angular/common/http';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  publicacion: Publicacion = { foto: 'profile.png' } as Publicacion;
  rutaImg: string = environment.images_URL;
  rutaArchivos: string = environment.fies_URL;
  rutaArchivosCom: string = environment.files_com_URL;
  public display: string = "none";
  user: Profile = {} as Profile;
  listaCalificaciones: Array<CalificacionPublicacion> = [];
  listaDetallePublicacion: Array<DetallePublicacion> = [];
  listaComentarios: Array<Comentario> = [];
  listaCalificacionesComentarios: Array<any> = [];

  public tipo_aporte = "";
  public archivo !: File;
  public formData = new FormData();
  public extension: string = "";
  public contenido: string = "";
  public comentario: Comentario = {} as Comentario;
  public listaAdjuntos: Array<DetalleComentario> = [];
  public listaDetallesComentario: Array<DetalleComentario> = [];
  public aux_listaAdjuntos: Array<any> = [];
  public adjunto: DetalleComentario = {} as DetalleComentario;
  public aux_adjunto: DetalleComentario = {} as DetalleComentario;
  public selComentario:number = 0;

  public _calificacion_comentario = 0;
  public _calificacion_publicacion = 0


  archivo_seleccionado: string = "";

  public addFile = this.formBuilder.group({
    encabezado: ['', [Validators.required,
    Validators.maxLength(2000)]],
    file: ['', [Validators.required,
    Validators.maxLength(1000)]]
  });

  public addURL = this.formBuilder.group({
    encabezado: ['', [Validators.required,
    Validators.maxLength(2000)]],
    link: ['', [Validators.required,
    Validators.maxLength(1000)]]
  });

  public addCode = this.formBuilder.group({
    encabezado: ['', [Validators.required,
    Validators.maxLength(2000)]],
    code: ['', [Validators.required,
    Validators.maxLength(1000)]]
  });


  public addCalificacion = this.formBuilder.group({
    calificacion: [0, [Validators.required,
    Validators.max(5),
    Validators.min(0)]],
    motivo_cal: ['', [Validators.required,
    Validators.maxLength(255)]]
  });

  public addCalificacionComentario = this.formBuilder.group({
    calificacion: [0, [Validators.required,
    Validators.max(5),
    Validators.min(0)]],
    motivo_cal: ['', [Validators.required,
    Validators.maxLength(255)]]
  });

  public addComentario = this.formBuilder.group({
    // calificacion: [0, [Validators.required,
    // Validators.max(5),
    // Validators.min(0)]],
    comentario: ['', [Validators.required,
    Validators.maxLength(5000)]]
  });

  ec_publicacion: string = 'P';
  ec_calificacionesPub: string = 'P';
  ec_detallePub: string = 'P';
  ec_comentarioPub: string = 'P';
  ec_postCalificacionPub: string = 'C';
  ec_detalleCom: string = 'P';
  ec_calificacionesCom: string = 'P';
  msj_confirm: string = '';
  opcion_sel: string = '';
  ec_elimPublicacion: string = '';
  oc_value:string = '';
  ec_eliminarCom: string = '';
  ec_postCalificacionCom: string='';
  otraCalificacion: boolean=false;
  otraCalificacionCom: boolean=false;


  constructor(private authService: AuthService,
    private publicationService: PublicacionService,
    private router: Router,
    private calificationService: CalificationService,
    private commentaryService: ComentariesService,
    private acRouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private calendar: NgbCalendar,private _location: Location,
    ) { }

  ngOnInit(): void {
    // this.sanitizer.bypassSecurityTrustUrl(this.rutaImgProfile);
    // this.sanitizer.bypassSecurityTrustUrl(this.rutaArchivos);
    this.getPublicacion();
    this.getDetallePublicacion();
    this.getDataUser();
    // this.getComentariosPublicacion();
    // this.validarMaestroDetalleComentarios();
    this.getComentariosPublicacion();
    // this.getDetalleComentario();

    this.getCalificacionesPublicacion();
  }

  onHighlight(e: any) {
    const response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: e.value
    }
    // console.log(e)
  }

  getPublicacion() {
    // console.log(this.loginForm);
    // const dataUser: any = this.authService.dataUser();
    const idPub = this.acRouter.snapshot.paramMap.get('id') || "";
    this.publicationService.getPublicacionById(idPub).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_publicacion = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_publicacion = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_publicacion = 'C';

        // console.log(this.publicacion)
        if (res.body.ok === 1) {
          // this.router.navigate(['/']);
          // this.errores = '';
          this.publicacion = res.body.data[0] as Publicacion;
          // console.log(this.publicacion);
        }
        else {
          // this.errores = res.mensaje;
          console.log('error');
        }
      }
    }, (err: any) => {
      this.toastr.error('No se ha podido obtener los datos', 'Error');
    }
    )
  }


  abrirModalCalificacion() {
    // this.aux_stock=fila.stock
    // console.log(id);
    // this.getConceptos(id);
    this.getCalificacionesPublicacion()
    this.display = "block"
  }

  cerrarModalCalificacion() {
    this.display = 'none';
  }

  getCalificacionesPublicacion() {
    // $("#miModal").modal("show");
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idPub = this.acRouter.snapshot.paramMap.get('id') || "";
    this.calificationService.getCalificacionPublicacionId(idPub).subscribe((res: any) => {
      if (res.type === HttpEventType.DownloadProgress) {
        console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_calificacionesPub = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_calificacionesPub = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_calificacionesPub = 'C';
        if (res.body.ok === 1) {
          this.listaCalificaciones = res.body.data as Array<CalificacionPublicacion>;
        }
        else {
          // this.errores = res.mensaje;
          console.log('error');
        }
      }
    })
  }

  getComentariosPublicacion() {
    // $("#miModal").modal("show");
    // console.log(this.loginForm);
    var listaDetallesComentario_: Array<DetalleComentario>;
    const dataUser: any = this.authService.dataUser();
    const idPub = this.acRouter.snapshot.paramMap.get('id') || "";
    this.commentaryService.getCommentariosPublicacionId(idPub).subscribe((res: any) => {
      if (res.type === HttpEventType.DownloadProgress) {
        console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_comentarioPub = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_comentarioPub = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_comentarioPub = 'C';
        if (res.body.ok === 1) {
          this.listaComentarios = res.body.data.comentarios as Array<Comentario>;
          this.listaDetallesComentario = res.body.data.detalles as Array<DetalleComentario>;

          // this.resComentarioMaestro = res.body.data;

          for (let iCom = 0; iCom < this.listaComentarios.length; iCom++) {
            listaDetallesComentario_ = [] as Array<DetalleComentario>;
            for (let iDet = 0; iDet < this.listaDetallesComentario.length; iDet++) {
              if (this.listaComentarios[iCom].id == this.listaDetallesComentario[iDet].id_comentario) {
                listaDetallesComentario_.push(this.listaDetallesComentario[iDet])
              }

            }
            this.listaComentarios[iCom].listaDetalles = listaDetallesComentario_;


          }
          console.log('lista comentarios', this.listaComentarios)

        }
        else {
          // this.errores = res.mensaje;
          // this.resComentarioMaestro = {} as Response;
          // this.resComentarioMaestro.ok = 0;
          // this.resComentarioMaestro.mensaje='error'
          // console.log('error');
          this.toastr.error('Ha ocurrido un error', 'Error')
        }

        //  console.log(this.listaComentarios);
      }
    }, (err) => {
      // this.resComentarioMaestro = {} as Response;
      // this.resComentarioMaestro.ok = 0;
      // this.resComentarioMaestro.mensaje='error'
    })
  }

  getTipoArchivo(tipo: string): string {
    switch (tipo) {
      case 'jpge': case 'png': case 'jpg': case 'gif': case 'svg':
        return 'img';
        break;
      case 'doc': case 'docx': case 'pdf': case 'xls': case 'xlsx': case 'ppt': case 'pptx': case 'txt':
        return 'app/files-documents2.png';
        break;
      case 'mp4': case 'mov': case 'wmv': case 'avi': case 'flv':
        return 'app/files-video.png'
        break;
      default:
        return 'app/multiple-file.png'
        break;
    }
    return 'app/multiple-file.png';
  }

  getDetallePublicacion() {
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idPub = this.acRouter.snapshot.paramMap.get('id') || "";
    this.publicationService.getDetallePublicacion(idPub).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_detallePub = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_detallePub = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_detallePub = 'C';

        if (res.body.ok === 1) {
          // this.router.navigate(['/']);
          // this.errores = '';
          this.listaDetallePublicacion = res.body.data as Array<DetallePublicacion>;
          console.log('lista detalles', this.listaDetallePublicacion);

        }
        else {
          // this.errores = res.mensaje;
          console.log('error');
        }
      }
    })
  }

  getDataUser() {
    this.user = this.authService.dataUser() as Profile
    // console.log('user : ', this.user)
  }

  // agreagr calificacion de publicacion 
  postCalificacion() {
    console.log(this.addCalificacion.value)
    const idPub = this.acRouter.snapshot.paramMap.get('id') || "";
    const dataUser: any = this.authService.dataUser();

    const calificacion_ = {
      motivo_cal: this.addCalificacion.value.motivo_cal,
      calificacion: this.addCalificacion.value.calificacion,
      id_usuario_cal: dataUser.id,
      id_publicacion_cal: idPub
    } as CalificacionPublicacion

    this.calificationService.postCalificacionPublicacion(calificacion_).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_postCalificacionPub = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_postCalificacionPub = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_postCalificacionPub = 'C';
        if (res.body.ok === 1) {

          // this.user = res.data;
          // localStorage.setItem('token', res.token);
          this.toastr.success('Datos ingresados correctamente', 'Safisfactorio');
          // this.authService.actualizarToken();
          this.addCalificacion.reset();
          this.getCalificacionesPublicacion();

        }
        else {
          // this.errores = res.mensaje;
          console.log(res);
        }
      }
    });

  }

  AddResource() {
    this.adjunto = {} as DetalleComentario;
    this.aux_adjunto = {} as DetalleComentario;
    switch (this.tipo_aporte) {
      case 'file':
        this.adjunto.id = 0;
        this.adjunto.id_comentario = 0;
        this.adjunto.descripcion = this.addFile.value.encabezado;
        this.adjunto.contenido = this.archivo_seleccionado;
        this.adjunto.tipo = this.extension;
        this.aux_listaAdjuntos.push({
          'archivo': this.archivo
        })
        break;
      case 'code':
        // console.log('addCode')
        this.adjunto.id = 0;
        this.adjunto.id_comentario = 0;
        this.adjunto.descripcion = this.addCode.value.encabezado;
        this.adjunto.contenido = this.addCode.value.code;
        this.adjunto.tipo = "code"
        this.aux_listaAdjuntos.push({});
        break;
      case 'URL':
        // console.log('addURL')
        this.adjunto.id = 0;
        this.adjunto.id_comentario = 0;
        this.adjunto.descripcion = this.addURL.value.encabezado;
        this.adjunto.contenido = this.addURL.value.link;
        this.adjunto.tipo = "URL"
        this.aux_listaAdjuntos.push({});
        break;
      default:
        console.log('none')
        break;
    }
    this.listaAdjuntos.push(this.adjunto)
    this.addCode.reset();
    this.addFile.reset();
    this.addURL.reset();
    // this.tipo_aporte=''
    this.archivo_seleccionado = "";
    // console.log('lista de adjuntos', this.listaAdjuntos);
  }

  onChangeFile(event: any): void {
    // console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      //  console.log(event.target.files[0].name);
      this.archivo = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        reader.result;
        this.archivo_seleccionado = event.target.files[0].name;
        // datos_archivo = this.archivo_seleccionado.split(".");
        this.extension = this.archivo_seleccionado.slice((this.archivo_seleccionado.lastIndexOf(".") - 1 >>> 0) + 2);
        // console.log(this.extension);
      };
      reader.readAsDataURL(this.archivo);

      // reader.onload = e => console.log(reader.result);
    }
  }

  convertFilesToFormData(): FormData {
    // selectedFiles: FileList;
    var formData_: FormData = new FormData();
    var arrayFiles: Array<File> = [];
    for (let index = 0; index < this.aux_listaAdjuntos.length; index++) {
      if (this.aux_listaAdjuntos[index].archivo) {
        arrayFiles.push(this.aux_listaAdjuntos[index].archivo);
      }
      // console.log('Array de archivos', arrayFiles)
    }
    arrayFiles.forEach((file) => { formData_.append('files', file); });
    // console.log('formDataC/T ',formData_.getAll('files'))
    return formData_;
  }

  postAdjuntosComentarios() {
    this.commentaryService.postArchivosComentarios(this.convertFilesToFormData()).subscribe((res: any) => {
      // console.log(res)
      if (res.ok === 1) {
        this.postComentarioPublicacion(res.data);
      }
      else {
        console.log('error')
      }

    });
  }

  postComentarioPublicacion(descFiles: any) {
    const idPub = this.acRouter.snapshot.paramMap.get('id') || "";

    //filename......originalname
    for (let index = 0; index < descFiles.length; index++) {
      for (let index2 = 0; index2 < this.listaAdjuntos.length; index2++) {
        if (descFiles[index].originalname == this.listaAdjuntos[index2].contenido) {
          this.listaAdjuntos[index2].contenido = descFiles[index].filename;
        }
      }

    }

    this.comentario = {} as Comentario;
    this.comentario.id_usu_comenta = this.user.id;
    this.comentario.comentario = this.addComentario.value.comentario;
    this.comentario.id_publicacion_com = Number(idPub);
    this.comentario.listaDetalles = this.listaAdjuntos;
    this.comentario.activo = "S";
    // this.publicacion.formData = this.convertFilesToFormData();
    console.log(this.comentario);

    this.commentaryService.postComentariosPublicacion(this.comentario).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_postCalificacionPub = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_postCalificacionPub = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_postCalificacionPub = 'C';

        if (res.body.ok === 1) {

          // this.user = res.data;
          // localStorage.setItem('token', res.token);
          this.toastr.success('Datos ingresados correctamente', 'Safisfactorio');
          // this.authService.actualizarToken();
          this.addComentario.reset();
          this.addCode.reset();
          this.addURL.reset();
          this.addFile.reset();
          this.archivo_seleccionado = "";
          this.tipo_aporte = "";
          this.listaAdjuntos = [];
          this.getComentariosPublicacion();
        }
        else {
          // this.errores = res.mensaje;
          console.log(res);
        }
      }
    });
  }

  EliminarAdjunto(id: any) {
    // console.log(id);
    this.listaAdjuntos.splice(id);
    // console.log(this.listaAdjuntos)
  }

  tipoRecursoChange(event: any) {
    // console.log("cambio")
    // console.log(event.target.value);
    this.tipo_aporte = event.target.value;
    this.oc_value=''
    this.addCode.reset();
    this.addFile.reset();
    this.addURL.reset();
    this.archivo_seleccionado = "";
  }


  getCalificacionesComentarios(id: number) {

    // console.log('modal 1')

    const dataUser: any = this.authService.dataUser();
    this.commentaryService.getCalificacionCommentariosId(id).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_calificacionesCom = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_calificacionesCom = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_calificacionesCom = 'C';
        if (res.body.ok === 1) {
          // this.router.navigate(['/']);
          // this.errores = '';
          this.listaCalificacionesComentarios = res.body.data
          console.log(this.listaCalificacionesComentarios);

        }
        else {
          // this.errores = res.mensaje;
          console.log('error');
        }
      }
    })
  }

  postCalificacionComentario(idCom: number) {
    // const idPub = this.acRouter.snapshot.paramMap.get('id') || "";
    const dataUser: any = this.authService.dataUser();

    const calificacion_ = {
      motivo_cal: this.addCalificacionComentario.value.motivo_cal,
      calificacion: this.addCalificacionComentario.value.calificacion,
      id_usuario_cal: dataUser.id,
      id_comentario_cal: idCom
    } as CalificacionComentario

    console.log('Calificación comentario',calificacion_)

    this.calificationService.postCalificacionComentario(calificacion_).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_postCalificacionCom = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_postCalificacionCom = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_postCalificacionCom = 'C';
        if (res.body.ok === 1) {

          // this.user = res.data;
          // localStorage.setItem('token', res.token);
          this.toastr.success('Datos ingresados correctamente', 'Safisfactorio');
          // this.authService.actualizarToken();
          this.addCalificacionComentario.reset();
          this.getCalificacionesComentarios(idCom);

        }
        else {
          // this.errores = res.mensaje;
          this.toastr.error('Ha ocurrido un error', 'Error');
        }
      }
    },(err)=>{
      this.toastr.error('Ha ocurrido un error', 'Error');
    });
  }

  cambioCalificacionComentario(e: any) {
    // console.log(e);
    this._calificacion_comentario = e;
  }

  cambioCalificacionPublicacion(e: any) {
    // console.log(e);
    this._calificacion_publicacion = e;
  }

  // model!: NgbDateStruct;
  // date!: {year: number, month: number};
  opcionResuelto() {
    this.msj_confirm = '¿Está todo resuelto?'
    this.opcion_sel = 'C'
  }

  opcionEliminar() {
    this.msj_confirm = '¿Desea Eiminar?'
    this.opcion_sel = 'E'
  }

  confirmarOpcion() {
    switch (this.opcion_sel) {
      case 'E':
        this.eliminarPublicacion()
        break;

        case 'C':
        this.completarPublicacion()
        break;

        case 'EC':
        this.eliminarComentario()
        break;
    }
  }

  completarPublicacion() {
    this.publicationService.completarPublicacion(this.publicacion.id).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_elimPublicacion = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_elimPublicacion = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_elimPublicacion = 'C';
        if (res.body.ok === 1) {
          this.toastr.success('Ha cambiado de estado', 'Satisfactorio');
          this.getPublicacion();
          this.getDetallePublicacion();
          this.getDataUser();
          this.getComentariosPublicacion();
          
        }
        else {
          this.ec_elimPublicacion = 'C';
          // this.errores = res.mensaje;
          // console.log(res);
          this.toastr.error('Ha ocurrido un error', 'Error');
        }
      }
    }, (error) => {
      this.ec_elimPublicacion = 'C';
      this.toastr.error('Ha ocurrido un error', 'Error');
    });
  }


  eliminarPublicacion() {
    this.publicationService.eliminarPublicacion(this.publicacion.id).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_elimPublicacion = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_elimPublicacion = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_elimPublicacion = 'C';
        if (res.body.ok === 1) {
          this.toastr.success('Ha eliminado la publicación', 'Satisfactorio');
          // window.history.go(-1)
          this._location.back();
        }
        else {
          this.ec_elimPublicacion = 'C';
          // this.errores = res.mensaje;
          console.log(res);
          this.toastr.error('Ha ocurrido un error', 'Error');
        }
      }
    }, (error) => {
      this.ec_elimPublicacion = 'C';
      this.toastr.error('Ha ocurrido un error', 'Error');
    });
  }


  onChangeCode(value:any){
    this.oc_value = value;
    if (this.oc_value=='') {
      this.oc_value = 'Ninguno'
    }
    console.log(value)
  }

  opcionEliminarComentario(idCom:number){
    this.msj_confirm = '¿Desea Eiminar?'
    this.opcion_sel = 'EC'
    this.selComentario=idCom;
  }

    eliminarComentario(){  
    this.commentaryService.deleteComentario(this.selComentario).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_eliminarCom = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_eliminarCom = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_eliminarCom = 'C';
        if (res.body.ok === 1) {
          this.toastr.success('Ha eliminado el comentario', 'Satisfactorio');
          // window.history.go(-1)
          this.getComentariosPublicacion();
          this.selComentario=0;
        }
        else {
          this.ec_eliminarCom = 'C';
          // this.errores = res.mensaje;
          console.log(res);
          this.toastr.error('Ha ocurrido un error', 'Error');
        }
      }
    }, (error) => {
      this.ec_elimPublicacion = 'C';
      this.toastr.error('Ha ocurrido un error', 'Error');
    });

  }

  validarOtraCalificacionPublicacion(){
    this.otraCalificacion=false
    let index = 0
    var calificacion;
    if(this.listaCalificaciones.length > 0){
      do {
        calificacion = this.listaCalificaciones[index];
        if(calificacion.id_usuario_cal == this.user.id){
          this.addCalificacion.patchValue({
            calificacion: calificacion.calificacion,
            motivo_cal : calificacion.motivo_cal
          });
          // this.aux_calificacion=calificacion
          this.otraCalificacion=true;
          
        }
        index=index+1;
          // console.log(index)
      } while (index <= (this.listaCalificaciones.length-1) && this.otraCalificacion==false);

    }
  }

  accionesPreviasModalCalificacionesComentario(idCom: number){
    this.getCalificacionesComentarios(idCom) 
    this.validarOtraCalificacionComentario()
  }


  accionesPreviasModalCalificacionesPublicacion(){
    this.getCalificacionesPublicacion();
    this.validarOtraCalificacionPublicacion();  
  }


  validarOtraCalificacionComentario(){
    this.otraCalificacionCom=false
    let index = 0
    var calificacion;
    if(this.listaCalificacionesComentarios.length > 0){
      do {
        calificacion = this.listaCalificaciones[index];
        if(calificacion.id_usuario_cal == this.user.id){
          this.addCalificacionComentario.patchValue({
            calificacion: calificacion.calificacion,
            motivo_cal : calificacion.motivo_cal
          });
          // this.aux_calificacion=calificacion
          this.otraCalificacionCom=true;
          
        }
        index=index+1;
          // console.log(index)
      } while (index <= (this.listaCalificacionesComentarios.length-1) && this.otraCalificacion==false);

    }
  }



}
