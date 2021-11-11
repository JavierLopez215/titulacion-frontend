import { ActivitiesService } from './../../services/activities.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {


  public listaPublicaciones: Array<any> = [];

  constructor(private authService: AuthService,
    private activitiesService: ActivitiesService, private router: Router) { }

  ngOnInit(): void {
    this.getPublicaciones();
  }

  getPublicaciones() {
    // console.log(this.loginForm);
    const dataUser: any = this.authService.dataUser();
    const idUsu = dataUser.id;
    this.activitiesService.getPublicaciones(idUsu).subscribe((res: any) => {

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

  printData(item: any) {
    this.router.navigate(['/publication', item.id]);
  }

}
