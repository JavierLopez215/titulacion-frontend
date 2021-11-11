import { PublicacionService } from './../../services/publicacion.service';
import { ActivitiesService } from './../../services/activities.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  publicacion:any;

  constructor(private authService: AuthService,
    private publicationService: PublicacionService, private router: Router, private acRouter: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getPublicacion()
  }


  getPublicacion() {
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idPub = this.acRouter.snapshot.paramMap.get('id') || "";
    this.publicationService.getPublicacionById(idPub).subscribe((res: any) => {

      if (res.ok === 1) {
        // this.router.navigate(['/']);
        // this.errores = '';
        this.publicacion = res.data[0];
        console.log(this.publicacion.nombre);
      }
      else {
        // this.errores = res.mensaje;
        console.log('error');
      }
    })
  }

}
