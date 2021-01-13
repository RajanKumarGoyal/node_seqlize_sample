/**
 * Third Party Libraries
 */
const jwt = require('jsonwebtoken');

/**
 * Helper Methods
 */
const model = require('../../models');
const { getHashedPassword } = require('../../helpers/common');
const StatusCodes = require('../../helpers/StatusCode');

const Stripe = require('stripe');
const stripe = Stripe('sk_test_ryfDM5JwcRme8JovxByaWif3');

const login = async (req, res) => {

    const { email, password } = req.body;

    // Match Password & Email with db
    const hashedPassword = getHashedPassword(password);
    const user = await model.User.findOne({ where: { email: email, password: hashedPassword } });

    // Check Hash Pasw
    // console.log('value', hashedPassword);
    // console.log('db', user.password);

    // Check if user is defined
    if (user !== null) {

        // Generate Token
        jwt.sign({ user }, '5mJncJ4lSKadp', { expiresIn: '2h' }, (error, token) => {
            if (error) {

                res.status(500).json(StatusCodes.error(error, 'Error occured!'));

            } else {

                // Attack Token for the response
                const tmpUser = {
                    'id': user.id,
                    'email': user.email,
                    'firstName': user.firstName,
                    'lastName': user.lastName,
                    'token': token
                }

                res.status(200).json(StatusCodes.sendOk(tmpUser, 'User logged in successfuly!'));
            }
        });

    } else {

        res.status(403).json(StatusCodes.forBidden(null, 'User not found!'));
    }
}

const createStripeIntent = async (req, res) => {

    if (req.method === 'POST') {
        
        // const { amount } = req.body;
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: '1000',
            currency: 'usd',
            description: 'Created By Cleancash Client End'
        });

        res.status(200).send(paymentIntent.client_secret);

    } else {

        res.setHeader('Allow', 'POST');
        res.status(405).end('Method not allowed');
    }
};

module.exports = {
    login,
    createStripeIntent
}