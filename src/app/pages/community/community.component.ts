import { ToastrService } from 'ngx-toastr';
import { PublicacionService } from './../../services/publicacion.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {

  public filter='';
  public listaPublicaciones: Array<any> = [];
  public listaColPublicaciones: Array<any> = [];
  estado_consulta:string='P'
  estado_consultaCol:string='P'
  
  constructor(private authService: AuthService, private router: Router,
    private publicacionService: PublicacionService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPublicacionesCommunity();
    this.getPubColCommunity()
  }

  getPublicacionesCommunity() {
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.publicacionService.getPublicacionesCommunity(idUsu).subscribe((res: any) => {
      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga',res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.estado_consulta='P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga',res.loaded, ' - ', res.total); //downloaded bytes

        this.estado_consulta='P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.estado_consulta='C';
        if (res.body.ok === 1) {
          this.listaPublicaciones = res.body.data;
        }
        else {
          // this.errores = res.mensaje;
          this.toastr.error(res.body.mensaje, 'Error')
        }
      }
      
    }, (err: any) => {
      console.log(err);
    })
  }

  getPubColCommunity() {
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.publicacionService.getColPublicaciones(idUsu).subscribe((res: any) => {
      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga',res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.estado_consultaCol='P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        console.log('carga',res.loaded, ' - ', res.total); //downloaded bytes

        this.estado_consultaCol='P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.estado_consultaCol='C';
        if (res.body.ok === 1) {
          this.listaColPublicaciones = res.body.data;
          // console.log(this.listaColPublicaciones)
        }
        else {
          // this.errores = res.mensaje;
          this.estado_consultaCol='C';
          this.toastr.error(res.body.mensaje, 'Error')
          console.log('error');
        }
      }
      
    }, (err: any) => {
      this.estado_consultaCol='C';
      this.toastr.error('Ha ocurrido un error', 'Error')
      console.log(err);
    })
  }

  printData(item: any) {
    this.router.navigate(['/community', item.id]);
  }

  actualizarRegistrosColaboracion(){
    this.getPubColCommunity();
  }

  actualizarRegistrosComunidad(){
    this.getPublicacionesCommunity();
  }

}
