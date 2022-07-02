import { environment } from 'src/environments/environment';
import { AuthService } from './../../services/auth.service';
import { Profile } from './../../model/Profile';
import { HttpEventType } from '@angular/common/http';
// import { FileAp } from 'src/app/model/FileAp';
import { LabelService } from './../../services/label.service';
import { FileService } from './../../services/file.service';
import { UtillitiesService } from './../../services/utillities.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Label } from 'src/app/model/Label';
import { FileAp } from 'src/app/model/FileAp';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  public addFile = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(255)]],
    descripcion: ['', [Validators.required,
    Validators.maxLength(2000)]],
    file: ['', [Validators.required,
    Validators.maxLength(1000)]]
  });


  public tipo_aporte = "";
  public archivo !: File;
  oc_value: string = '';
  archivo_seleccionado: string = "";
  public formData = new FormData();
  public extension: string = "";
  public contenido: string = "";
  public listaEtiquetas: Array<Label> = [];
  public listaEtiquetasSeleccionadas: Array<Label> = [];
  public aporte : FileAp = {} as FileAp;
  ec_postAporte:string = 'C'
  public user: Profile = {} as Profile;
  public listaAportesUsu: Array<FileAp> = [];
  public listaEtiquetasUsu: Array<Label> = [];
  public listaAportesCom: Array<FileAp> = [];
  public listaEtiquetasCom: Array<Label> = [];
  public listaEtiquetasAux: Array<Label> = []
  ec_getAporteUsu:string = 'C'
  ec_getAporteCom:string = 'C'
  rutaAportes: string = environment.files_aportes_URL;
  rutaImg: string = environment.images_URL;
  ec_eliminarApo: string = '';
  public apoSel = {} as FileAp;



  constructor(private authService: AuthService,
    private formBuilder: FormBuilder, private toastr: ToastrService,
    private labelService: LabelService,
    private fileService: FileService) {
   }


  public mensaje: string = '';

  ngOnInit(): void {
  this.getListaEtiquetas();
  this.getDataUser();
  this.getAportesUsuario();
  this.getAportesComunidad();
  }
  
  getDataUser() {
    this.user = this.authService.dataUser() as Profile;
  }

  cambioArchivoCargado(event: any): void {
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

    }
  }

  getAportesUsuario() {
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.fileService.getAportesUsu(idUsu).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_getAporteUsu = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_getAporteUsu = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_getAporteUsu = 'C'
        if (res.body.ok === 1) {
          this.listaAportesUsu = res.body.data.aportes;
          this.listaEtiquetasUsu = res.body.data.etiquetas;
          // console.log(res.body.data.aportes);

          // console.log('listaEtiquetas', this.listaEtiquetasUsu)
          for (let iApo = 0; iApo < this.listaAportesUsu.length; iApo++) {
            this.listaEtiquetasAux = [] as Array<Label>;
            for (let iEti = 0; iEti < this.listaEtiquetasUsu.length; iEti++) {
              if (this.listaAportesUsu[iApo].id == this.listaEtiquetasUsu[iEti].id_aporte) {
                this.listaEtiquetasAux.push(this.listaEtiquetasUsu[iEti])
              }

            }
            this.listaAportesUsu[iApo].listaEtiquetas = this.listaEtiquetasAux;

          }

          // console.log(this.listaAportesUsu)

        }
        else {
          // this.errores = res.mensaje;
          this.ec_getAporteUsu='C'
          console.log('error');
          this.toastr.error('Ha ocurrido un error', 'Error');
        }
      }
    }, (err: any) => {
      console.log(err);
      this.ec_getAporteUsu='C'
      this.toastr.error('Ha ocurrido un error', 'Error');
    })
  }

  getAportesComunidad() {
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.fileService.getAportesCom(idUsu).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_getAporteCom = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_getAporteCom = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_getAporteCom = 'C'
        if (res.body.ok === 1) {
          this.listaAportesCom = res.body.data.aportes;
          this.listaEtiquetasCom = res.body.data.etiquetas;
          // console.log(res.body.data.aportes);

          // console.log('listaEtiquetas', this.listaEtiquetasCom)
          for (let iApo = 0; iApo < this.listaAportesCom.length; iApo++) {
            this.listaEtiquetasAux = [] as Array<Label>;
            for (let iEti = 0; iEti < this.listaEtiquetasCom.length; iEti++) {
              if (this.listaAportesCom[iApo].id == this.listaEtiquetasCom[iEti].id_aporte) {
                this.listaEtiquetasAux.push(this.listaEtiquetasCom[iEti])
              }

            }
            this.listaAportesCom[iApo].listaEtiquetas = this.listaEtiquetasAux;

          }

          // console.log(this.listaAportesCom)

        }
        else {
          // this.errores = res.mensaje;
          this.ec_getAporteCom='C'
          console.log('error');
          this.toastr.error('Ha ocurrido un error', 'Error');
        }
      }
    }, (err: any) => {
      console.log(err);
      this.ec_getAporteCom='C'
      this.toastr.error('Ha ocurrido un error', 'Error');
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

  seleccionarDatosEliminar(aporteSel:FileAp){
    this.apoSel=aporteSel;
  }

  eliminarAporte(){
    this.fileService.deleteAporte(this.apoSel.id).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_eliminarApo = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_eliminarApo = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_eliminarApo = 'C';
        if (res.body.ok === 1) {
          this.toastr.success('Ha eliminado su aporte', 'Satisfactorio');
          // window.history.go(-1)
          this.getAportesUsuario();
        }
        else {
          this.ec_eliminarApo = 'C';
          // this.errores = res.mensaje;
          console.log(res);
          this.toastr.error('Ha ocurrido un error', 'Error');
        }
      }
    }, (error) => {
      this.ec_eliminarApo = 'C';
      this.toastr.error('Ha ocurrido un error', 'Error');
    });

  }

  GuardarRecurso(){

    this.formData = new FormData();
    this.formData.append('files', this.archivo);
    this.fileService.postArchivoAporte(this.formData).subscribe((res: any) => {
      if (res.ok === 1) {
        this.postAporte(res.data);
        // console.log(res.data[0].filename)
      }
    });

  }

  postAporte(datosF:any){

    this.aporte = {} as FileAp;
    this.aporte.id=0;
    this.aporte.id_usuario_apo=this.user.id;
    this.aporte.titulo = this.addFile.value.titulo;
    this.aporte.descripcion = this.addFile.value.descripcion;
    this.aporte.archivo = datosF[0].filename;
    this.aporte.tipo = this.extension;
    this.aporte.activo = 'S'
    this.aporte.listaEtiquetas = this.listaEtiquetasSeleccionadas;

    this.fileService.postAporte(this.aporte).subscribe((res: any) => {

      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        this.ec_postAporte = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_postAporte = 'P'
      }

      if (res.type === HttpEventType.Response) {
        this.ec_postAporte = 'C';
        if (res.body.ok === 1) {

          // this.user = res.data;
          // localStorage.setItem('token', res.token);
          this.toastr.success('Datos ingresados correctamente', 'Safisfactorio');
          // this.authService.actualizarToken();
          this.addFile.reset();
          this.archivo_seleccionado = "";
          this.tipo_aporte = "";
          this.listaEtiquetasSeleccionadas = [];
          this.getAportesUsuario();
        }
        else {
          // this.errores = res.mensaje;
          this.ec_postAporte = 'C';
          this.toastr.error('Ha ocurrido un error', 'Error');
          console.log(res);
        }
      }
    },(err)=>{
      this.ec_postAporte = 'C';
      this.toastr.error('Ha ocurrido un error', 'Error');
    });

  }

  getListaEtiquetas(){
    this.labelService.getEtiquetas().subscribe((res: any) => {

      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.listaEtiquetas = res.data as Array<Label>;
        // console.log(this.listaEtiquetas);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })
  }

  CancelarCargaArchivo(){
    
    this.addFile.patchValue({
      file: ''
    });
    this.archivo_seleccionado="";
  }

  addEtiqueta(etiqueta:Label){
    if(!this.validarEtiquetaAgregada(etiqueta))
    this.listaEtiquetasSeleccionadas.push(etiqueta);
    else{
      this.toastr.info('Etiqueta ya fue agregada', 'Etiqueta Agregada')
    }

    // console.log(this.listaEtiquetasSeleccionadas)
  }

  validarEtiquetaAgregada(etiqueta:Label):boolean{
    // console.log('validando....')
    for (let index = 0; index < this.listaEtiquetasSeleccionadas.length; index++) {
      const etiqueta_ = this.listaEtiquetasSeleccionadas[index];
      if(etiqueta.id == etiqueta_.id){
        return true;
      }
    }
    return false;
  }

  deleteEtiqueta(indice:number){
      console.log(indice);
      this.listaEtiquetasSeleccionadas.splice(indice,1);
  }

}
