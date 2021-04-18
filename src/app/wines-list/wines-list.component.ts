import { Component, OnInit } from '@angular/core';
import { WineItem } from '../Wine';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WineService } from '../wine.service';

@Component({
  selector: 'app-wines-list',
  templateUrl: './wines-list.component.html',
  styleUrls: ['./wines-list.component.scss'],
})
export class WinesListComponent implements OnInit {
  constructor(private winesService: WineService) {
    this.wines$ = winesService.entities$;
    this.loading$ = winesService.loading$;
  }
  loading$: Observable<boolean>;
  wines$: Observable<WineItem[]>;
  searchValue: string = '';

  wines: any;
  ngOnInit(): void {
    this.getWines();
  }

  getWines() {
    this.wines$ = this.winesService.getWineItems();
  }

  filterFunc(tag: string) {
    return this.wines$.pipe(
      map((wines) => wines.filter((wine) => wine.tags.includes(tag)))
    );
  }
}
