import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {

  public pre_code: string = "";
  public code: string = "";
  constructor() { }

  ngOnInit(): void {
  }


  verCode(){
    this.pre_code=this.code;
    console.log(this.pre_code)
  }
}
