
var utils = require('../common/utils');

var hotelValidator = {

  validateGetOffersRequest: (req, res, next) => {
    let body = req.body.filters || {};
    let errors = [], isValid = false;
    let minDateDefined = false, minRateDefined = false, minStarRatingDefined = false, minGuestRateDefined = false;
    if (body.hasOwnProperty('minTripStartDate')) {
      // is date 
      isValid = utils.isValidDate(body['minTripStartDate']);
      if (!isValid) {
        errors.push('min trip start date is not a valid date!')
      } else {
        minDateDefined = true;
      }
    }
    if (body.hasOwnProperty('maxTripStartDate')) {
      // is date 
      isValid = utils.isValidDate(body['maxTripStartDate']);
      if (!isValid) {
        errors.push('trip start date is not a valid date!')
      } else if (minDateDefined) {
        if (Date.parse(body['minTripStartDate']) > Date.parse(body['maxTripStartDate'])) {
              errors.push('maximum trip start date must be greater than minimum trip start date')   
        }
      }
    }
    if (body.hasOwnProperty('lengthOfStay')) {
      // is number more than zero
      if (!utils.isNumber(body['lengthOfStay'])) {
        errors.push('length of stay is invalid !')
      }
    }
    if (body.hasOwnProperty('minTotalRate')) {
      // is number 
      if (!utils.isNumber(body['minTotalRate'])) {
        errors.push('min total rate is invalid !')
      } else {
        minRateDefined = true;
      }
    }
    if (body.hasOwnProperty('maxTotalRate')) {
      // is number
      if (!utils.isNumber(body['maxTotalRate'])) {
        errors.push('max total rate is invalid !')
      } else if (minRateDefined) {
        if (parseInt(body['minTotalRate']) > parseInt(body['maxTotalRate'])) {
          errors.push('max total rate must be greater than min total rate !')
        }
      }
    }
    if (body.hasOwnProperty('minStarRating')) {
       // is number between 1 and 5
      isValid = parseInt(body['minStarRating']) && body['minStarRating'] >=1 && body['minStarRating'] <=5;
      if (!isValid) {
        errors.push('min star rating is invalid !');
      } else {
        minStarRatingDefined = true;
      }
    }
    if (body.hasOwnProperty('maxStarRating')) {
       // is number between 1 and 5
      isValid = parseInt(body['maxStarRating']) && body['maxStarRating'] >=1 && body['maxStarRating'] <=5;
      if (!isValid) {
        errors.push('max star rating is invalid !')
      } else if (minStarRatingDefined) {
        if(parseInt(body['minStarRating']) > parseInt(body['maxStarRating'])) {
          errors.push('max star rating must be greater than min star rating !')
        }
      }
    }
    if (body.hasOwnProperty('minGuestRating')) {
       // is number between 0 and 5
      isValid = utils.isNumber(body['minGuestRating']) && body['minGuestRating'] >=1 && body['minGuestRating'] <=5;
      if (!isValid) {
        errors.push('min guest rating is invalid !')
      } else {
        minGuestRateDefined = true;
      }
    }
    if (body.hasOwnProperty('maxGuestRating')) {
       // is number between 0 and 5
      isValid = utils.isNumber(body['maxGuestRating']) && body['maxGuestRating'] >=1 && body['maxGuestRating'] <=5;
      if (!isValid) {
        errors.push('max guest rating is invalid !');
      } else if (minGuestRateDefined) {
        if(parseInt(body['minGuestRating']) > parseInt(body['maxGuestRating'])) {
          errors.push('max star rating must be greater than min star rating !')
        }
      }
    }
    if (body.hasOwnProperty('destination') && body['destination'].length > 0) {
      isValid = !utils.isSpecialCharachtersOnly(body['destination']);
      if (!isValid) {
        errors.push('destination text is invalid !');
      }
    }

    if (errors.length == 0) {
      return next();
    }

    return res.status(422).json({
      errors: errors
    });

  }
}


module.exports = hotelValidator;

