require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    dbURI: process.env.DB_URI || 'mongodb://localhost:27017/Auth',
    jwtSecret: process.env.JWT_SECRET,
};