import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PublicacionService } from "../../services/publicacion.service";

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent2 implements OnInit {

  public listaPublicaciones:Array<any> = [];

  constructor(private authService : AuthService,
    private publicacionService: PublicacionService) {
    // window.location.reload();
   }

  ngOnInit(): void {
    
    // console.log(this.publicacionSrv.getPublicaciones(1));
    this.getPublicaciones();
  }

  getPublicaciones() {
    // console.log(this.loginForm);
    const dataUser:any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.publicacionService.getPublicaciones(idUsu).subscribe((res: any) => {
      
      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.listaPublicaciones = res.data;
        console.log(res.data);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })
  }

  printData(item:any){
    console.log('Fila seleccionada: ',item)
  }

}
