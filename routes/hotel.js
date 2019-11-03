let express		= require('express');
let router		= express.Router();
let bodyParser	= require('body-parser');
let jsonParser	= bodyParser.json({ type: 'application/*+json' });

router.post('/getOffers', jsonParser, function (req, res) {
	
});

module.exports = router;