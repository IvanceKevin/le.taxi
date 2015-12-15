var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'The Great Taxi App' });
});

router.get('/taxis', function (req, res, next) {

	// Coordonnées de Paris, à enlever le jour ou il y aura des taxis à La Rochelle
	req.query.lat = 48.8;
	req.query.lng = 2.35;

	// Appel à l'api
	request({
		url: 'https://api.opendatataxi.fr/taxis/?lat=' + req.query.lat + '&lon=' + req.query.lng,
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'X-VERSION': 2,
			'X-API-KEY': '46f06ed1-0124-4edc-9283-0df69a604ef4'
		}
	}, function (error, response, body) {

		if (error) {
			console.log('error : ', error);
			res.json(error);
		}
		else {
			body = JSON.parse(body);
			console.log('body : ', body.data);
			// console.log('success : ', response.statusCode, body);
			res.json(body.data);
		}
	});

});

module.exports = router;
