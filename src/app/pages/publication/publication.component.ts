import { Profile } from './../../model/Profile';
import { PublicacionService } from './../../services/publicacion.service';
import { ActivitiesService } from './../../services/activities.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/model/Publicacion';
import { DetallePublicacion } from 'src/app/model/DetallePublicacion';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  publicacion: any;
  user: Profile = {} as Profile;
  listaDetallePublicacion:Array<DetallePublicacion> = [
    // {
    //   descripcion: 'Descripcion1',
    //   tipo: 'jpg',
    //   archivo: 'imagen.jpg',
    //   contenido: ''
    // },
    // {
    //   descripcion: 'Descripcion2',
    //   tipo: 'docx',
    //   archivo: 'ejemplo.docx',
    //   contenido: ''
    // },
    // {
    //   descripcion: 'Descripcion3',
    //   tipo: 'pdf',
    //   archivo: 'ejemplo2.pdf',
    //   contenido: ''
    // },
    // {
    //   descripcion: 'Descripcion4',
    //   tipo: 'code',
    //   archivo: '',
    //   contenido: '<div>contenedor</div>'
    // },
    // {
    //   descripcion: 'Descripcion5',
    //   tipo: 'txt',
    //   archivo: 'ejemplo3.txt',
    //   contenido: ''
    // }
  ];

  constructor(private authService: AuthService,
    private publicationService: PublicacionService, private router: Router, private acRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPublicacion();
    this.getDetallePublicacion();
  }


  getPublicacion() {
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idPub = this.acRouter.snapshot.paramMap.get('id') || "";
    this.publicationService.getPublicacionById(idPub).subscribe((res: any) => {

      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.publicacion = res.data[0] as Publicacion;
        // console.log(this.publicacion.nombre);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })
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
        console.log(this.listaDetallePublicacion);
        
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })
  }

  getDataUser() {
    this.user=this.authService.dataUser() as Profile
  }
}
