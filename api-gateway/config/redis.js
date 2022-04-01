const Redis = require("ioredis");
const redis = new Redis({
  port: 14101, // Redis port
  host: process.env.ENDPOINT, // Redis host
  password: process.env.PASSWORD,
});

module.exports = {
  redis,
};
