import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private stateService: StateService  ) {}

  total: any;
  data: any;
  len: any;
  cartItem: any;
  ngOnInit(): void {
    this.getInfo();
    setInterval(() => {
      this.getInfo();
    }, 2000);
  }

  getInfo() {
    this.data = this.stateService.getData();
    this.len = this.data.length;
    this.total = this.calculateTotals(this.data);
  }

  calculateTotals(data: any) {
    let total = 0;
    this.stateService.clearCart();
    for (let i = 0; i < data.length; i++) {
      let sum = 0;
      if (data[i].qty === 'case') {
        sum = data[i].wine.cost.case * data[i].quantity;
        data[i]['unitPrice'] = data[i].wine.cost.case;
      } else {
        sum = data[i].wine.cost.bottle * data[i].quantity;
        data[i]['unitPrice'] = data[i].wine.cost.bottle;
      }
      data[i]['subTotal'] = sum;
      this.stateService.setCart(data[i]);
      total += sum;
    }
    this.stateService.setTotal(total.toFixed(2));
    return total.toFixed(2);
  }

  emptyCart() {
    this.stateService.clearData();
    this.stateService.setQuantityInCart(0);
  }

  deleteRowData(row_obj: { id: any }) {
    this.data = this.data.filter((value: { id: any }, key: any) => {
      return value.id != row_obj.id;
    });
    this.stateService.deleteItem(row_obj);

    this.stateService.setQuantityInCart(
      this.stateService.getQUantityInCart() - 1
    );
  }

  displayedColumns: string[] = [
    'name',
    'quantity',
    'category',
    'unitPrice',
    'subTotal',
    'action',
  ];
}
