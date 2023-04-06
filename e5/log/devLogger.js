const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, colorize, timestamp, printf, errors } = format;
require('dotenv').config();
const constants = require('../constants');

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `[${ timestamp }]\t${ level }:\t${ message }`
});

const devLogger = createLogger({
  level: process.env.LEVEL,
  format: combine(
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    // errors({ stack: true }),
    logFormat,


  ),
  transports: [
    new transports.Console(),
    new transports.File({
      level: 'error',
      filename: constants.ERROR_LOG_PATH
    }),
    new transports.File({
      filename: constants.ALL_LOG_PATH
    }),
  ]
});

module.exports = devLogger;