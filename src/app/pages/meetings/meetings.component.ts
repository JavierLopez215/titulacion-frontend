import { MeetingsService } from './../../services/meetings.service';
import { PublicacionService } from './../../services/publicacion.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})

export class MeetingsComponent implements OnInit {

  titulo_reuniones?: string;
  public listaReunionesAceptadas:Array<any> = [];
  public listaHistorialReuniones:Array<any> = [];

  constructor(private authService: AuthService,
    private meetingsService: MeetingsService,
    private router: Router) { }

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

    // console.log(this.loginForm);
    const dataUser:any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.meetingsService.getReunionAceptadaUsuario(idUsu).subscribe((res: any) => {

      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.listaReunionesAceptadas = res.data;
        console.log(this.listaReunionesAceptadas);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })

  }

  getListaMisReunionesHistorial() {
    // console.log(this.loginForm);
    const dataUser:any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.meetingsService.getReunionHistorialUsuario(idUsu).subscribe((res: any) => {

      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.listaHistorialReuniones = res.data;
        console.log(this.listaHistorialReuniones);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })
  }

  btnReunionesComunidad() {
    this.titulo_reuniones = "Reuniones Comunidad"
  }

  getListaReunionesComunidadAceptadas() {

  }

  getListaReunionesComunidadHistorial() {

  }

}
