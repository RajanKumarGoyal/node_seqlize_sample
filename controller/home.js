
const { payByPaypal } = require('../helpers/Paypal');

const index = async (req, res) => {

    const response = await payByPaypal(req, res);
    console.log('response', JSON.stringify(response));

    res.render('index', { title: 'Node Sample in Express' });
};

module.exports = {
    index
}