import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

import { StateService } from '../state.service';
import { UserService } from '../user.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  constructor(
    private stateService: StateService,
    private userService: UserService,
    public matDialog: MatDialog
  ) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  fullNameFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  phoneNumberFormControl = new FormControl('', [Validators.required]);
  deliveryNotesFormControl = new FormControl('', [Validators.required]);
  estateFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

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

  checkOut() {
    let data = {
      fullName: this.fullNameFormControl.value,
      address: this.addressFormControl.value,
      phoneNumber: this.phoneNumberFormControl.value,
      deliveryNotes: this.deliveryNotesFormControl.value,
      estate: this.estateFormControl.value,
      email: this.emailFormControl.value,
    };
    this.userService.setUser(data);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
}
