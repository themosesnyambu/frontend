import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Settings } from '../Settings';
import { StateService } from '../state.service';
import { WineItem } from '../Wine';

@Component({
  selector: 'app-wine-card',
  templateUrl: './wine-card.component.html',
  styleUrls: ['./wine-card.component.scss'],
})
export class WineCardComponent implements OnInit {
  @Input() wine!: WineItem;
  IMAGE_URI: string = Settings.IMAGE_BASE_URI;
  selectedid: any;
  options: any = null;

  constructor(
    private stateService: StateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('no');
      this.selectedid = id;
    });
  }

  radioChangeHandler(event: any) {
    this.options = event.target.value;
  }

  addToCart() {
    let keys = this.stateService.getKeys();
    let currentCart = this.stateService.getData();
    let no = this.wine.no;
    if (this.options == null) {
      window.alert('Please select bottle or case');
    } else {
      if (currentCart.length === 0) {
        this.newEntry();
      } else {
        if (keys.includes(no)) {
          for (let i = 0; i < currentCart.length; i++) {
            if (
              no === currentCart[i].wine.no &&
              this.options == currentCart[i].qty
            ) {
              this.stateService.removeItem(i, {
                wine: this.wine,
                quantity: parseInt(currentCart[i].quantity) + 1,
                qty: this.options,
              });
              this.stateService.setQuantityInCart(
                this.stateService.getQUantityInCart() + 1
              );
              break;
            } else {
              this.newEntry();
              break;
            }
          }
        } else {
          this.newEntry();
        }
      }
    }
  }

  newEntry() {
    this.stateService.setKey(this.wine.no);
    this.stateService.setData({
      wine: this.wine,
      quantity: 1,
      qty: this.options,
    });
    this.stateService.setQuantityInCart(
      this.stateService.getQUantityInCart() + 1
    );
  }

  onSelect(wine: { no: any }) {
    this.router.navigate([wine.no], {
      relativeTo: this.route,
      state: { wine: wine },
    });
  }

  isSelected(wine: { no: any }) {
    return wine.no === this.selectedid;
  }
}
