const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError')
const config = require('../../config/config')
const User = require('../user/model')
const resFormat = require('../helpers/resFormat')

/**
 * Returns jwt token if valid username and password is provided
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login (req, res, next) {
  User.findOne({username: req.body.username}, function (err, user) {
    if (err) return next(err)
    if (user) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return next(err)
        if (isMatch) {
          const token = jwt.sign({
            username: user.username
          }, config.jwtSecret)
          return res.json(resFormat({
            data: {
              token,
              username: user.username
            },
            status: '000'
          }))
        } else {
          next(new APIError('username or passwor error', httpStatus.UNAUTHORIZED, true))
        }
      })
    }
  })
}

function getRandomNumber (req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json(resFormat({
    data: {
      user: req.user,
      num: Math.random() * 100
    },
    status: '000'
  }))
}

module.exports = { login, getRandomNumber }
