const crypto = require("crypto");

/**
 * Hash the password
 * @param {string} password 
 */
const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
};

/**
 * Generate Auth Token
 */
const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
};

module.exports = {
    getHashedPassword,
    generateAuthToken
};