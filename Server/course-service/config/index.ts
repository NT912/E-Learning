import dotenv from 'dotenv';
dotenv.config();

const env = (process.env.NODE_ENV || 'development') as 'development' | 'production';

const config = {
  development: require('./env/development').default,
  production: require('./env/production').default,
};

export default config[env];
