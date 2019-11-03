import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-hotel-deal',
  templateUrl: './hotel-deal.component.html',
  styleUrls: ['./hotel-deal.component.css']
})
export class HotelDealComponent implements OnInit {

	@Input('hotel') hotel = {
		hotelInfo: {}
	};
	@Input('numberOfstayNights') numberOfstayNights :number = 0;

	constructor() { }

	ngOnInit() {
		this.hotel['hotelInfo'] = this.hotel['hotelInfo'] ? this.hotel['hotelInfo'] : {};
		this.hotel['url'] = this.hotel['hotelUrls'].hotelInfositeUrl ? decodeURIComponent(this.hotel['hotelUrls'].hotelInfositeUrl) : '';
		this.hotel['hotelPricingInfo'] = this.hotel['hotelPricingInfo'] ? this.hotel['hotelPricingInfo'] : {};
	}

}
