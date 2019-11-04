import { Component, OnInit } from '@angular/core';
import { HotelDealsService } from '../services/hotel-deals.service';
import { Options } from 'ng5-slider';
import * as _ from 'lodash';

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
	sortResultsBy: string;
	sortOptions: Array<Object>;

	constructor(
		private hotelDealsService: HotelDealsService
	) { }

	ngOnInit() {
		this.initalizeFormFilters();
		this.getHotelDeals({});
		this.sortOptions = [
			{ text: 'Price (Low to High)',val: 'price' },
			{ text: 'Star Rating (High to Low)',val: 'stars' },
			{ text: 'Guest Rating (High to Low)',val: 'guest' },
		]
		this.sortResultsBy = this.sortOptions[0]['val'];
	}

	getHotelDeals(filters) {
		this.hotelDealsService.getHotelDeals(filters).subscribe(data=> {
			if (data['offers'] && data['offers']['Hotel'] && data['offers']['Hotel'].length > 0) {
				this.deals = data['offers']['Hotel'];
				this.deals = this.sortDataBy(this.sortResultsBy);
			} else {
				this.deals = [];
			}
		}, err => {
			if (err['error'] && err['error'].errors && err['error'].errors.length > 0) {
				return alert(err['error'].errors.join('\n'));
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

	sortDataBy(sortBy) {
		if (sortBy == 'price') {
			this.deals = _.orderBy(this.deals, deal=> { return parseInt(deal.hotelPricingInfo.displayPriceValue)}, ['asc']);

		} else if (sortBy == 'stars') {
			this.deals = _.orderBy(this.deals, deal=> { return parseInt(deal.hotelInfo.hotelStarRating)}, ['desc']);

		} else if (sortBy == 'guest') {
			this.deals = _.orderBy(this.deals, deal=> { return parseInt(deal.hotelInfo.hotelGuestReviewRating)}, ['desc']);
		}
		return this.deals;

	}

}
