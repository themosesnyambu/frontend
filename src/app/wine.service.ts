import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Settings } from './Settings';
import { WineItem } from './Wine';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WineService extends EntityCollectionServiceBase<WineItem> {
  constructor(private httpClient: HttpClient, serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('WineItem', serviceElementsFactory);
  }

  getWineItems() {
    return this.httpClient.get<Array<WineItem>>(Settings.DATA_URI);
  }

  addWineItem(wineItem: WineItem) {
    return this.httpClient.post(Settings.DATA_URI, wineItem);
  }

  deleteWineItem(id: string) {
    return this.httpClient.delete(`${Settings.DATA_URI}/${id}`);
  }

  getWineById(payload: string): Observable<WineItem> {
    return this.httpClient.get<WineItem>(`${Settings.DATA_URI}/${payload}`);
  }

  updateWineItem(wineItem: WineItem) {
    return this.httpClient.patch(
      `${Settings.DATA_URI}/${wineItem.no}`,
      wineItem
    );
  }
}
