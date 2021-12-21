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
import { Publicacion } from 'src/app/model/Publicacion';
import { DetallePublicacion } from 'src/app/model/DetallePublicacion';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  publicacion: any;
  rutaImg: string = environment.images_URL;
  rutaArchivos: string = environment.fies_URL;
  user: Profile = {} as Profile;
  listaCalificaciones: Array<CalificacionPublicacion> = [];
  listaDetallePublicacion: Array<DetallePublicacion> = [];

  public addCalificacion = this.formBuilder.group({
    calificacion: [0, [Validators.required,
    Validators.max(5),
    Validators.min(0)]],
    motivo_cal: ['', [Validators.required,
    Validators.maxLength(255)]]
  });

  constructor(private authService: AuthService,
    private publicationService: PublicacionService,
    private router: Router,
    private calificationService: CalificationService,
    private acRouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.sanitizer.bypassSecurityTrustUrl(this.rutaImgProfile);
    // this.sanitizer.bypassSecurityTrustUrl(this.rutaArchivos);
    this.getPublicacion();
    this.getDetallePublicacion();
    this.getDataUser();
  }


  getPublicacion() {
    // console.log(this.loginForm);
    // const dataUser: any = this.authService.dataUser();
    const idPub = this.acRouter.snapshot.paramMap.get('id') || "";
    this.publicationService.getPublicacionById(idPub).subscribe((res: any) => {
      // console.log(this.publicacion)
      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.publicacion = res.data[0] as Publicacion;
        // console.log(this.publicacion);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })
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

  public display: string = "none";

  getCalificacionesPublicacion() {
    // $("#miModal").modal("show");
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idPub = this.acRouter.snapshot.paramMap.get('id') || "";
    this.calificationService.getCalificacionPublicacionId(idPub).subscribe((res: any) => {
      // console.log(this.publicacion)
      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.listaCalificaciones = res.data as Array<CalificacionPublicacion>;
        // console.log(this.listaCalificaciones);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })
  }

  getTipoArchivo(tipo: string): string {
    switch (tipo) {
      case 'jpge': case 'png': case 'jpg': case 'gif': case 'svg':
        return this.rutaImg + '/app/files-images2.png';
        break;
      case 'doc': case 'docx': case 'pdf': case 'xls': case 'xlsx': case 'ppt': case 'pptx': case 'txt':
        return this.rutaImg + '/app/files-documents2.png';
        break;
      case 'mp4': case 'mov': case 'wmv': case 'avi': case 'flv':
        return this.rutaImg + '/app/files-video.png'
        break;
      default:
        return this.rutaImg + '/app/multiple-file.png'
        break;
    }
    return 'images.jpg';
  }

  getDetallePublicacion() {
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idPub = this.acRouter.snapshot.paramMap.get('id') || "";
    this.publicationService.getDetallePublicacion(idPub).subscribe((res: any) => {

      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.listaDetallePublicacion = res.data as Array<DetallePublicacion>;
        // console.log(this.listaDetallePublicacion);

      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })
  }

  getDataUser() {
    this.user = this.authService.dataUser() as Profile
    // console.log('user : ', this.user)
  }

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

      if (res.ok === 1) {

        // this.user = res.data;
        // localStorage.setItem('token', res.token);
        this.toastr.success('Datos ingresados correctamente', 'Safisfactorio');
        // this.authService.actualizarToken();
        this.addCalificacion.reset();
        
      }
      else {
        // this.errores = res.mensaje;
        console.log(res);
      }
    });

  }
}
