const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "development";
const envFile = env === "production" ? ".env.production" : ".env.development";
console.log(envFile);
dotenv.config({ path: envFile });

const config = {
  development: require("./env/development"),
  production: require("./env/production"),
};

module.exports = config[env];
