import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private stateService: StateService) {}
  quantityInCart: any;
  ngOnInit(): void {
    this.getInfo();
    setInterval(() => {
      this.getInfo();
    }, 5000);
  }
  getInfo() {
    this.quantityInCart = this.stateService.getQUantityInCart();
  }
}
