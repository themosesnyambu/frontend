import { Injectable } from '@angular/core';
import { WineItem } from './Wine';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  data: any[] = [];
  keys: any[] = [];
  cart: any[] = [];
  total: any = 0;
  quantityInCart = 0;
  constructor() {}

  setQuantityInCart(q: number) {
    this.quantityInCart = q;
  }

  getQUantityInCart() {
    return this.quantityInCart;
  }

  setData(body: any) {
    this.data.push(body);
  }

  setTotal(total: any) {
    this.total = total;
  }

  getTotal() {
    return this.total;
  }

  setCart(body: any) {
    this.cart.push(body);
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }

  clearData() {
    this.data = [];
    this.keys = [];
  }

  setKey(key: any) {
    this.keys.push(key);
  }

  getData() {
    return this.data;
  }
  getKeys() {
    return this.keys;
  }

  removeItem(i: number, body: any) {
    this.data[i] = body;
  }

  deleteItem(item: any) {
    for (let i = 0; i < this.data.length; i++) {
      if (
        this.data[i].wine.name == item.wine.name &&
        this.data[i].qty === item.qty
      ) {
        this.data.splice(i, 1);
      }
    }
  }
}
