require('dotenv').config()

module.exports = {
  app: {
    host: process.env.APP_HOST || '0.0.0.0',
    port: Number(process.env.APP_PORT) || 3000
  }
}