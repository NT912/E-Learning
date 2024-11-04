const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV || 'development';

const config = {
  development: require('./env/development'),
  production: require('./env/production'),
};

module.exports = config[env];
