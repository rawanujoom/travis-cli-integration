import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class HotelDealsService {

	constructor(
		private httpClient: HttpClient
	) { }
	
	getHotelDeals(filters) {
		return this.httpClient.post('/hotel/getOffers', {filters} , {
			observe: "body"
		});
	}
	
	getStarRateOptions() {
		return {
			floor: 1,
			ceil: 5
		}
	}

	getGuestRateOptions() {
		return {
			floor: 1,
			ceil: 5
		}
	}
}