import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { Ng5SliderModule } from 'ng5-slider';
import { HotelDealsPageComponent } from './hotel-deals-page/hotel-deals-page.component';
import { HotelDealComponent } from './hotel-deals-page/hotel-deal/hotel-deal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HotelDealsPageComponent,
    HotelDealComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    Ng5SliderModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
