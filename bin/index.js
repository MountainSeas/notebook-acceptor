const mongoose = require('mongoose')
const util = require('util')

// config should be imported before importing any other file
const config = require('../config/config')
const app = require('../config/server')

const debug = require('debug')('tucchun-api:index')

// make bluebird default Promise
Promise = require('bluebird') // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise

// connect to mongo db
const mongoUri = config.mongo.host
mongoose.connect(mongoUri, {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  }
})
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

// module.parent check is required to support mocha watch
if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`)
  })
}

module.exports = app
