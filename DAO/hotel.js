var request = require('request');
var zlib =require('zlib');

var hotelDAO = {

	getOffers: function(filters, callback) {
		
		var _offersAPI = 'https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel';
		// request API with header parametes and filters
		request.get({
			headers: {
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'en-US,en;q=0.9',
				'Connection': 'keep-alive',
				'Cache-Control': 'max-age=0',
				'Accept': 'application/json',
			},
			uri: _offersAPI,
			qs: filters
		}).on('response', function(res) {
			let chunks = [];
			res.on('data', function(chunk) {
			  chunks.push(chunk);
			});
			res.on('end', function() {
			  var buffer = Buffer.concat(chunks);
			  var encoding = res.headers['content-encoding'];
			  // decompress response
			  if (encoding == 'gzip') {
			    zlib.gunzip(buffer, function(err, decoded) {
			    	console.log("decoded: ",decoded)
			      callback(err, decoded && decoded.toString());
			    });
			  } else if (encoding == 'deflate') {
			    zlib.inflate(buffer, function(err, decoded) {
			      callback(err, decoded && decoded.toString());
			    })
			  } else {
			  	callback(null,  buffer.toString());
			  }
			});
		}).on('error', function(err) {
			callback(err);
		});
	}
}

module.exports = hotelDAO;
