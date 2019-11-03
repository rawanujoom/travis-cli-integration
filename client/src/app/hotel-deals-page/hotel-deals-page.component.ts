import { Component, OnInit } from '@angular/core';
import { HotelDealsService } from '../services/hotel-deals.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-hotel-deals-page',
  templateUrl: './hotel-deals-page.component.html',
  styleUrls: ['./hotel-deals-page.component.css']
})
export class HotelDealsPageComponent implements OnInit {

  	deals:Array<Object> = [];
	formFilters: any = {};
	starRateOptions: Options = {};
	guestRateOptions: Options = {};

	constructor(
		private hotelDealsService: HotelDealsService
	) { }

	ngOnInit() {
		this.initalizeFormFilters();
		this.getHotelDeals({});
	}

	getHotelDeals(filters) {
		this.hotelDealsService.getHotelDeals(filters).subscribe(data=> {
			if (data['offers'] && data['offers']['Hotel'] && data['offers']['Hotel'].length > 0) {
				this.deals = data['offers']['Hotel']; 
			} else {
				this.deals = [];
			}
		});
	}

	initalizeFormFilters() {
		this.starRateOptions = this.hotelDealsService.getStarRateOptions();
		this.guestRateOptions = this.hotelDealsService.getGuestRateOptions();
		this.formFilters = {
			destination 		: '',
			minTripStartDate 	: null,
			maxTripStartDate	: null,
			lengthOfStay 		: null,
			minTotalRate 		: null,
			maxTotalRate 		: null,
			minStarRating 		: this.starRateOptions.floor,
			maxStarRating 		: this.starRateOptions.ceil,
			minGuestRating 		: this.guestRateOptions.floor,
			maxGuestRating 		: this.guestRateOptions.ceil
		};
	}

	filterHotelDeals() {
		let filters = {};
		// add regular filters
		for (let key in this.formFilters) {
			if (this.formFilters[key] != null) {
				filters[key] = this.formFilters[key];
			}
		};
		
		this.getHotelDeals(filters);
	}

}
