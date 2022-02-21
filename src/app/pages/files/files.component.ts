import { UtillitiesService } from './../../services/utillities.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  constructor(private utilityService : UtillitiesService) {
   }


  public mensaje: string = '';

  ngOnInit(): void {
    // this.onGetUsers()
  }

  // onPostUser(){
  //   this.utilityService.postUser({id:1, nombre: 'Juan Martinez'})
  // }
  
  // onGetUsers(){
  //   this.utilityService.getUsers().subscribe((msg) => {
  //     console.log('got a msg: ' + msg);
  //   });
  // }
}
