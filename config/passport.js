const passport = require('passport')
const passportJWT = require('passport-jwt')
const config = require('./config')
const User = require('../server/user/model')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = config.jwtSecret

const strategy = new JwtStrategy(jwtOptions, function (payload, next) {
  // let user = User.find(user => user.id === payload.id)
  // if (user) {
  //   next(null, user)
  // } else {
  //   next(null, false)
  // }
  console.log('stragegy')
  next(null, {})
})

passport.use(strategy)

module.exports = passport
