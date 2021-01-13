const jwt = require('jsonwebtoken');
const StatusCodes = require('../helpers/StatusCode');

module.exports = {

    authHandler: (req, res, next) => {
        
        // Get auth token from the cookies
        const authToken = req.cookies['AuthToken'];

        console.log('authToken', authToken);

        if (req.user) {

            next();

        } else {

            res.render('users/login', {
                message: 'Please login to continue',
                messageClass: 'alert-danger'
            });
        }        
    },

    /**
     * Verify Token Api Handler
     * Token Format :
     * Authorization : Bearer <AuthToken>
     */
    apiAuthHandler: (req, res, next) => {

        const bearerHeader = req.headers['authorization'];

        // Check if Bearer is Undeifned
        if (bearerHeader !== undefined) {

            // Split the Space
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];

            jwt.verify(bearerToken, '5mJncJ4lSKadp', (err, authData) => {

                if (err) {

                    res.status(403).json(StatusCodes.forBidden(err, 'Token expired!'));

                } else {

                    // Attach Auth Data to req for local storage
                    authData.token = bearerToken;
                    req.authData = authData;

                    // Next Middleware
                    next();
                }
            })

        } else {

            res.status(403).json(StatusCodes.forBidden(null, 'Auth token missing!'));
        }
    }
    
};