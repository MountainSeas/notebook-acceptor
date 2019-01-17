const winston = require('winston')
require('winston-daily-rotate-file')

var transport = new winston.transports.DailyRotateFile({
  filename: `logs/application-${process.pid}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

transport.on('rotate', function (oldFilename, newFilename) {
  // do something fun
})

var logger = new winston.Logger({
  transports: [
    transport
  ]
})
// const logger = new winston.Logger({
//   // const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console({
//       json: true,
//       colorize: true
//     }),
//     new winston.transports.File({
//       filename: 'logs/error.log'
//     })
//   ]
// })

module.exports = logger
