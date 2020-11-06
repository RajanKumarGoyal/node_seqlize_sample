module.exports = {

    authHandler: (req, res, next) => {
        
        if (req.user) {

            next();

        } else {

            res.render('users/login', {
                message: 'Please login to continue',
                messageClass: 'alert-danger'
            });
        }        
    }
};