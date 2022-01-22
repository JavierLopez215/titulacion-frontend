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

  public listaPublicaciones: Array<any> = [];
  estado_consulta:string='P'
  
  constructor(private authService: AuthService, private router: Router,
    private publicacionService: PublicacionService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPublicacionesCommunity();
  }

  getPublicacionesCommunity() {
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.publicacionService.getPublicacionesCommunity(idUsu).subscribe((res: any) => {
      if (res.type === HttpEventType.DownloadProgress) {
        console.log('descarga',res.loaded, ' - ', res.total); //downloaded bytes
        // console.log(res.total); //total bytes to download
        this.estado_consulta='P'
      }
      if (res.type === HttpEventType.UploadProgress) {
        console.log('carga',res.loaded, ' - ', res.total); //downloaded bytes

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
          console.log('error');
        }
      }
      
    }, (err: any) => {
      console.log(err);
    })
  }

  printData(item: any) {
    this.router.navigate(['/publication', item.id]);
  }

}
