import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { WineDetailComponent } from './wine-detail/wine-detail.component';
import { WinesListComponent } from './wines-list/wines-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/wines', pathMatch: 'full' },
  { path: 'wines', component: WinesListComponent },
  { path: 'wines/:id', component: WineDetailComponent },
  { path: 'checkout', component: PersonalInformationComponent },
  { path: 'cart', component: CartComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
