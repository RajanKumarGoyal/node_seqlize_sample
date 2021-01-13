
var User = require('../models/user'); 
const model = require('../models');

/**
 * Declare all variables here
 * This will hold the users and authToken related to users
 */
const authTokens = {};
const { getHashedPassword, generateAuthToken } = require('../helpers/common');

const register = async (req, res) => {

    if (req.method === 'POST') 
    {
        try {
            let { email, firstName, lastName, password, confirmPassword } = req.body;
            
            if (password === confirmPassword) 
            {
                password = await getHashedPassword(password);
                let data = { firstName, lastName, email, password };
                
                await model.User.create(data);
                res.render('users/login', {
                    message: 'Registration Complete. Please login to continue.',
                    messageClass: 'alert-success'
                });
    
            } else {
    
                res.render('users/register', {
                    message: 'Password confirmation does not match.',
                    messageClass: 'alert-danger'
                });
            }
        }
        catch (e) {
            const errObj = [];
            e.errors.map( er => {
                errObj[er.path] = er.message;
            });

            console.log(errObj);
        }
    }

    res.render('users/register');
}

const login = async (req, res) => {

    if (req.method == 'POST')
    {
        const { email, password } = req.body;
        const hashedPassword = getHashedPassword(password);
        const user = await model.User.findOne({ where: { email: email, password: hashedPassword } });

        if (user) 
        {
            const authToken = generateAuthToken();

            /**
             * Store authentication token
             */
            authTokens[authToken] = user;

            // res.status(200).json(authTokens);

            res.cookie('AuthToken', authToken);
            res.redirect('/places');

        } else {

            res.render('users/login', {
                message: 'Invalid username or password',
                messageClass: 'alert-danger'
            });
        }

    } else {

        res.render('users/login');
    }
}

const index = async (req, res) => {

    console.log(authTokens);

    const results = await model.User.findAll();
    res.render('users/index', {
        results: results,
        title: 'User Listing'
    });
}

const view = async (req, res) => {

    const id = req.params.id;

    const user = await model.User.findByPk(id);
    const places = await user.getPlaces();

    res.render('users/view', {
        places: places,
        title: 'User View',
        user: user
    });
}

module.exports = {
    register,
    login,
    index,
    view
}