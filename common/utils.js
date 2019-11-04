var fs = require('fs');
var moment = require('moment');

var utils = {

	cityArr: [],

	isNumber: function(v) {
		return !isNaN(v);
	},

	isValidCity: function(city, callback) {
		city = city.toLowerCase();
		if (utils.cityArr.length == 0) {
			fs.readFile(__dirname + '/cities.txt', 'utf8', function (err, data) {
			  if (err) throw err;
			  utils.cityArr = data.split(/\r?\n/);
			  if(utils.cityArr.indexOf(city) != -1){
			   	return callback(true);
			  }
			  return callback(false);
			});
		} else {
			// no need to read cities file get from global utils.cityArr
			if(utils.cityArr.indexOf(city) != -1){
				return callback(true);
			}
			return callback(false);
		}
	},

	isValidDate: function(date) {
		return moment(date).isValid();
	},

	convertDateToUTC: function(date, format= 'YYYY-MM-DD') {
		return moment(date).utc().format(format);
	},

	isSpecialCharachtersOnly: function(input) {
		var regex = /^[^a-zA-Z0-9]+$/
		return !!input.match(regex);
	},

	detectDestinationType: function(destination, callback) {
		// value type can be either regionIds, city name or destination name.
		destination = destination.trim();
		let isRegionIds = true;
		let splitted = destination.split(',');
		for (let item of splitted) {
			if (!utils.isNumber(item)) {
			  isRegionIds = false;
			  break;
			}
		}
		if (isRegionIds) {
			return callback('regionIds');
		}
		utils.isValidCity(destination, function(result) {
			if (result) {
				return callback('destinationCity');
			} else {
				return callback('destinationName');
			}
		});
	}

}
module.exports = utils;
