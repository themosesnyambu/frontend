import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StateService } from '../state.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    private stateService: StateService,
    private userService: UserService,
    public dialogRef: MatDialogRef<ModalComponent>
  ) {}

  cartData: any[] = [];
  total: any;
  userData: any;

  ngOnInit(): void {
    this.getInfo();

  }
  cart: any[] = [];

  getInfo() {
    this.cartData = this.stateService.getCart();
    this.total = this.stateService.getTotal();
    this.userData = this.userService.getUser();
  }

  closeModal() {
    this.dialogRef.close();
  }


}
