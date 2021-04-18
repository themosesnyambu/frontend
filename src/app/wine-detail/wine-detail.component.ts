import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wine-detail',
  templateUrl: './wine-detail.component.html',
  styleUrls: ['./wine-detail.component.scss'],
})
export class WineDetailComponent implements OnInit {
  constructor() {}
  no: any;

  ngOnInit(): void {
    this.no = history.state.data.no;
  }


}
