import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelDealsPageComponent } from './hotel-deals-page/hotel-deals-page.component';

const routes: Routes = [
	{ path: '**', component: HotelDealsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
