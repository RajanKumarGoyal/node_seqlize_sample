const model = require('../models');
var http = require('http');
const request = require('request');

const index = async (req, res) => {
    const results = await model.Place.findAll({
        include: model.User
    });
    res.render('places/index', {
        results: results,
        title: 'Place Listing'
    });
}

const create = async (req, res) => {

    if (req.method === "POST")
    {
        let resp =  await model.Place.create({
            name: req.body.name, 
            lat: req.body.lat, 
            lng: req.body.lng, 
            address: req.body.address,
            user_id: 1
        },{ 
            fields: ['name', 'lat', 'lng', 'address', 'user_id'] 
        }).then( data => {
            return {
                message: 'Place created successfully.',
                messageClass: 'alert-success'
            }
        }).catch(err => {
            return {
                message: 'Error occured!',
                messageClass: 'alert-danger'
            };
        });

        res.redirect('/places');        
    }

    res.render('places/create', {
        title: 'Create Place'
    });
}

const fetchPlaces = async (req, res) => {

    // request('http://account.statsocial.com/front-end-api/fe/api/reports/9157780345631717232', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         const data = JSON.parse(body);
    //         res.writeHead(200, { "Content-Type": "application/json" });
    //         res.write(JSON.stringify(data));
    //         return res.end();
    //     }
    // });

    const results = await model.Place.findAll();
    res.status(200).json(results);
}

module.exports = {
    index,
    create,
    fetchPlaces
}