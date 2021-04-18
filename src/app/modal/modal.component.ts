import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StateService } from '../state.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    private stateService: StateService,
    public dialogRef: MatDialogRef<ModalComponent>
  ) {}

  data: any[] = [];
  total: any;

  ngOnInit(): void {
    this.getCartInfo();
  }
  cart: any[] = [];

  getCartInfo() {
    this.data = this.stateService.getCart();
    this.total = this.stateService.getTotal();
  }

  closeModal() {
    this.dialogRef.close();
  }


}
