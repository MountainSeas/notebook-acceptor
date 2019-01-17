const express = require('express')
const validate = require('express-validation')
// const expressJwt = require('express-jwt')
const paramValidation = require('./validation')
const authCtrl = require('./controller')
const config = require('../../config/config')
const passport = require('../../config/passport')

const router = express.Router()

// POST /api/auth/login -Returns token if correct username and password is provided
router.route('/login').post(validate(paramValidation), authCtrl.login)

// GET /api/auth/random-number - Protected route,
// needs token returned by the above as header. Authorization: Bearer {token}
// router.route('/random-number').get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber)

router.route('/random-number').get(passport.authenticate('jwt', {session: config.jwtSession}), authCtrl.getRandomNumber)

module.exports = router
