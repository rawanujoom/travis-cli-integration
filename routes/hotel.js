var express		= require('express');
var router		= express.Router();
var bodyParser	= require('body-parser');
var jsonParser	= bodyParser.json({ type: 'application/*+json' });

var hotelValidator = require('../validator/hotel');
var hotelDAO = require('../DAO/hotel');
var utils = require('../common/utils');

router.post('/getOffers', jsonParser, hotelValidator.validateGetOffersRequest, function (req, res) {
	var filters = req.body.filters || {};
	// convert dates to utc to not consider user timezone
	if (filters['minTripStartDate']) {
		filters['minTripStartDate'] = utils.convertDateToUTC(filters['minTripStartDate']);
	}
	// convert dates to utc to not consider user timezone
	if (filters['maxTripStartDate']) {
		filters['maxTripStartDate'] = utils.convertDateToUTC(filters['maxTripStartDate']);
	}
	var getOffers = function() {
		delete filters['destination'];
		hotelDAO.getOffers(filters, function(err, data) {
			if (err) {
				return res.send({err:err});
			}
			return res.send(data);
		});
	}
	// add destination/city/regionIds filter
	if(filters['destination']) {
		utils.detectDestinationType(filters['destination'], function(destinationType) {
			filters[destinationType] = filters['destination'].trim();
			getOffers();
		});
	} else {
		getOffers();
	}
	
	
});



module.exports = router;