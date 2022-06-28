import { ToastrService } from 'ngx-toastr';
import { PublicacionService } from './../../services/publicacion.service';
import { Publicacion } from '../../model/Publication';
import { FormBuilder, Validators } from '@angular/forms';
import { EspeciallityService } from './../../services/especiallity.service';
import { Profile } from './../../model/Profile';
import { ActivitiesService } from './../../services/activities.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePublicacion } from 'src/app/model/PublicationDetail';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {


  public listaPublicaciones: Array<any> = [];
  public listaEspecialidades: Array<any> = [];
  public listaAdjuntos: Array<DetallePublicacion> = [];
  public aux_listaAdjuntos: Array<any> = [];
  public adjunto: DetallePublicacion = {} as DetallePublicacion;
  public aux_adjunto: DetallePublicacion = {} as DetallePublicacion;

  archivo_seleccionado: string = "";

  public user: Profile = {} as Profile;
  public tipo_aporte = "";
  public archivo !: File;
  public formData = new FormData();
  public extension: string = "";
  public contenido: string = "";
  public publicacion: Publicacion = {} as Publicacion;

  public newPublicationForm = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(255)]],
    descripcion: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(500)]],
    area: ['', Validators.required]
  });

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
  estado_consulta: string = 'P';
  oc_value: string = '';
  ec_postPublicacion: string='C';

  constructor(private authService: AuthService,
    private activitiesService: ActivitiesService, private router: Router,
    private especiallityService: EspeciallityService, private publicacionService: PublicacionService,
    private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPublicaciones();
    this.getListaEspecialidades();
    this.getDataUser();
    this.ec_postPublicacion='C'
  }

  getDataUser() {
    this.user = this.authService.dataUser() as Profile;

  }

  tipoRecursoChange(event: any) {
    // console.log("cambio")
    // console.log(event.target.value);
    this.tipo_aporte = event.target.value;
    this.addCode.reset();
    this.addFile.reset();
    this.addURL.reset();
    this.archivo_seleccionado = "";
  }

  getListaEspecialidades() {

    this.especiallityService.getEspecialidades().subscribe((res: any) => {

      if (res.ok === 1) {
        this.listaEspecialidades = res.data;
      }
      else {
        console.log('error');
      }
    }, (err: any) => {
      console.log(err);
    })

  }

  postPublicacion() {
    this.publicacionService.postArchivosPublicacion(this.convertFilesToFormData()).subscribe((res: any) => {
      if (res.ok === 1) {
        this.postPublicacion2(res.data);
      }

    });
  }

  postPublicacion2(descFiles: any) {

    //filename......originalname
    for (let index = 0; index < descFiles.length; index++) {
      for (let index2 = 0; index2 < this.listaAdjuntos.length; index2++) {
        if (descFiles[index].originalname == this.listaAdjuntos[index2].contenido) {
          this.listaAdjuntos[index2].contenido = descFiles[index].filename;
        }
      }

    }

    this.publicacion = {} as Publicacion;
    this.publicacion.titulo = this.newPublicationForm.value.titulo;
    this.publicacion.id_usuario_pub = this.user.id;
    this.publicacion.descripcion = this.newPublicationForm.value.descripcion;
    this.publicacion.id_especialidad = this.newPublicationForm.value.area;
    this.publicacion.listaDetalles = this.listaAdjuntos;
    this.publicacion.estado = "P";
    this.publicacion.activo = "S";
    // this.publicacion.formData = this.convertFilesToFormData();
    // console.log(this.publicacion);

    this.publicacionService.postPublicacion(this.publicacion).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_postPublicacion = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_postPublicacion = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_postPublicacion = 'C';
        if (res.body.ok === 1) {

          // this.user = res.data;
          // localStorage.setItem('token', res.token);
          this.toastr.success('Datos ingresados correctamente', 'Safisfactorio');
          // this.authService.actualizarToken();
          this.newPublicationForm.reset();
          this.addCode.reset();
          this.addFile.reset();
          this.addURL.reset();
          this.archivo_seleccionado = "";
          this.tipo_aporte = "";
          this.listaAdjuntos = [];
          this.getPublicaciones();
        }
        else {
          // this.errores = res.mensaje;
          this.ec_postPublicacion = 'C';
          this.toastr.error('Ha ocurrido un error', 'Error');
          console.log(res);
        }
      }
    },(err)=>{
      this.ec_postPublicacion = 'C';
      this.toastr.error('Ha ocurrido un error', 'Error');
    });
  }

  convertFilesToFormData(): FormData {
    // selectedFiles: FileList;
    var formData_: FormData = new FormData();
    var arrayFiles: Array<File> = [];
    for (let index = 0; index < this.aux_listaAdjuntos.length; index++) {
      if (this.aux_listaAdjuntos[index].archivo) {
        arrayFiles.push(this.aux_listaAdjuntos[index].archivo);
      }
      console.log('Array de archivos', arrayFiles)
    }
    arrayFiles.forEach((file) => { formData_.append('files', file); });
    // console.log('formDataC/T ',formData_.getAll('files'))
    return formData_;
  }

  getPublicaciones() {
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.activitiesService.getPublicaciones(idUsu).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.estado_consulta = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.estado_consulta = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.estado_consulta = 'C'
        if (res.body.ok === 1) {
          // this.router.navigate(['/']);
          // this.errores = '';
          this.listaPublicaciones = res.body.data;
          // console.log(res.data);
        }
        else {
          // this.errores = res.mensaje;
          this.estado_consulta='C'
          console.log('error');
          this.toastr.error('Ha ocurrido un error', 'Error');
        }
      }
    }, (err: any) => {
      console.log(err);
      this.estado_consulta='C'
      this.toastr.error('Ha ocurrido un error', 'Error');
    })
  }

  printData(item: any) {
    this.router.navigate(['/activities', item.id]);
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

  AddResource() {
    this.adjunto = {} as DetallePublicacion;
    this.aux_adjunto = {} as DetallePublicacion;
    switch (this.tipo_aporte) {
      case 'file':
        this.adjunto.id = 0;
        this.adjunto.id_publicacion = 0;
        this.adjunto.descripcion = this.addFile.value.encabezado;
        this.adjunto.contenido = this.archivo_seleccionado;
        this.adjunto.tipo = this.extension;
        this.aux_listaAdjuntos.push({
          'index': this.listaAdjuntos.length,
          'archivo': this.archivo
        })
        break;
      case 'code':
        console.log('addCode')
        this.adjunto.id = 0;
        this.adjunto.id_publicacion = 0;
        this.adjunto.descripcion = this.addCode.value.encabezado;
        this.adjunto.contenido = this.addCode.value.code;
        this.adjunto.tipo = "code"
        break;
      case 'URL':
        console.log('addURL')
        this.adjunto.id = 0;
        this.adjunto.id_publicacion = 0;
        this.adjunto.descripcion = this.addURL.value.encabezado;
        this.adjunto.contenido = this.addURL.value.link;
        this.adjunto.tipo = "URL"
        break;
      default:
        console.log('none')
        break;
    }
    this.listaAdjuntos.push(this.adjunto)
    this.addCode.reset();
    this.addFile.reset();
    this.addURL.reset();
    this.archivo_seleccionado = "";
    console.log('lista de adjuntos', this.listaAdjuntos);
  }

  EliminarAdjunto(index: number) {
    this.listaAdjuntos.splice(index);
  }

  onChangeCode(value: any) {
    this.oc_value = value;
    if (this.oc_value == '') {
      this.oc_value = 'Ninguno'
    }
    console.log(value)
  }

  onHighlight(e: any) {
    const response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: e.value
    }
    console.log(e)
  }

  actualizarRegistros(){
    this.getPublicaciones();
    this.getListaEspecialidades();
  }

}
