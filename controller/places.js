const model = require('../models');

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

module.exports = {
    index,
    create
}