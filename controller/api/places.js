
const model = require('../../models');
const statusCodes = require('../../helpers/StatusCode');

/**
 * Fetch All Places
 */
const index = async (req, res) => {

    const authData = req.authData;
    const tmpResponse = await model.Place.findAll();

    const result = { 'places': tmpResponse, 'auth': authData };

    const response = (tmpResponse) ? statusCodes.sendOk(result) : statusCodes.notFound();
    res.status(200).json(response);
}

/**
 * View Place
 */
const view = async (req, res) => {

    const tmpResponse = await model.Place.findByPk(req.params.id);

    const response = (tmpResponse) ? statusCodes.sendOk(tmpResponse) : statusCodes.notFound();
    res.status(200).json(response);
}

const create = async (req, res) => {

    const { name } = req.body;
    req.body.user_id = req.authData.user.id;

    const [place, created] = await model.Place.findOrCreate({
        where: { name: name },
        defaults: req.body
    });

    if (created) {
        res.status(200).json(statusCodes.sendOk(place, 'Place created...'));
    } else {
        res.status(200).json(statusCodes.sendOk(place, 'Place already exist!'));
    }
}

module.exports = {
    index,
    view,
    create
}