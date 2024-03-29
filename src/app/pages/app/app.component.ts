import { Profile } from './../../model/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PublicacionService } from "../../services/publicacion.service";
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent2 implements OnInit {

  public listaPublicaciones: Array<any> = [];
  public user: Profile = {} as Profile;
  public ec_publicaciones: string = 'P';
  public ec_reuniones: string = 'P';

  constructor(private authService: AuthService,
    private publicacionService: PublicacionService, private router: Router,
    private toastr: ToastrService) {
    // window.location.reload();
  }

  ngOnInit(): void {

    // console.log(this.publicacionSrv.getPublicaciones(1));
    this.getTopPublicaciones();
    this.getDataUser();
  }

  getDataUser() {
    this.user = this.authService.dataUser() as Profile;
  }

  getTopPublicaciones() {
    // console.log(this.loginForm);
    this.ec_publicaciones='P';
    const dataUser: any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.publicacionService.getTopPublicaciones(idUsu).subscribe((res: any) => {
      if (res.type === HttpEventType.DownloadProgress) {
        // console.log('descarga', res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.ec_publicaciones = 'P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        // console.log('carga', res.loaded, ' - ', res.total); //downloaded bytes

        this.ec_publicaciones = 'P'
        // console.log(res.loaded); //uploaded bytes
        // console.log(res.total); //total bytes to upload
      }

      if (res.type === HttpEventType.Response) {
        this.ec_publicaciones = 'C';
        if (res.body.ok === 1) {
          // this.router.navigate(['/']);
          // this.errores = '';
          this.listaPublicaciones = res.body.data;
          // console.log(res.data);
        }
        else {
          // this.errores = res.mensaje;
          this.toastr.error(res.body.mensaje, 'Error');
        }
      }
    },(err)=>{
      console.log(err);
    })
  }

  printData(item: any) {
    // console.log('Fila seleccionada: ',item)
    this.router.navigate(['/activities', item.id]);
  }

  actualizarRegistros(){
    this.getTopPublicaciones();
  }

}
